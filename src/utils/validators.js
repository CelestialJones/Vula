export const validators = {
  email: (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  },

  password: (password) => {
    return password && password.length >= 6
  },

  required: (value) => {
    return value && value.trim().length > 0
  },

  number: (value) => {
    return !isNaN(value) && Number(value) > 0
  },

  date: (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/
    if (!regex.test(dateString)) return false
    const date = new Date(dateString)
    return date instanceof Date && !isNaN(date)
  },

  sku: (sku) => {
    return /^[A-Z0-9-]+$/.test(sku)
  },
}
