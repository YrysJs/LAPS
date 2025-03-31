<script setup>
import Personal from '~/components/cabinet/profile/personal.vue'
import Experience from '~/components/cabinet/profile/experience.vue'
import Education from '~/components/cabinet/profile/education.vue'
import WorkSchedule from '~/components/cabinet/profile/work schedule.vue'
//fn
const router = useRouter()
const route = useRoute()

//data
const activeTab = ref(0)
const personal = ref({})
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

//data with emits
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
})
</script>

<template>
  <NuxtLayout name="cabinet">
    <div class="profile">
      <h3 class="profile__title">
        Изменение пароля
      </h3>
      <div class="profile__content">
        <div class="profile__tabs">
          <button
            :class="{ 'active': activeTab === 0 }"
            @click="setTab(0)">
            Ваши данные
          </button>
          <button
            :class="{ 'active': activeTab === 1 }"
            @click="setTab(1)">
            Образование
          </button>
          <button
            :class="{ 'active': activeTab === 2 }"
            @click="setTab(2)">
            Опыт работы
          </button>
          <button
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
      <button
        class="content-submit"
        @click="stepHandler">
        {{ activeTab !== 3 ? 'Продолжить' : 'Сохранить' }}
      </button>
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
      height: 30px;
    } 
  }
}

.active {
  color: #1F72EE !important;
  border-bottom: 3px solid #1F72EE;
}
</style>