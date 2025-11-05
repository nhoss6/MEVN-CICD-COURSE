import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import api from '@/api/axiosConfig';

export const useProductStore = defineStore('products', () => {
  const products = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const selectedCategory = ref('');

  const filteredProducts = computed(() => {
    if (!selectedCategory.value) return products.value;
    return products.value.filter(p => p.category === selectedCategory.value);
  });

  const getProducts = async (category = null) => {
    loading.value = true;
    error.value = null;
    try {
      const query = category ? `?category=${category}` : '';
      const response = await api.get(`/products${query}`);
      products.value = response.data.data;
    } catch (err) {
      error.value = err.message;
      console.error('Error fetching products:', err);
    } finally {
      loading.value = false;
    }
  };

  const getProductById = async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data.data;
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  const createProduct = async (productData) => {
    try {
      const response = await api.post('/products', productData);
      products.value.push(response.data.data);
      return response.data.data;
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      const response = await api.put(`/products/${id}`, productData);
      const index = products.value.findIndex(p => p._id === id);
      if (index !== -1) {
        products.value[index] = response.data.data;
      }
      return response.data.data;
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      products.value = products.value.filter(p => p._id !== id);
    } catch (err) {
      error.value = err.message;
      throw err;
    }
  };

  return {
    products,
    filteredProducts,
    loading,
    error,
    selectedCategory,
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
  };
});
