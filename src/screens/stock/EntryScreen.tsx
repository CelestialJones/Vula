"use client"

import type React from "react"

import { useState } from "react"
import { StyleSheet, View, ScrollView, Alert } from "react-native"
import { Button, TextInput, Text } from "react-native-paper"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useAuth } from "../../hooks/useAuth"
import { stockService } from "../../services/stock.service"
import { COLORS, SPACING } from "../../constants/colors"

type RootStackParamList = {
  EntryScreen: undefined
}

type Props = NativeStackScreenProps<RootStackParamList, "EntryScreen">

interface EntryData {
  product_id: string
  quantity: string
  location: string
  batch_number: string
  expiry_date: string
  notes: string
}

export const EntryScreen: React.FC<Props> = ({ navigation }) => {
  const { user } = useAuth()
  const [entry, setEntry] = useState<EntryData>({
    product_id: "",
    quantity: "",
    location: "",
    batch_number: "",
    expiry_date: "",
    notes: "",
  })
  const [loading, setLoading] = useState(false)

  const handleCreateEntry = async () => {
    if (!entry.product_id || !entry.quantity || !entry.location) {
      Alert.alert("Erro", "Preencha os campos obrigatórios")
      return
    }

    if (!user?.id) {
      Alert.alert("Erro", "Usuário não identificado")
      return
    }

    setLoading(true)
    const result = await stockService.createEntry({
      ...entry,
      quantity: Number.parseInt(entry.quantity),
      user_id: user.id,
    })

    setLoading(false)

    if (result.success) {
      Alert.alert("Sucesso", "Entrada registrada com sucesso!")
      setEntry({
        product_id: "",
        quantity: "",
        location: "",
        batch_number: "",
        expiry_date: "",
        notes: "",
      })
      navigation.goBack()
    } else {
      Alert.alert("Erro", result.error || "Falha ao registrar entrada")
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Button icon="arrow-left" onPress={() => navigation.goBack()} />
          <Text variant="headlineMedium" style={styles.title}>
            Registrar Entrada
          </Text>
        </View>

        <TextInput
          label="ID do Produto *"
          value={entry.product_id}
          onChangeText={(text) => setEntry({ ...entry, product_id: text })}
          mode="outlined"
          style={styles.input}
          editable={!loading}
        />

        <TextInput
          label="Quantidade *"
          value={entry.quantity}
          onChangeText={(text) => setEntry({ ...entry, quantity: text })}
          mode="outlined"
          keyboardType="numeric"
          style={styles.input}
          editable={!loading}
        />

        <TextInput
          label="Localização *"
          value={entry.location}
          onChangeText={(text) => setEntry({ ...entry, location: text })}
          mode="outlined"
          style={styles.input}
          editable={!loading}
          placeholder="Prateleira, Corredor, etc"
        />

        <TextInput
          label="Número de Lote"
          value={entry.batch_number}
          onChangeText={(text) => setEntry({ ...entry, batch_number: text })}
          mode="outlined"
          style={styles.input}
          editable={!loading}
        />

        <TextInput
          label="Data de Validade"
          value={entry.expiry_date}
          onChangeText={(text) => setEntry({ ...entry, expiry_date: text })}
          mode="outlined"
          placeholder="YYYY-MM-DD"
          style={styles.input}
          editable={!loading}
        />

        <TextInput
          label="Observações"
          value={entry.notes}
          onChangeText={(text) => setEntry({ ...entry, notes: text })}
          mode="outlined"
          multiline
          numberOfLines={3}
          style={styles.input}
          editable={!loading}
        />

        <Button mode="contained" onPress={handleCreateEntry} loading={loading} disabled={loading} style={styles.button}>
          Registrar Entrada
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
    marginBottom: SPACING.lg,
  },
  title: {
    color: COLORS.primary,
    fontWeight: "bold",
    marginTop: SPACING.md,
  },
  input: {
    marginBottom: SPACING.md,
    backgroundColor: COLORS.surface,
  },
  button: {
    marginTop: SPACING.lg,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.success,
  },
})
