import AtletaView from '@/Views/AtletaView.vue'
import Dashboard from '@/Views/Dashboard.vue'
import UpdateAtleta from '@/Views/UpdateAtleta.vue'
import UploadAtleta from '@/Views/UploadAtleta.vue'
import UploadCity from '@/Views/UploadCity.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dasboard',
      component: Dashboard,
      props: false,
    },
    {
      path: '/atletas/:IdAtleta',
      name: 'AtletaDetalle',
      component: AtletaView,
      props: true,
    },
    {
      path: '/uploadatleta',
      name: 'UploadAtleta',
      component: UploadAtleta,
      props: false,
    },
    {
      path: '/uploadciudad',
      name: 'UploadCiudad',
      component: UploadCity,
      props: false,
    },
    {
      path: '/updateatleta',
      name: 'UpdateAtleta',
      component: UpdateAtleta,
      props: true
    },
  ],
})

export default router
