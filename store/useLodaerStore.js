import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoaderStore = defineStore('loader', () => {
  //states
  const loading = ref(false)

  //actions
  const loaderAction = async(state) => {
    loading.value = state
  }

  return { loading, loaderAction }
})