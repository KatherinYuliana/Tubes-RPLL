<!-- src/pages/Login.vue -->
<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="login-title">Login</h2>
      <!-- <form @submit.prevent="handleLogin"> -->
        <input
          type="text"
          v-model="email"
          placeholder="Email"
          required
          class="field"
        />
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          required
          class="field"
        />
        <button @click="login" class="login-button">Login</button>
      <!-- </form> -->
      <p style="text-align: center; margin-top: 1rem;">
        Belum punya akun?
        <router-link to="/register" style="color: #007bff; text-decoration: underline;">Daftar di sini</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

// const username = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const login = async () => {
  try {
    const res = await axios.post('http://localhost:3000/api/users/login', {
      // username: username.value,
      email: email.value,
      password: password.value
    })
    console.log(email.value, password.value)

    localStorage.setItem('token', res.data.token)
    if (email.value === 'admin@gmail.com') {
      router.push('/admin')
    } else {
      router.push('/homeuser')
    }
    // router.push('/homeuser')
  } catch (err) {
    error.value = err.response?.data?.message || 'Gagal login'
  }
}

// function handleLogin() {
//   // Dummy logic untuk login
//   if (username.value && password.value) {
//     // Lanjutkan ke halaman home sebagai contoh
//     router.push('/home')
//   } else {
//     alert("Username dan Password harus diisi")
//   }
// }
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.login-card {
  background: #fff;
  padding: 2.5rem 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  min-width: 320px;
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

.field {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
}

.login-button {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

</style>