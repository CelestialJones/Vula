"use client"

import { useEffect, useState } from "react"
import { StyleSheet, View, ScrollView, Alert } from "react-native"
import { Button, TextInput, Text } from "react-native-paper"
import * as ImagePicker from "expo-image-picker"
import { productService } from "../../services/product.service"
import { COLORS, SPACING } from "../../constants/colors"

export const ProductFormScreen = ({ navigation, route }) => {
  const [product, setProduct] = useState({
    name: "",
    sku: "",
    category: "",
    description: "",
    min_stock: "",
    max_stock: "",
    expiry_date: "",
  })
  const [imageUri, setImageUri] = useState(null)
  const [loading, setLoading] = useState(false)
  const productId = route?.params?.productId

  useEffect(() => {
    if (productId) {
      loadProduct(productId)
    }
  }, [productId])

  const loadProduct = async (id) => {
    setLoading(true)
    const result = await productService.getProduct(id)
    if (result.success) {
      setProduct(result.data)
      if (result.data.image_url) {
        setImageUri(result.data.image_url)
      }
    }
    setLoading(false)
  }

  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      })

      if (!result.canceled) {
        setImageUri(result.assets[0].uri)
      }
    } catch (error) {
      Alert.alert("Erro", "Falha ao selecionar imagem")
    }
  }

  const handleSave = async () => {
    if (!product.name || !product.sku) {
      Alert.alert("Erro", "Preencha os campos obrigatórios")
      return
    }

    setLoading(true)

    try {
      let imageUrl = product.image_url

      // Upload imagem se for nova
      if (imageUri && !imageUri.startsWith("http")) {
        const uploadResult = await productService.uploadProductImage(productId || "new", imageUri)
        if (uploadResult.success) {
          imageUrl = uploadResult.url
        }
      }

      const dataToSave = {
        ...product,
        image_url: imageUrl,
      }

      let result
      if (productId) {
        result = await productService.updateProduct(productId, dataToSave)
      } else {
        result = await productService.createProduct(dataToSave)
      }

      setLoading(false)

      if (result.success) {
        Alert.alert("Sucesso", "Produto salvo com sucesso!")
        navigation.goBack()
      } else {
        Alert.alert("Erro", result.error)
      }
    } catch (error) {
      setLoading(false)
      Alert.alert("Erro", error.message)
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Button icon="arrow-left" onPress={() => navigation.goBack()} />
          <Text variant="headlineMedium" style={styles.title}>
            {productId ? "Editar Produto" : "Novo Produto"}
          </Text>
        </View>

        <Button mode="outlined" onPress={handlePickImage} style={styles.imageButton}>
          {imageUri ? "Mudar Foto" : "Adicionar Foto"}
        </Button>

        <TextInput
          label="Nome do Produto *"
          value={product.name}
          onChangeText={(text) => setProduct({ ...product, name: text })}
          mode="outlined"
          style={styles.input}
          editable={!loading}
        />

        <TextInput
          label="SKU *"
          value={product.sku}
          onChangeText={(text) => setProduct({ ...product, sku: text })}
          mode="outlined"
          style={styles.input}
          editable={!loading}
        />

        <TextInput
          label="Categoria"
          value={product.category}
          onChangeText={(text) => setProduct({ ...product, category: text })}
          mode="outlined"
          style={styles.input}
          editable={!loading}
        />

        <TextInput
          label="Descrição"
          value={product.description}
          onChangeText={(text) => setProduct({ ...product, description: text })}
          mode="outlined"
          multiline
          numberOfLines={3}
          style={styles.input}
          editable={!loading}
        />

        <View style={styles.row}>
          <TextInput
            label="Estoque Mín."
            value={product.min_stock}
            onChangeText={(text) => setProduct({ ...product, min_stock: text })}
            mode="outlined"
            keyboardType="numeric"
            style={[styles.input, styles.halfInput]}
            editable={!loading}
          />
          <TextInput
            label="Estoque Máx."
            value={product.max_stock}
            onChangeText={(text) => setProduct({ ...product, max_stock: text })}
            mode="outlined"
            keyboardType="numeric"
            style={[styles.input, styles.halfInput]}
            editable={!loading}
          />
        </View>

        <TextInput
          label="Data de Validade"
          value={product.expiry_date}
          onChangeText={(text) => setProduct({ ...product, expiry_date: text })}
          mode="outlined"
          placeholder="YYYY-MM-DD"
          style={styles.input}
          editable={!loading}
        />

        <Button mode="contained" onPress={handleSave} loading={loading} disabled={loading} style={styles.button}>
          {productId ? "Atualizar" : "Criar Produto"}
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
  imageButton: {
    marginBottom: SPACING.lg,
    borderColor: COLORS.primary,
  },
  input: {
    marginBottom: SPACING.md,
    backgroundColor: COLORS.surface,
  },
  row: {
    flexDirection: "row",
    gap: SPACING.md,
  },
  halfInput: {
    flex: 1,
  },
  button: {
    marginTop: SPACING.lg,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.primary,
  },
})
