import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import Dashboard from '../views/Dashboard.vue'
import Services from '../views/Services.vue'
import MarketPrices from '../views/MarketPrices.vue'
import Community from '../views/Community.vue'
import Profile from '../views/Profile.vue'
import Login from '../views/Login.vue'
import VoiceAssistant from '../views/VoiceAssistant.vue'
import DiseaseDetection from '../views/DiseaseDetection.vue'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: LandingPage
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/services',
    name: 'Services',
    component: Services
  },
  {
    path: '/market-prices',
    name: 'MarketPrices',
    component: MarketPrices
  },
  {
    path: '/community',
    name: 'Community',
    component: Community
  },
  {
    path: '/voice-assistant',
    name: 'VoiceAssistant',
    component: VoiceAssistant,
    meta: { requiresAuth: true }
  },
  {
    path: '/disease-detection',
    name: 'DiseaseDetection',
    component: DiseaseDetection,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Simple auth guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
