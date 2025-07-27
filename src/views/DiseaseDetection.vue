<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <AppHeader />

    <!-- Authentication Loading -->
    <div v-if="isCheckingAuth" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
        <p class="text-gray-600">{{ $t('diseaseDetection.checkingAuth') }}</p>
      </div>
    </div>

    <!-- Main Content -->
    <main v-else class="container mx-auto px-4 py-8 max-w-4xl">
      <!-- Page Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          {{ $t('diseaseDetection.title') }}
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          {{ $t('diseaseDetection.subtitle') }}
        </p>
      </div>

      <!-- Main Content Area -->
      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <!-- Upload Section -->
        <div class="p-8 border-b border-gray-200">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">
            {{ $t('diseaseDetection.uploadTitle') }}
          </h2>
          
          <!-- Crop Selection -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ $t('diseaseDetection.selectCrop') }}
            </label>
            <select 
              v-model="selectedCrop"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              required
            >
              <option value="">{{ $t('diseaseDetection.selectCropPlaceholder') }}</option>
              <option value="rice">{{ $t('diseaseDetection.crops.rice') }}</option>
              <option value="wheat">{{ $t('diseaseDetection.crops.wheat') }}</option>
              <option value="corn">{{ $t('diseaseDetection.crops.corn') }}</option>
              <option value="cotton">{{ $t('diseaseDetection.crops.cotton') }}</option>
              <option value="sugarcane">{{ $t('diseaseDetection.crops.sugarcane') }}</option>
              <option value="tomato">{{ $t('diseaseDetection.crops.tomato') }}</option>
              <option value="potato">{{ $t('diseaseDetection.crops.potato') }}</option>
              <option value="soybean">{{ $t('diseaseDetection.crops.soybean') }}</option>
              <option value="groundnut">{{ $t('diseaseDetection.crops.groundnut') }}</option>
              <option value="other">{{ $t('diseaseDetection.crops.other') }}</option>
            </select>
          </div>
          
          <!-- Camera and Upload Options -->
          <div v-if="!selectedImage && !isCameraOpen" class="flex flex-col sm:flex-row gap-4 mb-6">
            <button 
              @click="openCamera"
              class="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center space-x-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span>{{ $t('diseaseDetection.openCamera') }}</span>
            </button>
            <div class="flex-1 text-center py-3">
              <span class="text-gray-500">{{ $t('diseaseDetection.orText') }}</span>
            </div>
          </div>

          <!-- Camera View -->
          <div v-if="isCameraOpen" class="mb-6">
            <div class="bg-black rounded-lg p-4">
              <video 
                ref="videoRef" 
                autoplay 
                playsinline
                class="w-full max-h-96 rounded-lg"
              ></video>
              <div class="flex justify-center space-x-4 mt-4">
                <button 
                  @click="captureImage"
                  class="bg-white text-black py-3 px-6 rounded-full hover:bg-gray-100 transition-colors font-semibold flex items-center space-x-2"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <span>{{ $t('diseaseDetection.captureButton') }}</span>
                </button>
                <button 
                  @click="closeCamera"
                  class="bg-red-600 text-white py-3 px-6 rounded-full hover:bg-red-700 transition-colors font-semibold"
                >
                  {{ $t('diseaseDetection.cancelButton') }}
                </button>
              </div>
            </div>
          </div>

          <!-- Hidden Canvas for Image Capture -->
          <canvas ref="canvasRef" style="display: none;"></canvas>
          
          <!-- Upload Area -->
          <div 
            v-if="!isCameraOpen"
            @click="triggerFileInput"
            @dragover.prevent="onDragOver"
            @dragleave.prevent="onDragLeave"
            @drop.prevent="onDrop"
            :class="[
              'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
              isDragOver 
                ? 'border-primary bg-green-50' 
                : 'border-gray-300 hover:border-primary hover:bg-gray-50'
            ]"
          >
            <div v-if="!selectedImage" class="space-y-4">
              <svg class="w-16 h-16 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
              </svg>
              <div>
                <p class="text-xl font-medium text-gray-900 mb-2">
                  {{ $t('diseaseDetection.uploadInstruction') }}
                </p>
                <p class="text-gray-500 text-sm">
                  {{ $t('diseaseDetection.uploadHint') }}
                </p>
              </div>
            </div>
            
            <!-- Preview -->
            <div v-else class="space-y-4">
              <img :src="imagePreview" alt="Uploaded plant" class="max-h-64 mx-auto rounded-lg shadow-md">
              <div class="flex items-center justify-center space-x-4">
                <button 
                  @click.stop="analyzeImage"
                  :disabled="isAnalyzing"
                  class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-green-600 transition-colors font-semibold disabled:opacity-50"
                >
                  {{ isAnalyzing ? $t('diseaseDetection.analyzing') : $t('diseaseDetection.analyzeButton') }}
                </button>
                <button 
                  @click.stop="clearImage"
                  class="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold"
                >
                  {{ $t('diseaseDetection.clearButton') }}
                </button>
              </div>
            </div>
          </div>
          
          <!-- Hidden File Input -->
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            @change="onFileSelected"
            class="hidden"
          >
        </div>

        <!-- Error Section -->
        <div v-if="apiError" class="p-8">
          <div class="bg-red-50 border border-red-200 rounded-lg p-6">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-red-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
              </svg>
              <div>
                <h3 class="text-red-800 font-semibold">{{ $t('diseaseDetection.errorTitle') }}</h3>
                <p class="text-red-700 mt-1">{{ apiError }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Results Section -->
        <div v-if="analysisResult" class="p-8">
          <h3 class="text-2xl font-bold text-gray-900 mb-6">
            {{ $t('diseaseDetection.resultsTitle') }}
          </h3>
          
          <!-- Disease Detection Result -->
          <div class="bg-gray-50 rounded-lg p-6 mb-6">
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <div :class="[
                  'w-12 h-12 rounded-full flex items-center justify-center',
                  analysisResult.isHealthy ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                ]">
                  <svg v-if="analysisResult.isHealthy" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <svg v-else class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                  </svg>
                </div>
              </div>
              <div class="flex-1">
                <h4 class="text-lg font-semibold text-gray-900 mb-2">
                  {{ analysisResult.isHealthy ? $t('diseaseDetection.healthyPlant') : $t('diseaseDetection.diseaseDetected') }}
                </h4>
                <p class="text-gray-600 mb-4 font-medium">
                  {{ analysisResult.disease }}
                </p>
              </div>
            </div>
          </div>

          <!-- Recommendation -->
          <div v-if="analysisResult.recommendation" class="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 class="text-lg font-semibold text-blue-900 mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
              {{ $t('diseaseDetection.recommendationTitle') }}
            </h4>
            <div class="text-blue-800 whitespace-pre-line">
              {{ analysisResult.recommendation }}
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
import { ref, nextTick, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import { diseaseDetectionAPI } from '../config/diseaseAPI.js'

const router = useRouter()

// Authentication check
const checkAuthentication = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  const authToken = localStorage.getItem('access_token')
  
  if (!isAuthenticated || !authToken) {
    router.push('/login')
    return false
  }
  isCheckingAuth.value = false
  return true
}

