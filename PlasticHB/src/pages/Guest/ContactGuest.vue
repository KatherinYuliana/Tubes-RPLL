<script setup>
import Navbar from "../../components/Guest/NavbarGuest.vue"
import ContactForm from "../../components/ContactForm.vue";
</script>

<template>
  <header>
    <Navbar />
  </header>
  <!-- <router-link to="/login">
          <button>Login</button>
        </router-link> -->
  <h1 >Ada Keluhan? Hubungi Kami!</h1>
  <ContactForm />
</template>
<style scoped>
h1{
  text-align: center;
}</style>
