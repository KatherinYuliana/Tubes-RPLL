<script setup>
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
</style>
