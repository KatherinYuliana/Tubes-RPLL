<script setup>
import Navbar from "@/components/Navbar.vue"
</script>

<template>
  <header>
    <Navbar />
  </header>
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
</style>