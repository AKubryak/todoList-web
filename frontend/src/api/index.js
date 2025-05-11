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
    return apiClient.post('/register', user)
  },
  login(user) {
    return apiClient.post('/login', user)
  },

  // Task methods
  getTasks(token) {
    return apiClient.get('/tasks', {
      headers: { Authorization: `Bearer ${token}` }
    })
  },
  addTask(task, token) {
    return apiClient.post('/tasks', task, {
      headers: { Authorization: `Bearer ${token}` }
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
