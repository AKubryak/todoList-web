<template>
  <div class="auth-form">
    <h2 class="mb-4">{{ isLogin ? 'Login' : 'Register' }}</h2>
    <form @submit.prevent="submitForm">
      <div v-if="!isLogin" class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input
          v-model="form.name"
          type="text"
          class="form-control"
          id="name"
          required
        />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          v-model="form.email"
          type="email"
          class="form-control"
          id="email"
          required
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
          v-model="form.password"
          type="password"
          class="form-control"
          id="password"
          required
        />
      </div>
      <div v-if="!isLogin" class="mb-3">
        <label for="password_confirmation" class="form-label">Confirm Password</label>
        <input
          v-model="form.password_confirmation"
          type="password"
          class="form-control"
          id="password_confirmation"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">
        {{ isLogin ? 'Login' : 'Register' }}
      </button>
    </form>
    <p class="mt-3">
      {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
      <router-link :to="isLogin ? '/register' : '/login'">
        {{ isLogin ? 'Register' : 'Login' }}
      </router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const props = defineProps({
  isLogin: {
    type: Boolean,
    default: false
  }
})

const router = useRouter()
const authStore = useAuthStore()
const error = ref(null)

const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const submitForm = async () => {
  try {
    let result
    if (props.isLogin) {
      result = await authStore.login({
        email: form.value.email,
        password: form.value.password
      })
    } else {
      result = await authStore.register(form.value)
    }

    if (result.success) {
      router.push('/')
    } else {
      error.value = result.error
    }
  } catch (err) {
    error.value = err.message
  }
}
</script>

<style scoped>
.auth-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
}
</style>
