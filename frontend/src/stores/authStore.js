import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)
  const isAuthenticated = ref(false)

  if (token.value) {
    isAuthenticated.value = true
  }

  function setToken(newToken) {
    token.value = newToken
    isAuthenticated.value = true
    localStorage.setItem('token', newToken)
  }

  function clearAuth() {
    user.value = null
    token.value = null
    isAuthenticated.value = false
    localStorage.removeItem('token')
  }

  async function register(userData) {
    try {
      const response = await api.register(userData)
      setToken(response.data.token)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.response.data }
    }
  }

  async function login(userData) {
    try {
      const response = await api.login(userData)
      setToken(response.data.token)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.response.data }
    }
  }

  function logout() {
    clearAuth()
  }

  return {
    user,
    token,
    isAuthenticated,
    register,
    login,
    logout
  }
})