// Check authentication on component mount
onMounted(() => {
  checkAuthentication()
})

// Reactive state
const fileInput = ref(null)
const selectedImage = ref(null)
const imagePreview = ref('')
const selectedCrop = ref('')
const isDragOver = ref(false)
const isAnalyzing = ref(false)
const analysisResult = ref(null)
const apiError = ref('')
const isCameraOpen = ref(false)
const videoRef = ref(null)
const canvasRef = ref(null)
const stream = ref(null)
const isCheckingAuth = ref(true)

// File handling methods
const triggerFileInput = () => {
  fileInput.value.click()
}

const onFileSelected = (event) => {
  const file = event.target.files[0]
  if (file && file.type.startsWith('image/')) {
    selectedImage.value = file
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const onDragOver = (event) => {
  isDragOver.value = true
}

const onDragLeave = (event) => {
  isDragOver.value = false
}

const onDrop = (event) => {
  isDragOver.value = false
  const files = event.dataTransfer.files
  if (files.length > 0 && files[0].type.startsWith('image/')) {
    selectedImage.value = files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target.result
    }
    reader.readAsDataURL(files[0])
  }
}

const clearImage = () => {
  selectedImage.value = null
  imagePreview.value = ''
  analysisResult.value = null
  fileInput.value.value = ''
}

// Camera methods
const openCamera = async () => {
  try {
    stream.value = await navigator.mediaDevices.getUserMedia({ 
      video: { 
        facingMode: 'environment' // Use back camera on mobile
      } 
    })
    isCameraOpen.value = true
    
    await nextTick()
    if (videoRef.value) {
      videoRef.value.srcObject = stream.value
    }
  } catch (error) {
    console.error('Error accessing camera:', error)
    apiError.value = 'Unable to access camera. Please check permissions.'
  }
}

const closeCamera = () => {
  if (stream.value) {
    stream.value.getTracks().forEach(track => track.stop())
    stream.value = null
  }
  isCameraOpen.value = false
}

const captureImage = () => {
  if (videoRef.value && canvasRef.value) {
    const canvas = canvasRef.value
    const video = videoRef.value
    
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    
    const ctx = canvas.getContext('2d')
    ctx.drawImage(video, 0, 0)
    
    // Convert canvas to blob
    canvas.toBlob((blob) => {
      if (blob) {
        selectedImage.value = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' })
        imagePreview.value = canvas.toDataURL('image/jpeg')
        closeCamera()
      }
    }, 'image/jpeg', 0.8)
  }
}

// Analysis methods
const analyzeImage = async () => {
  // Check authentication before proceeding
  if (!checkAuthentication()) {
    return
  }
  
  if (!selectedImage.value) {
    apiError.value = 'Please select an image first'
    return
  }
  
  if (!selectedCrop.value) {
    apiError.value = 'Please select a crop type first'
    return
  }
  
  isAnalyzing.value = true
  apiError.value = ''
  
  try {
    // Call the real API
    const response = await diseaseDetectionAPI.predictDisease(selectedImage.value, selectedCrop.value)
    
    // Transform API response to match UI expectations
    analysisResult.value = {
      disease: response.disease,
      recommendation: response.recommendation,
      isHealthy: response.disease.toLowerCase().includes('healthy') || 
                response.disease.toLowerCase().includes('no disease') ||
                response.disease.toLowerCase().includes('normal'),
      description: response.disease
    }
    
  } catch (error) {
    console.error('Disease analysis failed:', error)
    
    // Handle authentication errors specifically
    if (error.message && (error.message.includes('Authentication') || error.message.includes('token') || error.message.includes('401'))) {
      // Clear authentication and redirect to login
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('access_token')
      router.push('/login')
      return
    }
    
    apiError.value = error.message || 'Failed to analyze image. Please try again.'
  } finally {
    isAnalyzing.value = false
  }
}

const clearResults = () => {
  analysisResult.value = null
  selectedCrop.value = ''
  apiError.value = null
  closeCamera()
  clearImage()
}
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
