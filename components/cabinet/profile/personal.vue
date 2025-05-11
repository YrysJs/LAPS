<script setup>
import { ref, watch } from 'vue'
import { useMainStore } from '~/store/useMainStore'
import { useUserStore } from '~/store/useUserStore'

const userStore = useUserStore()
const mainStore = useMainStore()

const previewAvatar = ref(userStore.specialistsMainInfo.profile_photo_url || '')
const specializtions = ref(mainStore.getSpecializationsList || [])
const userData = ref({
  first_name: userStore.user.first_name,
  last_name:  userStore.user.last_name,
  middle_name: userStore.user.middle_name,
  email:      userStore.user.email,
  phone:      userStore.user.phone,
})

const specialsitData = ref({
  association_member: userStore.specialistsMainInfo.association_member,
  description: userStore.specialistsMainInfo.description,
  experience:  +userStore.specialistsMainInfo.experience,
  experience_years:  +userStore.specialistsMainInfo.experience_years,
  primary_consult_price:  +userStore.specialistsMainInfo.primary_consult_price,
  secondary_consult_price:  +userStore.specialistsMainInfo.secondary_consult_price,
  specialization:  userStore.specialistsMainInfo.specialization,
  type:  userStore.specialistsMainInfo.type
})

watch(
  () => userStore.specialistsMainInfo.profile_photo_url,
  url => { previewAvatar.value = url || '' },
  { immediate: true }
)

async function onAvatarChange(e) {
  const file = e.target.files?.[0]
  if (!file) return

  previewAvatar.value = URL.createObjectURL(file)

  const formData = new FormData()
  formData.append('photo', file, file.name)

  await userStore.addSpecialistPhoto(userStore.specialistsMainInfo.id, formData)
}

async function deleteAvatar() {
  await userStore.deleteSpecialistPhoto(userStore.specialistsMainInfo.id)
  await userStore.getSpecialistInfo().then(res => {
    previewAvatar.value = '/images/avatar.png'
  })
}

const fetchSpecializations = async (e) => {
  if (specialsitData.value.specialization.trim() === '') {
    specializtions.value = []
    return
  }
  
  await mainStore.getSpecializations({
    limit: 10,
    search: e.target.value
  })
}

const updateSpecialization = (specialization) => {
  specialsitData.value.specialization = specialization
  specializtions.value = []
}

watch(
  () => userStore.user,
  user => {
    if (user && Object.keys(user).length) {
      userData.value = {
        first_name:  user.first_name,
        last_name:   user.last_name,
        middle_name: user.middle_name,
        email:       user.email,
        phone:       user.phone,
      }
    }
  },
  { immediate: true }
)
watch(
  () => userStore.specialistsMainInfo,
  specialist => {
    if (specialist && Object.keys(specialist).length) {
      specialsitData.value = {
        association_member: userStore.specialistsMainInfo.association_member,
        description: userStore.specialistsMainInfo.description,
        experience:  userStore.specialistsMainInfo.experience,
        experience_years:  userStore.specialistsMainInfo.experience_years,
        primary_consult_price:  userStore.specialistsMainInfo.primary_consult_price,
        secondary_consult_price:  userStore.specialistsMainInfo.secondary_consult_price,
        specialization:  userStore.specialistsMainInfo.specialization,
        type:  userStore.specialistsMainInfo.type
      }
    }
  },
  { immediate: true }
)

watch(
  () => userStore.user,
  user => {
    if (user && Object.keys(user).length) {
      userData.value = {
        first_name:  user.first_name,
        last_name:   user.last_name,
        middle_name: user.middle_name,
        email:       user.email,
        phone:       user.phone.replace(/[()\s-]/g, ''),
      }
    }
  },
  { immediate: true }
)

const save = async () => {
  const userDataReplacePhone = {
    ...userData.value,
    phone: userData.value.phone.replace(/[()\s-]/g, '')
  }
  await userStore.updateUserData(userStore.user.id, userDataReplacePhone)
  await userStore.getUserInfo()

  if (userStore.user.role !== 'client') {
    await userStore.updateSpecialistData(userStore.specialistsMainInfo.id, specialsitData.value)
    await userStore.getSpecialistInfo()
  }
}

onMounted(async () => {
  if (userStore.user.role !== 'client') {
    await userStore.getSpecialistInfo()
  }
})
</script>

