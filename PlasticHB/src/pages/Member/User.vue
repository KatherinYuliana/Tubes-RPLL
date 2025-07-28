<!-- src/views/Profile.vue -->
<template>
  <div class="p-4">
    <h2>Profil Pengguna</h2>
    <img
  v-if="user && user.image_profile"
  :src="`/Profile Picture/${user.image_profile}`"
  :alt="user.username || 'Profile'"
  class="profile-img"
/>
    <!-- <img :src="`/Profile Picture/${user.image_profile}`" :alt="profile" /> -->
    <!-- <img v-if="user && user.image_profile" :src="`../../assets/Profile Picture/${user.image_profile}`" alt="Profile" /> -->

    <!-- <img :src="`../../assets/Profile Picture/${user.image_profile}`" alt="Profile" /> -->

    <!-- <img src="../../assets/Profile Picture/template.jpg" alt="" class="profile-img"> -->

    <div v-if="user">
      <!-- <p><strong>ID:</strong> {{ user.id_user }}</p> -->
      <p><strong>Nama:</strong> {{ user.username }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
    </div>
    <div v-else>
      <p>Memuat data...</p>
    </div>

    
        <router-link to="/home">
          <button>Logout</button>
        </router-link>

        <router-link to="/">
          <button>Edit Profile</button>
        </router-link>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const user = ref(null)
const router = useRouter()

onMounted(async () => {
  const token = localStorage.getItem('token')
  if (!token) return router.push('/')
console.log('Token:', token)
  try {
    const res = await axios.get('http://localhost:3000/api/users/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
    user.value = res.data
  } catch (err) {
    // } catch (err) {
  console.error('axios error', err.response?.data || err.message)
  router.push('/')
// }
    // console.error(err)
    // router.push('/')
  }
})
</script>



<style scoped>
.user {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  max-width: 600px;
  cursor: pointer;
}

.profile-img {
  margin: 20px;
  border-radius: 50%;
  height: 150px;
  width: 150px;
  object-fit: cover;
  transition: 0.3s ease;
}

.profile-img:hover {
  box-shadow: 0 0 10px rgba(0,0,0,0.3);
}

.detail-user {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>