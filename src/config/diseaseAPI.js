import { apiConfig } from './api.js'

const API_BASE_URL = apiConfig.apiURL

export const diseaseDetectionAPI = {
  // Predict disease from uploaded image
  async predictDisease(file, cropType) {
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('crop_type', cropType)

      const authToken = localStorage.getItem('access_token')
      if (!authToken) {
        throw new Error('Authentication token not found. Please log in.')
      }

      const response = await fetch(`${API_BASE_URL}/disease/predict`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Failed to predict disease')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Disease prediction API error:', error)
      throw error
    }
  }
}