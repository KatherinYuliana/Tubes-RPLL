import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import Admin from '../pages/Admin/Home.vue'
import Home from '../pages/Member/Home.vue'
import Search from '../pages/Member/Search.vue'
import Contact from '../pages/Member/Contact.vue'
import About from '../pages/Member/About.vue'
import User from '../pages/Member/User.vue'
import HomeUser from '../pages/Member/HomeUser.vue'

const routes = [
  { path: '/', component: Home},
  { path: '/login', component: Login },
  { path: '/admin', component: Admin },
  { path: '/search', component: Search },
  { path: '/contact', component: Contact },
  { path: '/about', component: About },
  { path: '/user', component: User },
  { path: '/homeuser', component: HomeUser },
]

export default createRouter({
  history: createWebHistory(),
  routes
})