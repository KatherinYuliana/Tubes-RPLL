<!-- <script setup>
import Navbar from "../../components/Guest/NavbarGuest.vue"

const frontendDev = {
  role: "Frontend Developer",
  name: "Peter Jaya Sentosa",
  bio: "Pengembang antarmuka aplikasi.",
  email: "peterjaya@gmail.com"
};

const backendDev = {
  role: "Backend Developer",
  name: "Katherin Yuliana",
  bio: "Pengembang backend aplikasi.",
  email: "katherinyuliana@gmail.com"
};
</script>

<template>
  <div>
    <header>
      <Navbar />
    </header>
    <main>
      <p>Selamat datang di halaman About. Di sini Anda dapat mengetahui lebih banyak tentang aplikasi ini dan tim pengembang.</p>
      <div class="about-info-container">
        <h2>Tentang Aplikasi</h2>
        <p>
          PlasticHB adalah aplikasi yang membantu pengelolaan data plastik dan lingkungan.
        </p>
        <div class="map-section">
          <h3>Peta Lokasi</h3>
          <div class="map-placeholder">
            <img src="../../assets/Map.png" alt="">
            <span>Peta akan ditampilkan di sini.</span>
          </div>
        </div>
        <div class="dev-section">
          <h3>Biodata Programmer</h3>
          <div class="dev-card frontend">
            <h4>{{ frontendDev.role }}</h4>
            <p><strong>Nama:</strong> {{ frontendDev.name }}</p>
            <p><strong>Bio:</strong> {{ frontendDev.bio }}</p>
            <p><strong>Email:</strong> {{ frontendDev.email }}</p>
          </div>
          <div class="dev-card backend">
            <h4>{{ backendDev.role }}</h4>
            <p><strong>Nama:</strong> {{ backendDev.name }}</p>
            <p><strong>Bio:</strong> {{ backendDev.bio }}</p>
            <p><strong>Email:</strong> {{ backendDev.email }}</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.about-info-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 24px;
  background: #fafafa;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.map-section {
  margin: 24px 0;
}

.map-placeholder {
  border: 2px dashed #2196f3;
  border-radius: 8px;
  padding: 32px;
  text-align: center;
  background: #e3f2fd;
  margin-top: 8px;
}
.map-placeholder img {
  width: 100%;
  max-width: 400px;
  border: 2px dashed #2196f3;
  border-radius: 8px;
  display: block;
  margin: 0 auto 8px auto;
}
.dev-section {
  margin-top: 32px;
}

.dev-card {
  border: 2px solid #bdbdbd;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  background: #fff;
}

.dev-card.frontend {
  border-color: #4caf50;
}

.dev-card.backend {
  border-color: #f44336;
}
</style> -->

<script setup>
import Navbar from "../../components/Guest/NavbarGuest.vue"
import { ref, onMounted } from 'vue'
import axios from 'axios'

const storeData = ref({
  id_store: null,
  address: '',
  description: '',
  maps_url: '',
  phone_number: '',
  opening_hours: ''
})

const isEditing = ref(false)
const isLoading = ref(true)

// Fetch data dari database
const fetchStoreData = async () => {
  try {
    isLoading.value = true
    const response = await axios.get('http://localhost:3000/api/store/about_us')
    const data = response.data
    // console.log('API Response:', response.data)
    
    if (response.data && response.data.length > 0) {
      storeData.value = {
        id_store: response.data[0].id_store,
        address: response.data[0].address || 'Tentang Kami',
        description: response.data[0].description || 'Deskripsi default...',
        maps_url: response.data[0].maps_url || '<iframe default maps>',
        phone_number: response.data[0].phone_number || 'Nomor telepon tidak tersedia',
        opening_hours: response.data[0].opening_hours || 'Jam buka tidak tersedia'
      }
    } else {
      console.warn('Empty response from API')
      // Set default values
      storeData.value = {
        address: 'Tentang Kami',
        description: 'Deskripsi default...',
        maps_url: '<iframe default maps>',
        phone_number: 'Nomor telepon tidak tersedia',
        opening_hours: 'Jam buka tidak tersedia'
      }
    }
  } catch (error) {
    console.error('Error fetching store data:', error)
    // Fallback data jika API gagal
    storeData.value = {
      address: 'Tentang Kami',
      description: 'Toko Plastic HB menjual berbagai kebutuhan plastik rumah tangga dan industri dengan kualitas terbaik dan harga terjangkau.',
      maps_url: '<iframe class="map-container" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1980.5052561165596!2d107.61481133427662!3d-6.8893434674135285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e655d336aaab%3A0xc48b605e8e3d2915!2sInstitut%20Teknologi%20Harapan%20Bangsa!5e0!3m2!1sid!2sid!4v1754720510691!5m2!1sid!2sid" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
      phone_number: 'Nomor telepon tidak tersedia',
      opening_hours: 'Jam buka tidak tersedia'
    }
  } finally {
    isLoading.value = false
  }
}

