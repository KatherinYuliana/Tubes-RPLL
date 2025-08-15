<script setup>
import Navbar from "../../components/Member/NavbarMember.vue"
import HeroText from "../../components/HeroText.vue";
import ProductGallery from "../../components/ProductGallery.vue";
// import Gallery from "../../components/Member/GalleryMember.vue";
import GalleryMember from "../../components/Member/GalleryMember.vue";
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
  ctaTo="/search_member" />
  <ProductGallery />
<h1>REKOMENDASI PRODUK UNTUK KAMU</h1>
  <GalleryMember />
</template>
