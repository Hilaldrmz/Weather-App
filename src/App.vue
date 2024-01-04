<script setup>
import { defineAsyncComponent } from 'vue';
import { useRoute } from "vue-router";
import './scss/main.css';

import Footer from "./components/Footer.vue";
import PreLoader from './components/PreLoader.vue'

const RouterViewAsync = defineAsyncComponent(() => import('vue-router').then(m => m.RouterView));
</script>

<template>
  <div class="app-container">
    <Suspense>
      <template #default>
        <RouterViewAsync />
      </template>
      <template #fallback>
        <pre-loader></pre-loader>
      </template>
    </Suspense>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>

</style>