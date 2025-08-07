<script setup>
import Navbar from "../../components/Member/NavbarMember.vue"

const frontendDev = {
  role: "Frontend Developer",
  name: "Peter Jaya Sentosa",
  bio: "Pengembang antarmuka aplikasi.",
  email: "peterjaya@gmail.com"
};

const backendDev = {
  role: "Backend Developer",
  name: "Katherin Yuliana",
  bio: "Pengembang backend aplikasi.",
  email: "katherinyuliana@gmail.com"
};
</script>

<template>
  <div>
    <header>
      <Navbar />
    </header>
    <main>
      <p>Selamat datang di halaman About. Di sini Anda dapat mengetahui lebih banyak tentang aplikasi ini dan tim pengembang.</p>
      <div class="about-info-container">
        <h2>Tentang Aplikasi</h2>
        <p>
          PlasticHB adalah aplikasi yang membantu pengelolaan data plastik dan lingkungan.
        </p>
        <div class="map-section">
          <h3>Peta Lokasi</h3>
          <div class="map-placeholder">
            <img src="../../assets/Map.png" alt="">
            <span>Peta akan ditampilkan di sini.</span>
          </div>
        </div>
        <div class="dev-section">
          <h3>Biodata Programmer</h3>
          <div class="dev-card frontend">
            <h4>{{ frontendDev.role }}</h4>
            <p><strong>Nama:</strong> {{ frontendDev.name }}</p>
            <p><strong>Bio:</strong> {{ frontendDev.bio }}</p>
            <p><strong>Email:</strong> {{ frontendDev.email }}</p>
          </div>
          <div class="dev-card backend">
            <h4>{{ backendDev.role }}</h4>
            <p><strong>Nama:</strong> {{ backendDev.name }}</p>
            <p><strong>Bio:</strong> {{ backendDev.bio }}</p>
            <p><strong>Email:</strong> {{ backendDev.email }}</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.about-info-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 24px;
  background: #fafafa;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.map-section {
  margin: 24px 0;
}

.map-placeholder {
  border: 2px dashed #2196f3;
  border-radius: 8px;
  padding: 32px;
  text-align: center;
  background: #e3f2fd;
  margin-top: 8px;
}
.map-placeholder img {
  width: 100%;
  max-width: 400px;
  border: 2px dashed #2196f3;
  border-radius: 8px;
  display: block;
  margin: 0 auto 8px auto;
}
.dev-section {
  margin-top: 32px;
}

.dev-card {
  border: 2px solid #bdbdbd;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  background: #fff;
}

.dev-card.frontend {
  border-color: #4caf50;
}

.dev-card.backend {
  border-color: #f44336;
}
</style>
