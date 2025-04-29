<template>
  <div class="experience">
    <div class="experience__content">
      <div class="experience__wrapper">
        <div
          v-for="(item, index) in education"
          :key="item.id"
          class="experience__wrapper-item"
        >
          <button
            class="delete"
            @click="removeExistingEducation(item.id, index)"
          >
            &#10006;
          </button>
          <div class="experience__item">
            <p>Год окончания</p>
            <input
              v-model="education[index].graduation_year"
              type="text"
              placeholder="Введите год"
            >
          </div>
          <div class="experience__item">
            <p>Учебное заведение</p>
            <input
              v-model="education[index].institution"
              type="text"
              placeholder="Введите название"
            >
          </div>
          <div class="experience__item">
            <p>Степень</p>
            <input
              v-model="education[index].degree"
              type="text"
              placeholder="Введите степень"
            >
          </div>
          <div class="experience__item">
            <p>Специальность</p>
            <input
              v-model="education[index].specialization"
              type="text"
              placeholder="Введите специальность"
            >
          </div>
        </div>
        
        <div
          v-for="(item, index) in newEducation"
          :key="index"
          class="experience__wrapper-item"
        >
          <button
            class="delete"
            @click="removeNewEducation(index)"
          >
            &#10006;
          </button>
          <div class="experience__item">
            <p>Год окончания</p>
            <input
              v-model="newEducation[index].graduation_year"
              type="number"
              placeholder="Введите год"
            >
          </div>
          <div class="experience__item">
            <p>Учебное заведение</p>
            <input
              v-model="newEducation[index].institution"
              type="text"
              placeholder="Введите название"
            >
          </div>
          <div class="experience__item">
            <p>Степень</p>
            <input
              v-model="newEducation[index].degree"
              type="text"
              placeholder="Введите степень"
            >
          </div>
          <div class="experience__item">
            <p>Специальность</p>
            <input
              v-model="newEducation[index].specialization"
              type="text"
              placeholder="Введите специальность"
            >
          </div>
        </div>

        <button
          class="add-item"
          @click="addEducation"
        >
          &#10011; Добавить диплом
        </button>
      </div>
    </div>

    <button
      class="content-submit"
      @click="saveEducation"
    >
      Сохранить
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useUserStore } from '~/store/useUserStore'

const userStore = useUserStore()

const education = ref([])
const newEducation = ref([])

const educationItemTemplate = () => ({
  degree: "",
  graduation_year: +"",
  institution: "",
  specialization: "",
})

watch(
  () => userStore.education,
  (val) => {
    education.value = val.map(item => ({ ...item }))
  },
  { immediate: true }
)

const addEducation = () => {
  newEducation.value.push(educationItemTemplate())
}

const removeNewEducation = (index) => {
  newEducation.value.splice(index, 1)
}

const removeExistingEducation = async (id, index) => {
  try {
    await userStore.deleteSpecialistEducation(id)
    education.value.splice(index, 1)
  } catch (e) {
    console.error('Ошибка удаления:', e)
  }
}

const saveEducation = async () => {
  try {
    for (const item of newEducation.value) {
      await userStore.addSpecialistEducation({specialist_id : userStore.specialistsMainInfo.id}, item)
    }
    newEducation.value = []

    for (const item of education.value) {
      if (item.id) {
        await userStore.updateSpecialistEducation(item.id, item)
      }
    }

    await userStore.getSpecialistEducation({specialist_id: userStore.specialistsMainInfo.id})
  } catch (e) {
    console.error('Ошибка при сохранении образования:', e)
  }
}

onMounted(async () => {
  await userStore.getSpecialistEducation({specialist_id: userStore.specialistsMainInfo.id})
})
</script>

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