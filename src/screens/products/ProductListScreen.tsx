"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { StyleSheet, View, FlatList, RefreshControl, Alert } from "react-native"
import { Card, Text, Button, Searchbar, FAB } from "react-native-paper"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import { productService } from "../../services/product.service"
import { COLORS, SPACING } from "../../constants/colors"

type RootStackParamList = {
  ProductList: undefined
  ProductFormScreen: { productId?: string }
}

type Props = NativeStackScreenProps<RootStackParamList, "ProductList">

interface Product {
  id: string
  name: string
  sku: string
  category: string
}

export const ProductListScreen: React.FC<Props> = ({ navigation }) => {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    filterProducts()
  }, [searchQuery, products])

  const loadProducts = async () => {
    setLoading(true)
    const result = await productService.getProducts()
    if (result.success) {
      setProducts(result.data || [])
    } else {
      Alert.alert("Erro", "Falha ao carregar produtos")
    }
    setLoading(false)
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await loadProducts()
    setRefreshing(false)
  }

  const filterProducts = () => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    setFilteredProducts(filtered)
  }

  const renderProduct = ({ item }: { item: Product }) => (
    <Card style={styles.productCard} onPress={() => navigation.navigate("ProductFormScreen", { productId: item.id })}>
      <Card.Content>
        <View style={styles.productHeader}>
          <View style={styles.productInfo}>
            <Text variant="bodyMedium" style={styles.productName} numberOfLines={1}>
              {item.name}
            </Text>
            <Text variant="bodySmall" style={styles.productSku}>
              SKU: {item.sku}
            </Text>
          </View>
          <Button
            mode="text"
            icon="pencil"
            compact
            onPress={() => navigation.navigate("ProductFormScreen", { productId: item.id })}
          />
        </View>
        <Text variant="bodySmall" style={styles.productCategory}>
          {item.category}
        </Text>
      </Card.Content>
    </Card>
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="displaySmall" style={styles.title}>
          Produtos
        </Text>
      </View>

      <Searchbar
        placeholder="Buscar por nome ou SKU..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />

      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text variant="bodyMedium" style={styles.emptyText}>
              {loading ? "Carregando..." : "Nenhum produto encontrado"}
            </Text>
          </View>
        }
      />

      <FAB icon="plus" style={styles.fab} onPress={() => navigation.navigate("ProductFormScreen")} />
    </View>
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
  searchbar: {
    margin: SPACING.md,
    backgroundColor: COLORS.background,
  },
  listContent: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl * 2,
  },
  productCard: {
    marginBottom: SPACING.md,
    backgroundColor: COLORS.background,
  },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: SPACING.sm,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontWeight: "600",
    marginBottom: SPACING.xs,
  },
  productSku: {
    color: COLORS.textSecondary,
  },
  productCategory: {
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  fab: {
    position: "absolute",
    margin: SPACING.lg,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.primary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: SPACING.xl * 2,
  },
  emptyText: {
    color: COLORS.textSecondary,
  },
})
