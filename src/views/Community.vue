<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <AppHeader />

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <!-- Page Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Farmer Community Forum
        </h1>
        <p class="text-lg text-gray-600">
          Connect with fellow farmers, share experiences, and get expert advice
        </p>
      </div>

      <!-- Stats Bar -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-white rounded-lg p-4 text-center shadow-sm">
          <div class="text-2xl font-bold text-primary">15.2K</div>
          <div class="text-sm text-gray-600">Active Members</div>
        </div>
        <div class="bg-white rounded-lg p-4 text-center shadow-sm">
          <div class="text-2xl font-bold text-brown">2.8K</div>
          <div class="text-sm text-gray-600">Discussions</div>
        </div>
        <div class="bg-white rounded-lg p-4 text-center shadow-sm">
          <div class="text-2xl font-bold text-earth-600">450</div>
          <div class="text-sm text-gray-600">Experts</div>
        </div>
        <div class="bg-white rounded-lg p-4 text-center shadow-sm">
          <div class="text-2xl font-bold text-green-600">98%</div>
          <div class="text-sm text-gray-600">Solved</div>
        </div>
      </div>

      <!-- Categories and Ask Question -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Categories Sidebar -->
        <div class="bg-white rounded-xl shadow-md p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
          <div class="space-y-2">
            <button 
              v-for="category in categories" 
              :key="category.id"
              @click="selectedCategory = category.id"
              :class="[
                'w-full text-left px-3 py-2 rounded-lg transition-colors',
                selectedCategory === category.id 
                  ? 'bg-primary text-white' 
                  : 'hover:bg-gray-100 text-gray-700'
              ]"
            >
              <div class="flex items-center justify-between">
                <span class="text-sm">{{ category.name }}</span>
                <span class="text-xs">{{ category.count }}</span>
              </div>
            </button>
          </div>
          
          <!-- Ask Question Button -->
          <button 
            @click="showAskModal = true"
            class="w-full mt-6 bg-primary text-white px-4 py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold"
          >
            <svg class="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"/>
            </svg>
            Ask a Question
          </button>
        </div>

        <!-- Discussion Threads -->
        <div class="lg:col-span-3 space-y-6">
          <!-- Featured Discussion -->
          <div class="bg-gradient-to-r from-green-50 to-earth-50 border border-green-200 rounded-xl p-6">
            <div class="flex items-start space-x-3">
              <div class="bg-green-600 text-white rounded-full p-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="flex-1">
                <div class="bg-green-600 text-white text-xs font-medium px-2 py-1 rounded-full inline-block mb-2">
                  FEATURED
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">
                  Best Practices for Organic Farming in Monsoon Season
                </h3>
                <p class="text-gray-600 mb-3">
                  Join our expert-led discussion on sustainable farming techniques during the rainy season. Share your experiences and learn from successful organic farmers.
                </p>
                <div class="flex items-center text-sm text-gray-500">
                  <span>Dr. Priya Sharma • Agricultural Expert</span>
                  <span class="mx-2">•</span>
                  <span>245 participants</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Discussion Cards -->
          <div v-for="thread in filteredThreads" :key="thread.id" class="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div class="p-6">
              <!-- Thread Header -->
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center space-x-3">
                  <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                    {{ thread.author.charAt(0).toUpperCase() }}
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900">{{ thread.author }}</h3>
                    <p class="text-sm text-gray-500">{{ thread.location }} • {{ thread.timeAgo }}</p>
                  </div>
                </div>
                <span :class="getCategoryColor(thread.category)" class="px-2 py-1 rounded-full text-xs font-medium">
                  {{ getCategoryName(thread.category) }}
                </span>
              </div>

              <!-- Thread Content -->
              <h2 class="text-lg font-semibold text-gray-900 mb-3 cursor-pointer hover:text-primary" @click="openThread(thread)">
                {{ thread.title }}
              </h2>
              <p class="text-gray-600 mb-4 line-clamp-2">
                {{ thread.preview }}
              </p>

              <!-- Thread Stats -->
              <div class="flex items-center justify-between text-sm text-gray-500">
                <div class="flex items-center space-x-4">
                  <div class="flex items-center space-x-1">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd"/>
                    </svg>
                    <span>{{ thread.replies }} replies</span>
                  </div>
                  <div class="flex items-center space-x-1">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                      <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                    </svg>
                    <span>{{ thread.views }} views</span>
                  </div>
                  <div class="flex items-center space-x-1">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
                    </svg>
                    <span>{{ thread.likes }} likes</span>
                  </div>
                </div>
                <div v-if="thread.hasExpertReply" class="flex items-center text-green-600">
                  <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-xs">Expert Reply</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Load More -->
          <div class="text-center">
            <button class="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors">
              Load More Discussions
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Ask Question Modal -->
    <div v-if="showAskModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <h3 class="text-xl font-bold text-gray-900 mb-6">Ask a Question</h3>
        <form @submit.prevent="submitQuestion">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select 
                v-model="questionForm.category"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                required
              >
                <option value="">Select a category</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Question Title</label>
              <input 
                v-model="questionForm.title"
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="What's your farming question?"
                required
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Describe your question</label>
              <textarea 
                v-model="questionForm.description"
                rows="6" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Provide details about your farming situation, what you've tried, and what specific help you need..."
                required
              ></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Add Tags (optional)</label>
              <input 
                v-model="questionForm.tags"
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="e.g. rice, organic, pest-control (separate with commas)"
              >
            </div>
          </div>
          <div class="flex space-x-4 mt-6">
            <button 
              type="button"
              @click="closeAskModal"
              class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              type="submit"
              class="flex-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-green-600"
            >
              Post Question
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'

