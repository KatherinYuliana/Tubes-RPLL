<template>
  <nav>
    <ul>
      <li class="logo">
        <img src="../../assets/Logo Toko/Logo.png" alt="Logo" />
      </li>
      <li><router-link to="/home_guest">Home</router-link></li>
      <li><router-link to="/search_guest">Search</router-link></li>
      <li><router-link to="/about_guest">About Us</router-link></li>
      <li><router-link to="/contact_guest">Contact Us</router-link></li>
      <li>
        <router-link to="/login">
          <button>Login</button>
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
button {
  padding: 5px 10px;
  background-color: #2151f0;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
