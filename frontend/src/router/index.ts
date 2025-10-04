import AtletaView from '@/Views/AtletaView.vue'
import Dashboard from '@/Views/Dashboard.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard', 
      name: 'Dasboard',
      component: Dashboard,
      props: false
    },
    {
      path: '/atletas/:IdAtleta', 
      name: 'AtletaDetalle',
      component: AtletaView,
      props: true 
    }
  ],
})

export default router
