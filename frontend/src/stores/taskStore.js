import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/api'

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  async function fetchTasks(token) {
    try {
      isLoading.value = true
      const response = await api.getTasks(token)
      tasks.value = response.data
      error.value = null
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch tasks'
    } finally {
      isLoading.value = false
    }
  }

  async function addTask(text, token) {
    try {
      const taskData = {
        text: text,
        is_completed: false
      };

      const response = await api.addTask(taskData, token);
      tasks.value.push(response.data);
      return { success: true };
    } catch (err) {
      console.error('Error details:', err.response?.data);
      return {
        success: false,
        error: err.response?.data?.message || 'Ошибка добавления задачи'
      };
    }
  }

  async function toggleTask(task, token) {
    try {
      await api.updateTask(task.id, {
        is_completed: !task.is_completed
      }, token)
      const index = tasks.value.findIndex(t => t.id === task.id)
      if (index !== -1) {
        tasks.value[index].is_completed = !task.is_completed
      }
      return { success: true }
    } catch (err) {
      return { success: false, error: err.response?.data }
    }
  }

  // редактирование задачи (двойной клик)
  async function updateTask(id, updates, token) {
    try {
      await api.updateTask(id, updates, token);
      const index = tasks.value.findIndex(t => t.id === id);
      if (index !== -1) {
        tasks.value[index] = { ...tasks.value[index], ...updates };
      }
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || 'Ошибка обновления задачи'
      };
    }
  }

  async function deleteTask(id, token) {
    try {
      await api.deleteTask(id, token);
      tasks.value = tasks.value.filter(task => task.id !== id);
      return { success: true };
    } catch (err) {
      console.error('Delete error:', err.response?.data);
      return {
        success: false,
        error: err.response?.data?.error || 'Ошибка удаления задачи'
      };
    }
  }

  return {
    tasks,
    isLoading,
    error,
    fetchTasks,
    addTask,
    toggleTask,
    updateTask,
    deleteTask
  }
})
