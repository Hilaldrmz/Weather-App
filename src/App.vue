<script setup>
import { RouterView } from "vue-router";
import './scss/main.css';

import Footer from "./components/Footer.vue";
</script>

<template>
  <div class="app-container">
    <!-- <Nav /> -->
    <RouterView />

    <Footer />
  </div>
</template>

<style lang="scss" scoped>

</style>