export default {
  name: 'Community',
  components: {
    AppHeader,
    AppFooter
  },
  setup() {
    const selectedCategory = ref('all')
    const showAskModal = ref(false)

    const categories = ref([
      { id: 'all', name: 'All Categories', count: '2.8K' },
      { id: 'crop-management', name: 'Crop Management', count: '892' },
      { id: 'pest-disease', name: 'Pest & Disease', count: '645' },
      { id: 'soil-fertilizer', name: 'Soil & Fertilizer', count: '523' },
      { id: 'irrigation', name: 'Irrigation', count: '387' },
      { id: 'machinery', name: 'Farm Machinery', count: '298' },
      { id: 'organic-farming', name: 'Organic Farming', count: '234' },
      { id: 'marketing', name: 'Marketing & Sales', count: '189' },
      { id: 'government-schemes', name: 'Govt Schemes', count: '156' }
    ])

    const threads = ref([
      {
        id: 1,
        title: 'Brown spots appearing on tomato leaves - Need urgent help',
        preview: 'I have been growing tomatoes for the past 3 months and recently noticed brown spots appearing on the leaves. The spots are getting bigger and some leaves are turning yellow...',
        author: 'Rajesh Kumar',
        location: 'Punjab',
        timeAgo: '2 hours ago',
        category: 'pest-disease',
        replies: 12,
        views: 156,
        likes: 23,
        hasExpertReply: true
      },
      {
        id: 2,
        title: 'Best time to sow wheat in North India this season?',
        preview: 'With changing weather patterns, I am confused about the optimal sowing time for wheat in North India. Last year I sowed in November but got mixed results...',
        author: 'Priya Singh',
        location: 'Haryana',
        timeAgo: '4 hours ago',
        category: 'crop-management',
        replies: 8,
        views: 89,
        likes: 15,
        hasExpertReply: false
      },
      {
        id: 3,
        title: 'Drip irrigation system setup cost and benefits',
        preview: 'I am planning to install a drip irrigation system for my 5-acre farm. Can someone share their experience with setup costs, maintenance, and water savings achieved?',
        author: 'Arun Patel',
        location: 'Gujarat',
        timeAgo: '6 hours ago',
        category: 'irrigation',
        replies: 18,
        views: 267,
        likes: 31,
        hasExpertReply: true
      },
      {
        id: 4,
        title: 'Organic fertilizer recipe for vegetable crops',
        preview: 'Looking for a proven organic fertilizer recipe that works well for mixed vegetable farming. I want to reduce chemical dependency and improve soil health naturally...',
        author: 'Sunita Devi',
        location: 'Uttar Pradesh',
        timeAgo: '8 hours ago',
        category: 'organic-farming',
        replies: 25,
        views: 342,
        likes: 47,
        hasExpertReply: true
      },
      {
        id: 5,
        title: 'PM-KISAN scheme benefits not received - What to do?',
        preview: 'I applied for PM-KISAN scheme 6 months ago but have not received any installment yet. My application status shows approved but no money in bank account...',
        author: 'Mohan Yadav',
        location: 'Madhya Pradesh',
        timeAgo: '1 day ago',
        category: 'government-schemes',
        replies: 14,
        views: 198,
        likes: 19,
        hasExpertReply: false
      },
      {
        id: 6,
        title: 'Used tractor buying guide and things to check',
        preview: 'Planning to buy a used tractor for my farm. What are the key things I should check before purchasing? Any specific brands or models recommended for small farms?',
        author: 'Vikram Singh',
        location: 'Rajasthan',
        timeAgo: '1 day ago',
        category: 'machinery',
        replies: 22,
        views: 445,
        likes: 38,
        hasExpertReply: true
      }
    ])

    const questionForm = ref({
      category: '',
      title: '',
      description: '',
      tags: ''
    })

    const filteredThreads = computed(() => {
      if (selectedCategory.value === 'all') {
        return threads.value
      }
      return threads.value.filter(thread => thread.category === selectedCategory.value)
    })

    const getCategoryName = (categoryId) => {
      const category = categories.value.find(cat => cat.id === categoryId)
      return category ? category.name : 'General'
    }

    const getCategoryColor = (categoryId) => {
      const colors = {
        'crop-management': 'bg-green-100 text-green-800',
        'pest-disease': 'bg-red-100 text-red-800',
        'soil-fertilizer': 'bg-brown text-white',
        'irrigation': 'bg-blue-100 text-blue-800',
        'machinery': 'bg-gray-100 text-gray-800',
        'organic-farming': 'bg-green-100 text-green-800',
        'marketing': 'bg-purple-100 text-purple-800',
        'government-schemes': 'bg-yellow-100 text-yellow-800'
      }
      return colors[categoryId] || 'bg-gray-100 text-gray-800'
    }

    const openThread = (thread) => {
      // In a real app, this would navigate to the thread detail page
      console.log('Opening thread:', thread.title)
    }

    const closeAskModal = () => {
      showAskModal.value = false
      questionForm.value = {
        category: '',
        title: '',
        description: '',
        tags: ''
      }
    }

    const submitQuestion = () => {
      // Here you would submit the question to your backend
      alert('Question posted successfully!')
      closeAskModal()
    }

    return {
      selectedCategory,
      showAskModal,
      categories,
      filteredThreads,
      questionForm,
      getCategoryName,
      getCategoryColor,
      openThread,
      closeAskModal,
      submitQuestion
    }
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
