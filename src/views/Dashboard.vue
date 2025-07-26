<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <AppHeader />

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <!-- Welcome Section -->
      <div class="mb-8">
        <h1 class="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          {{ $t('dashboard.greeting.welcome', { name: userData.name }) }}
        </h1>
        <p class="text-gray-600">
          {{ $t('dashboard.greeting.description') }}
        </p>
      </div>

      <!-- Weather Widget - Full Width -->
      <div class="mb-8">
        <div class="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div class="flex flex-col lg:flex-row lg:justify-between lg:items-start">
            <div class="lg:flex-1">
              <h2 class="text-xl font-semibold mb-2 flex items-center">
                {{ $t('dashboard.weather.title') }}
                <div v-if="weatherLoading" class="ml-2">
                  <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              </h2>
              <p class="text-blue-100 mb-4">{{ weather.location || userData.location }}</p>
              <div v-if="!weatherError" class="flex items-center space-x-4 mb-4">
                <div class="text-3xl font-bold">{{ Math.round(weather.temperature) }}°C</div>
                <div class="text-blue-100">
                  <div class="capitalize">{{ weather.condition }}</div>
                  <div class="text-sm">{{ $t('dashboard.weather.humidity', { humidity: weather.humidity }) }}</div>
                </div>
              </div>
              <div v-if="weatherError" class="text-blue-100 text-sm">
                {{ weatherError }}
              </div>
              <div v-if="!weatherError">
                <div class="text-blue-100 mb-1">{{ $t('dashboard.weather.forecast') }}</div>
                <div class="text-sm text-blue-100">{{ weather.forecast }}</div>
              </div>
            </div>
            <!-- Forecast data section -->
            <div v-if="!weatherError && weather.forecast5Day && weather.forecast5Day.length > 0" class="mt-4 lg:mt-0 lg:ml-6 lg:flex-1">
              <div class="text-xs text-blue-200 mb-2">Weather Forecast</div>
              <div class="flex space-x-2 overflow-x-auto pb-2 custom-scrollbar">
                <div v-for="(forecast, index) in weather.forecast5Day" :key="index" 
                     v-show="index % 4 === 0"
                     class="bg-blue-700 bg-opacity-50 rounded p-2 flex-shrink-0 text-center min-w-[80px]">
                  <div class="text-xs text-blue-200">{{ formatAPIDateTime(forecast.dt_txt) }}</div>
                  <div class="text-sm font-semibold">{{ Math.round(forecast.main.temp) }}°</div>
                  <div class="text-xs text-blue-200 capitalize">{{ forecast.weather[0].description.split(' ')[0] }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Action Cards - Bottom Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <!-- Book Service Card -->
        <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer flex flex-col justify-between"
          @click="navigateTo('/services')">
          <div>
            <div class="flex items-center space-x-4 mb-4">
              <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900">{{ $t('dashboard.actions.bookService.title') }}</h3>
                <p class="text-sm text-gray-600">{{ $t('dashboard.actions.bookService.description') }}</p>
              </div>
            </div>
          </div>
          <div>
            <span class="text-primary font-medium hover:text-green-600">{{ $t('dashboard.actions.bookService.cta') }}</span>
          </div>
        </div>

        <!-- Market Prices Card -->
        <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer flex flex-col justify-between"
          @click="navigateTo('/market-prices')">
          <div>
            <div class="flex items-center space-x-4 mb-4">
              <div class="w-12 h-12 bg-brown rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900">{{ $t('dashboard.actions.marketPrices.title') }}</h3>
                <p class="text-sm text-gray-600">{{ $t('dashboard.actions.marketPrices.description') }}</p>
              </div>
            </div>
          </div>
          <div>
            <span class="text-primary font-medium hover:text-green-600">{{ $t('dashboard.actions.marketPrices.cta') }}</span>
          </div>
        </div>

        <!-- Government Schemes Card -->
        <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer flex flex-col justify-between">
          <div>
            <div class="flex items-center space-x-4 mb-4">
              <div class="w-12 h-12 bg-earth-600 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                    clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900">{{ $t('dashboard.actions.governmentSchemes.title') }}</h3>
                <p class="text-sm text-gray-600">{{ $t('dashboard.actions.governmentSchemes.description') }}</p>
              </div>
            </div>
          </div>
          <div>
            <span class="text-primary font-medium hover:text-green-600">{{ $t('dashboard.actions.governmentSchemes.cta') }}</span>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template><script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import { useI18n } from 'vue-i18n'
import { apiConfig } from '../config/api.js'

export default {
  name: 'Dashboard',
  components: {
    AppHeader,
    AppFooter
  },
  setup() {
    const router = useRouter()
    const { t } = useI18n()

    // Weather state
    const weatherLoading = ref(false)
    const weatherError = ref('')

    const userData = computed(() => {
      const user = localStorage.getItem('user')
      if (user) {
        const parsedUser = JSON.parse(user)
        return {
          name: parsedUser.display_name || parsedUser.name || 'Farmer',
          location: parsedUser.farmDetails?.location?.address || parsedUser.location || 'India',
          latitude: parsedUser.farmDetails?.location?.latitude,
          longitude: parsedUser.farmDetails?.location?.longitude,
          email: parsedUser.email || '',
          mobile: parsedUser.mobile || parsedUser.phone_number || '',
          farmSize: parsedUser.farmDetails?.farmSize || '',
          cropName: parsedUser.farmDetails?.cropName || '',
          experience: parsedUser.farmDetails?.experience || ''
        }
      }
      return { 
        name: 'Farmer', 
        location: 'India', 
        latitude: null, 
        longitude: null, 
        email: '', 
        mobile: '', 
        farmSize: '', 
        cropName: '', 
        experience: '' 
      }
    })

    const weather = ref({
      temperature: 28,
      condition: t('dashboard.weather.condition.partlyCloudy'),
      humidity: 65,
      location: '',
      forecast: '',
      forecast5Day: []
    })

    // Fetch weather forecast from API
    const fetchWeatherForecast = async () => {
      const user = userData.value
      
      // Check if we have latitude and longitude
      if (!user.latitude || !user.longitude) {
        weatherError.value = 'Location data not available. Please update your profile with location information.'
        return
      }

      weatherLoading.value = true
      weatherError.value = ''

      try {
        const requestData = {
          lat: user.latitude,
          lon: user.longitude,
          location: user.location
        }

        const response = await fetch(apiConfig.weather.forecast, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          },
          body: JSON.stringify(requestData)
        })

        if (!response.ok) {
          throw new Error(`Weather API failed: ${response.status}`)
        }

        const data = await response.json()
        
        // Update weather data with API response
        weather.value = {
          temperature: data.temperature_celsius,
          condition: data.forecast,
          humidity: data.details?.list?.[0]?.main?.humidity || 65,
          location: data.location,
          forecast: data.forecast,
          forecast5Day: data.details?.list || []
        }

      } catch (error) {
        console.error('Weather API Error:', error)
        weatherError.value = 'Unable to fetch weather data. Showing default information.'
        
        // Keep default weather data on error
        weather.value = {
          temperature: 28,
          condition: t('dashboard.weather.condition.partlyCloudy'),
          humidity: 65,
          location: user.location,
          forecast: t('dashboard.weather.advice.goodForCrops'),
          forecast5Day: []
        }
      } finally {
        weatherLoading.value = false
      }
    }

    // Format API datetime for display (show actual time from API)
    const formatAPIDateTime = (dateTimeString) => {
      const date = new Date(dateTimeString)
      
      // Format as "MM/DD HH:mm" or "DD/MM HH:mm" based on locale
      const dateOptions = { 
        month: '2-digit', 
        day: '2-digit'
      }
      const timeOptions = { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false
      }
      
      const dateStr = date.toLocaleDateString('en-US', dateOptions)
      const timeStr = date.toLocaleTimeString('en-US', timeOptions)
      
      return `${dateStr} ${timeStr}`
    }

    const navigateTo = (path) => {
      router.push(path)
    }

    onMounted(() => {
      // Fetch real weather data when component mounts
      fetchWeatherForecast()
    })

    return {
      userData,
      weather,
      weatherLoading,
      weatherError,
      navigateTo,
      formatAPIDateTime,
      fetchWeatherForecast,
      t
    }
  }
}
</script>

<style scoped>
/* Custom scrollbar for weather forecast */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  height: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.4);
  border-radius: 3px;
  transition: background 0.3s ease;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.6);
}

.custom-scrollbar::-webkit-scrollbar-thumb:active {
  background: rgba(255, 255, 255, 0.7);
}

/* Hide scrollbar on mobile for cleaner look */
@media (max-width: 768px) {
  .custom-scrollbar::-webkit-scrollbar {
    display: none;
  }
  
  .custom-scrollbar {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
}
</style>
