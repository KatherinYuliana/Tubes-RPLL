<template>
  <div class="register-container">
    <div class="register-card">
      <h2 class="register-title">Register</h2>
      <input
        type="text"
        v-model="username"
        placeholder="Username"
        required
        class="field"
      />
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
      <div v-if="error" class="error-message">{{ error }}</div>
      <button
        @click="register"
        class="register-button"
        :disabled="loading"
      >
        {{ loading ? 'Registering...' : 'Register' }}
      </button>
      <p style="text-align: center; margin-top: 1rem;">
        Sudah punya akun?
        <router-link to="/login" style="color: #007bff; text-decoration: underline;">Klik di sini</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const username = ref('')
const email = ref('')
const password = ref('')
const image_profile = ref('template.jpg') // Default profile picture
const error = ref('')
const loading = ref(false)
const router = useRouter()

const register = async () => {
  error.value = ''
  loading.value = true
  try {
    const res = await axios.post('http://localhost:3000/api/users/register', {
      username: username.value,
      email: email.value,
      password: password.value,
      image_profile: image_profile.value
    })
    localStorage.setItem('token', res.data.token)
    if (email.value === 'admin@gmail.com') {
      router.push('/home_admin')
    } else {
      router.push('/home_member')
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Gagal register'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.register-card {
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

.register-button {
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

.register-button:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.error-message {
  color: #d32f2f;
  margin-bottom: 1rem;
  text-align: center;
}
</style>