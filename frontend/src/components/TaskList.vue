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
                  <div v-if="!task.editing" @dblclick="startEditing(task)"
                    :class="{ 'text-decoration-line-through': task.is_completed }">
                    {{ task.text }}
                  </div>
                  <input v-else v-model="task.editingText" @blur="saveEditing(task)" @keyup.enter="saveEditing(task)"
                    @keyup.escape="cancelEditing(task)" class="form-control form-control-sm" type="text"
                    ref="editInput">
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
                    <button @click="confirmDelete(task.id)" class="btn btn-sm btn-danger">
                      DELETE
                    </button>
                    <button @click="taskStore.toggleTask(task, authStore.token)" class="btn btn-sm"
                      :class="task.is_completed ? 'btn-warning' : 'btn-success'">
                      {{ task.is_completed ? 'REOPEN' : 'FINISHED' }}
                    </button>
                    <button v-if="isMobile && !task.is_completed" @click="startEditing(task)"
                      class="btn action-btn btn-info">
                      EDIT
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
import { ref, onMounted, nextTick, computed } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import { useAuthStore } from '@/stores/authStore'

const taskStore = useTaskStore()
const authStore = useAuthStore()
const newTask = ref('')
const editInput = ref(null)

const isMobile = computed(() => window.innerWidth <= 768)

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-GB') + ' ' + date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}

const statusClass = (isCompleted) => {
  return isCompleted ? 'bg-success' : 'bg-primary'
}

const fetchTasks = () => {
  if (authStore.isAuthenticated) {
    taskStore.fetchTasks(authStore.token)
  }
}

const touchStartTime = ref(0)
const touchTimer = ref(null)

const handleTouchStart = (task) => {
  if (task.is_completed) return
  touchStartTime.value = Date.now()
  touchTimer.value = setTimeout(() => {
    startEditing(task)
  }, 800)
}

const handleTouchEnd = () => {
  clearTimeout(touchTimer.value)
}

// редактирование задачи (двойной клик)
const startEditing = (task) => {
  if (task.is_completed) return;
  task.editing = true;
  task.editingText = task.text;
  nextTick(() => {
    editInput.value?.focus();
  });
};

const saveEditing = async (task) => {
  if (task.editingText.trim() === '') return;

  try {
    await taskStore.updateTask(task.id, {
      text: task.editingText.trim()
    }, authStore.token);
    task.text = task.editingText.trim();
    task.editing = false;
  } catch (error) {
    console.error('Error updating task:', error);
  }
};

const cancelEditing = (task) => {
  task.editing = false;
};

const confirmDelete = (id) => {
  if (confirm('Are you sure you want to delete this task?')) {
    taskStore.deleteTask(id, authStore.token);
  }
};

onMounted(fetchTasks)

const addTask = async () => {
  if (newTask.value.trim()) {
    await taskStore.addTask(newTask.value.trim(), authStore.token)
    newTask.value = ''
  }
}

defineExpose({
  handleTouchStart,
  handleTouchEnd
})
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

.action-btn {
  min-width: 80px;
  padding: 0.375rem 0.5rem;
  font-size: 0.875rem;
  white-space: nowrap;
}

.btn-info {
  display: none;
}

@media (max-width: 768px) {
  .task-list {
    min-width: 100%;
    max-height: none;
    padding: 0;
  }

  .card {
    border-radius: 0;
    border: none;
  }

  .card-header {
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .table-responsive {
    max-height: calc(100vh - 200px);
  }

  .btn {
    padding: 0.375rem 0.5rem;
    font-size: 0.875rem;
  }

  .btn-info {
    display: inline-block;
  }

  .action-btn {
    min-width: 70px;
    font-size: 0.75rem;
  }

  .form-control-lg {
    font-size: 1rem;
    padding: 0.5rem 0.75rem;
  }
}

@media (max-width: 576px) {
  .table td,
  .table th {
    padding: 0.5rem;
    font-size: 0.875rem;
  }

  .badge {
    font-size: 0.7em;
    padding: 0.2em 0.4em;
    white-space: nowrap;
  }

  .btn-sm {
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
  }

  .action-btn {
    min-width: 60px;
    font-size: 0.65rem;
  }

  .d-flex.gap-2 {
    flex-direction: row;
    gap: 0.25rem !important;
    flex-wrap: wrap;
  }

  .table-responsive {
    max-height: calc(100vh - 250px);
  }

  .card-body {
    padding: 0.75rem;
  }

  h2 {
    font-size: 1.25rem;
  }
}
</style>
