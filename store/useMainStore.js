import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useAxios } from "~/composables/useAxios";
import { useToast } from 'vue-toastification/dist/index.mjs'

export const useMainStore = defineStore('main', () => {
  //states
  const specialists = ref([])
  const specialistById = ref([])
  const specializations = ref([])
  const specializationBullet = ref([])
  const reviews = ref({})
  const specialistShedule = ref([])
  const specialistSheduleById = ref([])
  const specialistFreeSlots = ref([])
  const replyById = ref(null)

  const { axiosNoAuth, axiosWithAuth } = useAxios();
  const toast = useToast()

  const getSpecializationsList = computed(() => {
    return specializations
  })

  const getSpecializationsBulletList = computed(() => {
    return specializationBullet
  })

  const getSpecialistsList = computed(() => {
    return specialists
  })

  //actions
  const getSpecialists = async(params) => {
    try {
      const { data } = await axiosNoAuth.get('/specialists/', {
        params: params
      })
      
      if (data.status === !'success') {
        toast.error('Произошла ошибка')
      } else {
        specialists.value = data.data
      }
    } catch(e) {
      const errorMessage = e.response.data.message || 'Произошла ошибка'
      toast.error(errorMessage)
    }
  }

  const getSpecialistById = async(id) => {
    try {
      const { data } = await axiosNoAuth.get(`/specialists/${id}`)
      
      if (data.status === !'success') {
        toast.error('Произошла ошибка')
      } else {
        specialistById.value = data.data
      }
    } catch(e) {
      const errorMessage = e.response.data.message || 'Произошла ошибка'
      toast.error(errorMessage)
    }
  }

  const getSpecializations = async(params) => {
    try {
      const { data } = await axiosNoAuth.get('/specializations/', {
        params: params
      })
      
      if (data.status === !'success') {
        toast.error('Произошла ошибка')
      } 
      specializations.value = data.data
    } catch(e) {
      const errorMessage = e.response.data.message || 'Произошла ошибка'
      toast.error(errorMessage)
    }
  }

  const getSpecializationsBullet = async(params) => {
    try {
      const { data } = await axiosNoAuth.get('/specializations/', {
        params: params
      })
      
      if (data.status === !'success') {
        toast.error('Произошла ошибка')
      } else {
        specializationBullet.value = data.data
      }
    } catch(e) {
      const errorMessage = e.response.data.message || 'Произошла ошибка'
      toast.error(errorMessage)
    }
  }

  const getReviews = async(params) => {
    try {
      const { data } = await axiosNoAuth.get('/reviews/', {
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

  const getSpecialistsShedule = async(params) => {
    try {
      const { data } = await axiosNoAuth.get('/schedules', {
        params: params
      })
      
      if (data.status === !'success') {
        toast.error('Произошла ошибка')
      } else {
        specialistShedule.value = data.data
      }
    } catch(e) {
      const errorMessage = e.response.data.message || 'Произошла ошибка'
      toast.error(errorMessage)
    }
  }

  const getSpecialistsSheduleById = async(params) => {
    try {
      const { data } = await axiosNoAuth.get('/schedules', {
        params: params
      })
      
      if (data.status === !'success') {
        toast.error('Произошла ошибка')
      } else {
        specialistSheduleById.value = data.data
      }
    } catch(e) {
      const errorMessage = e.response.data.message || 'Произошла ошибка'
      toast.error(errorMessage)
    }
  }

  const getSpecialistsFreeSlots = async(params) => {
    try {
      const { data } = await axiosNoAuth.get(`/schedules/free-slots`, {
        params: params
      })
      
      if (data.status === !'success') {
        toast.error('Произошла ошибка')
      } else {
        specialistFreeSlots.value = data.data

        return data.data.free_slots
      }
    } catch(e) {
      const errorMessage = e.response.data.message || 'Произошла ошибка'
      toast.error(errorMessage)
    }
  }

  const addReview = async(obj) => {
    try {
      const { data } = await axiosWithAuth.post(`/reviews`, obj)
      
      if (data.status === !'success') {
        toast.error('Произошла ошибка')
      } else {
        toast('Отзыв успешно добавлен')
      }
    } catch(e) {
      const errorMessage = e.response.data.message || 'Произошла ошибка'
      toast.error(errorMessage)
    }
  }

  const deleteReview = async(obj) => {
    try {
      const { data } = await axiosWithAuth.delete(`/reviews`, obj)
      
      if (data.status === !'success') {
        toast.error('Произошла ошибка')
      } else {
        toast('Отзыв успешно удален')
      }
    } catch(e) {
      const errorMessage = e.response.data.message || 'Произошла ошибка'
      toast.error(errorMessage)
    }
  }

  const addRevuewReplies = async(id ,obj) => {
    try {
      const { data } = await axiosWithAuth.post(`/reviews/${id}/replies`, obj)
      
      if (data.status === !'success') {
        toast.error('Произошла ошибка')
      } else {
        toast('Ответ успешно создан')
      }
    } catch(e) {
      const errorMessage = e.response.data.message || 'Произошла ошибка'
      toast(errorMessage)
    }
  }

  const createAppointments = async(obj) => {
    try {
      const { data } = await axiosWithAuth.post(`/appointments`, obj)
      
      if (data.status === !'success') {
        toast.error('Произошла ошибка')
      } else {
        toast('Запись успешно создана')
      }
    } catch(e) {
      const errorMessage = e.response.data.message || 'Произошла ошибка'
      toast.error(errorMessage)
    }
  }

  const getReplyById = async(id) => {
    try {
      const { data } = await axiosNoAuth.get(`/reviews/${id}/replies`)
      
      if (data.status === !'success') {
        toast.error('Произошла ошибка')
      } else {
        replyById.value = data.data
        return data.data
      }
    } catch(e) {
      const errorMessage = e.response?.data?.message || 'Произошла ошибка'
      toast.error(errorMessage)
      return null
    }
  }

  return { 
    specialists,
    specialistById, 
    specialistFreeSlots, 
    reviews, 
    replyById,
    specialistShedule, 
    specialistSheduleById, 
    specializations,
    specializationBullet,
    getSpecialists,
    getSpecialistById,
    getSpecializations,
    getSpecializationsBullet,
    getReviews,
    getSpecialistsShedule,
    getSpecialistsSheduleById,
    getSpecialistsFreeSlots,
    addReview,
    deleteReview,
    addRevuewReplies,
    createAppointments,
    getReplyById,
    getSpecializationsList,
    getSpecializationsBulletList,
    getSpecialistsList
  }
})