import { defineNuxtPlugin } from '#app'
import VueToast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueToast, {
    timeout: 3000,
    closeOnClick: true,
    draggable: true,
  })
})
