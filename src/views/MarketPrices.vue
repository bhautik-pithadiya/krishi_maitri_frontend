<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <AppHeader />

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <!-- Page Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Live Market Prices
        </h1>
        <p class="text-lg text-gray-600">
          Real-time crop prices from major markets across India
        </p>
        <div class="mt-4 text-sm text-gray-500">
          Last updated: {{ lastUpdated }}
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-xl shadow-md p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Crop Type</label>
            <select 
              v-model="filters.cropType"
              @change="filterPrices"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            >
              <option value="">All Crops</option>
              <option value="cereals">Cereals</option>
              <option value="pulses">Pulses</option>
              <option value="vegetables">Vegetables</option>
              <option value="fruits">Fruits</option>
              <option value="spices">Spices</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">State</label>
            <select 
              v-model="filters.state"
              @change="filterPrices"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            >
              <option value="">All States</option>
              <option value="Punjab">Punjab</option>
              <option value="Haryana">Haryana</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Gujarat">Gujarat</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Market</label>
            <select 
              v-model="filters.market"
              @change="filterPrices"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            >
              <option value="">All Markets</option>
              <option value="APMC">APMC</option>
              <option value="Mandi">Mandi</option>
              <option value="Private">Private</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input 
              v-model="filters.search"
              @input="filterPrices"
              type="text" 
              placeholder="Search crop..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
            >
          </div>
        </div>
      </div>

      <!-- Price Alerts -->
      <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
        <div class="flex items-center">
          <svg class="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
          </svg>
          <div>
            <h3 class="font-medium text-blue-900">Price Alerts</h3>
            <p class="text-sm text-blue-700">Set price alerts for your crops and get notified when prices reach your target.</p>
          </div>
          <button class="ml-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Set Alert
          </button>
        </div>
      </div>

      <!-- Trending Prices -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-green-50 border border-green-200 rounded-xl p-6">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-semibold text-green-900">Top Gainers</h3>
              <p class="text-2xl font-bold text-green-700">Wheat</p>
              <p class="text-sm text-green-600">+12% this week</p>
            </div>
            <div class="text-green-600">
              <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-red-50 border border-red-200 rounded-xl p-6">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-semibold text-red-900">Top Losers</h3>
              <p class="text-2xl font-bold text-red-700">Onion</p>
              <p class="text-sm text-red-600">-8% this week</p>
            </div>
            <div class="text-red-600">
              <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-semibold text-yellow-900">Most Active</h3>
              <p class="text-2xl font-bold text-yellow-700">Rice</p>
              <p class="text-sm text-yellow-600">High volume trading</p>
            </div>
            <div class="text-yellow-600">
              <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Prices Table -->
      <div class="bg-white rounded-xl shadow-md overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900">Current Market Prices</h2>
        </div>
        
        <!-- Mobile View -->
        <div class="md:hidden">
          <div v-for="price in filteredPrices" :key="price.id" class="border-b border-gray-200 p-4">
            <div class="flex justify-between items-start mb-2">
              <div>
                <h3 class="font-semibold text-gray-900">{{ price.crop }}</h3>
                <p class="text-sm text-gray-600">{{ price.variety }}</p>
              </div>
              <div class="text-right">
                <div class="text-lg font-bold" :class="getPriceColor(price.change)">
                  ₹{{ price.price }}/{{ price.unit }}
                </div>
                <div class="text-sm" :class="getPriceColor(price.change)">
                  {{ price.change > 0 ? '+' : '' }}{{ price.change }}%
                </div>
              </div>
            </div>
            <div class="flex justify-between text-sm text-gray-600">
              <span>{{ price.market }}, {{ price.state }}</span>
              <span>{{ price.date }}</span>
            </div>
          </div>
        </div>

        <!-- Desktop View -->
        <div class="hidden md:block overflow-x-auto">
          <table class="min-w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Crop
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Variety
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Change
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Market
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  State
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="price in filteredPrices" :key="price.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="font-medium text-gray-900">{{ price.crop }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-600">
                  {{ price.variety }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="font-semibold text-gray-900">₹{{ price.price }}/{{ price.unit }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getPriceColor(price.change)" class="font-medium">
                    {{ price.change > 0 ? '+' : '' }}{{ price.change }}%
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-600">
                  {{ price.market }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-600">
                  {{ price.state }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-600">
                  {{ price.date }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <button class="text-primary hover:text-green-600 font-medium text-sm">
                    Set Alert
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Historical Prices Link -->
      <div class="text-center mt-8">
        <button class="bg-primary text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold">
          View Historical Prices
        </button>
      </div>
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'

export default {
  name: 'MarketPrices',
  components: {
    AppHeader,
    AppFooter
  },
  setup() {
    const lastUpdated = ref('')
    const filters = ref({
      cropType: '',
      state: '',
      market: '',
      search: ''
    })

    const allPrices = ref([
      { id: 1, crop: 'Wheat', variety: 'PBW-343', price: 2150, unit: 'quintal', change: 2.5, market: 'APMC', state: 'Punjab', date: '26 Jan 2025', category: 'cereals' },
      { id: 2, crop: 'Rice', variety: 'Basmati 1121', price: 4200, unit: 'quintal', change: -1.2, market: 'Mandi', state: 'Haryana', date: '26 Jan 2025', category: 'cereals' },
      { id: 3, crop: 'Maize', variety: 'Yellow', price: 1850, unit: 'quintal', change: 0.8, market: 'Private', state: 'Uttar Pradesh', date: '26 Jan 2025', category: 'cereals' },
      { id: 4, crop: 'Tomato', variety: 'Hybrid', price: 3200, unit: 'quintal', change: 15.5, market: 'APMC', state: 'Maharashtra', date: '26 Jan 2025', category: 'vegetables' },
      { id: 5, crop: 'Onion', variety: 'Red', price: 1800, unit: 'quintal', change: -8.3, market: 'Mandi', state: 'Karnataka', date: '26 Jan 2025', category: 'vegetables' },
      { id: 6, crop: 'Potato', variety: 'White', price: 1200, unit: 'quintal', change: 3.2, market: 'APMC', state: 'Uttar Pradesh', date: '26 Jan 2025', category: 'vegetables' },
      { id: 7, crop: 'Chickpea', variety: 'Kabuli', price: 5800, unit: 'quintal', change: 4.7, market: 'Private', state: 'Haryana', date: '26 Jan 2025', category: 'pulses' },
      { id: 8, crop: 'Lentil', variety: 'Masoor', price: 6200, unit: 'quintal', change: -2.1, market: 'Mandi', state: 'Punjab', date: '26 Jan 2025', category: 'pulses' },
      { id: 9, crop: 'Soybean', variety: 'JS-335', price: 4800, unit: 'quintal', change: 1.8, market: 'APMC', state: 'Maharashtra', date: '26 Jan 2025', category: 'pulses' },
      { id: 10, crop: 'Turmeric', variety: 'Salem', price: 8500, unit: 'quintal', change: 6.2, market: 'Private', state: 'Tamil Nadu', date: '26 Jan 2025', category: 'spices' },
      { id: 11, crop: 'Coriander', variety: 'Eagle', price: 9200, unit: 'quintal', change: -3.4, market: 'Mandi', state: 'Gujarat', date: '26 Jan 2025', category: 'spices' },
      { id: 12, crop: 'Apple', variety: 'Royal Delicious', price: 12000, unit: 'quintal', change: 8.1, market: 'APMC', state: 'Himachal Pradesh', date: '26 Jan 2025', category: 'fruits' }
    ])

    const filteredPrices = computed(() => {
      let result = allPrices.value

      if (filters.value.cropType) {
        result = result.filter(price => price.category === filters.value.cropType)
      }

      if (filters.value.state) {
        result = result.filter(price => price.state === filters.value.state)
      }

      if (filters.value.market) {
        result = result.filter(price => price.market === filters.value.market)
      }

      if (filters.value.search) {
        const searchTerm = filters.value.search.toLowerCase()
        result = result.filter(price => 
          price.crop.toLowerCase().includes(searchTerm) ||
          price.variety.toLowerCase().includes(searchTerm)
        )
      }

      return result
    })

    const getPriceColor = (change) => {
      if (change > 0) return 'text-green-600'
      if (change < 0) return 'text-red-600'
      return 'text-gray-600'
    }

    const filterPrices = () => {
      // This function is called when filters change
      // In a real app, this might trigger an API call
    }

    onMounted(() => {
      // Set last updated time
      lastUpdated.value = new Date().toLocaleString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    })

    return {
      lastUpdated,
      filters,
      filteredPrices,
      getPriceColor,
      filterPrices
    }
  }
}
</script>
