<script setup>
import { ref, watch, onMounted } from 'vue'
import { useUserStore } from '~/store/useUserStore'
import { useI18n } from 'vue-i18n'

const userStore = useUserStore()
const i18n = useI18n()

const job = ref([])
const newJob = ref([])

const jobItemTemplate = () => ({
  company: "",
  end_year: 0,
  position: "",
  start_year: 0,
})

watch(
  () => userStore.job,
  (val) => {
    job.value = val.map(item => ({ ...item }))
  },
  { immediate: true }
)

const addJob = () => {
  newJob.value.push(jobItemTemplate())
}

const removeJob = (index) => {
  newJob.value.splice(index, 1)
}

const removeExistingJob = async (id, index) => {
  try {
    await userStore.deleteSpecialistJob(id)
    job.value.splice(index, 1)
  } catch (e) {
    console.error(i18n.t('errors.delete_error'), e)
  }
}

const saveJob = async () => {
  try {
    for (const item of newJob.value) {
      await userStore.addSpecialistJob({specialist_id : userStore.specialistsMainInfo.id}, item)
    }
    newJob.value = []

    for (const item of job.value) {
      if (item.id) {
        await userStore.updateSpecialistJob(item.id, item)
      }
    }

    await userStore.getWork({specialist_id: userStore.specialistsMainInfo.id})
  } catch (e) {
    console.error(i18n.t('errors.save_error'), e)
  }
}

onMounted(async () => {
  await userStore.getWork({specialist_id: userStore.specialistsMainInfo.id})
})
</script>

<template>
  <div class="experience">
    <div class="experience__content">
      <div class="experience__wrapper">
        <div
          v-for="(item, index) in job"
          :key="item.id"
          class="experience__wrapper-item"
        >
          <button
            class="delete"
            @click="removeExistingJob(item.id, index)"
          >
            &#10006;
          </button>
          <div class="experience__item">
            <p>{{ $t('specialists.company') }}</p>
            <input
              v-model="job[index].company"
              type="text"
              :placeholder="$t('specialists.company')"
            >
          </div>
          <div class="experience__item">
            <p>{{ $t('specialists.position') }}</p>
            <input
              v-model="job[index].position"
              type="text"
              :placeholder="$t('specialists.position')"
            >
          </div>
          <div class="experience__item">
            <p>{{ $t('specialists.start_year') }}</p>
            <input
              v-model="job[index].start_year"
              type="number"
              :placeholder="$t('specialists.start_year')"
            >
          </div>
          <div class="experience__item">
            <p>{{ $t('specialists.end_year') }}</p>
            <input
              v-model="job[index].end_year"
              type="number"
              :placeholder="$t('specialists.end_year')"
            >
          </div>
        </div>
        
        <div
          v-for="(item, index) in newJob"
          :key="index"
          class="experience__wrapper-item"
        >
          <button
            class="delete"
            @click="removeJob(index)"
          >
            &#10006;
          </button>
          <div class="experience__item">
            <p>{{ $t('specialists.company') }}</p>
            <input
              v-model="newJob[index].company"
              type="text"
              :placeholder="$t('specialists.company')"
            >
          </div>
          <div class="experience__item">
            <p>{{ $t('specialists.position') }}</p>
            <input
              v-model="newJob[index].position"
              type="text"
              :placeholder="$t('specialists.position')"
            >
          </div>
          <div class="experience__item">
            <p>{{ $t('specialists.start_year') }}</p>
            <input
              v-model="newJob[index].start_year"
              type="number"
              :placeholder="$t('specialists.start_year')"
            >
          </div>
          <div class="experience__item">
            <p>{{ $t('specialists.end_year') }}</p>
            <input
              v-model="newJob[index].end_year"
              type="number"
              :placeholder="$t('specialists.end_year')"
            >
          </div>
        </div>

        <button
          class="add-item"
          @click="addJob"
        >
          &#10011; {{ $t('specialists.add_work') }}
        </button>
      </div>
    </div>

    <button
      class="content-submit"
      @click="saveJob"
    >
      {{ $t('profile.save') }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.content-submit {
  max-width: 418px;
  display: block;
  width: 100%;
  height: 50px;
  margin: 55px 0 0 auto;
  color: #fff;
  border-radius: 8px;
  font-family: 'Montserrat', sans-serif;
  background: #1F72EE;
  font-weight: 700;
  font-size: 14.38px;
  cursor: pointer;
}
.delete {
  position: absolute;
  top: -20px;
  right: -20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: #f3f3f3;
  padding: 15px;
  cursor: pointer;
}
.add-item {
  border: 1px solid #0069FF;
  font-family: Nunito;
  font-weight: 400;
  font-size: 13px;
  line-height: 100%;
  color: #0069FF;
  width: fit-content;
  padding: 6px 15px;
  border-radius: 5px;
  cursor: pointer;
}
.experience {
  width: 100%;

  &__content {
    margin-top: 24px;
    border-radius: 14px;
    background: #fff;
    padding: 48px;
  }

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 60px;
    max-width: 850px;
    margin: auto;
    justify-content: center;

    &-item {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 32px;
      border: 1px solid rgb(223, 223, 223);
      padding: 30px;
      border-radius: 10px;
    }
  }

  &__item {
    width: 100%;
    max-width: 360px;

    p {
      font-family: 'Montserrat', sans-serif;
      font-weight: 600;
      font-size: 14px;
      line-height: 100%;
      margin-bottom: 14px;
    }

    input {
      width: 100%;
      height: 64px;
      padding-left: 24px;
      border-radius: 12px;
      background: #ebeefc;
      border: 1px solid #E9EAEB;
      font-family: 'Montserrat', sans-serif;
      font-weight: 500;

      &:focus {
        outline: 2px solid #1F72EE;
      }
    }
  }

  @media (max-width: 1285px) {
    &__item {
      max-width: 100%;
    }
  }

  @media (max-width: 640px) {
    &__content {
      margin-top: 0;
      padding: 16px;
    }
    &__wrapper {
      gap: 30px;
      &-item {
        padding: 30px 16px;
      }
    }
    &__item input {
      padding-left: 8px;
    }
  }
}
</style>