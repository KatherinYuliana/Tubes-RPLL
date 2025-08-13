<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const products = ref([])

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/products/random')
    console.log('Data produk:', res.data) // cek di console
    products.value = res.data
  } catch (e) {
    console.error("Gagal ambil produk:", e)
  }
})

function goToDetail(id_product) {
  router.push(`/products/detail_member/${id_product}`)
}
</script>

<template>
  <div class="gallery">
    <div 
    v-for="product in products" 
    :key="product.id_product" 
    class="product" 
    @click="goToDetail(product.id_product)"
    style="cursor: pointer"
    >
      <img :src="`/Foto Produk/${product.image_url}`" :alt="product.name_product" />
      <p>{{ product.name_product }}</p>
    </div>
  </div>
</template>

<style scoped>
.gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
}
.product {
  cursor: pointer;
  width: 200px;
  text-align: center;
}
.product img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
</style>
