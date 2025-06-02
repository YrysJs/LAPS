<script setup>
import { useAuthStore } from '~/store/useAuthStore'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const menuState = ref(false)
const burgerPath = ['/icons/cabinet/burger.svg', '/icons/cabinet/close-burger.svg']
const authStore = useAuthStore()
const { locale, locales, setLocale } = useI18n()
const localPath = useLocalePath()
const language = computed({
  get: () => locale.value,
  set: (value) => {
    setLocale(value)
  }
});

onMounted(() => {
  authStore.initialize()
})
</script>

<template>
  <header class="header header-desktop">
    <div class="header__wrapper">
      <nuxt-link :to="localPath('/')">
        <img
          src="/images/logo-header.svg"
          alt="logo">
      </nuxt-link>
      <div class="header__routes">
        <nuxt-link
          :to="localPath('/specialists?type=lawyer')"
          class="font-montserrat font-medium text-normal"
          :class="{ active: $route.query.type === 'lawyers' }">
          {{ $t('navigation.lawyers') }}
        </nuxt-link>
        <nuxt-link
          :to="localPath('/specialists?type=psychologist')"
          class="font-montserrat font-medium text-normal"
          :class="{ active: $route.query.type === 'psychologists' }">
          {{ $t('navigation.psychologists') }}
        </nuxt-link>
      </div>
      <div class="header__nav">
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
        
        <template v-if="!authStore.user">
          <nuxt-link
            :to="localPath('/auth?type=specialist')"
            class="flex gap-[12px] items-center justify-center px-6 font-montserrat text-normal font-medium rounded-[44px] border border-[EBEBEB] h-[50px] min-w-fit w-[100%]"
          >
            {{ $t('auth.login_as_specialist') }}
            <img
              src="/icons/main/arrow-transparent.svg"
              alt="arrow">
          </nuxt-link>
          <nuxt-link
            :to="localPath('/auth?type=client')"
            class="flex gap-[12px] items-center justify-center font-montserrat text-normal font-medium rounded-[44px] h-[50px] min-w-fit px-6 w-[100%] bg-[#B3DD62]"
          >
            {{ $t('auth.login') }}
            <img
              src="/icons/main/arrow-transparent.svg"
              alt="arrow">
          </nuxt-link>
        </template>
        
        <template v-else>
          <nuxt-link
            :to="localPath('/cabinet/profile')"
            class="flex gap-[12px] items-center justify-center font-montserrat text-normal font-medium rounded-[44px] h-[50px] max-w-[260px] px-6 w-[100%] bg-[#B3DD62]"
          >
            {{ $t('navigation.cabinet') }}
            <img
              src="/icons/main/arrow-transparent.svg"
              alt="arrow">
          </nuxt-link>
        </template>
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
          :class="{ active: $route.query.type === 'lawyers' }"
          @click="menuState = false">
          <nuxt-link
            :to="localPath('/specialists?type=lawyer')"
            class="sidebar__link font-montserrat font-medium text-normal">
            {{ $t('navigation.lawyers') }}
            <img
              src="/icons/cabinet/menu-mobile-arrow.svg"
              alt="menu arrow">
          </nuxt-link>
        </li>
        <li
          class="sidebar__item"
          :class="{ active: $route.query.type === 'psychologists' }"
          @click="menuState = false">
          <nuxt-link
            :to="localPath('/specialists?type=psychologist')"
            class="sidebar__link font-montserrat font-medium text-normal">
            {{ $t('navigation.psychologists') }}
            <img
              src="/icons/cabinet/menu-mobile-arrow.svg"
              alt="menu arrow">
          </nuxt-link>
        </li>

        <template v-if="!authStore.user">
          <li
            class="sidebar__item"
            @click="menuState = false">
            <nuxt-link
              :to="localPath('/auth?type=specialist')"
              class="sidebar__link font-montserrat font-medium text-normal">
              {{ $t('auth.login_as_specialist') }}
              <img
                src="/icons/cabinet/menu-mobile-arrow.svg"
                alt="menu arrow">
            </nuxt-link>
          </li>
          <li
            class="sidebar__item"
            @click="menuState = false">
            <nuxt-link
              :to="localPath('/auth?type=client')"
              class="sidebar__link font-montserrat font-medium text-normal">
              {{ $t('auth.login_as_client') }}
              <img
                src="/icons/cabinet/menu-mobile-arrow.svg"
                alt="menu arrow">
            </nuxt-link>
          </li>
        </template>
        
        <template v-else>
          <li
            class="sidebar__item"
            :class="{ active: $route.path === '/cabinet/profile' }"
            @click="menuState = false">
            <nuxt-link
              :to="localPath('/cabinet/profile')"
              class="font-montserrat font-medium text-normal">
              {{ $t('navigation.cabinet') }}
              <img
                src="/icons/cabinet/menu-mobile-arrow.svg"
                alt="menu arrow">
            </nuxt-link>
            
          </li>
          <li
            class="sidebar__item exit"
            @click="menuState = false">
            <a
              href="#"
              @click.prevent="authStore.logout()">
              {{ $t('auth.logout') }}
            </a>
          </li>
        </template>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.header {
  background: #fff;
  padding-top: 10px;
  padding-bottom: 10px;

  &__wrapper {
    display: flex;
    justify-content: space-around;
    align-items: center;
    max-width: 1200px;
    margin: auto;
  }

  &__routes {
    max-width: 230px;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  &__nav {
    max-width: fit-content;
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 20px;
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
    z-index: 1000;
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
  a{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

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
.active {
  color: #1F8EFB;
}

</style>