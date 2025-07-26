<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <AppHeader />

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8 max-w-4xl">
      <!-- Page Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          {{ $t('voiceAssistant.title') }}
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          {{ $t('voiceAssistant.subtitle') }}
        </p>
      </div>

      <!-- Chat Container -->
      <div class="bg-white rounded-xl shadow-lg h-[600px] flex flex-col">
        <!-- Chat Messages -->
        <div class="flex-1 p-6 overflow-y-auto" ref="chatContainer">
          <div v-if="messages.length === 0" class="text-center text-gray-500 mt-20">
            <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4z"/>
              <path d="M5.5 9.643a.75.75 0 00-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-1.5v-1.546A6.001 6.001 0 0016 10v-.357a.75.75 0 00-1.5 0V10a4.5 4.5 0 01-9 0v-.357z"/>
            </svg>
            <p class="text-lg">{{ $t('voiceAssistant.welcomeMessage') }}</p>
            <p class="text-sm mt-2">{{ $t('voiceAssistant.instructionMessage') }}</p>
          </div>

          <!-- Messages -->
          <div v-for="(message, index) in messages" :key="index" class="mb-6">
            <!-- User Message -->
            <div v-if="message.type === 'user'" class="flex justify-end">
              <div class="bg-primary text-white rounded-lg p-4 max-w-xs lg:max-w-md">
                <p>{{ message.text }}</p>
                <div class="text-xs mt-2 opacity-75">{{ formatTime(message.timestamp) }}</div>
              </div>
            </div>

            <!-- AI Response -->
            <div v-if="message.type === 'ai'" class="flex justify-start">
              <div class="bg-gray-100 text-gray-900 rounded-lg p-4 max-w-xs lg:max-w-md">
                <div class="flex items-center mb-2">
                  <div class="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-2">
                    <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                  <span class="text-sm font-semibold text-primary">{{ $t('voiceAssistant.aiName') }}</span>
                </div>
                <p>{{ message.text }}</p>
                <div class="text-xs mt-2 text-gray-500">{{ formatTime(message.timestamp) }}</div>
              </div>
            </div>

            <!-- Typing indicator -->
            <div v-if="message.type === 'typing'" class="flex justify-start">
              <div class="bg-gray-100 text-gray-900 rounded-lg p-4 max-w-xs lg:max-w-md">
                <div class="flex items-center">
                  <div class="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-2">
                    <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                  <div class="flex space-x-1">
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Input Area -->
        <div class="border-t p-6">
          <!-- Current transcription -->
          <div v-if="currentTranscription" class="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p class="text-sm text-blue-800">{{ $t('voiceAssistant.transcribing') }}: "{{ currentTranscription }}"</p>
          </div>

          <!-- Voice Input Controls -->
          <div class="flex items-center justify-center space-x-4">
            <!-- Microphone Button -->
            <button
              @click="toggleListening"
              :class="[
                'w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 transform',
                isListening 
                  ? 'bg-red-500 hover:bg-red-600 scale-110 animate-pulse' 
                  : 'bg-primary hover:bg-green-600 hover:scale-105'
              ]"
              :disabled="!speechSupported"
            >
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path v-if="!isListening" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4z"/>
                <path v-if="!isListening" d="M5.5 9.643a.75.75 0 00-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-1.5v-1.546A6.001 6.001 0 0016 10v-.357a.75.75 0 00-1.5 0V10a4.5 4.5 0 01-9 0v-.357z"/>
                <path v-if="isListening" fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a2 2 0 114 0v4a2 2 0 11-4 0V7z" clip-rule="evenodd"/>
              </svg>
            </button>

            <!-- Status Text -->
            <div class="text-center">
              <p v-if="!speechSupported" class="text-red-500 text-sm">
                {{ $t('voiceAssistant.notSupported') }}
              </p>
              <p v-else-if="isListening" class="text-red-500 text-sm font-medium">
                {{ $t('voiceAssistant.listening') }}
              </p>
              <p v-else class="text-gray-600 text-sm">
                {{ $t('voiceAssistant.clickToTalk') }}
              </p>
            </div>

            <!-- Clear Chat Button -->
            <button
              @click="clearChat"
              v-if="messages.length > 0"
              class="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {{ $t('voiceAssistant.clearChat') }}
            </button>
          </div>

          <!-- Language Selector -->
          <div class="mt-4 text-center">
            <select 
              v-model="selectedLanguage" 
              @change="updateLanguage"
              class="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-primary focus:border-primary"
            >
              <option value="hi-IN">हिंदी (Hindi)</option>
              <option value="en-IN">English (India)</option>
              <option value="gu-IN">ગુજરાતી (Gujarati)</option>
              <option value="mr-IN">मराठी (Marathi)</option>
              <option value="bn-IN">বাংলা (Bengali)</option>
              <option value="ta-IN">தமிழ் (Tamil)</option>
              <option value="te-IN">తెలుగు (Telugu)</option>
              <option value="kn-IN">ಕನ್ನಡ (Kannada)</option>
              <option value="pa-IN">ਪੰਜਾਬੀ (Punjabi)</option>
            </select>
            <p class="text-xs text-gray-500 mt-1">{{ $t('voiceAssistant.selectLanguage') }}</p>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, onUnmounted } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'

