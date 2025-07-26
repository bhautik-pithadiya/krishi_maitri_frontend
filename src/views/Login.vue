<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-lg w-full">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="flex justify-center mb-4">
          <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
            </svg>
          </div>
        </div>
        <h2 class="text-2xl font-semibold text-primary mb-2">Welcome to Krishi Maitri</h2>
        <p class="text-gray-600">Sign in or create your account</p>
      </div>

      <!-- Main Form Container -->
      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <!-- Tab Headers -->
        <div class="flex border-b border-gray-200">
          <button
            @click="setMode(true)"
            :class="[
              'flex-1 py-4 px-6 text-center font-medium transition-colors',
              isLogin 
                ? 'bg-white text-gray-900 border-b-2 border-primary' 
                : 'bg-gray-50 text-gray-600 hover:text-gray-900'
            ]"
          >
            Sign In
          </button>
          <button
            @click="setMode(false)"
            :class="[
              'flex-1 py-4 px-6 text-center font-medium transition-colors',
              !isLogin 
                ? 'bg-white text-gray-900 border-b-2 border-primary' 
                : 'bg-gray-50 text-gray-600 hover:text-gray-900'
            ]"
          >
            Sign Up
          </button>
        </div>

        <!-- Form Content -->
        <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
          <!-- Sign In Fields -->
          <div v-if="isLogin" class="space-y-4">
            <!-- Email Address -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </div>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <!-- Password -->
            <div>
              <label for="signin-password" class="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <input
                  id="signin-password"
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  class="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path v-if="!showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path v-if="!showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    <path v-if="showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Sign Up Fields -->
          <div v-if="!isLogin" class="space-y-4">
            <!-- Full Name -->
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                  </svg>
                </div>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <!-- Email Address -->
            <div>
              <label for="signup-email" class="block text-sm font-medium text-gray-700 mb-1">
                Email Address <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </div>
                <input
                  id="signup-email"
                  v-model="form.email"
                  type="email"
                  required
                  class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <!-- Phone Number (for Sign Up) -->
            <div>
              <label for="mobile" class="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                </div>
                <input
                  id="mobile"
                  v-model="form.mobile"
                  type="tel"
                  required
                  maxlength="10"
                  pattern="[0-9]{10}"
                  class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>
          </div>

          <!-- Password Fields (Sign Up only) -->
          <div v-if="!isLogin" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Password -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
                Password <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <input
                  id="password"
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  class="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Password"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path v-if="!showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path v-if="!showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    <path v-if="showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Confirm Password -->
            <div>
              <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">
                Confirm <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <input
                  id="confirmPassword"
                  v-model="form.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  required
                  class="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Confirm"
                />
                <button
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path v-if="!showConfirmPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path v-if="!showConfirmPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    <path v-if="showConfirmPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Farm Details Section (Sign Up only) -->
          <div v-if="!isLogin" class="pt-4 border-t border-gray-200">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Farm Details (Optional)</h3>
            
            <!-- Farm Location -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Farm Location
              </label>
              <div class="space-y-2">
                <button
                  type="button"
                  @click="getLocation"
                  :disabled="gettingLocation"
                  class="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                >
                  <svg v-if="gettingLocation" class="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <svg v-else class="h-5 w-5 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                  </svg>
                  {{ gettingLocation ? 'Getting Location...' : (form.location ? 'Update Location' : 'Get Current Location') }}
                </button>
                <div v-if="form.location" class="text-sm text-gray-600 bg-green-50 p-2 rounded">
                  📍 Location captured: {{ form.location }}
                </div>
                <div v-if="locationError" class="text-sm text-red-600 bg-red-50 p-2 rounded">
                  ❌ {{ locationError }}
                </div>
              </div>
            </div>

            <!-- Crop Name -->
            <div class="mb-4">
              <label for="cropName" class="block text-sm font-medium text-gray-700 mb-1">
                Primary Crop (Optional)
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"/>
                  </svg>
                </div>
                <input
                  id="cropName"
                  v-model="form.cropName"
                  type="text"
                  class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="e.g., Rice, Wheat, Cotton, Sugarcane"
                />
              </div>
            </div>

            <!-- Farm Size and Experience -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Farm Size -->
              <div>
                <label for="farmSize" class="block text-sm font-medium text-gray-700 mb-1">
                  Farm Size
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                    </svg>
                  </div>
                  <input
                    id="farmSize"
                    v-model="form.farmSize"
                    type="text"
                    class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="5 acres"
                  />
                </div>
              </div>

              <!-- Experience -->
              <div>
                <label for="experience" class="block text-sm font-medium text-gray-700 mb-1">
                  Experience
                </label>
                <select
                  id="experience"
                  v-model="form.experience"
                  class="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="">Years</option>
                  <option value="0-2">0-2 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="6-10">6-10 years</option>
                  <option value="11-20">11-20 years</option>
                  <option value="20+">20+ years</option>
                </select>
              </div>
            </div>
          </div>



          <!-- Submit Button -->
          <div class="pt-4">
            <button
              type="submit"
              :disabled="loading"
              class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Back to Home -->
      <div class="text-center mt-6">
        <router-link 
          to="/"
          class="text-gray-600 hover:text-gray-800 font-medium text-sm"
        >
          ← Back to Home
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import apiConfig from '../config/api.js'

