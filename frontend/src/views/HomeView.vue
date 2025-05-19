<template>
  <div class="container">
    <div class="d-flex justify-content-between align-items-center mb-0">
      <h1>Todo List</h1>
      <button @click="logout" class="btn btn-danger">Logout</button>
    </div>
    <TaskList />
  </div>
</template>

<script setup>
import TaskList from '@/components/TaskList.vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
