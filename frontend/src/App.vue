<template>
  <v-app>
    <v-app-bar app color="primary" dark elevation="4">
      <v-app-bar-title class="text-h5 font-weight-bold">
        🛒 E-Commerce Store
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn icon to="/cart">
        <v-icon>mdi-cart</v-icon>
      </v-btn>
      <v-btn icon @click="toggleTheme">
        {{ isDark ? '☀️' : '🌙' }}
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-footer app color="primary" dark class="text-center">
      <span>© 2024 E-Commerce Store. All rights reserved.</span>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref } from 'vue';
import { useTheme } from 'vuetify';

const theme = useTheme();
const isDark = ref(false);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  theme.global.name.value = isDark.value ? 'dark' : 'light';
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
