<script setup>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <Navbar />
  <router-view />
  <Footer />
</template>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.content {
  padding: 40px;
  min-height: 80vh;
}
</style>
