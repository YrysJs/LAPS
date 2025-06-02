<script setup>
import { useUserStore } from '~/store/useUserStore'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
const { locale, locales, setLocale } = useI18n()
const localPath = useLocalePath()
const language = computed({
  get: () => locale.value,
  set: (value) => {
    setLocale(value)
  }
});

const userStore = useUserStore()

const menuState = ref(false)
const userInfo = computed(() => {
  return userStore.user
})
const specialistInfo = computed(() => {
  return userStore.specialistsMainInfo
})
const burgerPath = ['/icons/cabinet/burger.svg', '/icons/cabinet/close-burger.svg']

const specialistType = computed(() => {
  return specialistInfo.value?.type === 'lawyer' ? 'specialists.lawyer' : 'specialists.psychologist'
})
</script>

<template>
  <div>
    <header class="header-desktop flex items-center justify-end gap-[30px] bg-[#fff] py-[13px] px-[30px]">
      <div>
        <img
          src=""
          alt="">
      </div>
      <select
        v-model="language"
        class="text-[12px]">
        <option 
          v-for="item of locales" 
          :key="item" 
          :value="item.code">
          {{ item.name }}
        </option>
      </select>
      <div class="flex items-center justify-between gap-[20px]">
        <img
          class="w-[45px] h-[45px] rounded-full overflow-hidden object-cover object-center"
          :src="specialistInfo.profile_photo_url || '/images/no-avatar.svg'"
          alt="avatar">
        <div>
          <h3>{{ userInfo.last_name }} {{ userInfo.first_name }} {{ userInfo.middle_name }}</h3>
          <p>{{ $t(specialistType)}}</p>
        </div>
      </div>
    </header>
    <header class="header-mobile">
      <nuxt-link :to="localPath('/')">
        <img
          src="/images/logo-mobile-cabinet.svg"
          alt="logo">
      </nuxt-link>
      <div class="flex items-center gap-[16px]">
        <select
          v-model="language"
          class="text-[12px]">
          <option 
            v-for="item of locales" 
            :key="item" 
            :value="item.code">
            {{ item.name }}
          </option>
        </select>
        <button @click="menuState = !menuState">
          <img
            :src="menuState ? burgerPath[1] : burgerPath[0]"
            alt="menu button mobile">
        </button>
      </div>
      <nav
        class="sidebar__nav"
        :class="{'sidebar__nav-show': menuState}">
        <ul class="sidebar__list">
          <li
            class="sidebar__item"
            :class="{ active: $route.path === '/cabinet/profile'}">
            <nuxt-link
              :to="localPath('/cabinet/profile')"
            >
              {{ $t('cabinet.menu.personal_data') }}
            </nuxt-link>
            <img
              src="/icons/cabinet/menu-mobile-arrow.svg"
              alt="menu arrow">
          </li>
          <li
            class="sidebar__item"
            :class="{ active: $route.path === '/cabinet/history' }">
            <nuxt-link
              :to="localPath('/cabinet/history')"
            >
              {{ $t('cabinet.menu.history') }}
            </nuxt-link>
            <img
              src="/icons/cabinet/menu-mobile-arrow.svg"
              alt="menu arrow">
          </li>
          <li
            class="sidebar__item"
            :class="{ active: $route.path === '/cabinet/reviews' }">
            <nuxt-link
              :to="localPath('/cabinet/reviews')"
            >
              {{ $t('cabinet.menu.reviews') }}
            </nuxt-link>
            <img
              src="/icons/cabinet/menu-mobile-arrow.svg"
              alt="menu arrow">
          </li>
          <li
            class="sidebar__item"
            :class="{ active: $route.path === '/cabinet/settings' }">
            <nuxt-link
              to="/cabinet/settings"
            >
              {{ $t('cabinet.menu.settings') }}
            </nuxt-link>
            <img
              src="/icons/cabinet/menu-mobile-arrow.svg"
              alt="menu arrow">
          </li>
          <li class="sidebar__item exit">
            <nuxt-link
              :to="localPath('/')"
            >
              {{ $t('cabinet.menu.logout') }}
            </nuxt-link>
          </li>
        </ul>
      </nav>
    </header>
  </div>
</template>

<style lang="scss" scoped>
header {
  h3 {
    font-family: 'Nunito Sans', sans-serif;
    font-weight: 600;
    font-size: 12px;
    line-height: 100%;
    letter-spacing: 0px;
    margin-bottom: 6px;
  }
  p {
    font-family: 'Nunito Sans', sans-serif;
    font-weight: 600;
    font-size: 12px;
    line-height: 100%;
    letter-spacing: 0px;
  }
}
.header-mobile {
  display: none;
}
@media (max-width: 990px) {
  .header-desktop {
    display: none;
  }
  .header-mobile {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    background: #fff;
    padding-left: 16px;
    padding-right: 16px;
    position: relative;
  }
}
.sidebar__nav {
  width: 100%;
  position: fixed;
  top: 40px;
  left: 0;
  background: #fff;
  height: 100vh;
  border-top: 1px solid rgb(189, 189, 189);
  padding: 15px 16px;
  transition: .4s all ease;
  margin-left: -100%;
  z-index: 1;
}
.sidebar__item {
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 14.25px;
  line-height: 24px;
  letter-spacing: 0%;
  border-bottom: 1px solid rgb(218, 218, 218);
  padding-bottom: 8px;
  padding-top: 8px;
}
.sidebar__nav-show {
  margin-left: 0;
}
.exit {
  color: #DF3C33;
}
</style>
