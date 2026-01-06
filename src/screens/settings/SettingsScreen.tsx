"use client"

import { StyleSheet, View, ScrollView, Alert } from "react-native"
import { Button, Text, Divider, List } from "react-native-paper"
import { useAuth } from "../../hooks/useAuth"
import { COLORS, SPACING } from "../../constants/colors"

export const SettingsScreen = ({ navigation }) => {
  const { state, signOut } = useAuth()

  const handleLogout = async () => {
    Alert.alert("Confirmar", "Deseja realmente sair?", [
      {
        text: "Cancelar",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Sair",
        onPress: async () => {
          await signOut()
        },
      },
    ])
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="displaySmall" style={styles.title}>
          Configurações
        </Text>
      </View>

      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Perfil
        </Text>
        <List.Item
          title="Nome"
          description={state.user?.user_metadata?.full_name || "Usuário"}
          left={() => <List.Icon icon="account" />}
        />
        <List.Item title="Email" description={state.user?.email} left={() => <List.Icon icon="email" />} />
      </View>

      <Divider style={styles.divider} />

      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Sobre
        </Text>
        <List.Item title="Versão" description="1.0.0" left={() => <List.Icon icon="information" />} />
        <List.Item title="Suporte" description="Contate o suporte" left={() => <List.Icon icon="help-circle" />} />
      </View>

      <Divider style={styles.divider} />

      <View style={styles.section}>
        <Button
          mode="contained"
          onPress={handleLogout}
          style={styles.logoutButton}
          buttonColor={COLORS.danger}
          icon="logout"
        >
          Sair da Conta
        </Button>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  header: {
    padding: SPACING.lg,
    backgroundColor: COLORS.primary,
  },
  title: {
    color: COLORS.background,
    fontWeight: "bold",
  },
  section: {
    paddingVertical: SPACING.md,
  },
  sectionTitle: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    color: COLORS.primary,
    fontWeight: "600",
  },
  divider: {
    marginVertical: SPACING.md,
  },
  logoutButton: {
    marginHorizontal: SPACING.lg,
    marginVertical: SPACING.lg,
  },
})
