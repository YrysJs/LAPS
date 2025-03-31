<script setup>
</script>

<template>
  <header class="header">
    <div class="header__wrapper">
      <nuxt-link to="/">
        <img
          src="/images/logo-header.svg"
          alt="logo">
      </nuxt-link>
      <div class="header__routes">
        <nuxt-link
          to="/specialists?type=lawyers"
          class="font-montserrat font-medium text-normal"
          :class="{ active: $route.query.type === 'lawyers' }">
          ЮРИСТЫ
        </nuxt-link>
        <nuxt-link
          to="/specialists?type=psychologists"
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
    max-width: 510px;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
}

.active {
  color: #1F8EFB;
}

</style>