import { defineStore } from "pinia";
import { ref } from "vue";
import { setCookie, removeCookie, getCookie } from '~/utlis/cookie';
import { useAxios } from "~/composables/useAxios";
import { useToast } from 'vue-toastification/dist/index.mjs'
import { navigateTo } from '#imports'

export const useAuthStore = defineStore('auth', () => {
  // states
  const user = ref(false)
  const user_type = ref(getCookie('user_type'))

  const { axiosNoAuth } = useAxios();
  const toast = useToast()

  // actions

  const initialize = () => {
    const access_token = getCookie('access_token')
    const refresh_token = getCookie('refresh_token')

    if (access_token && refresh_token) {
      user.value = {
        access_token,
        refresh_token,
      }
    }
  }

  const auth = async(userData) => {
    try {
      const { data } = await axiosNoAuth.post('/auth/login', userData)

      setCookie('access_token', data.data.access_token, { expires: 1 })
      setCookie('refresh_token', data.data.refresh_token, { expires: 1 })

      const token = {
        access_token: getCookie('access_token'),
        refresh_token: getCookie('refresh_token')
      }
      
      if (data.status === 'success') {
        user.value = data.data || token
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
      console.log(data);
      
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

      user.value = data.data
      return data
    } catch(e) {
      console.log(e);
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

  const createSpecialistProfile = async (obj, token) => {
    try {
      const { data } = await axiosNoAuth.post(
        '/specialists',
        obj,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      return data
    } catch (e) {
      const errorMessage = e.response?.data?.message || 'Произошла ошибка'
      toast.error(errorMessage)
    }
  }

  return { user, user_type, auth, register, refreshToken, logout, setUserType, createSpecialistProfile, initialize }
})
