import { create } from 'zustand'
import { authApi } from '../config/authApi'
import { createJSONStorage, persist } from 'zustand/middleware'

const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            token: '',
            login: async (input) => {
                const resp = await authApi.post('/login', input)
                set({ token: resp.data.token, user: resp.data.user })
                return resp
            },
            logout: async () => {
                set({ token: '', user: null })
            },
        }),
        {
            name: 'accessToken',
            storage: createJSONStorage(() => localStorage)
        }
    )
)


export default useAuthStore