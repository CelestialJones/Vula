"use client"

import { useState } from "react"
import { StyleSheet, View, ScrollView, Alert } from "react-native"
import { Button, TextInput, Text } from "react-native-paper"
import { stockService } from "../../services/stock.service"
import { COLORS, SPACING } from "../../constants/colors"

export const TransferScreen = ({ navigation }) => {
  const [transfer, setTransfer] = useState({
    product_id: "",
    quantity: "",
    from_location: "",
    to_location: "",
    notes: "",
  })
  const [loading, setLoading] = useState(false)

  const handleCreateTransfer = async () => {
    if (!transfer.product_id || !transfer.quantity || !transfer.from_location || !transfer.to_location) {
      Alert.alert("Erro", "Preencha os campos obrigatórios")
      return
    }

    setLoading(true)
    const result = await stockService.createTransfer({
      ...transfer,
      quantity: Number.parseInt(transfer.quantity),
      user_id: "current_user_id",
    })

    setLoading(false)

    if (result.success) {
      Alert.alert("Sucesso", "Transferência registrada com sucesso!")
      setTransfer({
        product_id: "",
        quantity: "",
        from_location: "",
        to_location: "",
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
            Transferência Interna
          </Text>
        </View>

        <TextInput
          label="ID do Produto *"
          value={transfer.product_id}
          onChangeText={(text) => setTransfer({ ...transfer, product_id: text })}
          mode="outlined"
          style={styles.input}
          editable={!loading}
        />

        <TextInput
          label="Quantidade *"
          value={transfer.quantity}
          onChangeText={(text) => setTransfer({ ...transfer, quantity: text })}
          mode="outlined"
          keyboardType="numeric"
          style={styles.input}
          editable={!loading}
        />

        <TextInput
          label="Localização Origem *"
          value={transfer.from_location}
          onChangeText={(text) => setTransfer({ ...transfer, from_location: text })}
          mode="outlined"
          style={styles.input}
          editable={!loading}
        />

        <TextInput
          label="Localização Destino *"
          value={transfer.to_location}
          onChangeText={(text) => setTransfer({ ...transfer, to_location: text })}
          mode="outlined"
          style={styles.input}
          editable={!loading}
        />

        <TextInput
          label="Observações"
          value={transfer.notes}
          onChangeText={(text) => setTransfer({ ...transfer, notes: text })}
          mode="outlined"
          multiline
          numberOfLines={3}
          style={styles.input}
          editable={!loading}
        />

        <Button
          mode="contained"
          onPress={handleCreateTransfer}
          loading={loading}
          disabled={loading}
          style={styles.button}
        >
          Registrar Transferência
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
    backgroundColor: COLORS.info,
  },
})
