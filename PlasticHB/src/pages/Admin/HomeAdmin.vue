<script setup>
import Navbar from "../../components/Admin/NavbarAdmin.vue"
import HeroText from "../../components/HeroText.vue";
import ProductGallery from "../../components/ProductGallery.vue";
// import Gallery from "../../components/Guest/Gallery.vue";
import GalleryAdmin from "../../components/Admin/GalleryAdmin.vue";
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
  ctaTo="/search_admin" />
  <ProductGallery />
<h1>REKOMENDASI PRODUK UNTUK KAMU</h1>
    <GalleryAdmin />
</template>
