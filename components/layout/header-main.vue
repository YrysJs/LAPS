<script setup>
import { useAuthStore } from '~/store/useAuthStore'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const menuState = ref(false)
const burgerPath = ['/icons/burger-ff.svg', '/icons/cabinet/close-burger.svg']
const authStore = useAuthStore()
const localPath = useLocalePath()
const { locale, locales, setLocale } = useI18n()

const language = computed({
  get: () => locale.value,
  set: (value) => {
    setLocale(value)
  }
});

// Initialize auth state
onMounted(() => {
  authStore.initialize()
})
</script>

<template>
  <div class="container mx-auto">
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
          <select v-model="language">
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
              class="flex gap-[12px] items-center justify-center font-montserrat text-normal font-medium rounded-[44px] border border-[EBEBEB] h-[50px] px-6 min-w-fit w-[100%]"
            >
              {{ $t('auth.login_as_specialist') }}
              <img
                src="/icons/main/arrow-transparent.svg"
                alt="arrow">
            </nuxt-link>
            <nuxt-link
              :to="localPath('/auth?type=client')"
              class="flex gap-[12px] px-6 items-center justify-center font-montserrat text-normal font-medium rounded-[44px] h-[50px] min-w-fit w-[100%] bg-[#B3DD62]"
            >
              {{ $t('auth.login_as_client') }}
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
              {{ $t('auth.sign_in.specialist_cabinet') }}
              <img
                src="/icons/main/arrow-transparent.svg"
                alt="arrow">
            </nuxt-link>
          </template>
        </div>
      </div>
    </header>
  </div>
  <header class="header-mobile">
    <nuxt-link :to="localPath('/')">
      <img
        src="/icons/laps-white.svg"
        alt="logo">
    </nuxt-link>
    <div class="flex items-center gap-[16px]">
      <select v-model="language">
        <option 
          v-for="item of locales" 
          :key="item" 
          :value="item.code">
          {{ item.name }}
        </option>
      </select>
      <button
        class="burger-button"
        :class="{'active-menu': menuState}"
        @click="menuState = !menuState"
      >
        <NuxtImg
          :src="menuState ? burgerPath[1] : burgerPath[0]"
          alt="menu button mobile" />
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
            :to="localPath('/specialists?type=lawyer')"
            class="font-montserrat font-medium text-normal"
            :class="{ active: $route.query.type === 'lawyers' }">
            {{ $t('navigation.lawyers') }}
          </nuxt-link>
          <img
            src="/icons/cabinet/menu-mobile-arrow.svg"
            alt="menu arrow">
        </li>
        <li
          class="sidebar__item"
          :class="{ active: $route.path === '/cabinet/history' }">
          <nuxt-link
            :to="localPath('/specialists?type=psychologist')"
            class="font-montserrat font-medium text-normal"
            :class="{ active: $route.query.type === 'psychologists' }">
            {{ $t('navigation.psychologists') }}
          </nuxt-link>
          <img
            src="/icons/cabinet/menu-mobile-arrow.svg"
            alt="menu arrow">
        </li>
        
        <template v-if="!authStore.user">
          <li
            class="sidebar__item"
            :class="{ active: $route.path === '/cabinet/reviews' }">
            <nuxt-link
              :to="localPath('/auth?type=specialist')"
              class="font-montserrat font-medium text-normal">
              {{ $t('auth.login_as_specialist') }}
            </nuxt-link>
            <img
              src="/icons/cabinet/menu-mobile-arrow.svg"
              alt="menu arrow">
          </li>
          <li
            class="sidebar__item"
            :class="{ active: $route.path === '/cabinet/reviews' }">
            <nuxt-link
              :to="localPath('/auth?type=client')"
              class="font-montserrat font-medium text-normal">
              {{ $t('auth.login_as_client') }}
            </nuxt-link>
            <img
              src="/icons/cabinet/menu-mobile-arrow.svg"
              alt="menu arrow">
          </li>
        </template>
        
        <template v-else>
          <li
            class="sidebar__item"
            :class="{ active: $route.path === '/cabinet/profile' }">
            <nuxt-link
              :to="localPath('/cabinet/profile')"
              class="font-montserrat font-medium text-normal">
              {{ $t('navigation.cabinet') }}
            </nuxt-link>
            <img
              src="/icons/cabinet/menu-mobile-arrow.svg"
              alt="menu arrow">
          </li>
          <li class="sidebar__item exit">
            <a href="#" @click.prevent="authStore.logout()">
              {{ $t('auth.logout') }}
            </a>
          </li>
        </template>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
select {
  background: transparent;
}

.burger-button {
  width: 24px;
  height: 24px;

  img {
    width: 100%;
    height: 100%;
  }
}

.header {
  padding: 12px 20px;
  backdrop-filter: blur(30px);
  border-radius: 48px;


  &__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
.active-menu {
  width: 24px;
  height: 24px;

  background: #fff;
  border-radius: 50%;
  
  img {
    width: 100%;
    height: 100%;
  }
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
    backdrop-filter: blur(10px);
    background: #ffffff1c;
    padding-left: 16px;
    padding-right: 16px;
    position: relative;
    z-index: 1000;

    button {
      transition: 0.5s;
    }

    select {
      width: 50px;
      color: #fff;

      option {
        color: #000;
      }
    }

    button {

    }
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
  margin-left: -200%;
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
.active {
  color: #1F8EFB;
}

</style>