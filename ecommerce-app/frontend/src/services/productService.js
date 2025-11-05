import api from '../api/axiosConfig'

export default {
  // Récupérer tous les produits
  getAllProducts() {
    return api.get('/products')
  },

  // Récupérer un produit par ID
  getProductById(id) {
    return api.get(`/products/${id}`)
  },

  // Créer un produit
  createProduct(productData) {
    return api.post('/products', productData)
  },

  // Mettre à jour un produit
  updateProduct(id, productData) {
    return api.put(`/products/${id}`, productData)
  },

  // Supprimer un produit
  deleteProduct(id) {
    return api.delete(`/products/${id}`)
  },

  // Rechercher des produits
  searchProducts(query) {
    return api.get(`/products/search?q=${query}`)
  },

  // Récupérer les produits par catégorie
  getProductsByCategory(category) {
    return api.get(`/products/category/${category}`)
  },
}