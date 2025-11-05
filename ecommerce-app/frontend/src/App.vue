<template>
  <v-app>
    <v-app-bar app color="primary" dark elevation="4">
      <v-toolbar-title class="text-h5 font-weight-bold">
        🛒 E-Commerce Store
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="toggleTheme">
        {{ isDark ? '☀️' : '🌙' }}
      </v-btn>
    </v-app-bar>

    <v-main>
      <ProductList />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useTheme } from 'vuetify'
import ProductList from './components/ProductList.vue'

const theme = useTheme()
const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  theme.global.name.value = isDark.value ? 'dark' : 'light'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Roboto', sans-serif;
}
</style>