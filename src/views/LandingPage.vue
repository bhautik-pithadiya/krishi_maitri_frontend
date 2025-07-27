<template>
  <div class="min-h-screen">
    <!-- Header -->
    <AppHeader />

    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-green-50 to-earth-50 py-20">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="space-y-8">
            <h1 class="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight" v-html="$t('landingPage.heroTitle')">
            </h1>
            <p class="text-lg text-gray-600 leading-relaxed">
              {{ $t('landingPage.heroSubtitle') }}
            </p>
            <div class="flex justify-start">
              <router-link 
                to="/dashboard"
                class="bg-primary text-white px-8 py-4 rounded-lg hover:bg-green-600 transition-colors font-semibold text-center"
              >
                {{ $t('landingPage.getStarted') }}
              </router-link>
            </div>
          </div>
          <div class="relative">
            <div class="bg-earth-100 rounded-lg p-8 text-center">
              <!-- Hero farmer image -->
              <div class="w-full h-80 rounded-lg overflow-hidden">
                <img 
                  src="/src/assets/images/hero-farmer.jpg" 
                  alt="Farmer working in the field" 
                  class="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Highlights Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {{ $t('landingPage.whyChooseTitle') }}
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            {{ $t('landingPage.whyChooseSubtitle') }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Advisory Card -->
          <div class="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">{{ $t('landingPage.expertAdvisoryTitle') }}</h3>
            <p class="text-gray-600 mb-6">
              {{ $t('landingPage.expertAdvisoryDescription') }}
            </p>
            <router-link 
              to="/services"
              class="text-primary font-semibold hover:text-green-600 transition-colors"
            >
              {{ $t('landingPage.learnMore') }}
            </router-link>
          </div>

          <!-- Market Prices Card -->
          <div class="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <div class="w-16 h-16 bg-brown rounded-full flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">{{ $t('landingPage.marketPricesTitle') }}</h3>
            <p class="text-gray-600 mb-6">
              {{ $t('landingPage.marketPricesDescription') }}
            </p>
            <router-link 
              to="/market-prices"
              class="text-primary font-semibold hover:text-green-600 transition-colors"
            >
              {{ $t('landingPage.viewPrices') }}
            </router-link>
          </div>

          <!-- Government Schemes Card -->
          <div class="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
            <div class="w-16 h-16 bg-earth-600 rounded-full flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"/>
                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-4">{{ $t('landingPage.schemesTitle') }}</h3>
            <p class="text-gray-600 mb-6">
              {{ $t('landingPage.schemesDescription') }}
            </p>
            <a 
              href="#"
              class="text-primary font-semibold hover:text-green-600 transition-colors"
            >
              {{ $t('landingPage.exploreSchemes') }}
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Statistics Section -->
    <section class="py-20 bg-primary text-white">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div class="text-4xl font-bold mb-2">50K+</div>
            <div class="text-green-100">{{ $t('landingPage.activeFarmers') }}</div>
          </div>
          <div>
            <div class="text-4xl font-bold mb-2">1000+</div>
            <div class="text-green-100">{{ $t('landingPage.expertConsultations') }}</div>
          </div>
          <div>
            <div class="text-4xl font-bold mb-2">500+</div>
            <div class="text-green-100">{{ $t('landingPage.villagesCovered') }}</div>
          </div>
          <div>
            <div class="text-4xl font-bold mb-2">95%</div>
            <div class="text-green-100">{{ $t('landingPage.satisfactionRate') }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-earth-50">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
          {{ $t('landingPage.ctaTitle') }}
        </h2>
        <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          {{ $t('landingPage.ctaSubtitle') }}
        </p>
        <router-link 
          to="/login"
          class="bg-primary text-white px-8 py-4 rounded-lg hover:bg-green-600 transition-colors font-semibold inline-block"
        >
          {{ $t('landingPage.joinNow') }}
        </router-link>
      </div>
    </section>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'

export default {
  name: 'LandingPage',
  components: {
    AppHeader,
    AppFooter
  }
}
</script>
