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

<template>
  <nav>
    <ul>
      <li class="logo">
        <img src="../assets/Logo Toko/Logo.png" alt="Logo" />
      </li>
      <li><router-link to="/admin">Dashboard</router-link></li>
      <li><router-link to="/search_admin">Management Product</router-link></li>
      <li>
        <router-link to="/user">
          <div class="pp">
            <img
              v-if="user && user.image_profile"
              :src="`/Profile Picture/${user.image_profile}`"
              :alt="user.username || 'Profile'"
            />
          </div>
        </router-link>
      </li>
    </ul>
  </nav>
</template>



<style scope>
.pp img {
  border-radius: 40px;
  height: 25px;
}
</style>
