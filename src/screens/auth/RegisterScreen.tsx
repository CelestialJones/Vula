import React, { useState } from "react"
import { StyleSheet, View, ScrollView, Alert } from "react-native"
import { Button, TextInput, Text } from "react-native-paper"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"

import { useAuth } from "../../hooks/useAuth"
import { COLORS, SPACING, FONT_SIZES } from "../../constants/colors"
import type { AuthStackParamList } from "../../navigation/AuthNavigator"

type Props = NativeStackScreenProps<AuthStackParamList, "Register">

export function RegisterScreen({ navigation }: Props) {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)

  const { signUp } = useAuth()

  async function handleRegister() {
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert("Erro", "Por favor, preencha todos os campos")
      return
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não correspondem")
      return
    }

    if (password.length < 6) {
      Alert.alert("Erro", "A senha deve ter no mínimo 6 caracteres")
      return
    }

    setLoading(true)

    const result = await signUp(email, password, fullName)

    setLoading(false)

    if (!result.success) {
      Alert.alert("Erro de Registro", result.error ?? "Erro desconhecido")
    } else {
      Alert.alert("Sucesso", "Conta criada com sucesso!")
      navigation.goBack()
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <Button
          icon="arrow-left"
          onPress={() => navigation.goBack()}
          compact
        />
        <Text variant="headlineMedium" style={styles.title}>
          Criar Conta
        </Text>
      </View>

      <View style={styles.form}>
        <TextInput
          label="Nome Completo"
          value={fullName}
          onChangeText={setFullName}
          mode="outlined"
          editable={!loading}
          style={styles.input}
          outlineColor={COLORS.border}
          activeOutlineColor={COLORS.primary}
        />

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
          outlineColor={COLORS.border}
          activeOutlineColor={COLORS.primary}
          right={
            <TextInput.Icon
              icon={passwordVisible ? "eye-off" : "eye"}
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          }
        />

        <TextInput
          label="Confirmar Senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          mode="outlined"
          secureTextEntry={!passwordVisible}
          editable={!loading}
          style={styles.input}
          outlineColor={COLORS.border}
          activeOutlineColor={COLORS.primary}
        />

        <Button
          mode="contained"
          onPress={handleRegister}
          loading={loading}
          disabled={loading}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          Registrar
        </Button>
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
    padding: SPACING.lg,
  },
  header: {
    marginBottom: SPACING.xl,
  },
  title: {
    color: COLORS.primary,
    fontWeight: "bold",
    marginTop: SPACING.md,
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
})
