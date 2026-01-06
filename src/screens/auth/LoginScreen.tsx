import React, { useState } from "react"
import { StyleSheet, View, ScrollView, Alert } from "react-native"
import { Button, TextInput, Text } from "react-native-paper"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"

import { useAuth } from "../../hooks/useAuth"
import { COLORS, SPACING, FONT_SIZES } from "../../constants/colors"
import type { AuthStackParamList } from "../../navigation/AuthNavigator"

type Props = NativeStackScreenProps<AuthStackParamList, "Login">

export function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)

  const { signIn } = useAuth()

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos")
      return
    }

    setLoading(true)

    const result = await signIn(email, password)

    setLoading(false)

    if (!result.success) {
      Alert.alert("Erro de Login", result.error ?? "Erro desconhecido")
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <Text variant="displaySmall" style={styles.title}>
          VulaStock
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Controle de Estoque em Armazém
        </Text>
      </View>

      <View style={styles.form}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading}
          style={styles.input}
          outlineColor={COLORS.border}
          activeOutlineColor={COLORS.primary}
        />

        <TextInput
          label="Senha"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          secureTextEntry={!passwordVisible}
          editable={!loading}
          style={styles.input}
          right={
            <TextInput.Icon
              icon={passwordVisible ? "eye-off" : "eye"}
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          }
          outlineColor={COLORS.border}
          activeOutlineColor={COLORS.primary}
        />

        <Button
          mode="contained"
          onPress={handleLogin}
          loading={loading}
          disabled={loading}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          Entrar
        </Button>

        <Button
          mode="text"
          onPress={() => navigation.navigate("Register")}
          labelStyle={styles.registerText}
        >
          Não tem conta? Registre-se
        </Button>
      </View>

      <View style={styles.footer}>
        <Text variant="bodySmall" style={styles.footerText}>
          VulaStock v1.0.0
        </Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
  },
  header: {
    alignItems: "center",
    marginTop: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  title: {
    color: COLORS.primary,
    fontWeight: "bold",
    marginBottom: SPACING.sm,
  },
  subtitle: {
    color: COLORS.textSecondary,
  },
  form: {
    marginVertical: SPACING.lg,
  },
  input: {
    marginBottom: SPACING.md,
    backgroundColor: COLORS.surface,
  },
  button: {
    marginTop: SPACING.lg,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.primary,
  },
  buttonLabel: {
    fontSize: FONT_SIZES.base,
    fontWeight: "600",
  },
  registerText: {
    marginTop: SPACING.md,
    color: COLORS.primary,
  },
  footer: {
    alignItems: "center",
    paddingBottom: SPACING.lg,
  },
  footerText: {
    color: COLORS.textSecondary,
  },
})
