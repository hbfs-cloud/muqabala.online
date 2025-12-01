<template>
  <div>
    <!-- Floating Button -->
    <div class="position-fixed bottom-0 end-0 p-4" style="z-index: 1050;">
      <button 
        class="btn btn-primary btn-lg rounded-circle shadow-lg d-flex align-items-center justify-content-center" 
        style="width: 60px; height: 60px;"
        @click="isOpen = true"
      >
        <i class="ri-robot-2-line ri-2x"></i>
      </button>
    </div>

    <!-- Chat Window (Custom Modal) -->
    <div v-if="isOpen" class="chatbot-overlay" @click.self="isOpen = false">
      <div class="chatbot-window bg-white rounded shadow-lg d-flex flex-column">
        <!-- Header -->
        <div class="chatbot-header bg-primary text-white p-3 d-flex justify-content-between align-items-center rounded-top">
          <h5 class="mb-0 d-flex align-items-center">
            <i class="ri-robot-2-line me-2"></i>
            Assistant Muqabala
          </h5>
          <button type="button" class="btn-close btn-close-white" @click="isOpen = false"></button>
        </div>

        <!-- Body -->
        <div class="chatbot-body p-3 flex-grow-1 overflow-auto" ref="messagesContainer">
          <div class="d-flex flex-column gap-3">
            <!-- Welcome Message -->
            <div class="d-flex align-items-start">
              <div class="avatar avatar-sm me-2">
                <span class="avatar-initial rounded-circle bg-label-primary">
                  <i class="ri-robot-2-line"></i>
                </span>
              </div>
              <div class="bg-light p-3 rounded shadow-sm" style="max-width: 85%;">
                <p class="mb-0 text-sm">Salam Aleykoum ! Je suis votre assistant virtuel. Comment puis-je vous aider aujourd'hui ?</p>
              </div>
            </div>

            <!-- Messages -->
            <div 
              v-for="(msg, index) in messages" 
              :key="index" 
              class="d-flex align-items-start"
              :class="msg.sender === 'user' ? 'justify-content-end' : ''"
            >
              <template v-if="msg.sender === 'bot'">
                <div class="avatar avatar-sm me-2">
                  <span class="avatar-initial rounded-circle bg-label-primary">
                    <i class="ri-robot-2-line"></i>
                  </span>
                </div>
                <div class="bg-light p-3 rounded shadow-sm" style="max-width: 85%;">
                  <p class="mb-0 text-sm" style="white-space: pre-wrap;">{{ msg.text }}</p>
                </div>
              </template>
              <template v-else>
                <div class="bg-primary text-white p-3 rounded shadow-sm" style="max-width: 85%;">
                  <p class="mb-0 text-sm">{{ msg.text }}</p>
                </div>
                <div class="avatar avatar-sm ms-2">
                  <span class="avatar-initial rounded-circle bg-label-secondary">
                    <i class="ri-user-line"></i>
                  </span>
                </div>
              </template>
            </div>

            <!-- Typing Indicator -->
            <div v-if="isTyping" class="d-flex align-items-start">
              <div class="avatar avatar-sm me-2">
                <span class="avatar-initial rounded-circle bg-label-primary">
                  <i class="ri-robot-2-line"></i>
                </span>
              </div>
              <div class="bg-light p-3 rounded shadow-sm">
                <div class="typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          </div>

          <!-- Suggestions -->
          <div v-if="messages.length === 0 && suggestions.length > 0" class="mt-4">
            <p class="text-muted small mb-2">Suggestions :</p>
            <div class="d-flex flex-wrap gap-2">
              <template v-for="category in suggestions" :key="category.category">
                <span 
                  v-for="question in category.questions" 
                  :key="question"
                  class="badge bg-label-secondary cursor-pointer hover-badge"
                  @click="askQuestion(question)"
                >
                  {{ question }}
                </span>
              </template>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="chatbot-footer p-3 border-top">
          <div class="input-group">
            <input 
              type="text" 
              class="form-control" 
              placeholder="Posez votre question..." 
              v-model="inputMessage"
              @keypress.enter="sendMessage"
              :disabled="isTyping"
            >
            <button 
              class="btn btn-primary" 
              type="button" 
              @click="sendMessage"
              :disabled="!inputMessage.trim() || isTyping"
            >
              <i class="ri-send-plane-fill"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import apiClient from '../api/client'

const isOpen = ref(false)
const inputMessage = ref('')
const messages = ref([])
const isTyping = ref(false)
const suggestions = ref([])
const messagesContainer = ref(null)

onMounted(() => {
  loadSuggestions()
})

watch(isOpen, (newVal) => {
  if (newVal) {
    scrollToBottom()
  }
})

async function loadSuggestions() {
  try {
    const response = await apiClient.get('/candidate/ai/chatbot/suggestions')
    if (response.data.success) {
      suggestions.value = response.data.suggestions
    }
  } catch (error) {
    console.error('Failed to load suggestions:', error)
  }
}

async function sendMessage() {
  const text = inputMessage.value.trim()
  if (!text) return

  // Add user message
  messages.value.push({ text, sender: 'user' })
  inputMessage.value = ''
  scrollToBottom()

  // Simulate typing and call API
  isTyping.value = true
  try {
    const response = await apiClient.post('/candidate/ai/chatbot/ask', { question: text })
    
    if (response.data.success) {
      messages.value.push({ text: response.data.response, sender: 'bot' })
    } else {
      messages.value.push({ text: "Désolé, je rencontre un problème technique.", sender: 'bot' })
    }
  } catch (error) {
    messages.value.push({ text: "Erreur de connexion. Veuillez vérifier votre internet.", sender: 'bot' })
  } finally {
    isTyping.value = false
    scrollToBottom()
  }
}

function askQuestion(question) {
  inputMessage.value = question
  sendMessage()
}

function scrollToBottom() {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}
</script>

<style scoped>
.chatbot-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1060;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chatbot-window {
  width: 90%;
  max-width: 400px;
  height: 500px;
  max-height: 80vh;
  animation: slideUp 0.3s ease-out;
}

@media (min-width: 768px) {
  .chatbot-overlay {
    background-color: transparent;
    pointer-events: none;
    justify-content: flex-end;
    align-items: flex-end;
    padding: 2rem;
  }
  
  .chatbot-window {
    pointer-events: auto;
    margin-bottom: 5rem; /* Space for the floating button */
    margin-right: 1rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.hover-badge:hover {
  background-color: #e2e6ea !important;
  color: #696cff;
}

.typing-indicator span {
  display: inline-block;
  width: 6px;
  height: 6px;
  background-color: #ccc;
  border-radius: 50%;
  animation: typing 1.4s infinite ease-in-out both;
  margin-right: 3px;
}

.typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
.typing-indicator span:nth-child(2) { animation-delay: -0.16s; }

@keyframes typing {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

/* Custom scrollbar */
.chatbot-body::-webkit-scrollbar {
  width: 6px;
}
.chatbot-body::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.chatbot-body::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}
</style>
