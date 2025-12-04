import apiClient from '../utils/api'

export const dataService = {
  async getDashboardStats() {
    return apiClient.get('/dashboard/stats')
  },

  async getRecentActivity() {
    return apiClient.get('/dashboard/activity')
  },

  async searchData(query, filters = {}) {
    const params = new URLSearchParams({ q: query, ...filters })
    return apiClient.get(`/search?${params}`)
  },

  async exportData(format = 'csv') {
    return apiClient.get(`/export?format=${format}`)
  }
}