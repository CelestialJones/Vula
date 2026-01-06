import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { PaperProvider } from "react-native-paper"

import { AuthProvider } from "./src/context/AuthContext"
import { AuthNavigator } from "./src/navigation/AuthNavigator"
import { AppNavigator } from "./src/navigation/AppNavigator"
import { LoadingScreen } from "./src/components/LoadingScreen"
import { useAuth } from "./src/hooks/useAuth"
import { theme } from "./src/styles/theme"

const RootNavigator = () => {
  const { state, isLoading } = useAuth()

  if (isLoading) {
    return <LoadingScreen />
  }

  return state.userToken ? <AppNavigator /> : <AuthNavigator />
}

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </PaperProvider>
  )
}
