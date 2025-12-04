import apiClient from '../utils/api'

export const userService = {
  async getUsers() {
    return apiClient.get('/users')
  },

  async getUserById(id) {
    return apiClient.get(`/users/${id}`)
  },

  async createUser(userData) {
    return apiClient.post('/users', userData)
  },

  async updateUser(id, userData) {
    return apiClient.put(`/users/${id}`, userData)
  },

  async deleteUser(id) {
    return apiClient.delete(`/users/${id}`)
  },

  async login(credentials) {
    const response = await apiClient.post('/auth/login', credentials)
    if (response.token) {
      apiClient.setAuthToken(response.token)
    }
    return response
  },

  async logout() {
    apiClient.setAuthToken(null)
    return apiClient.post('/auth/logout')
  }
}