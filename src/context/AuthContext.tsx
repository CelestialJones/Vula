import React, {
  createContext,
  useEffect,
  useState,
  useReducer,
  type ReactNode,
} from "react"
import supabaseClient from "../services/supabase"
import { authService } from "../services/auth.service"

interface IUser {
  user_metadata: any
  id: string
  email: string
  full_name: string
  role?: string
  created_at?: string
}

interface AuthState {
  isSignout: boolean
  user: IUser | null
  userToken: string | null
}

interface AuthContextType {
  state: AuthState
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signUp: (email: string, password: string, fullName: string) => Promise<{ success: boolean; error?: string }>
  signOut: () => Promise<{ success: boolean; error?: string }>
}

interface AuthAction {
  type: "RESTORE_TOKEN" | "SIGN_IN" | "SIGN_OUT"
  token?: string | null
  user?: IUser
}

const initialLoginState: AuthState = {
  isSignout: false,
  user: null,
  userToken: null,
}

const authReducer = (prevState: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "RESTORE_TOKEN":
      return {
        ...prevState,
        userToken: action.token ?? null,
        isSignout: false,
      }
    case "SIGN_IN":
      return {
        ...prevState,
        userToken: action.token ?? null,
        user: action.user ?? null,
        isSignout: false,
      }
    case "SIGN_OUT":
      return {
        ...prevState,
        userToken: null,
        user: null,
        isSignout: true,
      }
    default:
      return prevState
  }
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialLoginState)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const {
          data: { session },
        } = await supabaseClient.auth.getSession()

        if (session?.user) {
          const profile = await authService.getUserProfile(session.user.id)
          if (profile.success) {
            dispatch({
              type: "RESTORE_TOKEN",
              token: session.access_token,
              user: profile.data,
            })
          }
        } else {
          dispatch({ type: "RESTORE_TOKEN", token: null })
        }
      } catch (error) {
        dispatch({ type: "RESTORE_TOKEN", token: null })
      } finally {
        setIsLoading(false)
      }
    }

    restoreSession()

    const { data: listener } = supabaseClient.auth.onAuthStateChange(
      (_event, session) => {
        dispatch({
          type: session ? "SIGN_IN" : "SIGN_OUT",
          token: session?.access_token ?? null,
          user: session?.user
            ? {
                id: session.user.id,
                email: session.user.email ?? "",
                full_name: "",
              }
            : null,
        })
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const value: AuthContextType = {
    state,
    isLoading,

    signIn: async (email, password) => {
      const result = await authService.signIn(email, password)
      if (result.success) {
        return { success: true }
      }
      return { success: false, error: result.error }
    },

    signUp: async (email, password, fullName) => {
      const result = await authService.signUp(email, password, {
        full_name: fullName,
      })
      if (result.success) {
        return { success: true }
      }
      return { success: false, error: result.error }
    },

    signOut: async () => {
      await authService.signOut()
      return { success: true }
    },
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
