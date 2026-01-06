import type React from "react"
import { StyleSheet, View } from "react-native"
import { ActivityIndicator } from "react-native-paper"
import { COLORS } from "../constants/colors"

export const LoadingScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator animating={true} color={COLORS.primary} size="large" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
})
