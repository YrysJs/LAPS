<script setup>
const menuState = ref(false)
const burgerPath = ['/icons//burger-ff.svg', '/icons/cabinet/close-burger.svg']
</script>

<template>
  <div class="container mx-auto">
    <header class="header header-desktop">
      <div class="header__wrapper">
        <nuxt-link to="/">
          <img
            src="/images/logo-header.svg"
            alt="logo">
        </nuxt-link>
        <div class="header__routes">
          <nuxt-link
            to="/specialists?type=lawyer"
            class="font-montserrat font-medium text-normal"
            :class="{ active: $route.query.type === 'lawyers' }">
            ЮРИСТЫ
          </nuxt-link>
          <nuxt-link
            to="/specialists?type=psychologist"
            class="font-montserrat font-medium text-normal"
            :class="{ active: $route.query.type === 'psychologists' }">
            ПСИХОЛОГИ
          </nuxt-link>
        </div>
        <div class="header__nav">
          <select>
            <option value="ru">Рус</option>
            <option value="ru">Каз</option>
          </select>
          <nuxt-link
            to="/auth?type=specialist"
            class="flex gap-[12px] items-center justify-center font-montserrat text-normal font-medium rounded-[44px] border border-[EBEBEB] h-[50px] max-w-[266px] w-[100%]"
          >
            Войти как специалист
            <img
              src="/icons/main/arrow-transparent.svg"
              alt="arrow">
          </nuxt-link>
          <nuxt-link
            to="/auth?type=client"
            class="flex gap-[12px] items-center justify-center font-montserrat text-normal font-medium rounded-[44px] h-[50px] max-w-[130px] w-[100%] bg-[#B3DD62]"
          >
            Войти
            <img
              src="/icons/main/arrow-transparent.svg"
              alt="arrow">
          </nuxt-link>
        </div>
      </div>
    </header>
  </div>
  <header class="header-mobile">
    <nuxt-link to="/">
      <img
        src="/icons/laps-white.svg"
        alt="logo">
    </nuxt-link>
    <div class="flex items-center gap-[16px]">
      <select class="text-xs outline-none">
        <option value="ru">Рус</option>
        <option value="ru">Каз</option>
      </select>
      <button
        :class="{'active-menu': menuState}"
        @click="menuState = !menuState">
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
            to="/specialists?type=lawyer"
            class="font-montserrat font-medium text-normal"
            :class="{ active: $route.query.type === 'lawyers' }">
            ЮРИСТЫ
          </nuxt-link>
          <img
            src="/icons/cabinet/menu-mobile-arrow.svg"
            alt="menu arrow">
        </li>
        <li
          class="sidebar__item"
          :class="{ active: $route.path === '/cabinet/history' }">
          <nuxt-link
            to="/specialists?type=psycholog"
            class="font-montserrat font-medium text-normal"
            :class="{ active: $route.query.type === 'psychologists' }">
            ПСИХОЛОГИ
          </nuxt-link>
          <img
            src="/icons/cabinet/menu-mobile-arrow.svg"
            alt="menu arrow">
        </li>
        <li
          class="sidebar__item"
          :class="{ active: $route.path === '/cabinet/reviews' }">
          <nuxt-link
            to="/specialists?type=lawyer"
            class="font-montserrat font-medium text-normal"
            :class="{ active: $route.query.type === 'lawyers' }">
            ВОЙТИ КАК СПЕЦИАЛИСТ
          </nuxt-link>
          <img
            src="/icons/cabinet/menu-mobile-arrow.svg"
            alt="menu arrow">
        </li>
        <li
          class="sidebar__item"
          :class="{ active: $route.path === '/cabinet/reviews' }">
          <nuxt-link
            to="/specialists?type=lawyer"
            class="font-montserrat font-medium text-normal"
            :class="{ active: $route.query.type === 'lawyers' }">
            ВОЙТИ КАК КЛИЕНТ
          </nuxt-link>
          <img
            src="/icons/cabinet/menu-mobile-arrow.svg"
            alt="menu arrow">
        </li>
        <li
          class="sidebar__item"
          :class="{ active: $route.path === '/cabinet/reviews' }">
          <nuxt-link
            to="/specialists?type=lawyer"
            class="font-montserrat font-medium text-normal"
            :class="{ active: $route.query.type === 'lawyers' }">
            ЛИЧНЫЙ КАБИНЕТ
          </nuxt-link>
          <img
            src="/icons/cabinet/menu-mobile-arrow.svg"
            alt="menu arrow">
        </li>
        <li class="sidebar__item exit">
          <nuxt-link
            to="/"
          >
            Выйти
          </nuxt-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
select {
  background: transparent;
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
    max-width: 510px;
    width: 100%;
    display: flex;
    justify-content: space-between;
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