<template>
  <div class="experience">
    <div class="experience__content">
      <div class="experience__wrapper">
        <div
          v-if="userStore.user.role !== 'client'"
          class="experience__avatar">
          <button
            v-if="previewAvatar"
            @click="deleteAvatar">
            &#10005;
          </button>
          <label for="avatar">
            <img
              :src="previewAvatar || '/images/avatar.png'"
              alt="avatar" >
          </label>
          <input
            id="avatar"
            type="file"
            accept="image/*"
            @change="onAvatarChange"
          >
          <p>Фото профиля</p>
        </div>
        <div class="experience__wrapper-item">
          <div class="experience__item">
            <p>
              Имя
            </p>
            <input
              v-model="userData.first_name"
              type="text"
              placeholder="Введите имя">
          </div>
          <div class="experience__item">
            <p>
              Фамилия
            </p>
            <input
              v-model="userData.last_name"
              type="text"
              placeholder="Введите фамилию">
          </div>
          <div class="experience__item">
            <p>
              E-mail
            </p>
            <input
              v-model="userData.email"
              type="text"
              placeholder="Введите email">
          </div>
          <div class="experience__item">
            <p>
              Номер телефона
            </p>
            <input
              v-model="userData.phone"
              v-mask="'+7 (###) ###-##-##'"
              type="text"
              placeholder="Введите ваш номер телефона">
          </div>
          <div
            v-if="userStore.user.role !== 'client'"
            class="experience__item">
            <p>
              Стаж работы
            </p>
            <input
              v-model="specialsitData.experience_years"
              type="number"
              placeholder="Стаж работы в годах">
          </div>
          <div
            v-if="userStore.user.role !== 'client'"
            class="experience__item specialist__search">
            <p>
              Специализация
            </p>
            <input 
              v-model="specialsitData.specialization" 
              type="search" 
              placeholder="Введите специализацию" 
              @input="fetchSpecializations" >
    
            <ul v-if="specializtions.length > 0">
              <li 
                v-for="suggestion in specializtions" 
                :key="suggestion" 
                class="suggestion-item"
                @click="updateSpecialization(suggestion.name)">
                {{ suggestion.name }}
              </li>
            </ul>
          </div>
          <div
            v-if="userStore.user.role !== 'client'"
            class="experience__item">
            <p>
              Стоимость первичной консультации
            </p>
            <input
              v-model="specialsitData.primary_consult_price"
              type="number"
              placeholder="Цена">
          </div>
          <div
            v-if="userStore.user.role !== 'client'"
            class="experience__item">
            <p>
              Стоимость вторичной консультации
            </p>
            <input
              v-model="specialsitData.secondary_consult_price"
              type="number"
              placeholder="Цена">
          </div>
          <div
            v-if="userStore.user.role !== 'client'"
            class="experience__item">
            <p>
              О себе
            </p>
            <textarea
              v-model="specialsitData.description"
              type="text"
              placeholder="О себе"></textarea>
          </div>
          <div
            v-if="userStore.user.role !== 'client'"
            class="experience__item checkbox">
            <input
              id="checkobx"
              v-model="specialsitData.association_member"
              type="checkbox"> <label for="checkobx">Состою в ассоциации</label>
          </div>
        </div>
      </div>
    </div>
    <button
      class="content-submit"
      @click="save">
      Сохранить
    </button>
  </div>
</template>

<style lang="scss" scoped>
.specialist {
  &__search {
    position: relative;

    ul {
      padding: 10px;
      position: absolute;
      width: 100%;
      margin-top: 10px;
      border-radius: 10px;
      background-color: #FFF;
      box-shadow: 0px 0px 5px -1px gray;
      z-index: 1000;
    }
  }
}

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
}
.experience {
  width: 100%;

  &__avatar {
    text-align: center;
    position: relative;

    button {
      position: absolute;
      right: -15px;
      top: -10px;
      font-size: 22px;
      color: #fff;
      background: rgb(255, 93, 93);
      font-weight: bold;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      cursor: pointer;
    }
    

    img {
      width: 116px;
      height: 116px;
      object-fit: cover;
      overflow: hidden;
      border-radius: 50%;
    }

    input {
      display: none;
    }

    p {
      margin-top: 16px;
      font-family: 'Montserrat', sans-serif;
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      letter-spacing: 0.54px;
      color: #4379EE;
    }
  }

  &__title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    font-size: 32px;
    line-height: 100%;
    letter-spacing: -0.11px;
  }

  &__content {
    margin-top: 24px;
    border-radius: 14px;
    background: #fff;
    padding: 48px;
  }

  &__wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 60px;
    
    margin: auto;
    justify-content: center;
    align-items: flex-start;

    &-item {
      max-width: 780px;
      position: relative;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 32px;
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
      letter-spacing: 0px;
      margin-bottom: 14px;
    }

    input, textarea {
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

    textarea {
      padding: 20px;
      height: 200px;
    }
  }
  .checkbox {
    display: flex;
    gap: 10px;
    align-items: center;

    input {
      width: 20px;
      height: 20px;
    }
  }
  @media (max-width: 1285px) {
    &__item {
      max-width: 100%;
    }
  }

  @media (max-width: 940px) {
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
    }

    &__item {
      input {
        padding-left: 8px;
      }
    }
  }
}
</style>