<script setup>
import Navbar from "@/components/NavbarAdmin.vue"
</script>

<template>
    <header>
    <Navbar />
  </header>
  <div class="form-container">
    <h2>Tambah Produk</h2>
    <form @submit.prevent="submitForm" enctype="multipart/form-data">
      <!-- Nama Produk -->
      <div class="form-group">
        <label for="productName">Nama Produk:</label>
        <input type="text" id="productName" v-model="form.name_product" required />
      </div>

      <!-- Deskripsi -->
      <div class="form-group">
        <label for="description">Deskripsi:</label>
        <textarea id="description" v-model="form.description" required></textarea>
      </div>

      <!-- Harga -->
      <div class="form-group">
        <label for="price">Harga:</label>
        <input type="number" id="price" v-model="form.price" required />
      </div>

      <!-- Kategori -->
      <div class="form-group">
        <label for="category">Kategori:</label>
        <select id="category" v-model="form.id_category" required>
          <option value="" disabled>Pilih Kategori</option>
          <option v-for="cat in categories" :key="cat.id_category" :value="cat.id_category">
            {{ cat.name_category }}
          </option>
        </select>
      </div>

      <!-- Upload Gambar -->
      <div class="form-group">
        <label for="image">Upload Gambar:</label>
        <input type="file" id="image" @change="handleImageUpload" accept="image/*" required />
      </div>

      <button type="submit">Simpan</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name_product: '',
        description: '',
        price: '',
        id_category: '',
        image_url: '' // Hanya nama file yang akan dikirim
      },
      selectedImageFile: null,
      categories: []
    };
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    fetchCategories() {
      fetch('http://localhost:3000/api/products/categories')
        .then(res => res.json())
        .then(data => {
          this.categories = data;
        })
        .catch(err => {
          console.error('Gagal mengambil kategori:', err);
        });
    },

    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedImageFile = file;
        this.form.image_url = file.name; // Simpan hanya nama filenya
      }
    },

    async submitForm() {
      try {
        // Upload gambar terlebih dahulu
        if (this.selectedImageFile) {
          const formData = new FormData();
          formData.append('image_url', this.selectedImageFile); // sesuai backend

          const uploadRes = await fetch('http://localhost:3000/api/products/upload', {
            method: 'POST',
            body: formData
          });

          if (!uploadRes.ok) throw new Error('Upload gambar gagal');
        }

        // Submit produk
        const res = await fetch('http://localhost:3000/api/products/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.form)
        });

        if (!res.ok) throw new Error('Gagal menambahkan produk');

        alert('Produk berhasil ditambahkan!');
        this.resetForm();
      } catch (err) {
        console.error('ERROR:', err);
        alert('Terjadi kesalahan saat menyimpan.');
      }
    },

    resetForm() {
      this.form = {
        name_product: '',
        description: '',
        price: '',
        id_category: '',
        image_url: ''
      };
      this.selectedImageFile = null;
      document.getElementById('image').value = '';
    }
  }
};
</script>

<style scoped>
.form-container {
  max-width: 500px;
  margin: 20px auto;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.form-group {
  margin-bottom: 12px;
}
label {
  display: block;
  margin-bottom: 6px;
}
input, textarea, select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
button {
  padding: 10px 16px;
}
</style>
