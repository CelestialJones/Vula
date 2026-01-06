import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"

import { DashboardScreen } from "../screens/dashboard/DashboardScreen"
import { ProductListScreen } from "../screens/products/ProductListScreen"
import { ProductFormScreen } from "../screens/products/ProductFormScreen"
import { EntryScreen } from "../screens/stock/EntryScreen"
import { ExitScreen } from "../screens/stock/ExitScreen"
import { TransferScreen } from "../screens/stock/TransferScreen"
import { SettingsScreen } from "../screens/settings/SettingsScreen"
import { COLORS } from "../constants/colors"

/* ---------------- TYPES ---------------- */

export type DashboardStackParamList = {
  DashboardHome: undefined
  EntryScreen: undefined
  ExitScreen: undefined
  TransferScreen: undefined
}

export type ProductStackParamList = {
  ProductHome: undefined
  ProductFormScreen: undefined
}

export type AppTabParamList = {
  Dashboard: undefined
  Products: undefined
  Settings: undefined
}

/* ---------------- STACKS ---------------- */

const DashboardStack =
  createNativeStackNavigator<DashboardStackParamList>()

const ProductStack =
  createNativeStackNavigator<ProductStackParamList>()

const Tab = createBottomTabNavigator<AppTabParamList>()

/* ---------------- DASHBOARD STACK ---------------- */

function DashboardStackNavigator() {
  return (
    <DashboardStack.Navigator screenOptions={{ headerShown: false }}>
      <DashboardStack.Screen
        name="DashboardHome"
        component={DashboardScreen}
      />
      <DashboardStack.Screen
        name="EntryScreen"
        component={EntryScreen}
        options={{ presentation: "modal" }}
      />
      <DashboardStack.Screen
        name="ExitScreen"
        component={ExitScreen}
        options={{ presentation: "modal" }}
      />
      <DashboardStack.Screen
        name="TransferScreen"
        component={TransferScreen}
        options={{ presentation: "modal" }}
      />
    </DashboardStack.Navigator>
  )
}

/* ---------------- PRODUCT STACK ---------------- */

function ProductStackNavigator() {
  return (
    <ProductStack.Navigator screenOptions={{ headerShown: false }}>
      <ProductStack.Screen
        name="ProductHome"
        component={ProductListScreen}
      />
      <ProductStack.Screen
        name="ProductFormScreen"
        component={ProductFormScreen}
        options={{ presentation: "modal" }}
      />
    </ProductStack.Navigator>
  )
}

/* ---------------- TAB NAVIGATOR ---------------- */

export function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size, focused }) => {
          const icons: Record<keyof AppTabParamList, string> = {
            Dashboard: focused
              ? "view-dashboard"
              : "view-dashboard-outline",
            Products: focused
              ? "package-variant"
              : "package-variant-closed",
            Settings: focused ? "cog" : "cog-outline",
          }

          return (
            <MaterialCommunityIcons
              name={icons[route.name]}
              size={size}
              color={color}
            />
          )
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
          borderTopColor: COLORS.border,
          paddingBottom: 5,
        },
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardStackNavigator}
        options={{ title: "Dashboard" }}
      />
      <Tab.Screen
        name="Products"
        component={ProductStackNavigator}
        options={{ title: "Produtos" }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: "Configurações" }}
      />
    </Tab.Navigator>
  )
}
