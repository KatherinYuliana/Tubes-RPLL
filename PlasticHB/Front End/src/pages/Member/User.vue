<script setup>
import Navbar from "@/components/Navbar.vue"
</script>

<template>
  <header>
    <Navbar />
  </header>
  <div class="user">
    <img src="../../assets/contoh pp.jpeg" alt="">
    <div class="detail-user">
      <h1>Nama User</h1>
      <p>Detail Disini</p>
    </div>
  </div>
  <button>Log out</button>
</template>

<style scope>
.user {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  max-width: 600px;
}

.user img {
  margin: 50px;
  border-radius: 50px;
  height: 200px;
  object-fit: cover;
}

.user .detail-user {}
</style>
