"use client"

import { useState } from "react"
import { StyleSheet, View, ScrollView, Alert } from "react-native"
import { Button, TextInput, Text } from "react-native-paper"
import { stockService } from "../../services/stock.service"
import { COLORS, SPACING } from "../../constants/colors"

export const ExitScreen = ({ navigation }) => {
  const [exit, setExit] = useState({
    product_id: "",
    quantity: "",
    reason: "",
    destination: "",
    notes: "",
  })
  const [loading, setLoading] = useState(false)

  const handleCreateExit = async () => {
    if (!exit.product_id || !exit.quantity || !exit.reason) {
      Alert.alert("Erro", "Preencha os campos obrigatórios")
      return
    }

    setLoading(true)
    const result = await stockService.createExit({
      ...exit,
      quantity: -Number.parseInt(exit.quantity), // Negativo para saída
      user_id: "current_user_id",
    })

    setLoading(false)

    if (result.success) {
      Alert.alert("Sucesso", "Saída registrada com sucesso!")
      setExit({
        product_id: "",
        quantity: "",
        reason: "",
        destination: "",
        notes: "",
      })
      navigation.goBack()
    } else {
      Alert.alert("Erro", result.error)
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Button icon="arrow-left" onPress={() => navigation.goBack()} />
          <Text variant="headlineMedium" style={styles.title}>
            Registrar Saída
          </Text>
        </View>

        <TextInput
          label="ID do Produto *"
          value={exit.product_id}
          onChangeText={(text) => setExit({ ...exit, product_id: text })}
          mode="outlined"
          style={styles.input}
          editable={!loading}
        />

        <TextInput
          label="Quantidade *"
          value={exit.quantity}
          onChangeText={(text) => setExit({ ...exit, quantity: text })}
          mode="outlined"
          keyboardType="numeric"
          style={styles.input}
          editable={!loading}
        />

        <TextInput
          label="Motivo da Saída *"
          value={exit.reason}
          onChangeText={(text) => setExit({ ...exit, reason: text })}
          mode="outlined"
          style={styles.input}
          editable={!loading}
          placeholder="Venda, Devolução, Perda, etc"
        />

        <TextInput
          label="Destino"
          value={exit.destination}
          onChangeText={(text) => setExit({ ...exit, destination: text })}
          mode="outlined"
          style={styles.input}
          editable={!loading}
        />

        <TextInput
          label="Observações"
          value={exit.notes}
          onChangeText={(text) => setExit({ ...exit, notes: text })}
          mode="outlined"
          multiline
          numberOfLines={3}
          style={styles.input}
          editable={!loading}
        />

        <Button mode="contained" onPress={handleCreateExit} loading={loading} disabled={loading} style={styles.button}>
          Registrar Saída
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
    backgroundColor: COLORS.warning,
  },
})
