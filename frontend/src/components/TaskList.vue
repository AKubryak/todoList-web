<template>
  <div class="task-list container-fluid py-4">
    <div class="card shadow-sm">
      <div class="card-header bg-white">
        <h2 class="mb-0">To Do App</h2>
      </div>
      <div class="card-body">
        <div class="row mb-4 g-2">
          <div class="col-md-8">
            <input v-model="newTask" type="text" class="form-control form-control-lg" placeholder="Enter a task here"
              @keyup.enter="addTask">
          </div>
          <div class="col-md-4 d-grid gap-2" style="grid-template-columns: 1fr 1fr;">
            <button @click="addTask" class="btn btn-primary">SAVE</button>
            <button @click="fetchTasks" class="btn btn-outline-secondary">GET TASKS</button>
          </div>
        </div>

        <div v-if="taskStore.isLoading" class="text-center py-4">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>

        <div v-else-if="taskStore.error" class="alert alert-danger">
          {{ taskStore.error }}
        </div>

        <div v-else-if="taskStore.tasks.length === 0" class="alert alert-info">
          No tasks found. Add your first task!
        </div>

        <div v-else class="table-responsive">
          <table class="table table-hover align-middle">
            <thead class="table-light">
              <tr>
                <th style="width: 5%">No.</th>
                <th style="width: 50%">Todo item</th>
                <th style="width: 20%">Status</th>
                <th style="width: 25%">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(task, index) in taskStore.tasks" :key="task.id">
                <td class="fw-bold">{{ index + 1 }}</td>
                <td>
                  <div :class="{ 'text-decoration-line-through': task.is_completed }">
                    {{ task.text }}
                  </div>
                  <div class="text-muted small mt-1">
                    Created: {{ formatDate(task.created_at) }}
                  </div>
                </td>
                <td>
                  <span :class="statusClass(task.is_completed)" class="badge">
                    {{ task.is_completed ? 'Completed' : 'In progress' }}
                  </span>
                </td>
                <td>
                  <div class="d-flex gap-2">
                    <button @click="taskStore.deleteTask(task.id, authStore.token)" class="btn btn-sm btn-danger">
                      DELETE
                    </button>
                    <button @click="taskStore.toggleTask(task, authStore.token)" class="btn btn-sm"
                      :class="task.is_completed ? 'btn-warning' : 'btn-success'">
                      {{ task.is_completed ? 'REOPEN' : 'FINISHED' }}
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import { useAuthStore } from '@/stores/authStore'

const taskStore = useTaskStore()
const authStore = useAuthStore()
const newTask = ref('')

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-GB') // DD/MM/YYYY
}

const statusClass = (isCompleted) => {
  return isCompleted ? 'bg-success' : 'bg-primary'
}

const fetchTasks = () => {
  if (authStore.isAuthenticated) {
    taskStore.fetchTasks(authStore.token)
  }
}

onMounted(fetchTasks)

const addTask = async () => {
  if (newTask.value.trim()) {
    await taskStore.addTask(newTask.value.trim(), authStore.token)
    newTask.value = ''
  }
}
</script>

<style scoped>
.task-list {
  margin: 0 auto;
  min-width: 65vw;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.table-responsive {
  max-height: 41vh;
  overflow-y: auto;
}
.table-hover tbody tr:hover {
  background-color: rgba(0, 0, 0, 0.02);
}
.text-decoration-line-through {
  text-decoration: line-through;
  opacity: 0.7;
}
.badge {
  font-size: 0.85em;
  padding: 0.5em 0.75em;
}
</style>
