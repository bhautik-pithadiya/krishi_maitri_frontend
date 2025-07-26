<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <AppHeader />

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Profile Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl shadow-md p-6 sticky top-8">
            <!-- Profile Picture -->
            <div class="text-center mb-6">
              <div class="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span class="text-white text-2xl font-bold">{{ userInitials }}</span>
              </div>
              <h2 class="text-xl font-bold text-gray-900">{{ user.name }}</h2>
              <p class="text-gray-600">{{ user.location }}</p>
              <div class="mt-4">
                <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Verified Farmer
                </span>
              </div>
            </div>

            <!-- Quick Stats -->
            <div class="space-y-4 mb-6">
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Member Since</span>
                <span class="font-medium">{{ user.memberSince }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Services Used</span>
                <span class="font-medium">{{ user.servicesUsed }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Questions Asked</span>
                <span class="font-medium">{{ user.questionsAsked }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Helpful Answers</span>
                <span class="font-medium">{{ user.helpfulAnswers }}</span>
              </div>
            </div>

            <!-- Language Settings -->
            <div class="border-t pt-4">
              <h3 class="font-semibold text-gray-900 mb-3">Language Preference</h3>
              <select 
                v-model="user.language"
                @change="updateLanguage"
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
          </div>
        </div>

        <!-- Main Profile Content -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Profile Information -->
          <div class="bg-white rounded-xl shadow-md">
            <div class="p-6 border-b border-gray-200">
              <div class="flex justify-between items-center">
                <h2 class="text-xl font-semibold text-gray-900">Profile Information</h2>
                <button 
                  @click="toggleEdit"
                  class="text-primary hover:text-green-600 font-medium"
                >
                  {{ isEditing ? 'Cancel' : 'Edit Profile' }}
                </button>
              </div>
            </div>
            <div class="p-6">
              <form @submit.prevent="saveProfile">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input 
                      v-model="editableUser.name"
                      type="text" 
                      :disabled="!isEditing"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary disabled:bg-gray-100"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                    <input 
                      v-model="editableUser.mobile"
                      type="tel" 
                      :disabled="!isEditing"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary disabled:bg-gray-100"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input 
                      v-model="editableUser.email"
                      type="email" 
                      :disabled="!isEditing"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary disabled:bg-gray-100"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Village/City</label>
                    <input 
                      v-model="editableUser.location"
                      type="text" 
                      :disabled="!isEditing"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary disabled:bg-gray-100"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">State</label>
                    <select 
                      v-model="editableUser.state"
                      :disabled="!isEditing"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary disabled:bg-gray-100"
                    >
                      <option value="">Select State</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="West Bengal">West Bengal</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Farm Size (acres)</label>
                    <input 
                      v-model="editableUser.farmSize"
                      type="number" 
                      :disabled="!isEditing"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary disabled:bg-gray-100"
                    >
                  </div>
                </div>
                
                <div class="mt-6">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Primary Crops</label>
                  <textarea 
                    v-model="editableUser.primaryCrops"
                    rows="3" 
                    :disabled="!isEditing"
                    placeholder="e.g., Rice, Wheat, Sugarcane"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary disabled:bg-gray-100"
                  ></textarea>
                </div>

                <div v-if="isEditing" class="mt-6 flex space-x-4">
                  <button 
                    type="submit"
                    class="bg-primary text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors"
                  >
                    Save Changes
                  </button>
                  <button 
                    type="button"
                    @click="cancelEdit"
                    class="border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="bg-white rounded-xl shadow-md">
            <div class="p-6 border-b border-gray-200">
              <h2 class="text-xl font-semibold text-gray-900">Recent Activity</h2>
            </div>
            <div class="p-6">
              <div class="space-y-4">
                <div v-for="activity in recentActivity" :key="activity.id" class="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-b-0">
                  <div :class="getActivityIcon(activity.type)" class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path v-if="activity.type === 'service'" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      <path v-else-if="activity.type === 'question'" fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7z" clip-rule="evenodd"/>
                      <path v-else d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <p class="text-gray-900">{{ activity.description }}</p>
                    <p class="text-sm text-gray-500 mt-1">{{ activity.time }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Services History -->
          <div class="bg-white rounded-xl shadow-md">
            <div class="p-6 border-b border-gray-200">
              <h2 class="text-xl font-semibold text-gray-900">Services History</h2>
            </div>
            <div class="p-6">
              <div class="space-y-4">
                <div v-for="service in serviceHistory" :key="service.id" class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 class="font-semibold text-gray-900">{{ service.name }}</h3>
                    <p class="text-sm text-gray-600">{{ service.date }}</p>
                    <p class="text-xs text-gray-500">{{ service.description }}</p>
                  </div>
                  <div class="text-right">
                    <span :class="getStatusColor(service.status)" class="px-3 py-1 rounded-full text-xs font-medium">
                      {{ service.status }}
                    </span>
                    <p class="text-sm font-semibold text-gray-900 mt-1">₹{{ service.amount }}</p>
                  </div>
                </div>
              </div>
              <div class="text-center mt-6">
                <router-link 
                  to="/services"
                  class="text-primary hover:text-green-600 font-medium"
                >
                  View All Services →
                </router-link>
              </div>
            </div>
          </div>
        </div>
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
  name: 'Profile',
  components: {
    AppHeader,
    AppFooter
  },
  setup() {
    const isEditing = ref(false)
    
    const user = ref({
      name: 'Rajesh Kumar',
      mobile: '9876543210',
      email: 'rajesh.kumar@email.com',
      location: 'Amritsar',
      state: 'Punjab',
      farmSize: 5,
      primaryCrops: 'Wheat, Rice, Sugarcane',
      language: 'en',
      memberSince: 'Jan 2024',
      servicesUsed: 12,
      questionsAsked: 8,
      helpfulAnswers: 15
    })

    const editableUser = ref({ ...user.value })

    const recentActivity = ref([
      {
        id: 1,
        type: 'service',
        description: 'Completed soil testing service for Field A',
        time: '2 days ago'
      },
      {
        id: 2,
        type: 'question',
        description: 'Asked question about tomato disease management',
        time: '5 days ago'
      },
      {
        id: 3,
        type: 'market',
        description: 'Checked wheat prices in Punjab markets',
        time: '1 week ago'
      },
      {
        id: 4,
        type: 'service',
        description: 'Booked expert consultation for crop planning',
        time: '2 weeks ago'
      }
    ])

    const serviceHistory = ref([
      {
        id: 1,
        name: 'Soil Testing',
        date: 'Jan 20, 2025',
        description: 'Comprehensive soil analysis with fertilizer recommendations',
        status: 'Completed',
        amount: 500
      },
      {
        id: 2,
        name: 'Expert Consultation',
        date: 'Jan 15, 2025',
        description: 'Video consultation for pest management',
        status: 'Completed',
        amount: 300
      },
      {
        id: 3,
        name: 'Equipment Rental',
        date: 'Jan 10, 2025',
        description: 'Tractor rental for field preparation',
        status: 'Completed',
        amount: 1500
      },
      {
        id: 4,
        name: 'Weather Advisory',
        date: 'Jan 1, 2025',
        description: 'Monthly weather forecast subscription',
        status: 'Active',
        amount: 200
      }
    ])

    const userInitials = computed(() => {
      return user.value.name.split(' ').map(name => name.charAt(0)).join('').toUpperCase()
    })

    const toggleEdit = () => {
      isEditing.value = !isEditing.value
      if (isEditing.value) {
        editableUser.value = { ...user.value }
      }
    }

    const cancelEdit = () => {
      isEditing.value = false
      editableUser.value = { ...user.value }
    }

    const saveProfile = () => {
      user.value = { ...editableUser.value }
      // Here you would typically save to backend
      localStorage.setItem('user', JSON.stringify(user.value))
      isEditing.value = false
      alert('Profile updated successfully!')
    }

    const updateLanguage = () => {
      // Here you would typically save language preference to backend
      localStorage.setItem('user', JSON.stringify(user.value))
      alert('Language preference updated!')
    }

    const getActivityIcon = (type) => {
      switch (type) {
        case 'service':
          return 'bg-green-500'
        case 'question':
          return 'bg-blue-500'
        case 'market':
          return 'bg-brown'
        default:
          return 'bg-gray-500'
      }
    }

    const getStatusColor = (status) => {
      switch (status) {
        case 'Completed':
          return 'bg-green-100 text-green-800'
        case 'Active':
          return 'bg-blue-100 text-blue-800'
        case 'Pending':
          return 'bg-yellow-100 text-yellow-800'
        default:
          return 'bg-gray-100 text-gray-800'
      }
    }

    onMounted(() => {
      // Load user data from localStorage
      const savedUser = localStorage.getItem('user')
      if (savedUser) {
        const userData = JSON.parse(savedUser)
        
        // Map API response structure to profile structure
        const mappedUser = {
          name: userData.display_name || userData.name || 'Farmer',
          mobile: userData.mobile || userData.phone_number || '',
          email: userData.email || '',
          location: userData.farmDetails?.location?.address || userData.location || '',
          state: extractStateFromLocation(userData.farmDetails?.location?.address || userData.location || ''),
          farmSize: userData.farmDetails?.farmSize || '',
          primaryCrops: userData.farmDetails?.cropName || '',
          language: userData.language || 'en',
          memberSince: userData.created_at ? new Date(userData.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Jan 2024',
          servicesUsed: 12, // This would come from another API call
          questionsAsked: 8, // This would come from another API call
          helpfulAnswers: 15 // This would come from another API call
        }
        
        user.value = { ...user.value, ...mappedUser }
        editableUser.value = { ...user.value }
      }
    })

    const extractStateFromLocation = (location) => {
      // Simple function to extract state from address string
      const parts = location.split(',')
      if (parts.length >= 2) {
        return parts[parts.length - 2].trim()
      }
      return 'India'
    }

    return {
      isEditing,
      user,
      editableUser,
      recentActivity,
      serviceHistory,
      userInitials,
      toggleEdit,
      cancelEdit,
      saveProfile,
      updateLanguage,
      getActivityIcon,
      getStatusColor
    }
  }
}
</script>
