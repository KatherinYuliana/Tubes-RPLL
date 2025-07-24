<script setup>

</script>

<template>
  <div class="container">
    <div class="card">
      <div class="img-face">
        <img src="@/assets/Logo/Logo Alat Kebersihan.png" alt="Alat Kebersihan" />
      </div>
      <div class="text-face">
        <h3>Alat Kebersihan</h3>
      </div>
    </div>

    <div class="card">
      <div class="img-face">
        <img src="@/assets/Logo/Logo Peralatan Makan dan Dapur.png" alt="Peralatan Makan dan Dapur" />
      </div>
      <div class="text-face">
        <h3>Peralatan Makan dan Dapur</h3>
      </div>
    </div>

    <div class="card">
      <div class="img-face">
        <img src="@/assets/Logo/Logo Peralatan Mandi.png" alt="Peralatan Mandi" />
      </div>
      <div class="text-face">
        <h3>Peralatan Mandi</h3>
      </div>
    </div>

    <div class="card">
      <div class="img-face">
        <img src="@/assets/Logo/Logo Wadah Minuman.png" alt="Peralatan Mandi" />
      </div>
      <div class="text-face">
        <h3>Wadah Minuman</h3>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
    margin-top: 15px;
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
}

.card {
  width: 160px;
  height: 200px;
  background: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.card:hover {
  background-color: #ffe4ec;
}

.text-face h3 {
  font-size: 1rem;
  text-align: center;
  margin: 0;
  padding: 0;
  color: #333;
}

.img-face img {
  max-width: 80px;
  transition: transform 0.3s ease;
}

.card:hover .img-face img {
  transform: scale(1.05);
}
</style>