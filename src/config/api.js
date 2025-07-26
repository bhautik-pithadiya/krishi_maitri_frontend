// API Configuration utility for Krishi Maitri
class ApiConfig {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
    this.version = import.meta.env.VITE_API_VERSION || 'v1'
    this.apiURL = `${this.baseURL}/api/${this.version}`
  }

  // Authentication endpoints
  get auth() {
    return {
      login: `${this.apiURL}/auth/login`,
      signup: `${this.apiURL}/auth/register`,
      logout: `${this.apiURL}/auth/logout`,
      refresh: `${this.apiURL}/auth/refresh`,
      profile: `${this.apiURL}/auth/profile`
    }
  }

  // Market endpoints
  get market() {
    return {
      prices: `${this.apiURL}/market/prices`,
      crops: `${this.apiURL}/market/crops`
    }
  }

  // Services endpoints
  get services() {
    return {
      list: `${this.apiURL}/services`,
      book: `${this.apiURL}/services/book`
    }
  }

  // Community endpoints
  get community() {
    return {
      posts: `${this.apiURL}/community/posts`,
      categories: `${this.apiURL}/community/categories`
    }
  }

  // Weather endpoints
  get weather() {
    return {
      forecast: `${this.apiURL}/weather/forecast`
    }
  }

  // Helper method to get full API URL for any endpoint
  getEndpoint(path) {
    return `${this.apiURL}${path.startsWith('/') ? path : '/' + path}`
  }

  // Helper method to make authenticated requests
  async makeRequest(endpoint, options = {}) {
    const token = localStorage.getItem('access_token')
    
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      }
    }

    const mergedOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers
      }
    }

    try {
      const response = await fetch(endpoint, mergedOptions)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('API Request failed:', error)
      throw error
    }
  }
}

// Export singleton instance
export const apiConfig = new ApiConfig()
export default apiConfig
