<!-- <script setup langs="ts">
import { ref } from 'vue'
const pesan = ref ('')
</script>
<template>
    <div class="contact-box">
  <h2>Formulir Kontak</h2>
  <form action="post">
    <div class="user-box">
      <input v-model="pesan">
      <label>Nama: </label>
    </div>
    <div class="user-box">
      <input v-model="pesan">
      <label>Email: </label>
    </div>
    <div class="user-box">
      <p style="white-space: pre-line;">{{ pesan }}</p>
      <textarea v-model="pesan" placeholder="masukkan pesan"></textarea>
      <label>Pesan: </label>
    </div>
    <a href="#">Submit</a>
  </form>
  </div>
</template>

<style scoped>
html {
  height: 100%;
}

body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background: linear-gradient(#141e30, #243b55);
}
.contact-box{
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, .5);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, .6);
  border-radius: 10px;
}
.contact-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}
.contact-box .user-box{
  position: relative;
}

.contact-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}

.contact-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: .5s;
}
textarea{
  height: 50px;
  width: 100%;
}
.contact-box .user-box input:focus~label,
.contact-box .user-box input:valid~label {
  top: -20px;
  left: 0;
  color: #03e9f4;
  font-size: 12px;
}

.contact-box form a {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #03e9f4;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: .5s;
  margin-top: 40px;
  letter-spacing: 4px;
}

.contact-box a:hover {
  background: #03e9f4;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #03e9f4,
    0 0 25px #03e9f4,
    0 0 50px #03e9f4,
    0 0 100px #03e9f4;
}

.contact-box a span{
position: absolute;
display: block;
}
</style> -->

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const message = ref('')
const username = ref('')
const isLoading = ref(false)
const error = ref('')
const success = ref('')

const submitForm = async (e: Event) => {
  e.preventDefault()
  
  if (!message.value.trim()) {
    error.value = 'Pesan tidak boleh kosong'
    return
  }

  try {
    isLoading.value = true
    error.value = ''
    success.value = ''
    
    // Kirim data ke backend termasuk timestamp
    const response = await axios.post('http://localhost:3000/api/contact/send', {
      username: username.value.trim(),
      message: message.value.trim(),
      send_at: new Date().toISOString() // Tambahkan timestamp saat ini
    })

    success.value = 'Pesan berhasil dikirim!'
    message.value = ''
    username.value = ''
    
    // Emit event untuk refresh daftar pesan
    emit('message-sent')
    
  } catch (err) {
    error.value = err.response?.data?.message || 'Gagal mengirim pesan'
  } finally {
    isLoading.value = false
  }
}

const emit = defineEmits(['message-sent'])
</script>

<template>
  <div class="contact-box">
    <h2>Formulir Kontak</h2>
    
    <form @submit="submitForm">
      <!-- <div class="user-box">
        <input 
          v-model="username" 
          type="text" 
          required
        >
        <label>Nama:</label>
      </div> -->
      
      <div class="user-box">
        <textarea 
          v-model="message" 
          placeholder="Masukkan pesan"
          required
        ></textarea>
        <label>Pesan:</label>
      </div>
      
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
      
      <div v-if="success" class="success-message">
        {{ success }}
      </div>
      
      <button type="submit" :disabled="isLoading">
        <span v-if="!isLoading">Kirim Pesan</span>
        <span v-else>Mengirim...</span>
      </button>
    </form>
  </div>
</template>

<style scoped>
.contact-box {
  position: relative;
  width: 400px;
  padding: 40px;
  margin: 0 auto;
  background: rgba(0, 0, 0, .5);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, .6);
  border-radius: 10px;
}

.contact-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}

.contact-box .user-box {
  position: relative;
  margin-bottom: 30px;
}

.contact-box .user-box input,
.contact-box .user-box textarea {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}

.contact-box .user-box textarea {
  height: 100px;
  resize: vertical;
}

.contact-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: .5s;
}

.contact-box .user-box input:focus ~ label,
.contact-box .user-box input:valid ~ label,
.contact-box .user-box textarea:focus ~ label,
.contact-box .user-box textarea:valid ~ label {
  top: -20px;
  left: 0;
  color: #03e9f4;
  font-size: 12px;
}

button {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #03e9f4;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: .5s;
  margin-top: 20px;
  letter-spacing: 4px;
  background: transparent;
  border: none;
  cursor: pointer;
}

button:hover {
  background: #03e9f4;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #03e9f4,
              0 0 25px #03e9f4,
              0 0 50px #03e9f4,
              0 0 100px #03e9f4;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.error-message {
  color: #ff4444;
  margin-top: 10px;
  text-align: center;
}

.success-message {
  color: #00C851;
  margin-top: 10px;
  text-align: center;
}
</style>