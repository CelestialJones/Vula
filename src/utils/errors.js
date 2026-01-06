export const handleError = (error) => {
  if (typeof error === "string") {
    return error
  }

  if (error.message) {
    return error.message
  }

  if (error.error_description) {
    return error.error_description
  }

  return "Um erro inesperado ocorreu. Tente novamente."
}

export const getAuthErrorMessage = (error) => {
  const message = error.message || error.error_description || ""

  if (message.includes("Invalid login credentials")) {
    return "Email ou senha incorretos"
  }

  if (message.includes("User already registered")) {
    return "Este email já está registrado"
  }

  if (message.includes("Password should be at least 6 characters")) {
    return "A senha deve ter no mínimo 6 caracteres"
  }

  return handleError(error)
}
