<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <AppHeader />

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <!-- Page Header -->
      <div class="text-center mb-12">
        <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Agricultural Services
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Access professional agricultural services to improve your farming practices and increase productivity.
        </p>
      </div>

      <!-- Services Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <!-- Soil Testing -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <div class="h-48 bg-gradient-to-br from-earth-200 to-earth-300 flex items-center justify-center">
            <svg class="w-16 h-16 text-earth-700" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
            </svg>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-3">Soil Testing</h3>
            <p class="text-gray-600 mb-4">
              Get comprehensive soil analysis including pH, nutrient levels, and organic matter content to optimize your crop yield.
            </p>
            <ul class="text-sm text-gray-600 mb-6 space-y-1">
              <li>• pH and nutrient analysis</li>
              <li>• Soil texture and composition</li>
              <li>• Fertilizer recommendations</li>
              <li>• Organic matter assessment</li>
            </ul>
            <div class="flex items-center justify-between mb-4">
              <span class="text-2xl font-bold text-primary">₹500</span>
              <span class="text-sm text-gray-500">per sample</span>
            </div>
            <button 
              @click="bookService('Soil Testing', 500)"
              class="w-full bg-primary text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold"
            >
              Book Service
            </button>
          </div>
        </div>

        <!-- Expert Advice -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <div class="h-48 bg-gradient-to-br from-green-200 to-green-300 flex items-center justify-center">
            <svg class="w-16 h-16 text-green-700" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
            </svg>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-3">Expert Consultation</h3>
            <p class="text-gray-600 mb-4">
              Connect with agricultural experts for personalized advice on crop management, pest control, and farming techniques.
            </p>
            <ul class="text-sm text-gray-600 mb-6 space-y-1">
              <li>• Crop selection guidance</li>
              <li>• Pest and disease management</li>
              <li>• Irrigation planning</li>
              <li>• 30-minute video consultation</li>
            </ul>
            <div class="flex items-center justify-between mb-4">
              <span class="text-2xl font-bold text-primary">₹300</span>
              <span class="text-sm text-gray-500">per session</span>
            </div>
            <button 
              @click="bookService('Expert Consultation', 300)"
              class="w-full bg-primary text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold"
            >
              Book Consultation
            </button>
          </div>
        </div>

        <!-- Equipment Rental -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <div class="h-48 bg-gradient-to-br from-brown to-earth-400 flex items-center justify-center">
            <svg class="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-3">Equipment Rental</h3>
            <p class="text-gray-600 mb-4">
              Rent modern agricultural equipment and machinery at affordable rates to enhance your farming efficiency.
            </p>
            <ul class="text-sm text-gray-600 mb-6 space-y-1">
              <li>• Tractors and tillers</li>
              <li>• Harvesting equipment</li>
              <li>• Spraying systems</li>
              <li>• Flexible rental periods</li>
            </ul>
            <div class="flex items-center justify-between mb-4">
              <span class="text-2xl font-bold text-primary">₹1,500</span>
              <span class="text-sm text-gray-500">per day</span>
            </div>
            <button 
              @click="bookService('Equipment Rental', 1500)"
              class="w-full bg-primary text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold"
            >
              Browse Equipment
            </button>
          </div>
        </div>

        <!-- Weather Advisory -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <div class="h-48 bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center">
            <svg class="w-16 h-16 text-blue-700" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z"/>
            </svg>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-3">Weather Advisory</h3>
            <p class="text-gray-600 mb-4">
              Get detailed weather forecasts and agricultural advisories to plan your farming activities effectively.
            </p>
            <ul class="text-sm text-gray-600 mb-6 space-y-1">
              <li>• 7-day weather forecast</li>
              <li>• Rainfall predictions</li>
              <li>• Planting recommendations</li>
              <li>• SMS alerts included</li>
            </ul>
            <div class="flex items-center justify-between mb-4">
              <span class="text-2xl font-bold text-primary">₹200</span>
              <span class="text-sm text-gray-500">per month</span>
            </div>
            <button 
              @click="bookService('Weather Advisory', 200)"
              class="w-full bg-primary text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold"
            >
              Subscribe
            </button>
          </div>
        </div>

        <!-- Crop Insurance -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <div class="h-48 bg-gradient-to-br from-purple-200 to-purple-300 flex items-center justify-center">
            <svg class="w-16 h-16 text-purple-700" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-3">Crop Insurance</h3>
            <p class="text-gray-600 mb-4">
              Protect your crops against natural disasters and unexpected losses with comprehensive insurance coverage.
            </p>
            <ul class="text-sm text-gray-600 mb-6 space-y-1">
              <li>• Weather-based protection</li>
              <li>• Quick claim processing</li>
              <li>• Government subsidies available</li>
              <li>• Multiple crop coverage</li>
            </ul>
            <div class="flex items-center justify-between mb-4">
              <span class="text-2xl font-bold text-primary">₹2,000</span>
              <span class="text-sm text-gray-500">per acre/year</span>
            </div>
            <button 
              @click="bookService('Crop Insurance', 2000)"
              class="w-full bg-primary text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold"
            >
              Get Quote
            </button>
          </div>
        </div>

        <!-- Market Linkage -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <div class="h-48 bg-gradient-to-br from-orange-200 to-orange-300 flex items-center justify-center">
            <svg class="w-16 h-16 text-orange-700" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
            </svg>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-3">Market Linkage</h3>
            <p class="text-gray-600 mb-4">
              Connect directly with buyers and get better prices for your produce through our market linkage program.
            </p>
            <ul class="text-sm text-gray-600 mb-6 space-y-1">
              <li>• Direct buyer connections</li>
              <li>• Price negotiation support</li>
              <li>• Quality certification</li>
              <li>• Logistics assistance</li>
            </ul>
            <div class="flex items-center justify-between mb-4">
              <span class="text-2xl font-bold text-primary">₹100</span>
              <span class="text-sm text-gray-500">per transaction</span>
            </div>
            <button 
              @click="bookService('Market Linkage', 100)"
              class="w-full bg-primary text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold"
            >
              Connect Buyers
            </button>
          </div>
        </div>
      </div>

      <!-- How It Works Section -->
      <div class="bg-white rounded-xl shadow-md p-8 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 text-center mb-8">How It Works</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-white font-bold text-xl">1</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Choose Service</h3>
            <p class="text-gray-600">Select the agricultural service that best fits your needs from our comprehensive list.</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-white font-bold text-xl">2</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Book & Pay</h3>
            <p class="text-gray-600">Book your service online and make secure payment through multiple payment options.</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-white font-bold text-xl">3</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Get Results</h3>
            <p class="text-gray-600">Receive professional service and detailed reports to improve your farming practices.</p>
          </div>
        </div>
      </div>
    </main>

    <!-- Booking Modal -->
    <div v-if="showBookingModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl max-w-md w-full p-6">
        <h3 class="text-xl font-bold text-gray-900 mb-4">Book {{ selectedService.name }}</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
            <input 
              v-model="bookingForm.date"
              type="date" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              :min="new Date().toISOString().split('T')[0]"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
            <select 
              v-model="bookingForm.time"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            >
              <option value="">Select time</option>
              <option value="09:00">9:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="14:00">2:00 PM</option>
              <option value="15:00">3:00 PM</option>
              <option value="16:00">4:00 PM</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Special Requirements</label>
            <textarea 
              v-model="bookingForm.notes"
              rows="3" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="Any specific requirements or notes..."
            ></textarea>
          </div>
          <div class="border-t pt-4">
            <div class="flex justify-between items-center mb-4">
              <span class="text-lg font-semibold">Total Amount:</span>
              <span class="text-2xl font-bold text-primary">₹{{ selectedService.price }}</span>
            </div>
          </div>
        </div>
        <div class="flex space-x-4 mt-6">
          <button 
            @click="closeBookingModal"
            class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            @click="confirmBooking"
            class="flex-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-green-600"
            :disabled="!bookingForm.date || !bookingForm.time"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script>
import { ref } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'

export default {
  name: 'Services',
  components: {
    AppHeader,
    AppFooter
  },
  setup() {
    const showBookingModal = ref(false)
    const selectedService = ref({})
    const bookingForm = ref({
      date: '',
      time: '',
      notes: ''
    })

    const bookService = (serviceName, price) => {
      selectedService.value = { name: serviceName, price }
      showBookingModal.value = true
    }

    const closeBookingModal = () => {
      showBookingModal.value = false
      bookingForm.value = { date: '', time: '', notes: '' }
    }

    const confirmBooking = () => {
      // Here you would typically send the booking data to your backend
      alert(`Booking confirmed for ${selectedService.value.name} on ${bookingForm.value.date} at ${bookingForm.value.time}`)
      closeBookingModal()
    }

    return {
      showBookingModal,
      selectedService,
      bookingForm,
      bookService,
      closeBookingModal,
      confirmBooking
    }
  }
}
</script>
