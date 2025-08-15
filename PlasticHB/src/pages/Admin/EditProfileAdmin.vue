<template>
  <div class="edit-profile-container">
    <div v-if="isLoading" class="loading">Memuat data...</div>
    <form v-else @submit.prevent="handleUpdateProfile" class="edit-form">
      <h2>Edit Profil</h2>

      <!-- Bagian Upload Gambar -->
      <div class="form-group profile-picture-section">
        <label>Foto Profil</label>
        <div class="image-uploader">
          <img :src="imagePreview || defaultImage" alt="Preview" class="profile-preview">
          <input id="file-upload" type="file" @change="onFileChange" accept="image/*" style="display: none;">
          <label for="file-upload" class="upload-button">Pilih Gambar</label>
        </div>
      </div>

      <div class="form-group">
        <label for="username">Nama Pengguna</label>
        <input id="username" type="text" v-model="user.username" required>
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" type="email" v-model="user.email" required>
      </div>

      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

      <div class="form-actions">
        <button type="submit" class="save-btn">Simpan Perubahan</button>
        <router-link to="/user_admin" class="cancel-btn">Batal</router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const user = ref({
  username: '',
  email: '',
  image_profile: null
})
const selectedFile = ref(null)
const imagePreview = ref('')
const isLoading = ref(true)
const errorMessage = ref('')
const router = useRouter()

const defaultImage = computed(() => {
  if (user.value.image_profile) {
    // Pastikan URL ini benar sesuai dengan setup server Anda
    return `http://localhost:3000/api/users/uploads/profiles/${user.value.image_profile}`;
  }
  return 'https://placehold.co/150x150/EFEFEF/333?text=No+Image'; // Gambar default
});

// 1. Ambil data profil saat ini
onMounted(async () => {
  const token = localStorage.getItem('token')
  if (!token) return router.push('/')

  try {
    const res = await axios.get('http://localhost:3000/api/users/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
    user.value = res.data
  } catch (err) {
    console.error('Gagal mengambil data profil:', err.response?.data || err.message)
    errorMessage.value = 'Gagal memuat data profil.'
  } finally {
    isLoading.value = false
  }
})

// 2. Handle saat pengguna memilih file gambar
const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    // Buat URL sementara untuk preview gambar
    imagePreview.value = URL.createObjectURL(file);
  }
}

// 3. Kirim data yang sudah diubah ke backend
const handleUpdateProfile = async () => {
  const token = localStorage.getItem('token')
  errorMessage.value = ''

  // Gunakan FormData untuk mengirim file dan teks
  const formData = new FormData();
  formData.append('username', user.value.username);
  formData.append('email', user.value.email);
  if (selectedFile.value) {
    formData.append('image_profile', selectedFile.value);
  }

  try {
    await axios.put('http://localhost:3000/api/users/update_profile', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data' // Penting untuk upload file
      }
    })

    router.push('/user_admin')

  } catch (err) {
    // --- PERBAIKAN DI SINI ---
    // Log seluruh objek error untuk debugging yang lebih baik di console browser
    console.error('Gagal memperbarui profil:', err.response);

    // Cek jika ada pesan error spesifik dari backend, jika tidak, tampilkan pesan umum
    if (err.response && err.response.data && err.response.data.message) {
      errorMessage.value = err.response.data.message;
    } else {
      errorMessage.value = 'Terjadi kesalahan di server. Silakan periksa terminal backend untuk detail.';
    }
  }
}
</script>

<style scoped>
.edit-profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  min-height: 80vh;
}
.edit-form {
  width: 100%;
  max-width: 500px;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}
h2 {
  text-align: center;
  margin-bottom: 1.5rem;
}
.form-group {
  margin-bottom: 1.5rem;
}
.profile-picture-section {
  text-align: center;
}
.image-uploader {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
.profile-preview {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #eee;
}
.upload-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
}
.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #555;
}
.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}
.error-message {
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
}
.form-actions {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}
.save-btn, .cancel-btn {
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
}
.save-btn {
  background-color: #007bff;
  color: white;
  border: none;
}
.cancel-btn {
  background-color: #e0e0e0;
  color: #333;
  border: 1px solid #ccc;
}
</style>
