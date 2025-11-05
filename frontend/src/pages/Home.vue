<template>
  <div class="pa-6">
    <v-container>
      <!-- Hero Section -->
      <v-row class="mb-8">
        <v-col cols="12">
          <v-card class="hero-card pa-8 text-center" color="primary">
            <h1 class="text-h2 text-white mb-4">Welcome to E-Commerce</h1>
            <p class="text-h6 text-white mb-6">Find the best products at the best prices</p>
            <v-btn size="large" color="white" to="/products">
              Start Shopping
            </v-btn>
          </v-card>
        </v-col>
      </v-row>

      <!-- Featured Products Section -->
      <v-row>
        <v-col cols="12">
          <h2 class="text-h4 mb-4">Featured Products</h2>
        </v-col>
      </v-row>

      <v-row v-if="loading" class="text-center">
        <v-col cols="12">
          <v-progress-circular indeterminate color="primary" size="60"></v-progress-circular>
        </v-col>
      </v-row>

      <v-row v-else-if="products.length > 0">
        <v-col cols="12" sm="6" md="4" lg="3" v-for="product in products.slice(0, 4)" :key="product._id">
          <v-card class="product-card" :to="`/products/${product._id}`">
            <v-img :src="product.image" height="200" cover></v-img>
            <v-card-title class="text-h6">{{ product.name }}</v-card-title>
            <v-card-text>
              <p class="text-caption text-grey">{{ product.description.substring(0, 50) }}...</p>
              <p class="text-h6 text-primary mt-2">${{ product.price }}</p>
              <v-rating :model-value="product.rating" readonly size="small" color="warning"></v-rating>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row v-else class="text-center">
        <v-col cols="12">
          <p class="text-h6 text-grey">No products found</p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useProductStore } from '@/stores/productStore';

const productStore = useProductStore();
const loading = ref(false);

const products = ref([]);

onMounted(async () => {
  loading.value = true;
  await productStore.getProducts();
  products.value = productStore.products;
  loading.value = false;
});
</script>

<style scoped>
.hero-card {
  border-radius: 12px !important;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.product-card {
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}
</style>
