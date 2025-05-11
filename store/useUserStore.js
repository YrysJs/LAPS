import { defineStore } from "pinia";
import { ref } from "vue";
import { useAxios } from "~/composables/useAxios";
import { useToast } from 'vue-toastification/dist/index.mjs'

export const useUserStore = defineStore('user', () => {
  //states
  const user = ref({})
  const education = ref([])
  const job = ref([])
  const shedule = ref([])
  const reviews = ref([])
  const consultations = ref([])
  const specialistsMainInfo = ref({})
  

  const { axiosWithAuth } = useAxios();
  const toast = useToast()

  //actions
  const getUserInfo = async () => {
    try {
      const { data } = await axiosWithAuth.get('/users/me')
      console.log(data);
      
      if (data.status !== "success") {
        toast.error('Произошла ошибка')
        return
      }
      console.log('asd');
      
      user.value = data.data
    } catch(e) {
      const errorMessage = e.response.data.message || 'Произошла ошибка'
      toast.error(errorMessage)
    }
  }

  const getSpecialistInfo = async () => {
    try {
      const { data } = await axiosWithAuth.get('/specialists/me')
      
      if (data.status === !'success') {
        toast.error('Произошла ошибка')
      } else {
        user.value = data.data.user
        specialistsMainInfo.value = data.data
      }
    } catch(e) {
      const errorMessage = e.response.data.message || 'Произошла ошибка'
      toast.error(errorMessage)
    }
  }

  const getSpecialistEducation = async (params) => {
    try {
      const { data } = await axiosWithAuth.get('/education', {params})
      
      if (data.status === !'success') {
        toast.error('Произошла ошибка')
      } else {
        education.value = data.data
      }
    } catch(e) {
      const errorMessage = e.response.data.message || 'Произошла ошибка'
      toast.error(errorMessage)
    }
  }

  const addSpecialistEducation = async (params, obj) => {
    try {
      const { data } = await axiosWithAuth.post(
        '/education',
        obj,
        { params }
      )
      
      if (data.status === !'success') {
        toast.error('Произошла ошибка')
      } else {
        toast('Образование добавлено')
      }
    } catch(e) {
      const errorMessage = e.response.data.message || 'Произошла ошибка'
      toast.error(errorMessage)
    }
  }

  const updateSpecialistEducation = async (id, obj) => {
    try {
      const { data } = await axiosWithAuth.put(`/education/${id}`, obj)
      
      if (data.status === !'success') {
        toast.error('Произошла ошибка')
      } else {
        toast('Данные по образованию обновлены')
      }
    } catch(e) {
      const errorMessage = e.response.data.message || 'Произошла ошибка'
      toast.error(errorMessage)
    }
  }

  const deleteSpecialistEducation = async (id) => {
    try {
      const { data } = await axiosWithAuth.delete(`/education/${id}`)
      
      if (data.status === !'success') {
        toast.error('Произошла ошибка')
      } else {
        toast('Данные по образованию удалены')
      }
    } catch(e) {
      const errorMessage = e.response.data.message || 'Произошла ошибка'
      toast.error(errorMessage)
    }
  }

  const getReviews = async(params) => {
    try {
      const { data } = await axiosWithAuth.get('/reviews', {
        params: params
      })
      
      if (data.status === !'success') {
        toast.error('Произошла ошибка')
      } else {
        reviews.value = data.data
      }
    } catch(e) {
      const errorMessage = e.response.data.message || 'Произошла ошибка'
      toast.error(errorMessage)
    }
  }

  const updateUserPassword = async (id, obj) => {
    try {
      const { data } = await axiosWithAuth.put(`/users/${id}/password`, obj)
      
      if (data.status === !'success') {
        toast.error('Произошла ошибка')
      } else {
        toast('Пароль обновлен')
      }
    } catch(e) {
      toast.error(e)
    }
  }

  const updateUserData = async (id, obj) => {
    try {
      const { data } = await axiosWithAuth.put(`/users/${id}`, obj)
      
      if (data.status === !'success') {
        toast.error('Произошла ошибка')
      } else {
        toast('Данные обновлены')
      }
    } catch(e) {
      const errorMessage = e.response.data.message || 'Произошла ошибка'
      toast.error(errorMessage)
    }
  }

  const updateSpecialistData = async (id, obj) => {
    try {
      const { data } = await axiosWithAuth.put(`/specialists/${id}`, obj)
      
      if (data.status === !'success') {
        toast.error('Произошла ошибка')
      } else {
        toast('Данные обновлены')
      }
    } catch(e) {
      const errorMessage = e.response.data.message || 'Произошла ошибка'
      toast.error(errorMessage)
    }
  }

  const addSpecialistPhoto = async (id, formData) => {
    try {
      const { data } = await axiosWithAuth.post(
        `/specialists/${id}/photo`,
        formData
      )

      if (data.status !== 'success') {
        toast.error('Не удалось загрузить фото')
      } else {
        toast.success('Фото профиля обновлено')
      }
    } catch (e) {
      const errorMessage = e.response?.data.message || 'Произошла ошибка'
      toast.error(errorMessage)
    }
  }

  const deleteSpecialistPhoto = async (id) => {
    try {
      const { data } = await axiosWithAuth.delete(`/specialists/${id}/photo`)
      
      if (data.status === !'success') {
        toast.error('Произошла ошибка')
      } else {
        toast('Фото профиля удалено')
      }
    } catch(e) {
      const errorMessage = e.response?.data.message || 'Произошла ошибка'
      toast.error(errorMessage)
    }
  }

  const getAppointments = async (params) => {
    try {
      const { data } = await axiosWithAuth.get('/appointments', {
        params
      })
      
      if (data.status === !'success') {
        toast.error('Произошла ошибка')
      } else {
        consultations.value = data.data
      }
    } catch(e) {
      const errorMessage = e.response.data.message || 'Произошла ошибка'
      toast.error(errorMessage)
    }
  }

  const deleteAppointments = async (id) => {
    try {
      const { data } = await axiosWithAuth.delete(`/appointments/${id}`)
      
      if (data.status === !'success') {
        toast.error('Произошла ошибка')
      } else {
        toast('Запись удалена')
      }
    } catch(e) {
      const errorMessage = e.response.data.message || 'Произошла ошибка'
      toast.error(errorMessage)
    }
  }

  const updateAppointments = async (id, obj) => {
    try {
      const { data } = await axiosWithAuth.put(`/appointments/${id}`, obj)
      
      if (data.status === !'success') {
        toast.error('Произошла ошибка')
      } else {
        toast('Запись обновлена')
      }
    } catch(e) {
      const errorMessage = e.response.data.message || 'Произошла ошибка'
      toast.error(errorMessage)
    }
  }

  const getWork = async (params) => {
    try {
      const { data } = await axiosWithAuth.get('/work-experience', {
        params
      })
      
      if (data.status === !'success') {
        toast.error('Произошла ошибка')
      } else {
        job.value = data.data
      }
    } catch(e) {
      const errorMessage = e.response.data.message || 'Произошла ошибка'
      toast.error(errorMessage)
    }
  }

  const addSpecialistJob = async (params, obj) => {
    try {
      const { data } = await axiosWithAuth.post(
        '/work-experience',
        obj,
        { params }
      )
      
      if (data.status === !'success') {
        toast.error('Произошла ошибка')
      } else {
        toast('Данные добавлены')
      }
    } catch(e) {
      const errorMessage = e.response.data.message || 'Произошла ошибка'
      toast.error(errorMessage)
    }
  }

  const updateSpecialistJob = async (id, obj) => {
    try {
      const { data } = await axiosWithAuth.put(`/work-experience/${id}`, obj)
      
      if (data.status === !'success') {
        toast.error('Произошла ошибка')
      } else {
        toast('Данные обновлены')
      }
    } catch(e) {
      const errorMessage = e.response.data.message || 'Произошла ошибка'
      toast.error(errorMessage)
    }
  }

  const deleteSpecialistJob = async (id) => {
    try {
      const { data } = await axiosWithAuth.delete(`/work-experience/${id}`)
      
      if (data.status === !'success') {
        toast.error('Произошла ошибка')
      } else {
        toast('Данные удалены')
      }
    } catch(e) {
      const errorMessage = e.response.data.message || 'Произошла ошибка'
      toast.error(errorMessage)
    }
  }

  const getShedule = async (params) => {
    try {
      const { data } = await axiosWithAuth.get('/schedules', {
        params
      })
      
      if (data.status === !'success') {
        toast.error('Произошла ошибка')
      } else {
        shedule.value = data.data
      }
    } catch(e) {
      const errorMessage = e.response.data.message || 'Произошла ошибка'
      toast.error(errorMessage)
    }
  }

  const addSpecialistShedule = async (obj) => {
    try {
      const { data } = await axiosWithAuth.post(
        '/schedules',
        obj,
      )
      
      if (data.status === !'success') {
        toast.error('Произошла ошибка')
      } else {
        toast('Данные добавлены')
      }
    } catch(e) {
      const errorMessage = e.response.data.message || 'Произошла ошибка'
      toast.error(errorMessage)
    }
  }

  const updateSpecialistShedule = async (obj) => {
    try {
      const { data } = await axiosWithAuth.put(`/schedules`, obj)
      
      if (data.status === !'success') {
        toast.error('Произошла ошибка')
      } else {
        toast('Данные обновлены')
      }
    } catch(e) {
      const errorMessage = e.response.data.message || 'Произошла ошибка'
      toast.error(errorMessage)
    }
  }

  return { 
    user,
    education,
    job,
    shedule,
    reviews,
    consultations,
    specialistsMainInfo,
    getUserInfo,
    getSpecialistInfo,
    getSpecialistEducation,
    updateSpecialistEducation,
    deleteSpecialistEducation,
    getReviews,
    updateUserPassword,
    addSpecialistEducation,
    updateUserData,
    updateSpecialistData,
    addSpecialistPhoto,
    deleteSpecialistPhoto,
    getAppointments,
    deleteAppointments,
    updateAppointments,
    getWork,
    addSpecialistJob,
    updateSpecialistJob,
    deleteSpecialistJob,
    getShedule,
    addSpecialistShedule,
    updateSpecialistShedule
  }
})