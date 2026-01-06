"use client"

import { useEffect, useState } from "react"
import { StyleSheet, View, ScrollView, RefreshControl } from "react-native"
import { Card, Text, Chip } from "react-native-paper"
import { stockService } from "../../services/stock.service"
import { COLORS, SPACING } from "../../constants/colors"

export const ReportsScreen = ({ navigation }) => {
  const [movements, setMovements] = useState([])
  const [stats, setStats] = useState({
    totalEntries: 0,
    totalExits: 0,
    totalTransfers: 0,
    totalAdjustments: 0,
  })
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadMovements()
  }, [])

  const loadMovements = async () => {
    setLoading(true)
    const result = await stockService.getMovementHistory(null, 100)
    if (result.success) {
      setMovements(result.data || [])
      calculateStats(result.data || [])
    }
    setLoading(false)
  }

  const calculateStats = (data) => {
    const statsData = {
      totalEntries: data.filter((m) => m.type === "entry").length,
      totalExits: data.filter((m) => m.type === "exit").length,
      totalTransfers: data.filter((m) => m.type === "transfer").length,
      totalAdjustments: data.filter((m) => m.type === "adjustment").length,
    }
    setStats(statsData)
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await loadMovements()
    setRefreshing(false)
  }

  const getTypeColor = (type) => {
    switch (type) {
      case "entry":
        return COLORS.success
      case "exit":
        return COLORS.danger
      case "transfer":
        return COLORS.info
      case "adjustment":
        return COLORS.warning
      default:
        return COLORS.textSecondary
    }
  }

  const getTypeLabel = (type) => {
    switch (type) {
      case "entry":
        return "Entrada"
      case "exit":
        return "Saída"
      case "transfer":
        return "Transferência"
      case "adjustment":
        return "Ajuste"
      default:
        return type
    }
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <Text variant="displaySmall" style={styles.title}>
          Relatórios
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <Text variant="displaySmall" style={{ color: COLORS.success }}>
              {stats.totalEntries}
            </Text>
            <Text variant="bodySmall">Entradas</Text>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <Text variant="displaySmall" style={{ color: COLORS.danger }}>
              {stats.totalExits}
            </Text>
            <Text variant="bodySmall">Saídas</Text>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <Text variant="displaySmall" style={{ color: COLORS.info }}>
              {stats.totalTransfers}
            </Text>
            <Text variant="bodySmall">Transferências</Text>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <Text variant="displaySmall" style={{ color: COLORS.warning }}>
              {stats.totalAdjustments}
            </Text>
            <Text variant="bodySmall">Ajustes</Text>
          </Card.Content>
        </Card>
      </View>

      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Histórico Completo
        </Text>

        {movements.map((movement) => (
          <Card key={movement.id} style={styles.movementCard}>
            <Card.Content>
              <View style={styles.movementRow}>
                <View style={styles.movementInfo}>
                  <Chip
                    style={{ backgroundColor: getTypeColor(movement.type), marginBottom: SPACING.xs }}
                    textStyle={{ color: COLORS.background }}
                  >
                    {getTypeLabel(movement.type)}
                  </Chip>
                  <Text variant="bodySmall" style={styles.movementDate}>
                    {new Date(movement.created_at).toLocaleDateString("pt-BR")} às{" "}
                    {new Date(movement.created_at).toLocaleTimeString("pt-BR")}
                  </Text>
                </View>
                <View style={styles.quantityBadge}>
                  <Text variant="bodyMedium" style={styles.quantityText}>
                    {movement.quantity > 0 ? "+" : ""}
                    {movement.quantity}
                  </Text>
                </View>
              </View>
              {movement.notes && (
                <Text variant="bodySmall" style={styles.notes}>
                  {movement.notes}
                </Text>
              )}
            </Card.Content>
          </Card>
        ))}
      </View>

      <View style={styles.spacing} />
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
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: SPACING.md,
    gap: SPACING.md,
    justifyContent: "space-between",
  },
  statCard: {
    width: "48%",
    backgroundColor: COLORS.background,
  },
  statContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.lg,
  },
  section: {
    padding: SPACING.lg,
  },
  sectionTitle: {
    color: COLORS.primary,
    fontWeight: "600",
    marginBottom: SPACING.md,
  },
  movementCard: {
    marginBottom: SPACING.md,
    backgroundColor: COLORS.background,
  },
  movementRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  movementInfo: {
    flex: 1,
  },
  movementDate: {
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  quantityBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.surface,
    borderRadius: 8,
  },
  quantityText: {
    fontWeight: "700",
    color: COLORS.primary,
  },
  notes: {
    marginTop: SPACING.md,
    color: COLORS.textSecondary,
    fontStyle: "italic",
  },
  spacing: {
    height: SPACING.xl,
  },
})