// Reactive state
const messages = ref([])
const isListening = ref(false)
const currentTranscription = ref('')
const speechSupported = ref(false)
const selectedLanguage = ref('hi-IN')
const chatContainer = ref(null)

// Speech recognition setup
let recognition = null

onMounted(() => {
  // Check for speech recognition support
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    speechSupported.value = true
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    recognition = new SpeechRecognition()
    
    // Configure recognition
    recognition.continuous = false
    recognition.interimResults = true
    recognition.lang = selectedLanguage.value
    
    // Event handlers
    recognition.onstart = () => {
      isListening.value = true
      currentTranscription.value = ''
    }
    
    recognition.onresult = (event) => {
      let interimTranscript = ''
      let finalTranscript = ''
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          finalTranscript += transcript
        } else {
          interimTranscript += transcript
        }
      }
      
      currentTranscription.value = interimTranscript
      
      if (finalTranscript) {
        handleUserMessage(finalTranscript.trim())
      }
    }
    
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error)
      isListening.value = false
      currentTranscription.value = ''
    }
    
    recognition.onend = () => {
      isListening.value = false
      currentTranscription.value = ''
    }
  }
})

onUnmounted(() => {
  if (recognition) {
    recognition.stop()
  }
})

// Methods
const toggleListening = () => {
  if (!speechSupported.value) return
  
  if (isListening.value) {
    recognition.stop()
  } else {
    recognition.start()
  }
}

const handleUserMessage = async (text) => {
  if (!text.trim()) return
  
  // Add user message
  const userMessage = {
    type: 'user',
    text: text,
    timestamp: new Date()
  }
  messages.value.push(userMessage)
  
  // Add typing indicator
  const typingMessage = { type: 'typing' }
  messages.value.push(typingMessage)
  
  // Scroll to bottom
  await nextTick()
  scrollToBottom()
  
  // Simulate AI response (replace with actual AI API call)
  setTimeout(() => {
    // Remove typing indicator
    messages.value = messages.value.filter(msg => msg.type !== 'typing')
    
    // Add AI response
    const aiResponse = {
      type: 'ai',
      text: getAIResponse(text),
      timestamp: new Date()
    }
    messages.value.push(aiResponse)
    
    // Scroll to bottom
    nextTick(() => scrollToBottom())
  }, 1500)
}

const getAIResponse = (userText) => {
  // Simple AI response logic (replace with actual AI API)
  const responses = {
    farming: [
      "मैं आपकी खेती से जुड़ी समस्याओं में मदद कर सकता हूं। आप किस फसल के बारे में जानना चाहते हैं?",
      "खेती के लिए सही समय, मिट्टी की जांच, और उर्वरक के बारे में पूछ सकते हैं।"
    ],
    weather: [
      "मौसम की जानकारी के लिए आप डैशबोर्ड पर जा सकते हैं जहां 7 दिन का पूर्वानुमान मिलता है।",
      "आज का मौसम अच्छा है खेती के काम के लिए। क्या आपको कोई खास जानकारी चाहिए?"
    ],
    market: [
      "बाजार के भाव देखने के लिए मार्केट प्राइस सेक्शन में जाएं। वहां सभी फसलों के ताजा रेट मिलते हैं।",
      "आज के मुख्य फसलों के भाव अच्छे हैं। कौन सी फसल बेचना चाहते हैं?"
    ],
    default: [
      "मैं आपकी खेती संबंधी मदद के लिए यहां हूं। आप मौसम, बाजार भाव, फसल की देखभाल के बारे में पूछ सकते हैं।",
      "कृषि से जुड़े किसी भी सवाल के लिए मुझसे पूछिए। मैं आपकी मदद करने की कोशिश करूंगा।"
    ]
  }
  
  const lowerText = userText.toLowerCase()
  
  if (lowerText.includes('खेती') || lowerText.includes('फसल') || lowerText.includes('farm')) {
    return responses.farming[Math.floor(Math.random() * responses.farming.length)]
  } else if (lowerText.includes('मौसम') || lowerText.includes('weather') || lowerText.includes('बारिश')) {
    return responses.weather[Math.floor(Math.random() * responses.weather.length)]
  } else if (lowerText.includes('बाजार') || lowerText.includes('भाव') || lowerText.includes('market') || lowerText.includes('price')) {
    return responses.market[Math.floor(Math.random() * responses.market.length)]
  } else {
    return responses.default[Math.floor(Math.random() * responses.default.length)]
  }
}

const updateLanguage = () => {
  if (recognition) {
    recognition.lang = selectedLanguage.value
  }
}

const clearChat = () => {
  messages.value = []
}

const scrollToBottom = () => {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

const formatTime = (timestamp) => {
  return timestamp.toLocaleTimeString('en-IN', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}
</script>

<style scoped>
/* Custom scrollbar for chat container */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Pulse animation for mic button */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}
</style>
