<!-- <script setup>
import Navbar from "@/components/NavbarAdmin.vue"
import ProductDetail from "../../components/ProductDetailAdmin.vue";
</script>

<template>
  <header>
    <Navbar />
  </header>
  <div class="search-section">
    <form @submit.prevent="handleSearch" class="search-form">
      <div class="search-box">
        <input type="search" id="search-input-form" placeholder="Cari produk, merek, dan lainnya..."
          v-model="searchQuery">
        <button type="submit" aria-label="Cari">
          <p>cari</p>
        </button>
    </div>
</form>
<button @click="$router.push('/form_add')">Tambah Produk</button>
</div>
</template>

<script>
export default {
  name: 'SearchComponent', // Nama komponen multi-kata
  data() {
    return {
      searchQuery: ''
    };
  },
  methods: {
    handleSearch() {
      if (this.searchQuery.trim()) {
        alert(`Mencari untuk: ${this.searchQuery}`);
      }
    }
  }
}
</script>

<style scoped>
/* Menggunakan scoped agar gaya ini hanya berlaku untuk komponen ini */

.search-section {
  padding: 20px;
  background-color: #f4f4f9;
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-form {
  width: 100%;
  max-width: 600px;
  /* Batas lebar maksimum agar tidak terlalu lebar di layar besar */
}

.search-box {
  display: flex;
  /* Mengaktifkan flexbox untuk menata input dan tombol */
  align-items: center;
  width: 100%;
  background-color: white;
  border-radius: 50px;
  /* Membuat sudut menjadi sangat bulat */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  /* Efek bayangan yang halus */
  overflow: hidden;
  /* Memastikan sudut tombol mengikuti sudut kontainer */
  border: 1px solid #e0e0e0;
}

#search-input-form {
  flex-grow: 1;
  /* Membuat input memenuhi sisa ruang */
  border: none;
  outline: none;
  /* Menghilangkan outline saat di-klik */
  padding: 15px 25px;
  font-size: 16px;
  background-color: transparent;
  color: #333;
}

#search-input-form::placeholder {
  color: #aaa;
}

button[type="submit"] {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: #007bff;
  /* Warna biru yang menarik */
  color: white;
  padding: 15px 25px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #0056b3;
  /* Warna menjadi lebih gelap saat hover */
}
</style> -->

<script setup>
import Navbar from "@/components/NavbarAdmin.vue"
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router'

const router = useRouter()

const searchQuery = ref('');
const searchType = ref('name');
const searchResults = ref([]);
const isLoading = ref(false);
const error = ref(null);

const handleSearch = async () => {
  if (!searchQuery.value.trim()) {
    searchResults.value = [];
    return;
  }
  
  try {
    isLoading.value = true;
    error.value = null;
    
    const response = await axios.post('http://localhost:3000/api/products/search', {
      query: searchQuery.value,
      type: searchType.value
    });
    
    searchResults.value = response.data;
  } catch (err) {
    error.value = err.response?.data?.error || 'Gagal melakukan pencarian';
    console.error('Search error:', err);
  } finally {
    isLoading.value = false;
  }
};

function goToDetail(id_product) {
  router.push(`/products/detail/${id_product}`)
}

// const navigateToProductDetail = (productId) => {
//   router.push({ name: 'ProductDetail', params: { id: productId } });
// };
</script>

<template>
  <header>
    <Navbar />
  </header>
  <!-- Previous template code remains the same until results display -->
   <div class="search-section">
    <form @submit.prevent="handleSearch" class="search-form">
      <div class="search-box">
        <input 
          type="search" 
          id="search-input-form" 
          placeholder="Cari produk, merek, dan lainnya..."
          v-model="searchQuery"
        >
        <button type="submit" aria-label="Cari" :disabled="isLoading">
          <p>{{ isLoading ? 'Mencari...' : 'cari' }}</p>
        </button>
      </div>
      <div class="search-options">
        <label>
          <input type="radio" v-model="searchType" value="name"> Nama Produk
        </label>
        <label>
          <input type="radio" v-model="searchType" value="category"> Kategori
        </label>
      </div>
    </form>
    
    <button @click="$router.push('/form_add')" class="add-product-btn">Tambah Produk</button>
    
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
    
    
    <div v-if="isLoading" class="loading-indicator">
      Memuat hasil pencarian...
    </div>
  
  <div v-if="searchResults.length > 0" class="search-results">
    <h3>Hasil Pencarian ({{ searchResults.length }})</h3>
    <div class="product-grid">
      <div 
        v-for="product in searchResults" 
        :key="product.id_product" 
        class="product-card"
        @click="goToDetail(product.id_product)"
      >
        <img 
          :src="`/Foto Produk/${product.image_url}`" 
          :alt="product.name_product" 
          class="product-image"
        >
        <div class="product-name">{{ product.name_product }}</div>
      </div>
    </div>
  </div>
  </div>
</template>

<style scoped>
/* Previous styles remain the same */
.search-section {
  padding: 20px;
  background-color: #f4f4f9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.search-form {
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.search-box {
  display: flex;
  align-items: center;
  width: 100%;
  background-color: white;
  border-radius: 50px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border: 1px solid #e0e0e0;
}

#search-input-form {
  flex-grow: 1;
  border: none;
  outline: none;
  padding: 15px 25px;
  font-size: 16px;
  background-color: transparent;
  color: #333;
}

#search-input-form::placeholder {
  color: #aaa;
}

button[type="submit"] {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: #007bff;
  color: white;
  padding: 15px 25px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}

.search-options {
  display: flex;
  gap: 15px;
  justify-content: center;
  padding: 5px;
}

.search-options label {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}

.add-product-btn {
  padding: 12px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.add-product-btn:hover {
  background-color: #218838;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.product-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100%;
  height: 150px;
  object-fit: contain;
  margin-bottom: 10px;
}

.product-name {
  font-weight: 500;
  color: #333;
}
</style>