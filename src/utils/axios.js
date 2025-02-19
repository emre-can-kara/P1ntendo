import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://workintech-fe-ecommerce.onrender.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
})

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Token varsa header'a ekle
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Global error handling
    if (error.response) {
      // Server tarafından hata döndü
      console.error('Response Error:', error.response.data)
      
      // 401 Unauthorized hatası durumunda
      if (error.response.status === 401) {
        localStorage.removeItem('token')
        // Kullanıcıyı login sayfasına yönlendir
        window.location.href = '/login'
      }
    } else if (error.request) {
      // İstek yapıldı ama cevap alınamadı
      console.error('Request Error:', error.request)
    } else {
      // İstek yapılırken hata oluştu
      console.error('Error:', error.message)
    }
    return Promise.reject(error)
  }
)

export default axiosInstance 