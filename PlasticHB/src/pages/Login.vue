<!-- src/pages/Login.vue -->
<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="login-title">Login Sebagai</h2>
      <router-link to="/admin" class="login-button admin-button">Admin</router-link>
      <router-link to="/home" class="login-button member-button">Member</router-link>
    </div>
  </div>
</template>
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

.admin-button {
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

.member-button {
  width: 100%;
  padding: 0.75rem;
  background: #28a745;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
</style>