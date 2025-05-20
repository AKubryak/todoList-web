<template>
  <div class="auth-form">
    <h2 class="mb-4">{{ isLogin ? 'Вход' : 'Регистрация' }}</h2>
    <form @submit.prevent="handleSubmit">
      <div v-if="!isLogin" class="mb-3">
        <label for="name" class="form-label">Имя</label>
        <input
          v-model="form.name"
          type="text"
          class="form-control"
          id="name"
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
        <label for="password" class="form-label">Пароль</label>
        <input
          v-model="form.password"
          type="password"
          class="form-control"
          id="password"
          required
        />
      </div>
      <div v-if="!isLogin" class="mb-3">
        <label for="confirmPassword" class="form-label">Подтвердите пароль</label>
        <input
          v-model="form.password_confirmation"
          type="password"
          class="form-control"
          id="confirmPassword"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary w-100">
        {{ isLogin ? 'Войти' : 'Зарегистрироваться' }}
      </button>
    </form>
    <p class="mt-3">
      {{ isLogin ? "Ещё нет аккаунта?" : "Уже есть аккаунт?" }}
      <router-link :to="isLogin ? '/register' : '/login'">
        {{ isLogin ? 'Зарегистрироваться' : 'Войти' }}
      </router-link>
    </p>

    <div v-if="error" class="alert alert-danger mt-3">
      {{ error }}
    </div>
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

const handleSubmit = async () => {
  try {
    error.value = null
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
      error.value = result.error?.message ||
                  (props.isLogin ? 'Ошибка входа' : 'Ошибка регистрации')
    }
  } catch (err) {
    error.value = err.message || 'Произошла ошибка'
    console.error('Auth error:', err)
  }
}
</script>

<style scoped>
  .auth-form {
    width: 400px;
    max-width: 100%;
  }
</style>
