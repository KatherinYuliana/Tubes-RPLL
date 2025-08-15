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
          </p>
        </div>

        <div class="map-section">
          <h3>Peta Lokasi</h3>
          <div class="map-container">
            <div class="map-wrapper">
    <div v-html="storeData.maps_url"></div>
  </div>
          </div>
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