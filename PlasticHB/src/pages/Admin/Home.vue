<script setup>
import Navbar from "@/components/NavbarAdmin.vue"
import HeroText from "../../components/HeroText.vue";
import ProductGallery from "../../components/ProductGallery.vue";
import Gallery from "../../components/Gallery.vue";
function handleClick(){
  alert('Ayo Mulai Belanja!')
}
</script>

<template>
  <header>
    <Navbar />
  </header>
  
  <HeroText
  title="Selamat Datang Admin"
  subtitle="Solusi Plastik Berkualitas"
  cta-text="Belanja Sekarang"
  ctaTo="/search" />
  <ProductGallery />
<h1>REKOMENDASI PRODUK UNTUK KAMU</h1>
    <Gallery />
</template>
