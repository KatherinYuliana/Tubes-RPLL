<template>
  <div class="form-container">
    <h2>Edit Produk</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name_product">Nama Produk:</label>
        <input 
          type="text" 
          id="name_product" 
          v-model="form.name_product" 
          required
        />
      </div>

      <div class="form-group">
        <label for="description">Deskripsi:</label>
        <textarea 
          id="description" 
          v-model="form.description" 
          required
        ></textarea>
      </div>

      <div class="form-group">
        <label for="price">Harga:</label>
        <input 
          type="number" 
          id="price" 
          v-model="form.price" 
          required
          min="0"
          step="0.01"
        />
      </div>

      <div class="form-group">
        <label for="id_category">Kategori:</label>
        <select 
          id="id_category" 
          v-model="form.id_category" 
          required
        >
          <option disabled value="">Pilih Kategori</option>
          <option v-for="cat in categories" :key="cat.id_category" :value="cat.id_category">
            {{ cat.name_category }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>Gambar Saat Ini:</label>
        <img v-if="form.image_url" :src="`/Foto Produk/${form.image_url}`" alt="Produk" width="100" />
      </div>

      <div class="form-group">
        <label for="new_image">Upload Gambar Baru:</label>
        <input 
          type="file" 
          id="new_image" 
          @change="handleImageUpload" 
          accept="image/*"
        />
      </div>

      <button type="submit">Simpan Perubahan</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        id_product: '', // Add this to store the product ID
        name_product: '',
        description: '',
        price: '',
        id_category: '',
        image_url: ''
      },
      selectedImageFile: null,
      categories: []
    };
  },
  mounted() {
    // Get ID from route params instead of query
    const id_product = this.$route.params.id_product;
    console.log('ID Product:', id_product);
    console.log('Route params:', this.$route.params)
    console.log('Route query:', this.$route.query)
    console.log('Full route object:', this.$route)
    if (!id_product) {
      console.error('No product ID found in URL')
      // Optionally redirect back or show error
      this.$router.push('/products')
      return
    }
    
    this.fetchProduct(id_product)
    this.fetchCategories()
  },
  methods: {
    async fetchProduct(id_product) {
      try {
        const res = await fetch(`http://localhost:3000/api/products/detail?id_product=${id_product}`);
        // Check if response is OK
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        // Check content type before parsing
        const contentType = res.headers.get('content-type')
        if (!contentType || !contentType.includes('application/json')) {
          const text = await res.text()
          throw new Error(`Expected JSON but got: ${text.substring(0, 100)}`)
        }
        const data = await res.json();
        console.log('Data produk:', data);
        // Check if data exists and has at least one item
        if (!data || !data.length) {
          throw new Error('Product data not found in response');
        }

        // Get the first product from the array
        const productData = data[0];
        
        // Update the form with the product data
        this.form = {
          id_product: id_product,
          name_product: productData.name_product,
          description: productData.description,
          price: productData.price,
          id_category: productData.id_category || '',
          image_url: productData.image_url
        };
        
      } catch (err) {
        console.error('Gagal mengambil data produk:', err);
        alert('Gagal memuat data produk. Silakan coba lagi.');
      }
    },

    async fetchCategories() {
      try {
        const res = await fetch('http://localhost:3000/api/products/categories');
        const data = await res.json();
        this.categories = data;
      } catch (err) {
        console.error('Gagal mengambil kategori:', err);
      }
    },

    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedImageFile = file;
        this.form.image_url = file.name;
      }
    },

    async submitForm() {
      try {
        // Upload image if new file selected
        if (this.selectedImageFile) {
          const formData = new FormData();
          formData.append('image_url', this.selectedImageFile);
          const uploadRes = await fetch('http://localhost:3000/api/products/upload', {
            method: 'POST',
            body: formData
          });
          if (!uploadRes.ok) throw new Error('Gagal upload gambar');
        }

        const res = await fetch(`http://localhost:3000/api/products/edit`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.form)
        });

        if (!res.ok) throw new Error('Gagal menyimpan perubahan');
        alert('Data produk berhasil diperbarui');
        this.$router.push('/admin');
      } catch (err) {
        console.error(err);
        alert('Terjadi kesalahan saat menyimpan perubahan.');
      }
    }
  }
};
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
.form-group {
  margin-bottom: 12px;
}
label {
  display: block;
  margin-bottom: 4px;
}
input, textarea, select {
  width: 100%;
  padding: 8px;
}
button {
  padding: 10px 16px;
}
</style>
