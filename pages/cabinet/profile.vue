<script setup>
import Personal from '~/components/cabinet/profile/personal.vue'
import Experience from '~/components/cabinet/profile/experience.vue'
import Education from '~/components/cabinet/profile/education.vue'
import WorkSchedule from '~/components/cabinet/profile/work schedule.vue'
import { onMounted } from 'vue'
import { useUserStore } from '~/store/useUserStore'
import { useAuthStore } from '~/store/useAuthStore'


//fn
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const authStore = useAuthStore()

//data
const activeTab = ref(0)
const personal = ref(userStore.user ?? {})
const education = ref({})
const work = ref({})
const experience = ref({})

//tab fn
const tabSegment = [Personal, Education, Experience, WorkSchedule]
const setTab = (index) => {
  activeTab.value = index

  router.push({ query: { tab: index } });
}
const stepHandler = () => {
  if (activeTab.value < 3) {
    activeTab.value += 1
  }
  setTab(activeTab.value)


  if (activeTab.value == 3) {
    //requests
  }
}

const setEducationData = (data) => {
  education.value = data
}
const setWorkData = (data) => {
  work.value = data
}
const setExperienceData = (data) => {
  experience.value = data
}
const setPersonalData = (data) => {
  personal.value = data
}


onMounted(() => {
  const tab = parseInt(route.query.tab) || 0 
  activeTab.value = tab
  
  if (authStore.user_type === 'client') {
    userStore.getUserInfo()
  } else {
    userStore.getSpecialistInfo()
  }
})

definePageMeta({
  middleware: 'cabinet'
})
</script>

<template>
  <NuxtLayout name="cabinet">
    <div class="profile">
      <div class="profile-desktop">
        <h3 class="profile__title">
          Ваши данные
        </h3>
        <div class="profile__content">
          <div class="profile__tabs">
            <button
              :class="{ 'active': activeTab === 0 }"
              @click="setTab(0)">
              Ваши данные
            </button>
            <button
              v-if="userStore.user.role !== 'client'"
              :class="{ 'active': activeTab === 1 }"
              @click="setTab(1)">
              Образование
            </button>
            <button
              v-if="userStore.user.role !== 'client'"
              :class="{ 'active': activeTab === 2 }"
              @click="setTab(2)">
              Опыт работы
            </button>
            <button
              v-if="userStore.user.role !== 'client'"
              :class="{ 'active': activeTab === 3 }"
              @click="setTab(3)">
              График работы
            </button>
          </div>
          <div class="profile__wrapper">
            <component
              :is="tabSegment[activeTab]"
              @personal="setPersonalData"
              @experience="setExperienceData"
              @work="setWorkData"
              @education="setEducationData"/>
          </div>
        </div>
      </div>
      <div class="profile-mobile">
        <div
          v-if="!route.query.tab"
          class="profile-mobile__info">
          <div class="flex gap-[20px]">
            <div
              v-if="userStore.user.role !== 'client'"
              class="min-w-[92px] min-h-[92px] max-w-[160px] max-h-[160px] w-full">
              <img
                src="/images/test-image.png"
                alt=""
                class="w-full h-full object-cover">
            </div>
            <div class="min-w-[200px]">
              <h3
                v-if="userStore.user.role !== 'client'"
                class="text-xs text-[#767485] font-montserrat">
                Гражданство · Стаж 40 лет
              </h3>
              <h4 class="font-montserrat text-base font-bold text-[#242424] leading-[18px] mt-[6px] mb-[8px]">
                {{ userStore.user.last_name }} {{ userStore.user.first_name }} {{ userStore.user.middle_name }}
              </h4>
              <h5
                v-if="userStore.user.role !== 'client'"
                class="text-sm font-montserrat text-[#242424] flex gap-[6px]">
                Рейтинг <img
                  src="/icons/cabinet/star-black.svg"
                  alt="icon-star">
                8.4
              </h5>
            </div>
          </div>
          <div class="flex flex-col gap-[6px] mt-[24px]">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-[16px]">
                <img
                  src="/icons/main/phone-modal-icon.svg"
                  alt="icon">
                <h3 class="text-xs text-[#767485] font-montserrat">Звонок</h3>
              </div>
              <a
                :href="`tel:${userStore.user.phone}`"
                class="text-sm text-[#242424] font-medium">{{ userStore.user.phone }}</a>
            </div>
            <div
              v-if="userStore.user.role !== 'client'"
              class="flex items-center justify-between">
              <div class="flex items-center gap-[16px]">
                <img
                  src="/icons/wp-modal-icon.svg"
                  alt="icon">
                <h3 class="text-xs text-[#767485] font-montserrat">WhatsApp</h3>
              </div>
              <a
                href="77077778899"
                class="text-sm text-[#242424] font-medium">77077778899</a>
            </div>
          </div>
        </div>
        <div
          v-if="!route.query.tab"
          class="profile-mobile__tabs">
          <button
            @click="setTab(0)">
            Ваши данные
            <img
              src="/icons/cabinet/arrow-blue.svg"
              alt="">
          </button>
          <button
            v-if="userStore.user.role !== 'client'"
            @click="setTab(1)">
            Образование
            <img
              src="/icons/cabinet/arrow-blue.svg"
              alt="">
          </button>
          <button
            v-if="userStore.user.role !== 'client'"
            @click="setTab(2)">
            Опыт работы
            <img
              src="/icons/cabinet/arrow-blue.svg"
              alt="">
          </button>
          <button
            v-if="userStore.user.role !== 'client'"
            @click="setTab(3)">
            График работы
            <img
              src="/icons/cabinet/arrow-blue.svg"
              alt="">
          </button>
        </div>
        <div class="profile__wrapper">
          <component
            :is="tabSegment[activeTab]"
            v-if="route.query.tab"
            @personal="setPersonalData"
            @experience="setExperienceData"
            @work="setWorkData"
            @education="setEducationData"/>
        </div>
      </div>
    </div>
  </NuxtLayout>
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

.profile {
  &-mobile {
    display: none;
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
    gap: 60px;
  }

  &__tabs {
    display: flex;
    gap: 35px;

    button {
      font-family: 'Montserrat', sans-serif;
      font-weight: 500;
      font-size: 16px;
      line-height: 100%;
      letter-spacing: 0%;
      color: #718EBF;
      transition: .2s;
      padding-left: 30px;
      padding-right: 30px;
      padding-bottom: 10px;
      min-height: 30px;
    } 
  }

  @media (max-width: 990px) {
    &__title {
      font-size: 24px;
    }
    
    &__content {
      padding: 24px 16px;
    }

    &__tabs {
      button {
        height: initial;
        font-size: 12px;
      }
    }
  }
  @media (max-width: 640px) {
    &-desktop {
      display: none;
    }
    &-mobile {
      display: block;
    }
  }
}

.active {
  color: #1F72EE !important;
  border-bottom: 3px solid #1F72EE;
}

@media (max-width: 578px) {
  .content-submit {
    height: 40px;
    font-size: 14px;
    margin-top: 30px;
  }
}

.profile-mobile__tabs {
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  gap: 8px;

  button {
    background: #E9EAEB;
    padding: 16px;
    border-radius: 12px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0%;
    color: #1F72EE;
  }
}
</style>