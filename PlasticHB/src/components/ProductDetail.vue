<script setup>
import Navbar from "@/components/NavbarAdmin.vue"
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const product = ref(null)

onMounted(async () => {
  const id = route.params.id
  try {
    // const res = await axios.get(`/api/products/${id}`)
    const res = await axios.get(`http://localhost:3000/api/products/detail`, {
    params: { id_product: id }
  })
product.value = res.data[0] // karena hasilnya array
    // const res = await axios.get(`http://localhost:3000/api/products/detail/${id}`)
    // product.value = res.data
  } catch (e) {
    console.error("Gagal ambil detail produk:", e)
  }
})
</script>

<template>
  <header>
    <Navbar />
  </header>

  <div v-if="product" class="detail">
    <img :src="`/Foto Produk/${product.image_url}`" alt="Product Image" />
    <div class="info">
      <h1>{{ product.name_product }}</h1>
      <p>{{ product.description }}</p>

    </div>
  </div>
</template>

<style scoped>
<<<<<<< HEAD
=======
.detail {
  display: flex;
  align-items: flex-start;
  gap: 32px;
  padding: 20px;
}
.detail img {
  width: 300px;
  height: 250px;
  border-radius: 12px;
  object-fit: cover;
  flex-shrink: 0;
}
.info {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-width: 500px;
}
.info h1 {
  font-size: 2em;
  margin-bottom: 16px;
  padding: 0;
}
.info p {
  font-size: 1.1em;
  color: #444;
}
>>>>>>> 5fde1ba1b150c41c6bab6392bd10d48f9154686f
</style>
