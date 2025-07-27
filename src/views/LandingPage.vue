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
