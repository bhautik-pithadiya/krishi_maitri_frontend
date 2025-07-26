<template>
  <div class="min-h-screen bg-earth-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div class="text-center">
        <div class="flex justify-center">
          <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
            </svg>
          </div>
        </div>
        <h2 class="mt-6 text-3xl font-bold text-gray-900">Welcome to Krishi Maitri</h2>
        <p class="mt-2 text-sm text-gray-600">
          {{ isLogin ? 'Sign in to your account' : 'Create your farmer account' }}
        </p>
      </div>

      <!-- Language Selector -->
      <div class="bg-white rounded-lg p-4 shadow-sm">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Select Language / भाषा चुनें
        </label>
        <select 
          v-model="selectedLanguage"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
        >
          <option value="en">English</option>
          <option value="hi">हिंदी (Hindi)</option>
          <option value="bn">বাংলা (Bengali)</option>
          <option value="te">తెలుగు (Telugu)</option>
          <option value="ta">தமிழ் (Tamil)</option>
          <option value="mr">मराठी (Marathi)</option>
          <option value="gu">ગુજરાતી (Gujarati)</option>
          <option value="kn">ಕನ್ನಡ (Kannada)</option>
          <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
        </select>
      </div>

      <!-- Login/Signup Form -->
      <form @submit.prevent="handleSubmit" class="mt-8 space-y-6">
        <div class="bg-white rounded-lg p-6 shadow-sm space-y-4">
          <!-- Name (only for signup) -->
          <div v-if="!isLogin">
            <label for="name" class="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="Enter your full name"
            />
          </div>

          <!-- Mobile Number -->
          <div>
            <label for="mobile" class="block text-sm font-medium text-gray-700">
              Mobile Number
            </label>
            <div class="mt-1 flex">
              <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                +91
              </span>
              <input
                id="mobile"
                v-model="form.mobile"
                type="tel"
                required
                maxlength="10"
                pattern="[0-9]{10}"
                class="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-r-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="9876543210"
              />
            </div>
          </div>

          <!-- Village/Location (only for signup) -->
          <div v-if="!isLogin">
            <label for="location" class="block text-sm font-medium text-gray-700">
              Village/City
            </label>
            <input
              id="location"
              v-model="form.location"
              type="text"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="Enter your village or city"
            />
          </div>

          <!-- OTP Input (when OTP is sent) -->
          <div v-if="otpSent">
            <label for="otp" class="block text-sm font-medium text-gray-700">
              Enter OTP
            </label>
            <input
              id="otp"
              v-model="form.otp"
              type="text"
              required
              maxlength="6"
              pattern="[0-9]{6}"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="123456"
            />
            <p class="mt-2 text-sm text-gray-600">
              OTP sent to +91 {{ form.mobile }}. 
              <button 
                type="button" 
                @click="resendOTP"
                class="text-primary hover:text-green-600 font-medium"
                :disabled="resendTimer > 0"
              >
                {{ resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP' }}
              </button>
            </p>
          </div>
        </div>

        <!-- Submit Button -->
        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ loading ? 'Processing...' : otpSent ? 'Verify OTP' : 'Send OTP' }}
          </button>
        </div>

        <!-- Toggle Login/Signup -->
        <div class="text-center">
          <button
            type="button"
            @click="toggleMode"
            class="text-primary hover:text-green-600 font-medium text-sm"
          >
            {{ isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in" }}
          </button>
        </div>
      </form>

      <!-- Back to Home -->
      <div class="text-center">
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
import { ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Login',
  setup() {
    const router = useRouter()
    const isLogin = ref(true)
    const otpSent = ref(false)
    const loading = ref(false)
    const resendTimer = ref(0)
    const selectedLanguage = ref('en')
    let resendInterval = null

    const form = ref({
      name: '',
      mobile: '',
      location: '',
      otp: ''
    })

    const toggleMode = () => {
      isLogin.value = !isLogin.value
      form.value = {
        name: '',
        mobile: '',
        location: '',
        otp: ''
      }
      otpSent.value = false
    }

    const startResendTimer = () => {
      resendTimer.value = 30
      resendInterval = setInterval(() => {
        resendTimer.value--
        if (resendTimer.value <= 0) {
          clearInterval(resendInterval)
        }
      }, 1000)
    }

    const sendOTP = async () => {
      loading.value = true
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      otpSent.value = true
      loading.value = false
      startResendTimer()
      
      // For demo purposes, show the OTP
      alert(`Demo OTP: 123456`)
    }

    const verifyOTP = async () => {
      loading.value = true
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      if (form.value.otp === '123456') {
        // Store user data
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('user', JSON.stringify({
          name: form.value.name || 'Farmer',
          mobile: form.value.mobile,
          location: form.value.location || 'India',
          language: selectedLanguage.value
        }))
        
        router.push('/dashboard')
      } else {
        alert('Invalid OTP. Please try again.')
      }
      loading.value = false
    }

    const resendOTP = async () => {
      if (resendTimer.value > 0) return
      await sendOTP()
    }

    const handleSubmit = async () => {
      if (!otpSent.value) {
        await sendOTP()
      } else {
        await verifyOTP()
      }
    }

    onUnmounted(() => {
      if (resendInterval) {
        clearInterval(resendInterval)
      }
    })

    return {
      isLogin,
      otpSent,
      loading,
      resendTimer,
      selectedLanguage,
      form,
      toggleMode,
      resendOTP,
      handleSubmit
    }
  }
}
</script>
