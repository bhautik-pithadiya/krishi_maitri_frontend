<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <AppHeader />

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <!-- Page Header -->
      <div class="text-center mb-12">
        <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          {{ $t('services.title') }}
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          {{ $t('services.subtitle') }}
        </p>
      </div>

      <!-- Services Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <!-- Weather Forecast -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <div class="h-48 bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center">
            <svg class="w-16 h-16 text-blue-700" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2a.75.75 0 001.5 0v-4.31l1.22 1.22a.75.75 0 101.06-1.06l-2.5-2.5a.75.75 0 00-1.06 0l-2.5 2.5a.75.75 0 101.06 1.06l1.22-1.22V15z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-3">{{ $t('services.weatherForecast.title') }}</h3>
            <p class="text-gray-600 mb-4">
              {{ $t('services.weatherForecast.description') }}
            </p>
            <ul class="text-sm text-gray-600 mb-6 space-y-1">
              <li>• {{ $t('services.weatherForecast.features.daily') }}</li>
              <li>• {{ $t('services.weatherForecast.features.alerts') }}</li>
              <li>• {{ $t('services.weatherForecast.features.location') }}</li>
              <li>• {{ $t('services.weatherForecast.features.farming') }}</li>
            </ul>
            <button 
              @click="navigateToWeather"
              class="w-full bg-primary text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold"
            >
              {{ $t('services.weatherForecast.button') }}
            </button>
          </div>
        </div>

        <!-- Community AI -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <div class="h-48 bg-gradient-to-br from-purple-200 to-purple-300 flex items-center justify-center">
            <svg class="w-16 h-16 text-purple-700" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-3">{{ $t('services.communityAI.title') }}</h3>
            <p class="text-gray-600 mb-4">
              {{ $t('services.communityAI.description') }}
            </p>
            <ul class="text-sm text-gray-600 mb-6 space-y-1">
              <li>• {{ $t('services.communityAI.features.chat') }}</li>
              <li>• {{ $t('services.communityAI.features.expert') }}</li>
              <li>• {{ $t('services.communityAI.features.knowledge') }}</li>
              <li>• {{ $t('services.communityAI.features.support') }}</li>
            </ul>
            <button 
              @click="navigateToCommunity"
              class="w-full bg-primary text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold"
            >
              {{ $t('services.communityAI.button') }}
            </button>
          </div>
        </div>

        <!-- Voice Assistant -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <div class="h-48 bg-gradient-to-br from-green-200 to-green-300 flex items-center justify-center">
            <svg class="w-16 h-16 text-green-700" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4z"/>
              <path d="M5.5 9.643a.75.75 0 00-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-1.5v-1.546A6.001 6.001 0 0016 10v-.357a.75.75 0 00-1.5 0V10a4.5 4.5 0 01-9 0v-.357z"/>
            </svg>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-3">{{ $t('services.voiceAssistant.title') }}</h3>
            <p class="text-gray-600 mb-4">
              {{ $t('services.voiceAssistant.description') }}
            </p>
            <ul class="text-sm text-gray-600 mb-6 space-y-1">
              <li>• {{ $t('services.voiceAssistant.features.recognition') }}</li>
              <li>• {{ $t('services.voiceAssistant.features.language') }}</li>
              <li>• {{ $t('services.voiceAssistant.features.commands') }}</li>
              <li>• {{ $t('services.voiceAssistant.features.accessibility') }}</li>
            </ul>
            <button 
              @click="navigateToVoiceAssistant"
              class="w-full bg-primary text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold"
            >
              {{ $t('services.voiceAssistant.button') }}
            </button>
          </div>
        </div>

        <!-- Market Prices -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <div class="h-48 bg-gradient-to-br from-yellow-200 to-yellow-300 flex items-center justify-center">
            <svg class="w-16 h-16 text-yellow-700" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-3">{{ $t('services.marketPrices.title') }}</h3>
            <p class="text-gray-600 mb-4">
              {{ $t('services.marketPrices.description') }}
            </p>
            <ul class="text-sm text-gray-600 mb-6 space-y-1">
              <li>• {{ $t('services.marketPrices.features.live') }}</li>
              <li>• {{ $t('services.marketPrices.features.multiple') }}</li>
              <li>• {{ $t('services.marketPrices.features.trends') }}</li>
              <li>• {{ $t('services.marketPrices.features.alerts') }}</li>
            </ul>
            <button 
              @click="navigateToMarketPrices"
              class="w-full bg-primary text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold"
            >
              {{ $t('services.marketPrices.button') }}
            </button>
          </div>
        </div>

        <!-- Government Schemes -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <div class="h-48 bg-gradient-to-br from-red-200 to-red-300 flex items-center justify-center">
            <svg class="w-16 h-16 text-red-700" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-3">{{ $t('services.governmentSchemes.title') }}</h3>
            <p class="text-gray-600 mb-4">
              {{ $t('services.governmentSchemes.description') }}
            </p>
            <ul class="text-sm text-gray-600 mb-6 space-y-1">
              <li>• {{ $t('services.governmentSchemes.features.subsidies') }}</li>
              <li>• {{ $t('services.governmentSchemes.features.loans') }}</li>
              <li>• {{ $t('services.governmentSchemes.features.application') }}</li>
              <li>• {{ $t('services.governmentSchemes.features.status') }}</li>
            </ul>
            <button 
              @click="showGovernmentSchemes"
              class="w-full bg-primary text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold"
            >
              {{ $t('services.governmentSchemes.button') }}
            </button>
          </div>
        </div>
      </div>

      <!-- How It Works Section -->

      <!-- Government Schemes Modal -->
      <div v-if="showGovernmentSchemesModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-xl max-w-lg w-full p-6 max-h-96 overflow-y-auto">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold text-gray-900">{{ $t('services.governmentSchemes.modalTitle') }}</h3>
            <button @click="closeGovernmentSchemes" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div class="space-y-4">
            <div class="bg-gray-50 p-4 rounded-lg">
              <h4 class="font-semibold text-gray-900 mb-2">{{ $t('services.governmentSchemes.scheme1Title') }}</h4>
              <p class="text-gray-600 text-sm">{{ $t('services.governmentSchemes.scheme1Description') }}</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <h4 class="font-semibold text-gray-900 mb-2">{{ $t('services.governmentSchemes.scheme2Title') }}</h4>
              <p class="text-gray-600 text-sm">{{ $t('services.governmentSchemes.scheme2Description') }}</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <h4 class="font-semibold text-gray-900 mb-2">{{ $t('services.governmentSchemes.scheme3Title') }}</h4>
              <p class="text-gray-600 text-sm">{{ $t('services.governmentSchemes.scheme3Description') }}</p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'

const router = useRouter()

// Reactive state
const showGovernmentSchemesModal = ref(false)

// Navigation methods
const navigateToWeather = () => {
  router.push('/dashboard')
}

const navigateToCommunity = () => {
  router.push('/community')
}

const navigateToMarketPrices = () => {
  router.push('/market-prices')
}

const navigateToVoiceAssistant = () => {
  router.push('/voice-assistant')
}

// Modal methods
const showGovernmentSchemes = () => {
  showGovernmentSchemesModal.value = true
}

const closeGovernmentSchemes = () => {
  showGovernmentSchemesModal.value = false
}
</script>
