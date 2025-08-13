<script setup>
import Navbar from "./NavbarAdmin.vue"
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const product = ref(null)
const error = ref(null)
const isLoading = ref(false)
const isDeleting = ref(false)


onMounted(async () => {
  const id_product = route.params.id_product || route.params.id // fallback for older routes
  if (!id_product) {
    error.value = "Product ID not found in URL";
    return;
  }
  isLoading.value = true;
  try {
    const res = await axios.get(`http://localhost:3000/api/products/detail`, {
      params: { id_product }
    });
    
    if (res.data?.length > 0) {
      product.value = res.data[0];
    } else {
      error.value = "Product not found";
    }
  } catch (e) {
    console.error("API Error:", e.response?.data || e.message);
    error.value = e.response?.data?.error || 
                 e.response?.data?.message || 
                 "Failed to load product details";
  } finally {
    isLoading.value = false;
  }
});

async function deleteProduct(id_product) {
  if (!confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
    return;
  }

  isDeleting.value = true;
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/products/${id_product}`
    );
    
    if (response.data.message) {
      alert('Produk berhasil dihapus');
      router.push('/home_admin'); // Redirect ke halaman produk setelah delete
    }
  } catch (e) {
    console.error("Delete error:", e.response?.data || e.message);
    error.value = e.response?.data?.error || 
                 "Gagal menghapus produk";
  } finally {
    isDeleting.value = false;
  }
}

function goToEdit(id_product) {
  router.push(`/form_edit/${id_product}`)
}
</script>

<template>
  <header>
    <Navbar />
  </header>
<div v-if="isLoading" class="loading">Loading...</div>
  
  <div v-if="error" class="error">
    Error: {{ error }}
    <button @click="$router.back()">Go Back</button>
  </div>

  <!-- <div v-if="product" class="detail"> -->
  <div v-if="product" class="detail">
    <img :src="`/Foto Produk/${product.image_url}`" alt="Product Image" />
    <div class="info">
      <h1>{{ product.name_product }}</h1>
      <p>Kategori: {{ product.name_category }}</p>
      <p>Harga: Rp {{ product.price.toLocaleString() }}</p>
      <p>{{ product.description }}</p>

    </div>
    <!-- <button @click="goToEdit(product.id_product)">Edit Produk</button> -->
    <div class="action-buttons">
      <button @click="goToEdit(product.id_product)">Edit Produk</button>
      <button 
        @click="deleteProduct(product.id_product)" 
        :disabled="isDeleting"
        class="delete-btn"
      >
        {{ isDeleting ? 'Menghapus...' : 'Hapus Produk' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
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
.error {
  color: red;
  padding: 20px;
  text-align: center;
}
.loading {
  padding: 20px;
  text-align: center;
}
.action-buttons {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
}

.delete-btn:hover {
  background-color: #c82333;
}

.delete-btn:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}
</style>
