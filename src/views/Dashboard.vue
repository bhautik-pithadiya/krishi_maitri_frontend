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

      <!-- Weather Widget -->
      <div class="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white mb-8">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h2 class="text-xl font-semibold mb-2">{{ $t('dashboard.weather.title') }}</h2>
            <p class="text-blue-100 mb-1">{{ userData.location }}</p>
            <div class="flex items-center space-x-4">
              <div class="text-3xl font-bold">{{ weather.temperature }}°C</div>
              <div class="text-blue-100">
                <div>{{ weather.condition }}</div>
                <div class="text-sm">{{ $t('dashboard.weather.humidity', { humidity: weather.humidity }) }}</div>
              </div>
            </div>
          </div>
          <div class="mt-4 md:mt-0 text-right">
            <div class="text-blue-100 mb-1">{{ $t('dashboard.weather.rainfallTitle') }}</div>
            <div class="text-2xl font-bold">{{ weather.rainfall }}mm</div>
            <div class="text-sm text-blue-100">{{ weather.rainfallAdvice }}</div>
          </div>
        </div>
      </div>

      <!-- Quick Action Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <!-- Book Service Card -->
        <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
          @click="navigateTo('/services')">
          <div class="flex items-center space-x-4">
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
          <div class="mt-4">
            <span class="text-primary font-medium hover:text-green-600">{{ $t('dashboard.actions.bookService.cta')
            }}</span>
          </div>
        </div>

        <!-- Market Prices Card -->
        <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
          @click="navigateTo('/market-prices')">
          <div class="flex items-center space-x-4">
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
          <div class="mt-4">
            <span class="text-primary font-medium hover:text-green-600">{{ $t('dashboard.actions.marketPrices.cta')
            }}</span>
          </div>
        </div>

        <!-- Government Schemes Card -->
        <div class="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div class="flex items-center space-x-4">
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
          <div class="mt-4">
            <span class="text-primary font-medium hover:text-green-600">{{ $t('dashboard.actions.governmentSchemes.cta')
            }}</span>
          </div>
        </div>
      </div>

      <!-- News Ticker -->
      <div class="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 class="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <svg class="w-5 h-5 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd" />
          </svg>
          {{ $t('dashboard.news.title') }}
        </h2>
        <div class="space-y-4">
          <div v-for="(news, index) in agricultureNews" :key="index" class="flex items-start space-x-3 pb-4"
            :class="{ 'border-b border-gray-200': index < agricultureNews.length - 1 }">
            <div class="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <h3 class="font-medium text-gray-900">{{ news.title }}</h3>
              <p class="text-sm text-gray-600 mt-1">{{ news.summary }}</p>
              <span class="text-xs text-gray-500">{{ news.time }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activities -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- My Services -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">{{ $t('dashboard.recentServices.title') }}</h2>
          <div class="space-y-4">
            <div v-for="(service, index) in recentServices" :key="index"
              class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h3 class="font-medium text-gray-900">{{ service.name }}</h3>
                <p class="text-sm text-gray-600">{{ service.date }}</p>
              </div>
              <span>{{ t('dashboard.status.' + service.status) }}</span>
            </div>
          </div>
          <router-link to="/services" class="block mt-4 text-center text-primary font-medium hover:text-green-600">
            {{ $t('dashboard.recentServices.cta') }}
          </router-link>
        </div>

        <!-- Quick Tips -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">{{ $t('dashboard.farmingTips.title') }}</h2>
          <div class="space-y-4">
            <div v-for="(tip, index) in farmingTips" :key="index" class="flex items-start space-x-3">
              <div class="w-8 h-8 bg-primary bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M9.663 17h4.673a1.5 1.5 0 001.2-2.4L6.5 2.4A1.5 1.5 0 005 2.4v.6a3 3 0 013 3v11zM9 6a3 3 0 100 6 3 3 0 000-6z"
                    clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 class="font-medium text-gray-900">{{ tip.title }}</h3>
                <p class="text-sm text-gray-600 mt-1">{{ tip.description }}</p>
              </div>
            </div>
          </div>
          <router-link to="/community" class="block mt-4 text-center text-primary font-medium hover:text-green-600">
            {{ $t('dashboard.farmingTips.cta') }}
          </router-link>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'Dashboard',
  components: {
    AppHeader,
    AppFooter
  },
  setup() {
    const router = useRouter()
    const { t } = useI18n()

    const userData = computed(() => {
      const user = localStorage.getItem('user')
      if (user) {
        const parsedUser = JSON.parse(user)
        return {
          name: parsedUser.display_name || parsedUser.name || 'Farmer',
          location: parsedUser.farmDetails?.location?.address || parsedUser.location || 'India',
          email: parsedUser.email || '',
          mobile: parsedUser.mobile || parsedUser.phone_number || '',
          farmSize: parsedUser.farmDetails?.farmSize || '',
          cropName: parsedUser.farmDetails?.cropName || '',
          experience: parsedUser.farmDetails?.experience || ''
        }
      }
      return { name: 'Farmer', location: 'India', email: '', mobile: '', farmSize: '', cropName: '', experience: '' }
    })

    const weather = ref({
      temperature: 28,
      condition: t('dashboard.weather.condition.partlyCloudy'),
      humidity: 65,
      rainfall: 45,
      rainfallAdvice: t('dashboard.weather.advice.goodForCrops')
    })

    const agricultureNews = ref([
      {
        title: 'New Crop Insurance Scheme Launched',
        summary: 'Government introduces enhanced coverage for Kharif crops with 50% premium subsidy.',
        time: '2 hours ago'
      },
      {
        title: 'Monsoon Update: Normal Rainfall Expected',
        summary: 'IMD predicts normal monsoon this year, beneficial for agriculture productivity.',
        time: '5 hours ago'
      },
      {
        title: 'Organic Farming Incentives Increased',
        summary: 'Additional ₹2000 per hectare announced for farmers adopting organic methods.',
        time: '1 day ago'
      }
    ])

    const recentServices = ref([
      { name: t('dashboard.recentServices.soilTesting'), date: 'Jan 20, 2025', status: 'Completed' },
      { name: t('dashboard.recentServices.expertConsultation'), date: 'Jan 18, 2025', status: 'In Progress' },
      { name: t('dashboard.recentServices.equipmentRental'), date: 'Jan 15, 2025', status: 'Completed' }
    ])

    const farmingTips = ref([
      {
        title: t('dashboard.farmingTips.optimalWateringTime'),
        description: t('dashboard.farmingTips.optimalWateringTimeDescription')
      },
      {
        title: t('dashboard.farmingTips.pestControlTip'),
        description: t('dashboard.farmingTips.pestControlTipDescription')
      },
      {
        title: t('dashboard.farmingTips.soilHealth'),
        description: t('dashboard.farmingTips.soilHealthDescription')
      }
    ])

    const getGreeting = () => {
      const hour = new Date().getHours()
      if (hour < 12) return t('dashboard.greeting.morning')
      if (hour < 17) return t('dashboard.greeting.afternoon')
      return t('dashboard.greeting.evening')
    }

    const getStatusClass = (status) => {
      switch (status) {
        case 'Completed':
          return 'bg-green-100 text-green-800'
        case 'In Progress':
          return 'bg-yellow-100 text-yellow-800'
        case 'Pending':
          return 'bg-gray-100 text-gray-800'
        default:
          return 'bg-gray-100 text-gray-800'
      }
    }

    const navigateTo = (path) => {
      router.push(path)
    }

    onMounted(() => {
      // Simulate weather data fetch based on location
      // In real app, this would be an API call
    })

    return {
      userData,
      weather,
      agricultureNews,
      recentServices,
      farmingTips,
      getGreeting,
      getStatusClass,
      navigateTo,
      t
    }
  }
}
</script>
