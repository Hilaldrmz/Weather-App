<script setup>
import { defineAsyncComponent } from 'vue';
import { useRoute } from "vue-router";
import './scss/main.css';

import Footer from "./components/Footer.vue";
import PreLoader from './components/PreLoader.vue'

const RouterViewAsync = defineAsyncComponent(() => import('vue-router').then(m => m.RouterView));
</script>

<template>
    <Suspense>
      <template #default>
        <RouterViewAsync />
      </template>
      <template #fallback>
        <pre-loader></pre-loader>
      </template>
    </Suspense>
    <Footer />

</template>

<style lang="scss" scoped>

</style>