<template>
  <div class="task-list">
    <h2 class="mb-4">My Tasks</h2>

    <div class="mb-4 d-flex">
      <input
        v-model="newTask"
        type="text"
        class="form-control me-2"
        placeholder="Add new task"
        @keyup.enter="addTask"
      />
      <button @click="addTask" class="btn btn-primary">Add</button>
    </div>

    <div v-if="taskStore.isLoading">Loading tasks...</div>
    <div v-else-if="taskStore.error" class="alert alert-danger">
      {{ taskStore.error }}
    </div>
    <div v-else-if="taskStore.tasks.length === 0" class="alert alert-info">
      No tasks found. Add your first task!
    </div>
    <ul v-else class="list-unstyled">
      <li v-for="task in taskStore.tasks" :key="task.id" class="task-item mb-2">
        <input
          type="checkbox"
          :checked="task.is_completed"
          @change="toggleTask(task)"
          class="form-check-input"
        />
        <span
          :class="{ completed: task.is_completed }"
          class="task-text"
        >
          {{ task.text }}
        </span>
        <button
          @click="deleteTask(task.id)"
          class="btn btn-sm btn-danger ms-2"
        >
          Delete
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import { useAuthStore } from '@/stores/authStore'

const taskStore = useTaskStore()
const authStore = useAuthStore()
const newTask = ref('')

onMounted(() => {
  if (authStore.isAuthenticated) {
    taskStore.fetchTasks(authStore.token)
  }
})

const addTask = async () => {
  if (newTask.value.trim()) {
    await taskStore.addTask(newTask.value.trim(), authStore.token)
    newTask.value = ''
  }
}

const toggleTask = (task) => {
  taskStore.toggleTask(task, authStore.token)
}

const deleteTask = (id) => {
  if (confirm('Are you sure you want to delete this task?')) {
    taskStore.deleteTask(id, authStore.token)
  }
}
</script>
