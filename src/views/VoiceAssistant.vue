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
            <div v-if="!isConnected" class="mt-4">
              <div class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">
                <div class="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></div>
                Connecting to AI assistant...
              </div>
            </div>
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

            <!-- System Messages -->
            <div v-if="message.type === 'system'" class="flex justify-center">
              <div class="bg-blue-50 text-blue-800 rounded-lg p-3 max-w-xs lg:max-w-md text-center border border-blue-200">
                <p class="text-sm">{{ message.text }}</p>
                <div class="text-xs mt-1 text-blue-600">{{ formatTime(message.timestamp) }}</div>
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
              @click="toggleConversation"
              :class="[
                'w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 transform',
                isConnected 
                  ? 'bg-red-500 hover:bg-red-600 scale-110' 
                  : 'bg-primary hover:bg-green-600 hover:scale-105'
              ]"
              :disabled="connectionStatus === 'connecting'"
            >
              <svg v-if="!isConnected" class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4z"/>
                <path d="M5.5 9.643a.75.75 0 00-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-1.5v-1.546A6.001 6.001 0 0016 10v-.357a.75.75 0 00-1.5 0V10a4.5 4.5 0 01-9 0v-.357z"/>
              </svg>
              <svg v-else class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a2 2 0 114 0v4a2 2 0 11-4 0V7z" clip-rule="evenodd"/>
              </svg>
            </button>

            <!-- Status Text -->
            <div class="text-center">
              <p v-if="connectionStatus === 'connecting'" class="text-blue-500 text-sm">
                {{ $t('voiceAssistant.connecting') }}
              </p>
              <p v-else-if="isConnected" class="text-green-500 text-sm">
                {{ $t('voiceAssistant.connected') }}
              </p>
              <p v-else class="text-gray-500 text-sm">
                {{ $t('voiceAssistant.disconnected') }}
              </p>
              <button
                @click="toggleConversation"
                :class="[
                  'mt-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  isConnected 
                    ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                    : 'bg-primary text-white hover:bg-green-600'
                ]"
                :disabled="connectionStatus === 'connecting'"
              >
                {{ isConnected ? $t('voiceAssistant.stopConversation') : $t('voiceAssistant.startConversation') }}
              </button>
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
import { Conversation } from '@elevenlabs/client'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'

// Configuration
const ELEVENLABS_AGENT_ID = import.meta.env.VITE_ELEVENLABS_AGENT_ID || 'demo-agent-id'

// Reactive state
const messages = ref([])
const isListening = ref(false)
const currentTranscription = ref('')
const speechSupported = ref(false)
const selectedLanguage = ref('hi-IN')
const chatContainer = ref(null)
const isConnected = ref(false)
const connectionStatus = ref('disconnected')
const agentMode = ref('listening')

// ElevenLabs conversation instance
let conversation = null

onMounted(async () => {
  // Check for speech recognition support (for fallback)
  speechSupported.value = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window
  
  // Add welcome message
  addSystemMessage('Welcome to Voice Assistant! Click "Start Conversation" to begin chatting with your AI farming assistant.')
})

onUnmounted(async () => {
  if (conversation) {
    await conversation.endSession()
  }
})

// Initialize ElevenLabs Conversation
const initializeConversation = async () => {
  try {
    // Check if agent ID is configured
    if (!ELEVENLABS_AGENT_ID || ELEVENLABS_AGENT_ID === 'demo-agent-id') {
      addSystemMessage('ElevenLabs Agent ID not configured. Please set up your agent ID in the environment variables.')
      return
    }
    
    // Set connecting state
    connectionStatus.value = 'connecting'
    addSystemMessage('Connecting to voice assistant...')
    
    // Request microphone access first
    await navigator.mediaDevices.getUserMedia({ audio: true })
    
    // Initialize conversation with ElevenLabs
    conversation = await Conversation.startSession({
      agentId: ELEVENLABS_AGENT_ID,
      
      // Callbacks
      onConnect: () => {
        console.log('ElevenLabs conversation connected')
        isConnected.value = true
        connectionStatus.value = 'connected'
        addSystemMessage('Connected to AI assistant! You can start speaking now.')
      },
      
      onDisconnect: () => {
        console.log('ElevenLabs conversation disconnected')
        isConnected.value = false
        connectionStatus.value = 'disconnected'
        addSystemMessage('Disconnected from AI assistant.')
      },
      
      onMessage: (message) => {
        console.log('Received message:', message)
        
        // Handle different message types
        if (message.type === 'user_transcript') {
          // User's speech transcription
          if (message.message && message.message.trim()) {
            currentTranscription.value = message.message
            
            // Add user message when transcription is final
            if (message.is_final) {
              addMessage('user', message.message)
              currentTranscription.value = ''
            }
          }
        } else if (message.type === 'agent_response') {
          // AI agent's text response
          if (message.message && message.message.trim()) {
            addMessage('ai', message.message)
          }
        }
      },
      
      onError: (error) => {
        console.error('ElevenLabs conversation error:', error)
        addSystemMessage(`Error: ${error.message || 'Connection failed'}`)
      },
      
      onStatusChange: (status) => {
        console.log('Status changed:', status)
        connectionStatus.value = status
      },
      
      onModeChange: (mode) => {
        console.log('Mode changed:', mode)
        agentMode.value = mode
        isListening.value = mode === 'listening'
      }
    })
    
  } catch (error) {
    console.error('Failed to initialize conversation:', error)
    isConnected.value = false
    connectionStatus.value = 'disconnected'
    
    if (error.name === 'NotAllowedError') {
      addSystemMessage('Microphone permission denied. Please enable microphone access and try again.')
    } else if (error.name === 'NotFoundError') {
      addSystemMessage('No microphone found. Please connect a microphone and try again.')
    } else {
      addSystemMessage('Failed to connect to AI assistant. Please check your connection and try again.')
    }
  }
}

// Methods
const toggleConversation = async () => {
  if (connectionStatus.value === 'connecting') {
    return // Prevent multiple clicks while connecting
  }
  
  if (isConnected.value) {
    // Stop conversation
    try {
      if (conversation) {
        await conversation.endSession()
        conversation = null
      }
      isConnected.value = false
      connectionStatus.value = 'disconnected'
      addSystemMessage('Voice conversation stopped.')
    } catch (error) {
      console.error('Error stopping conversation:', error)
      addSystemMessage('Error stopping conversation.')
    }
  } else {
    // Start conversation
    await initializeConversation()
  }
}

const addMessage = (type, text) => {
  const message = {
    type: type,
    text: text,
    timestamp: new Date()
  }
  messages.value.push(message)
  
  // Scroll to bottom
  nextTick(() => scrollToBottom())
}

const addSystemMessage = (text) => {
  const message = {
    type: 'system',
    text: text,
    timestamp: new Date()
  }
  messages.value.push(message)
  
  // Scroll to bottom
  nextTick(() => scrollToBottom())
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

const reconnect = async () => {
  if (conversation) {
    await conversation.endSession()
  }
  await initializeConversation()
}

const setVolume = async (volume) => {
  if (conversation) {
    await conversation.setVolume({ volume })
  }
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