export default {
  name: 'Login',
  setup() {
    const router = useRouter()
    const isLogin = ref(true)
    const loading = ref(false)
    const selectedLanguage = ref('en')
    const showPassword = ref(false)
    const showConfirmPassword = ref(false)
    const gettingLocation = ref(false)
    const locationError = ref('')

    const form = ref({
      name: '',
      email: '',
      mobile: '',
      password: '',
      confirmPassword: '',
      location: '',
      latitude: null,
      longitude: null,
      farmSize: '',
      experience: '',
      cropName: ''
    })

    const setMode = (loginMode) => {
      isLogin.value = loginMode
      // Reset form when switching modes
      form.value = {
        name: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: '',
        location: '',
        latitude: null,
        longitude: null,
        farmSize: '',
        experience: '',
        cropName: ''
      }
      showPassword.value = false
      showConfirmPassword.value = false
      locationError.value = ''
    }

    const toggleMode = () => {
      setMode(!isLogin.value)
    }

    const validateSignupForm = () => {
      if (!isLogin.value) {
        // Sign Up validation - original flow with mobile OTP
        if (!form.value.name.trim()) {
          alert('Please enter your full name')
          return false
        }
        if (!form.value.email.trim()) {
          alert('Please enter your email address')
          return false
        }
        if (!form.value.mobile || form.value.mobile.length !== 10) {
          alert('Please enter a valid 10-digit mobile number')
          return false
        }
        if (!form.value.password) {
          alert('Please enter a password')
          return false
        }
        if (form.value.password.length < 6) {
          alert('Password must be at least 6 characters long')
          return false
        }
        if (form.value.password !== form.value.confirmPassword) {
          alert('Passwords do not match')
          return false
        }
      } else {
        // Sign In validation - email and password only
        if (!form.value.email.trim()) {
          alert('Please enter your email address')
          return false
        }
        if (!form.value.password) {
          alert('Please enter your password')
          return false
        }
      }
      
      return true
    }



    const getLocation = () => {
      if (!navigator.geolocation) {
        locationError.value = 'Geolocation is not supported by this browser.'
        return
      }

      gettingLocation.value = true
      locationError.value = ''

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          form.value.latitude = position.coords.latitude
          form.value.longitude = position.coords.longitude
          
          // Get human-readable address using reverse geocoding
          try {
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
            )
            const data = await response.json()
            
            if (data && data.locality) {
              // Create a readable address from the response
              const addressParts = []
              if (data.locality) addressParts.push(data.locality)
              if (data.principalSubdivision) addressParts.push(data.principalSubdivision)
              if (data.countryName) addressParts.push(data.countryName)
              
              form.value.location = addressParts.join(', ')
            } else {
              // Fallback to coordinates if address lookup fails
              form.value.location = `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`
            }
          } catch (error) {
            console.error('Address lookup failed:', error)
            // Fallback to coordinates if address lookup fails
            form.value.location = `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`
          }
          
          gettingLocation.value = false
        },
        (error) => {
          gettingLocation.value = false
          switch(error.code) {
            case error.PERMISSION_DENIED:
              locationError.value = "Location access denied by user. Please enable location access in your browser settings."
              break
            case error.POSITION_UNAVAILABLE:
              locationError.value = "Location information is unavailable."
              break
            case error.TIMEOUT:
              locationError.value = "Location request timed out."
              break
            default:
              locationError.value = "An unknown error occurred while retrieving location."
              break
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      )
    }



    const handleSubmit = async () => {
      if (!validateSignupForm()) return
      
      loading.value = true
      
      try {
        if (isLogin.value) {
          // Handle Sign In with email/password
          const loginData = {
            email: form.value.email,
            password: form.value.password
          }
          
          // Use API config for login endpoint
          const response = await fetch(apiConfig.auth.login, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
          })
          
          if (response.ok) {
            const data = await response.json()
            
            // Store authentication data
            localStorage.setItem('isAuthenticated', 'true')
            localStorage.setItem('access_token', data.access_token)
            localStorage.setItem('token_type', data.token_type)
            localStorage.setItem('expires_in', data.expires_in.toString())
            localStorage.setItem('user', JSON.stringify(data.user))
            
            router.push('/dashboard')
          } else {
            const errorData = await response.json()
            alert(errorData.message || 'Invalid email or password. Please try again.')
          }
          
        } else {
          // Handle Sign Up - API call with proper structure
          const signupData = {
            name: form.value.name,
            email: form.value.email,
            mobile: form.value.mobile,
            password: form.value.password,
            confirmPassword: form.value.confirmPassword,
            farmDetails: {
              location: {
                address: form.value.location || null,
                latitude: form.value.latitude,
                longitude: form.value.longitude
              },
              cropName: form.value.cropName || null,
              farmSize: form.value.farmSize || null,
              experience: form.value.experience || null
            },
            language: selectedLanguage.value
          }
          
          // Use API config for signup endpoint
          const response = await fetch(apiConfig.auth.signup, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupData)
          })
          
          if (response.ok) {
            const data = await response.json()
            
            // Store authentication data from API response
            localStorage.setItem('isAuthenticated', 'true')
            localStorage.setItem('access_token', data.access_token)
            localStorage.setItem('token_type', data.token_type)
            localStorage.setItem('expires_in', data.expires_in.toString())
            localStorage.setItem('user', JSON.stringify(data.user))
            
            alert('Account created successfully!')
            router.push('/dashboard')
          } else {
            const errorData = await response.json()
            alert(errorData.message || 'Registration failed. Please try again.')
          }
        }
      } catch (error) {
        console.error('API Error:', error)
        
        // Fallback to demo mode if API is not available
        alert('API not available. Running in demo mode.')
        
        if (isLogin.value) {
          // Demo login
          localStorage.setItem('isAuthenticated', 'true')
          localStorage.setItem('user', JSON.stringify({
            uid: 'demo-user-id',
            display_name: 'Demo Farmer',
            email: form.value.email,
            phone_number: '',
            mobile: '',
            email_verified: false,
            created_at: new Date().toISOString(),
            language: selectedLanguage.value,
            farmDetails: {
              location: { address: 'Demo Location', latitude: 0, longitude: 0 },
              cropName: '',
              farmSize: '',
              experience: ''
            }
          }))
        } else {
          // Demo signup
          localStorage.setItem('isAuthenticated', 'true')
          localStorage.setItem('user', JSON.stringify({
            uid: 'demo-user-' + Date.now(),
            display_name: form.value.name,
            email: form.value.email,
            phone_number: form.value.mobile,
            mobile: form.value.mobile,
            email_verified: false,
            created_at: new Date().toISOString(),
            language: selectedLanguage.value,
            farmDetails: {
              location: {
                address: form.value.location || 'Demo Location',
                latitude: form.value.latitude || 0,
                longitude: form.value.longitude || 0
              },
              cropName: form.value.cropName || '',
              farmSize: form.value.farmSize || '',
              experience: form.value.experience || ''
            }
          }))
        }
        
        router.push('/dashboard')
      }
      
      loading.value = false
    }

    return {
      isLogin,
      loading,
      selectedLanguage,
      showPassword,
      showConfirmPassword,
      gettingLocation,
      locationError,
      form,
      setMode,
      toggleMode,
      getLocation,
      handleSubmit
    }
  }
}
</script>
