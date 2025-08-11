import { createRouter, createWebHistory } from 'vue-router'
import Register from '../pages/Register.vue'
import Login from '../pages/Login.vue'
import Admin from '../pages/Admin/Dashboard.vue'
import Home from '../pages/Member/Home.vue'
import Search from '../pages/Member/Search.vue'
import SearchAdmin from '../pages/Admin/ManagementProduct.vue'
import Contact from '../pages/Member/Contact.vue'
import About from '../pages/Member/AboutUs.vue'
import User from '../pages/Member/User.vue'
import HomeUser from '../pages/Member/HomeUser.vue'
import ProductDetail from '../components/ProductDetailAdmin.vue'
import FormAdd from '../pages/Admin/FormAdd.vue'
import FormEdit from '../pages/Admin/FormEdit.vue'

const routes = [
  { path: '/', component: Home},
  { path: '/home', component: Home},
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/admin', component: Admin },
  { path: '/search', component: Search },
  { path: '/search_admin', component: SearchAdmin },
  { path: '/contact', component: Contact },
  { path: '/about', component: About },
  { path: '/user', component: User },
  { path: '/homeuser', component: HomeUser },
  { path: '/products/detail/:id_product', name: 'ProductDetail', component: ProductDetail, props: true },
  { path: '/form_add', component: FormAdd },
  { path: '/form_edit/:id_product', name: 'EditProduct', component: FormEdit, props: true },
]

export default createRouter({
  history: createWebHistory(),
  routes
})
