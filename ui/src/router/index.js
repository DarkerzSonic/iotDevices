import { createRouter, createWebHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'
//import About from '../views/AboutView.vue'
import DeviceList from '../views/DeviceList.vue'
import CreateDevice from '../views/CreateDevice.vue'
import UpdateDevice from '../views/UpdateDevice.vue'
import DeviceList2 from '../views/DeviceList2.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: DeviceList
  },
  {
    path: '/create',
    name: 'Create',
    component: CreateDevice
  },
  {
    path: '/:id',
    name: 'DeviceDetails',
    component: UpdateDevice,
    props: true
  },
  {
    path:'/list',
    name: 'List',
    component: DeviceList2
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
