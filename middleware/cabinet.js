// middleware/cabinet.ts
import { defineNuxtRouteMiddleware, navigateTo } from '#app'
import { useAuthStore } from '~/store/useAuthStore'
import { getCookie } from '~/utlis/cookie'

export default defineNuxtRouteMiddleware(() => {
  const token = getCookie('access_token')
  if (!token) {
    return navigateTo('/')
  }

  const authStore = useAuthStore()
  const userType = getCookie('user_type')
  if (userType) {
    authStore.setUserType(userType)
  }
})
