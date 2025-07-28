
import { createRouter } from 'vue-router'
import { createWebHistory } from 'vue-router'
import App from './App.vue'
import Settings from './Settings.vue'
import Main from './Main.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Main },
    { path: '/settings', component: Settings }
  ]
})