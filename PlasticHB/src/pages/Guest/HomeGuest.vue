<script setup>
import Navbar from "../../components/Guest/NavbarGuest.vue"
import HeroText from "../../components/HeroText.vue";
import ProductGallery from "../../components/ProductGallery.vue";
// import ProductGallery from "../../components/ProductGallery.vue";
import Gallery from "../../components/Guest/Gallery.vue";
function handleClick(){
  alert('Ayo Mulai Belanja!')
}
</script>

<template>
  <header>
    <Navbar />
  </header>
  
  <HeroText
  title="Selamat Datang di Toko Plastic HB"
  subtitle="Solusi Plastik Berkualitas"
  cta-text="Belanja Sekarang"
  ctaTo="/search_guest" />
  <ProductGallery />
<h1>REKOMENDASI PRODUK UNTUK KAMU</h1>
  <Gallery />
</template>