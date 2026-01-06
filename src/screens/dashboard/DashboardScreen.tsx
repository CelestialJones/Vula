
import { useEffect, useState } from "react"
import { StyleSheet, View, ScrollView, RefreshControl } from "react-native"
import { Card, Text, Button } from "react-native-paper"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import { stockService } from "../../services/stock.service"
import { COLORS, SPACING } from "../../constants/colors"

type RootStackParamList = {
  DashboardHome: undefined
  EntryScreen: undefined
  ExitScreen: undefined
  TransferScreen: undefined
  ProductFormScreen: undefined
  ReportsScreen: undefined
}

type Props = NativeStackScreenProps<RootStackParamList, "DashboardHome">

interface Alert {
  id: string
  type: string
  message: string
}

interface Movement {
  id: string
  type: string
  quantity: number
  created_at: string
}

export const DashboardScreen: React.FC<Props> = ({ navigation }) => {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [movements, setMovements] = useState<Movement[]>([])
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    setLoading(true)
    const [alertsResult, movementsResult] = await Promise.all([
      stockService.getAlerts(),
      stockService.getMovementHistory(null, 5),
    ])

    if (alertsResult.success) setAlerts(alertsResult.data || [])
    if (movementsResult.success) setMovements(movementsResult.data || [])
    setLoading(false)
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await loadDashboardData()
    setRefreshing(false)
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <Text variant="displaySmall" style={styles.title}>
          Dashboard
        </Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Ações Rápidas
        </Text>
        <View style={styles.actionGrid}>
          <Button
            mode="elevated"
            onPress={() => navigation.navigate("EntryScreen")}
            style={styles.actionButton}
            contentStyle={styles.actionButtonContent}
          >
            Entrada
          </Button>
          <Button
            mode="elevated"
            onPress={() => navigation.navigate("ExitScreen")}
            style={styles.actionButton}
            contentStyle={styles.actionButtonContent}
          >
            Saída
          </Button>
          <Button
            mode="elevated"
            onPress={() => navigation.navigate("TransferScreen")}
            style={styles.actionButton}
            contentStyle={styles.actionButtonContent}
          >
            Transferência
          </Button>
          <Button
            mode="elevated"
            onPress={() => navigation.navigate("ProductFormScreen")}
            style={styles.actionButton}
            contentStyle={styles.actionButtonContent}
          >
            Novo Produto
          </Button>
        </View>
      </View>

      {/* Alerts */}
      {alerts.length > 0 && (
        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Alertas ({alerts.length})
          </Text>
          {alerts.slice(0, 3).map((alert) => (
            <Card key={alert.id} style={styles.alertCard}>
              <Card.Content>
                <Text variant="bodyMedium" style={styles.alertType}>
                  {alert.type === "low_stock" && "Estoque Baixo"}
                  {alert.type === "expiry_soon" && "Validade Próxima"}
                  {alert.type === "expired" && "Expirado"}
                </Text>
                <Text variant="bodySmall">{alert.message}</Text>
              </Card.Content>
            </Card>
          ))}
        </View>
      )}

      {/* Recent Movements */}
      {movements.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Últimas Movimentações
            </Text>
            <Button mode="text" compact onPress={() => navigation.navigate("ReportsScreen")}>
              Ver Tudo
            </Button>
          </View>

          {movements.map((movement) => (
            <Card key={movement.id} style={styles.movementCard}>
              <Card.Content>
                <View style={styles.movementRow}>
                  <View style={styles.movementInfo}>
                    <Text variant="bodyMedium" style={styles.movementType}>
                      {movement.type === "entry" && "Entrada"}
                      {movement.type === "exit" && "Saída"}
                      {movement.type === "adjustment" && "Ajuste"}
                      {movement.type === "transfer" && "Transferência"}
                    </Text>
                    <Text variant="bodySmall" style={styles.movementTime}>
                      {new Date(movement.created_at).toLocaleDateString("pt-BR")}
                    </Text>
                  </View>
                  <Text variant="bodyMedium" style={styles.movementQuantity}>
                    {movement.quantity > 0 ? "+" : ""}
                    {movement.quantity}
                  </Text>
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>
      )}

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
  section: {
    padding: SPACING.lg,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    color: COLORS.text,
    fontWeight: "600",
    marginBottom: SPACING.md,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  actionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.md,
    justifyContent: "space-between",
  },
  actionButton: {
    width: "48%",
    backgroundColor: COLORS.primary,
  },
  actionButtonContent: {
    paddingVertical: SPACING.md,
  },
  alertCard: {
    marginBottom: SPACING.md,
    backgroundColor: "#FFF3E0",
    borderLeftWidth: 4,
    borderLeftColor: COLORS.warning,
  },
  alertType: {
    fontWeight: "600",
    color: COLORS.warning,
  },
  movementCard: {
    marginBottom: SPACING.md,
    backgroundColor: COLORS.background,
  },
  movementRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  movementInfo: {
    flex: 1,
  },
  movementType: {
    fontWeight: "600",
    marginBottom: SPACING.xs,
  },
  movementTime: {
    color: COLORS.textSecondary,
  },
  movementQuantity: {
    fontWeight: "700",
    color: COLORS.success,
    fontSize: 16,
  },
  spacing: {
    height: SPACING.xl,
  },
})
