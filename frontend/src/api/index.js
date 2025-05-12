import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  // Auth methods
  register(user) {
    return apiClient.post('/register', {
      name: user.email.split('@')[0], // Генерируем имя из email
      email: user.email,
      password: user.password,
      password_confirmation: user.password_confirmation
    })
  },
  login(user) {
    return apiClient.post('/login', {
      email: user.email,
      password: user.password
    })
  },

  // Task methods
  getTasks(token) {
    return apiClient.get('/tasks', {
      headers: { Authorization: `Bearer ${token}` }
    })
  },
  addTask(taskData, token) {
    return apiClient.post('/tasks', taskData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
  },
  updateTask(id, task, token) {
    return apiClient.patch(`/tasks/${id}`, task, {
      headers: { Authorization: `Bearer ${token}` }
    })
  },
  deleteTask(id, token) {
    return apiClient.delete(`/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }
}
