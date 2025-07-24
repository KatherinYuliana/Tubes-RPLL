<template>
  <nav>
    <ul>
      <li class="logo">
        <img src="../assets/Logo Toko/Logo.png" alt="Logo" />
      </li>
      <li><router-link to="/Home">Home</router-link></li>
      <li><router-link to="/Search">Search</router-link></li>
      <li><router-link to="/About">About Us</router-link></li>
      <li><router-link to="/Contact">Contact Us</router-link></li>
      <li><router-link to="/User">
          <div class="pp">
            <img src="../assets/contoh pp.jpeg" alt="">
          </div>
        </router-link></li>
    </ul>
  </nav>
</template>

<style scope>
.pp img {
  border-radius: 40px;
  height: 25px;
}
</style>
