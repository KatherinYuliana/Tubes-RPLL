import { createRouter, createWebHistory } from 'vue-router'
import Register from '../pages/Register.vue'
import Login from '../pages/Login.vue'
import HomeAdmin from '../pages/Admin/HomeAdmin.vue'
import HomeGuest from '../pages/Guest/HomeGuest.vue'
import HomeMember from '../pages/Member/HomeMember.vue'
import SearchGuest from '../pages/Guest/SearchGuest.vue'
import SearchMember from '../pages/Member/SearchMember.vue'
import SearchAdmin from '../pages/Admin/SearchAdmin.vue'
import ContactGuest from '../pages/Guest/ContactGuest.vue'
import ContactMember from '../pages/Member/ContactMember.vue'
import AboutGuest from '../pages/Guest/AboutUsGuest.vue'
import AboutMember from '../pages/Member/AboutUsMember.vue'
import AboutAdmin from '../pages/Admin/AboutUsAdmin.vue' // Assuming AboutAdmin is the same as AboutMember
import User from '../pages/Member/User.vue'
import ProductDetail from '../components/Guest/ProductDetailGuest.vue' 
import ProductDetailMember from '../components/Member/ProductDetailMember.vue'
import ProductDetailAdmin from '../components/Admin/ProductDetailAdmin.vue'
import FormAdd from '../pages/Admin/FormAdd.vue'
import FormEdit from '../pages/Admin/FormEdit.vue'

const routes = [
  { path: '/', component: HomeGuest},
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/home_guest', component: HomeGuest },
  { path: '/home_member', component: HomeMember},
  { path: '/home_admin', component: HomeAdmin },
  { path: '/search_guest', component: SearchGuest },
  { path: '/search_member', component: SearchMember },
  { path: '/search_admin', component: SearchAdmin },
  { path: '/contact_guest', component: ContactGuest },
  { path: '/contact_member', component: ContactMember },
  { path: '/about_guest', component: AboutGuest },
  { path: '/about_member', component: AboutMember },
  { path: '/about_admin', component: AboutAdmin }, // Assuming AboutAdmin is the same as AboutMember
  { path: '/user', component: User },
  // { path: '/homeuser', component: HomeUser },
  { path: '/products/detail/:id_product', name: 'ProductDetail', component: ProductDetail, props: true },
  { path: '/products/detail_member/:id_product', name: 'ProductDetailMember', component: ProductDetailMember, props: true },
  { path: '/products/detail_admin/:id_product', name: 'ProductDetailAdmin', component: ProductDetailAdmin, props: true },
  { path: '/form_add', component: FormAdd },  
  { path: '/form_edit/:id_product', name: 'EditProduct', component: FormEdit, props: true },
]

export default createRouter({
  history: createWebHistory(),
  routes
})
