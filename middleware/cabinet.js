// middleware/cabinet.ts
import { defineNuxtRouteMiddleware, navigateTo } from '#app'
import { useAuthStore } from '~/store/useAuthStore'

export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore()

  const accessToken = useCookie('access_token')
  const refreshToken = useCookie('refresh_token')
  const userType = useCookie('user_type')

  authStore.initialize()

  if (!accessToken.value || !refreshToken.value) {
    return navigateTo('/')
  }

  if (userType.value) {
    authStore.setUserType(userType.value)
  }
})
