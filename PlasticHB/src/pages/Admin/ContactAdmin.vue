<script setup>
import Navbar from "../../components/Admin/NavbarAdmin.vue"
import { ref, onMounted } from 'vue'
import axios from 'axios'

const messages = ref([])
const isLoading = ref(true)
const error = ref(null)

const fetchMessages = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/contact/view_message')
    messages.value = response.data
  } catch (err) {
    error.value = err.response?.data?.message || err.message
    console.error('Error fetching messages:', err)
  } finally {
    isLoading.value = false
  }
}

const deleteMessage = async (id_contact) => {
  if (!confirm('Are you sure you want to delete this message?')) {
    return
  }

  try {
    await axios.delete(`http://localhost:3000/api/contact/${id_contact}`)
    messages.value = messages.value.filter(msg => msg.id_contact !== id_contact)
  } catch (err) {
    error.value = err.response?.data?.message || err.message
    console.error('Error deleting message:', err)
  }
}

onMounted(() => {
  fetchMessages()
})
</script>

<template>
  <header>
    <Navbar />
  </header>

  <main class="container">
    <h1>Message List</h1>

    <div v-if="isLoading" class="loading">
      Loading messages...
    </div>

    <div v-else-if="error" class="error">
      Error: {{ error }}
      <button @click="fetchMessages">Try Again</button>
    </div>

    <div v-else>

      <div class="message-list">
        <div v-if="messages.length === 0" class="empty-message">
          No messages found
        </div>

        <table v-else class="messages-table">
          <thead>
            <tr>
              <th>No</th>
              <th>User</th>
              <th>Message</th>
              <th>Send At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(message, index) in messages" :key="message.id_contact">
              <td>{{ index + 1 }}</td>
              <td>{{ message.username || 'Anonymous' }}</td>
              <td class="message-content">{{ message.message }}</td>
              <td>{{ new Date(message.send_at).toLocaleString() }}</td>
              <td>
                <button @click="deleteMessage(message.id_contact)" class="delete-btn">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.loading, .error {
  text-align: center;
  padding: 20px;
  margin: 20px 0;
  background: #f5f5f5;
  border-radius: 8px;
}

.error {
  color: #d32f2f;
  background: #ffebee;
}

.empty-message {
  text-align: center;
  padding: 20px;
  margin: 20px 0;
  background: #f5f5f5;
  border-radius: 8px;
}

.message-list {
  margin-top: 30px;
}

.messages-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.messages-table th,
.messages-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.messages-table th {
  background-color: #f8f9fa;
  font-weight: 600;
}

.messages-table tr:hover {
  background-color: #f5f5f5;
}

.message-content {
  max-width: 400px;
  white-space: pre-wrap;
  word-break: break-word;
}

.delete-btn {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.delete-btn:hover {
  background-color: #d32f2f;
}

@media (max-width: 768px) {
  .messages-table {
    display: block;
    overflow-x: auto;
  }

  .delete-btn {
    padding: 4px 8px;
    font-size: 0.8rem;
  }
}
</style>
