<script setup>
import Navbar from "./NavbarMember.vue"
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const product = ref(null)
const error = ref(null)
const isLoading = ref(false)
const isAddingToCart = ref(false)
const cartSuccess = ref(null)
const isInCart = ref(false)

onMounted(async () => {
  const id_product = route.params.id_product || route.params.id
  if (!id_product) {
    error.value = "Product ID not found in URL";
    return;
  }
  isLoading.value = true;
  try {
    // Load product details
    const res = await axios.get(`http://localhost:3000/api/products/detail`, {
      params: { id_product }
    });
    
    if (res.data?.length > 0) {
      product.value = res.data[0];
      
      // Check if product is in cart
      await checkCartStatus(id_product);
    } else {
      error.value = "Product not found";
    }
  } catch (e) {
    console.error("API Error:", e.response?.data || e.message);
    error.value = e.response?.data?.error || 
                 e.response?.data?.message || 
                 "Failed to load product details";
  } finally {
    isLoading.value = false;
  }
});

async function checkCartStatus(id_product) {
  try {
    const response = await axios.get('http://localhost:3000/api/cart/check', {
      params: { id_product },
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    isInCart.value = response.data.isInCart;
  } catch (error) {
    console.error("Error checking cart status:", error);
    // Jika error 401 (unauthorized), anggap produk belum di keranjang
    isInCart.value = false;
  }
}

async function addToCart() {
  if (!product.value) return;
  
  isAddingToCart.value = true;
  cartSuccess.value = null;
  
  try {
    const response = await axios.post('http://localhost:3000/api/cart/add', {
      id_product: product.value.id_product,
      quantity: 1
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    cartSuccess.value = "Produk berhasil ditambahkan ke keranjang!";
    isInCart.value = true;
    setTimeout(() => cartSuccess.value = null, 3000);
  } catch (error) {
    console.error("Error adding to cart:", error);
    if (error.response?.status === 401) {
      router.push('/login');
    } else {
      alert(error.response?.data?.message || "Gagal menambahkan ke keranjang");
    }
  } finally {
    isAddingToCart.value = false;
  }
}

function goToCart() {
  router.push('/cart_member');
}

function buyNow() {
  if (!product.value) return;
  
  // Jika produk belum di keranjang, tambahkan dulu
  if (!isInCart.value) {
    addToCart().then(() => {
      // Setelah berhasil ditambahkan, arahkan ke halaman checkout
      router.push(`/checkout?product=${product.value.id_product}`);
    });
  } else {
    // Jika sudah di keranjang, langsung arahkan ke checkout
    router.push(`/checkout?product=${product.value.id_product}`);
  }
}
</script>

<template>
  <header>
    <Navbar />
  </header>
  
  <div v-if="isLoading" class="loading">Loading...</div>
  
  <div v-if="error" class="error">
    Error: {{ error }}
    <button @click="$router.back()">Go Back</button>
  </div>

  <div v-if="product" class="detail">
    <img :src="`/Foto Produk/${product.image_url}`" alt="Product Image" />
    <div class="info">
      <h1>{{ product.name_product }}</h1>
      <p>Kategori: {{ product.name_category }}</p>
      <p>Harga: Rp {{ product.price.toLocaleString() }}</p>
      <p>{{ product.description }}</p>
      
      <div class="cart-actions">
        <template v-if="!isInCart">
          <button 
            @click="addToCart" 
            :disabled="isAddingToCart"
            class="add-to-cart"
          >
            {{ isAddingToCart ? 'Menambahkan...' : 'Tambah Ke Keranjang' }}
          </button>
        </template>
        <template v-else>
          <button @click="goToCart" class="go-to-cart">
            Lihat Keranjang
          </button>
        </template>
        
        <button @click="buyNow" class="buy-now">
          Beli Sekarang
        </button>
      </div>
      <p v-if="cartSuccess" class="success-message">{{ cartSuccess }}</p>
    </div>
  </div>
</template>

<style scoped>
.detail {
  display: flex;
  align-items: flex-start;
  gap: 32px;
  padding: 20px;
}
.detail img {
  width: 300px;
  height: 250px;
  border-radius: 12px;
  object-fit: cover;
  flex-shrink: 0;
}
.info {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-width: 500px;
}
.info h1 {
  font-size: 2em;
  margin-bottom: 16px;
  padding: 0;
}
.info p {
  font-size: 1.1em;
  color: #444;
}
.error {
  color: red;
  padding: 20px;
  text-align: center;
}
.loading {
  padding: 20px;
  text-align: center;
}
.cart-actions {
  display: flex;
  gap: 16px;
  margin-top: 20px;
}
.add-to-cart, .go-to-cart, .buy-now {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s;
}
.add-to-cart {
  background-color: #4CAF50;
  color: white;
}
.add-to-cart:hover {
  background-color: #45a049;
}
.add-to-cart:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
.go-to-cart {
  background-color: #2196F3;
  color: white;
}
.go-to-cart:hover {
  background-color: #0b7dda;
}
.buy-now {
  background-color: #FF5722;
  color: white;
}
.buy-now:hover {
  background-color: #E64A19;
}
.success-message {
  color: #4CAF50;
  margin-top: 10px;
  font-weight: bold;
}
</style>