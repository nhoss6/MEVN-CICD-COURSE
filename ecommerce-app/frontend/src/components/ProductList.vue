<template>
  <div class="pa-4">
    <v-container>
      <!-- En-tête -->
      <v-row class="mb-6">
        <v-col cols="12">
          <h1 class="text-h3 mb-4">🛍️ Catalogue Produits</h1>
          <v-divider></v-divider>
        </v-col>
      </v-row>

      <!-- Contrôles -->
      <v-row class="mb-6">
        <v-col cols="12" sm="6">
          <v-btn 
            color="success" 
            size="large"
            @click="dialogAdd = true"
          >
          
            + Ajouter un produit
          </v-btn>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="searchQuery"
            label="Rechercher..."
            prepend-icon="mdi-magnify"
            single-line
            @keyup="searchProducts"
          ></v-text-field>
        </v-col>
      </v-row>

      <!-- Loader -->
      <v-row v-if="loading" class="text-center">
        <v-col cols="12">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
          <p class="mt-3">Chargement des produits...</p>
        </v-col>
      </v-row>

      <!-- Liste des produits -->
      <v-row v-else-if="products.length > 0">
        <v-col 
          cols="12" 
          sm="6" 
          md="4" 
          lg="3"
          v-for="product in products" 
          :key="product._id"
        >
          <v-card class="h-100 d-flex flex-column">
            <!-- Image -->
            <v-img
              :src="product.image"
              height="200px"
              cover
            ></v-img>

            <!-- Contenu -->
            <v-card-title class="text-h6">{{ product.name }}</v-card-title>
            
            <v-card-text class="flex-grow-1">
              <p class="text-caption text-grey">{{ product.description }}</p>
              
              <v-row class="mt-2">
                <v-col cols="6">
                  <p class="text-h6 text-primary font-weight-bold">
                    {{ product.price }}€
                  </p>
                </v-col>
                <v-col cols="6" class="text-right">
                  <v-chip 
                    size="small"
                    :color="product.stock > 0 ? 'success' : 'error'"
                  >
                    Stock: {{ product.stock }}
                  </v-chip>
                </v-col>
              </v-row>

              <v-rating
                v-model="product.rating"
                readonly
                size="small"
                color="warning"
              ></v-rating>
            </v-card-text>

            <!-- Actions -->
            <v-card-actions>
              <v-btn 
                size="small"
                color="primary"
                @click="editProduct(product)"
              >
                ✏️ Éditer
              </v-btn>
              <v-btn 
                size="small"
                color="error"
                @click="deleteProductConfirm(product._id)"
              >
                🗑️ Supprimer
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <!-- Aucun produit -->
      <v-row v-else class="text-center">
        <v-col cols="12">
          <p class="text-h6 text-grey">Aucun produit trouvé</p>
        </v-col>
      </v-row>

      <!-- Dialog Ajouter/Éditer -->
      <v-dialog v-model="dialogAdd" width="500">
        <v-card>
          <v-card-title class="text-h5">
            {{ editingId ? '✏️ Éditer le produit' : '➕ Ajouter un produit' }}
          </v-card-title>
          
          <v-card-text class="pt-4">
            <v-form @submit.prevent="saveProduct">
              <v-text-field
                v-model="formData.name"
                label="Nom du produit *"
                required
                class="mb-3"
              ></v-text-field>

              <v-textarea
                v-model="formData.description"
                label="Description *"
                required
                rows="3"
                class="mb-3"
              ></v-textarea>

              <v-row class="mb-3">
                <v-col cols="6">
                  <v-text-field
                    v-model.number="formData.price"
                    label="Prix *"
                    type="number"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model.number="formData.stock"
                    label="Stock"
                    type="number"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-text-field
                v-model="formData.category"
                label="Catégorie"
                class="mb-3"
              ></v-text-field>

              <v-text-field
                v-model="formData.image"
                label="URL Image"
                class="mb-3"
              ></v-text-field>

              <v-slider
                v-model="formData.rating"
                min="0"
                max="5"
                step="0.5"
                label="Note"
                class="mb-3"
              ></v-slider>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="dialogAdd = false">Annuler</v-btn>
            <v-btn color="primary" @click="saveProduct">
              {{ editingId ? 'Mettre à jour' : 'Ajouter' }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Dialog Confirmation suppression -->
      <v-dialog v-model="dialogDelete" width="400">
        <v-card>
          <v-card-title class="text-h5">
            ⚠️ Confirmer la suppression
          </v-card-title>
          
          <v-card-text>
            Êtes-vous sûr de vouloir supprimer ce produit?
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="dialogDelete = false">Annuler</v-btn>
            <v-btn color="error" @click="deleteProduct">Supprimer</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import productService from '../services/productService'

const products = ref([])
const loading = ref(false)
const dialogAdd = ref(false)
const dialogDelete = ref(false)
const searchQuery = ref('')
const editingId = ref(null)
const productIdToDelete = ref(null)

const formData = ref({
  name: '',
  description: '',
  price: 0,
  image: 'https://via.placeholder.com/300',
  category: '',
  stock: 0,
  rating: 0,
})

// Récupérer tous les produits
const fetchProducts = async () => {
  loading.value = true
  try {
    const response = await productService.getAllProducts()
    products.value = response.data
  } catch (error) {
    console.error('Erreur:', error)
  } finally {
    loading.value = false
  }
}

// Rechercher des produits
const searchProducts = async () => {
  if (!searchQuery.value.trim()) {
    fetchProducts()
    return
  }

  loading.value = true
  try {
    const response = await productService.searchProducts(searchQuery.value)
    products.value = response.data
  } catch (error) {
    console.error('Erreur:', error)
  } finally {
    loading.value = false
  }
}

// Sauvegarder (créer ou mettre à jour)
const saveProduct = async () => {
  try {
    if (editingId.value) {
      await productService.updateProduct(editingId.value, formData.value)
      console.log('Produit mis à jour')
    } else {
      await productService.createProduct(formData.value)
      console.log('Produit créé')
    }
    
    dialogAdd.value = false
    resetForm()
    fetchProducts()
  } catch (error) {
    console.error('Erreur:', error)
  }
}

// Éditer un produit
const editProduct = (product) => {
  editingId.value = product._id
  formData.value = { ...product }
  dialogAdd.value = true
}

// Confirmer la suppression
const deleteProductConfirm = (id) => {
  productIdToDelete.value = id
  dialogDelete.value = true
}

// Supprimer un produit
const deleteProduct = async () => {
  try {
    await productService.deleteProduct(productIdToDelete.value)
    console.log('Produit supprimé')
    dialogDelete.value = false
    fetchProducts()
  } catch (error) {
    console.error('Erreur:', error)
  }
}

// Réinitialiser le formulaire
const resetForm = () => {
  formData.value = {
    name: '',
    description: '',
    price: 0,
    image: 'https://via.placeholder.com/300',
    category: '',
    stock: 0,
    rating: 0,
  }
  editingId.value = null
}

// Charger les produits au montage
onMounted(() => {
  fetchProducts()
})
</script>

<style scoped>
.h-100 {
  height: 100%;
}

.d-flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.flex-grow-1 {
  flex-grow: 1;
}
</style>