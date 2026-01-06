export const formatters = {
  formatDate: (date) => {
    if (!date) return ""
    const d = new Date(date)
    return d.toLocaleDateString("pt-BR")
  },

  formatDateTime: (date) => {
    if (!date) return ""
    const d = new Date(date)
    return `${d.toLocaleDateString("pt-BR")} ${d.toLocaleTimeString("pt-BR")}`
  },

  formatCurrency: (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  },

  formatQuantity: (quantity) => {
    return new Intl.NumberFormat("pt-BR").format(quantity)
  },

  truncate: (text, length = 50) => {
    return text.length > length ? text.substring(0, length) + "..." : text
  },
}
