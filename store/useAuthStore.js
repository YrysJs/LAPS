import { defineStore } from "pinia";
import { ref } from "vue";
import { setCookie, removeCookie, getCookie } from '~/utlis/cookie';
import { useAxios } from "~/composables/useAxios";
import { useToast } from 'vue-toastification'
import { navigateTo } from '#imports'

export const useAuthStore = defineStore('auth', () => {
  // states
  const user = ref(false)
  const user_type = ref(getCookie('user_type'))

  const { axiosNoAuth } = useAxios();
  const toast = useToast()

  // actions
  const auth = async(userData) => {
    try {
      const { data } = await axiosNoAuth.post('/auth/login', userData)

      setCookie('access_token', data.data.access_token, { expires: 1 })
      setCookie('refresh_token', data.data.refresh_token, { expires: 1 })
      console.log(data);
      
      if (data.status === 'success') {
        navigateTo('/cabinet/profile')
      } else {
        toast.error('Ошибка авторизации')
      }
      
      return data
    } catch(e) {
      const errorMessage = e.response.data.message || 'Произошла ошибка авторизации'
      toast.error(errorMessage)
    }
  }

  const register = async(obj) => {
    try {
      const { data } = await axiosNoAuth.post('/auth/register', obj)
      return data
    } catch(e) {
      const errorMessage = e.response.data.message || 'Произошла ошибка'
      toast.error(errorMessage)
    }
  }

  const refreshToken = async(obj) => {
    try {
      const { data } = await axiosNoAuth.post('/auth/refresh', obj)
      setCookie('access_token', data.data.access_token, { expires: 1 })
      setCookie('refresh_token', data.data.refresh_token, { expires: 1 })
      return data
    } catch(e) {
      const errorMessage = e.response.data.message || 'Произошла ошибка'
      toast.error(errorMessage)
    }
  }

  const logout = async(obj) => {
    await axiosNoAuth.post('/auth/logout', obj)
    user.value = false
    removeCookie('access_token')
    removeCookie('refresh_token')
    navigateTo('/')
  }

  const setUserType = async (type) => {
    user_type.value = type
  }

  return { user, user_type, auth, register, refreshToken, logout, setUserType }
})
