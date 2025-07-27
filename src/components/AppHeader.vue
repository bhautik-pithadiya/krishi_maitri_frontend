<template>
  <header class="bg-white shadow-md sticky top-0 z-50">
    <nav class="container mx-auto px-4 py-3">
      <div class="flex justify-between items-center">
        <!-- Logo -->
        <div class="flex items-center space-x-2">
          <img src="@/assets/images/logo.png" alt="Krishi Maitri Logo" class="w-10 h-10">
          <router-link to="/" class="text-xl font-bold text-gray-800">
            Krishi Maitri
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex space-x-8">
          <router-link to="/" class="text-gray-700 hover:text-primary transition-colors font-medium"
            :class="{ 'text-primary': $route.name === 'Landing' }">
            {{ $t('header.home') }}
          </router-link>
          <router-link to="/services" class="text-gray-700 hover:text-primary transition-colors font-medium"
            :class="{ 'text-primary': $route.name === 'Services' }">
            {{ $t('header.services') }}
          </router-link>
          <router-link to="/market-prices" class="text-gray-700 hover:text-primary transition-colors font-medium"
            :class="{ 'text-primary': $route.name === 'MarketPrices' }">
            {{ $t('header.marketPrices') }}
          </router-link>
          <router-link to="/community" class="text-gray-700 hover:text-primary transition-colors font-medium"
            :class="{ 'text-primary': $route.name === 'Community' }">
            {{ $t('header.community') }}
          </router-link>
        </div>

        <!-- Auth Buttons -->
        <div class="hidden md:flex items-center space-x-4">
          <!-- Language Selection -->
          <select v-model="selectedLanguage" @change="updateLanguage"
            class="px-6 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary text-sm">
            <option value="en">EN</option>
            <option value="gu">ગુ</option>
            <option value="ta">த</option>
            <option value="kn">ಕನ್</option>
            <option value="mr">म</option>
            <option value="bn">বা</option>
          </select>

          <template v-if="!isAuthenticated">
            <router-link to="/login"
              class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium">
              {{ $t('header.login') }}
            </router-link>
          </template>
          <template v-else>
            <router-link to="/dashboard" class="text-gray-700 hover:text-primary transition-colors font-medium"
              :class="{ 'text-primary': $route.name === 'Dashboard' }">
              {{ $t('header.dashboard') }}
            </router-link>
            <router-link to="/profile" class="text-gray-700 hover:text-primary transition-colors font-medium"
              :class="{ 'text-primary': $route.name === 'Profile' }">
              {{ $t('header.profile') }}
            </router-link>
            <button @click="logout" class="text-gray-700 hover:text-red-600 transition-colors font-medium">
              {{ $t('header.logout') }}
            </button>
          </template>
        </div>

        <!-- Mobile Menu Button -->
        <button @click="toggleMobileMenu" class="md:hidden p-2">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-if="showMobileMenu" class="md:hidden mt-4 pb-4">
        <div class="space-y-2">
          <router-link to="/" class="block px-3 py-2 text-gray-700 hover:text-primary transition-colors font-medium"
            @click="closeMobileMenu">
            {{ $t('header.home') }}
          </router-link>
          <router-link to="/services"
            class="block px-3 py-2 text-gray-700 hover:text-primary transition-colors font-medium"
            @click="closeMobileMenu">
            {{ $t('header.services') }}
          </router-link>
          <router-link to="/market-prices"
            class="block px-3 py-2 text-gray-700 hover:text-primary transition-colors font-medium"
            @click="closeMobileMenu">
            {{ $t('header.marketPrices') }}
          </router-link>
          <router-link to="/community"
            class="block px-3 py-2 text-gray-700 hover:text-primary transition-colors font-medium"
            @click="closeMobileMenu">
            {{ $t('header.community') }}
          </router-link>

          <div class="border-t pt-4 mt-4">
            <!-- Language Selection for Mobile -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">{{ $t('header.language') }}</label>
              <select v-model="selectedLanguage" @change="updateLanguage"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary">
                <option value="en">English</option>
                <option value="gu">ગુજરાતી (Gujarati)</option>
                <option value="ta">தமிழ் (Tamil)</option>
                <option value="kn">ಕನ್ನಡ (Kannada)</option>
                <option value="mr">मराठी (Marathi)</option>
                <option value="bn">বাংলা (Bengali)</option>
              </select>
            </div>

            <template v-if="!isAuthenticated">
              <router-link to="/login"
                class="block bg-primary text-white px-3 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium text-center"
                @click="closeMobileMenu">
                {{ $t('header.login') }}
              </router-link>
            </template>
            <template v-else>
              <router-link to="/dashboard"
                class="block px-3 py-2 text-gray-700 hover:text-primary transition-colors font-medium"
                @click="closeMobileMenu">
                {{ $t('header.dashboard') }}
              </router-link>
              <router-link to="/profile"
                class="block px-3 py-2 text-gray-700 hover:text-primary transition-colors font-medium"
                @click="closeMobileMenu">
                  {{ $t('header.profile') }}
              </router-link>
              <button @click="logout"
                class="block w-full text-left px-3 py-2 text-gray-700 hover:text-red-600 transition-colors font-medium">
                {{ $t('header.logout') }}
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
import { useI18n } from 'vue-i18n'

export default {
  name: 'AppHeader',
  setup() {
    const router = useRouter()
    const { locale } = useI18n()
    const showMobileMenu = ref(false)
    const selectedLanguage = ref('en')

    const isAuthenticated = computed(() => {
      const token = localStorage.getItem('access_token')
      const authFlag = localStorage.getItem('isAuthenticated')
      return authFlag === 'true' && token !== null
    })

    // Initialize language from localStorage or user profile
    const initializeLanguage = () => {
      const savedUser = localStorage.getItem('user')
      if (savedUser) {
        try {
          const userData = JSON.parse(savedUser)
          selectedLanguage.value = userData.language || 'en'
        } catch (error) {
          selectedLanguage.value = 'en'
        }
      }
    }

    const toggleMobileMenu = () => {
      showMobileMenu.value = !showMobileMenu.value
    }

    const closeMobileMenu = () => {
      showMobileMenu.value = false
    }

    const updateLanguage = () => {
      locale.value = selectedLanguage.value

      const savedUser = localStorage.getItem('user')
      if (savedUser) {
        try {
          const userData = JSON.parse(savedUser)
          userData.language = selectedLanguage.value
          localStorage.setItem('user', JSON.stringify(userData))
        } catch (error) {
          console.error('Error updating language preference:', error)
        }
      }

      closeMobileMenu()
    }

    const logout = () => {
      // Clear all authentication data
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('access_token')
      localStorage.removeItem('token_type')
      localStorage.removeItem('expires_in')
      localStorage.removeItem('user')

      router.push('/')
      closeMobileMenu()
    }

    // Initialize language on component mount
    initializeLanguage()

    return {
      showMobileMenu,
      selectedLanguage,
      isAuthenticated,
      toggleMobileMenu,
      closeMobileMenu,
      updateLanguage,
      logout,
      locale
    }
  }
}
</script>
