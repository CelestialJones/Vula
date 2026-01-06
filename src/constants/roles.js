export const USER_ROLES = {
  ADMIN: "admin",
  SUPERVISOR: "supervisor",
  OPERATOR: "operator",
}

export const ROLE_PERMISSIONS = {
  [USER_ROLES.ADMIN]: ["all"],
  [USER_ROLES.SUPERVISOR]: ["read", "write", "report"],
  [USER_ROLES.OPERATOR]: ["read", "entry", "exit"],
}

export const WAREHOUSE_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  MAINTENANCE: "maintenance",
}

export const PRODUCT_STATUS = {
  ACTIVE: "active",
  DISCONTINUED: "discontinued",
  PENDING: "pending",
}

export const MOVEMENT_TYPES = {
  ENTRY: "entry",
  EXIT: "exit",
  ADJUSTMENT: "adjustment",
  TRANSFER: "transfer",
}

export const ALERT_TYPES = {
  LOW_STOCK: "low_stock",
  EXPIRY_SOON: "expiry_soon",
  EXPIRED: "expired",
  PENDING: "pending",
}
