<template>
  <header class="bg-white shadow-md sticky top-0 z-50">
    <nav class="container mx-auto px-4 py-3">
      <div class="flex justify-between items-center">
        <!-- Logo -->
        <div class="flex items-center space-x-2">
          <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
            </svg>
          </div>
          <router-link to="/" class="text-xl font-bold text-gray-800">
            Krishi Maitri
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex space-x-8">
          <router-link 
            to="/" 
            class="text-gray-700 hover:text-primary transition-colors font-medium"
            :class="{ 'text-primary': $route.name === 'Landing' }"
          >
            Home
          </router-link>
          <router-link 
            to="/services" 
            class="text-gray-700 hover:text-primary transition-colors font-medium"
            :class="{ 'text-primary': $route.name === 'Services' }"
          >
            Services
          </router-link>
          <router-link 
            to="/market-prices" 
            class="text-gray-700 hover:text-primary transition-colors font-medium"
            :class="{ 'text-primary': $route.name === 'MarketPrices' }"
          >
            Market Prices
          </router-link>
          <router-link 
            to="/community" 
            class="text-gray-700 hover:text-primary transition-colors font-medium"
            :class="{ 'text-primary': $route.name === 'Community' }"
          >
            Community
          </router-link>
        </div>

        <!-- Auth Buttons -->
        <div class="hidden md:flex items-center space-x-4">
          <template v-if="!isAuthenticated">
            <router-link 
              to="/login" 
              class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium"
            >
              Login
            </router-link>
          </template>
          <template v-else>
            <router-link 
              to="/dashboard" 
              class="text-gray-700 hover:text-primary transition-colors font-medium"
              :class="{ 'text-primary': $route.name === 'Dashboard' }"
            >
              Dashboard
            </router-link>
            <router-link 
              to="/profile" 
              class="text-gray-700 hover:text-primary transition-colors font-medium"
              :class="{ 'text-primary': $route.name === 'Profile' }"
            >
              Profile
            </router-link>
            <button 
              @click="logout"
              class="text-gray-700 hover:text-red-600 transition-colors font-medium"
            >
              Logout
            </button>
          </template>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          @click="toggleMobileMenu"
          class="md:hidden p-2"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-if="showMobileMenu" class="md:hidden mt-4 pb-4">
        <div class="space-y-2">
          <router-link 
            to="/" 
            class="block px-3 py-2 text-gray-700 hover:text-primary transition-colors font-medium"
            @click="closeMobileMenu"
          >
            Home
          </router-link>
          <router-link 
            to="/services" 
            class="block px-3 py-2 text-gray-700 hover:text-primary transition-colors font-medium"
            @click="closeMobileMenu"
          >
            Services
          </router-link>
          <router-link 
            to="/market-prices" 
            class="block px-3 py-2 text-gray-700 hover:text-primary transition-colors font-medium"
            @click="closeMobileMenu"
          >
            Market Prices
          </router-link>
          <router-link 
            to="/community" 
            class="block px-3 py-2 text-gray-700 hover:text-primary transition-colors font-medium"
            @click="closeMobileMenu"
          >
            Community
          </router-link>
          
          <div class="border-t pt-4 mt-4">
            <template v-if="!isAuthenticated">
              <router-link 
                to="/login" 
                class="block bg-primary text-white px-3 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium text-center"
                @click="closeMobileMenu"
              >
                Login
              </router-link>
            </template>
            <template v-else>
              <router-link 
                to="/dashboard" 
                class="block px-3 py-2 text-gray-700 hover:text-primary transition-colors font-medium"
                @click="closeMobileMenu"
              >
                Dashboard
              </router-link>
              <router-link 
                to="/profile" 
                class="block px-3 py-2 text-gray-700 hover:text-primary transition-colors font-medium"
                @click="closeMobileMenu"
              >
                Profile
              </router-link>
              <button 
                @click="logout"
                class="block w-full text-left px-3 py-2 text-gray-700 hover:text-red-600 transition-colors font-medium"
              >
                Logout
              </button>
            </template>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'AppHeader',
  setup() {
    const router = useRouter()
    const showMobileMenu = ref(false)

    const isAuthenticated = computed(() => {
      return localStorage.getItem('isAuthenticated') === 'true'
    })

    const toggleMobileMenu = () => {
      showMobileMenu.value = !showMobileMenu.value
    }

    const closeMobileMenu = () => {
      showMobileMenu.value = false
    }

    const logout = () => {
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('user')
      router.push('/')
      closeMobileMenu()
    }

    return {
      showMobileMenu,
      isAuthenticated,
      toggleMobileMenu,
      closeMobileMenu,
      logout
    }
  }
}
</script>
