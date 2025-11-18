import axios from 'axios'
import useAuthStore from '../stores/authStore'

// สร้าง instance ของ axios
export const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json"
    },
})

export const authApi = axios.create({
    baseURL: "http://localhost:8000/api/auth"
})

export const adminApi = axios.create({
    baseURL: "http://localhost:8000/api"
})

// ใช้ getState() ของ Zustand แทน useAuthStore
authApi.interceptors.request.use(config => {
    const token = useAuthStore.getState().token // <-- getState() แก้ปัญหา circular / hook
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

axiosInstance.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})