// Save data ke database
// const saveStoreData = async () => {
//   try {
//     await axios.put(`http://localhost:3000/api/store/about_us/${storeData.value.id_store}`, {
//       title: storeData.value.title,
//       description: storeData.value.description,
//       maps_url: storeData.value.maps_url
//     })
//     isEditing.value = false
//     fetchStoreData() // Refresh data
//   } catch (error) {
//     console.error('Error saving store data:', error)
//   }
// }

onMounted(() => {
  fetchStoreData()
})
</script>

<template>
  <div class="page-container">
    <header class="navbar-container">
      <Navbar />
    </header>
    <main class="content-container">
      <div class="about-info-container">
        <div class="header-section">
          <h2>Tentang Kami</h2>
          <!-- <h2>{{ storeData.title || 'Tentang Kami' }}</h2> -->
          <!-- <input v-model="storeData.title" class="edit-input" placeholder="Judul"> -->
          
          <!-- <button v-if="!isEditing" @click="isEditing = true" class="edit-button"> -->
            <!-- Edit -->
          <!-- </button> -->
          <!-- <div v-else class="edit-actions">
            <button @click="saveStoreData" class="save-button">Simpan</button>
            <button @click="isEditing = false; fetchStoreData()" class="cancel-button">Batal</button>
          </div> -->
        </div>

        <div>
          <p>{{ storeData.description || 'Deskripsi toko...' }}</p>
          <br>
          <h3>Deskripsi Toko</h3><br>
          <p>
            Nama Toko: Plastic HB <br>
            Alamat: {{ storeData.address }} <br>
            Telepon: {{ storeData.phone_number }} <br>
            Jam Buka: {{ storeData.opening_hours }}

            <!-- {{ storeData.address }} -->
            <!-- Nama Toko: Plastic HB <br><br>
            Alamat: Jl. Dipati Ukur No.80-84, Dago, Kecamatan Coblong, Kota Bandung, Jawa Barat 40132 <br><br>
            Telepon: (022) 250-1234 <br><br>
            Jam Buka: Senin - Sabtu, 08.00 - 17.00 WIB -->
          </p>
        </div>
        <!-- <div v-else>
          <textarea v-model="storeData.description" class="edit-textarea" placeholder="Deskripsi toko"></textarea>
        </div> -->

        <div class="map-section">
          <h3>Peta Lokasi</h3>
          <div class="map-container">
            <div class="map-wrapper">
    <div v-html="storeData.maps_url"></div>
  </div>
          </div>
          <!-- <textarea v-else v-model="storeData.maps_url" class="edit-textarea" placeholder="Kode embed Google Maps"></textarea> -->
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.page-container {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.navbar-container {
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  background: white;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.content-container {
  flex: 1;
  padding-top: 60px;
}

.about-info-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 24px;
  background: #fafafa;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  position: relative;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.edit-button, .save-button, .cancel-button {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.edit-button {
  background-color: #4CAF50;
  color: white;
  border: none;
}

.save-button {
  background-color: #2196F3;
  color: white;
  border: none;
  margin-right: 10px;
}

.cancel-button {
  background-color: #f44336;
  color: white;
  border: none;
}

.edit-input {
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1.2em;
}

.edit-textarea {
  width: 100%;
  min-height: 150px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 15px;
}

.map-section {
  margin: 24px 0;
}

.map-container {
  height: 400px;
  width: 100%;
  border-radius: 8px;
  margin-top: 8px;
  border: 1px solid #ddd;
  overflow: hidden;
  position: relative;
  z-index: 10;
}


.map-container iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.map-wrapper {
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border: 1px solid #ddd;
}

/* Target iframe di dalam wrapper */
.map-wrapper >>> iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 100% !important;
  border: none !important;
}
</style>