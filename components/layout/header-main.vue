<script>

</script>

<template>
  <header class="px-[22px] py-[20px] flex items-center justify-between backdrop-blur-[30px] rounded-[48px]">
    <nuxt-link
      to="/"
      aria-label="Переход к главной по клику на лого">
      <img
        src="/images/logo-header.svg"
        alt="logo">
    </nuxt-link>
    <nuxt-link
      to="/specialists?type=lawyer"
      class="font-montserrat font-medium text-normal">
      ЮРИСТЫ
    </nuxt-link>
    <nuxt-link
      to="/specialists?type=psycholog"
      class="font-montserrat font-medium text-normal">
      ПСИХОЛОГИ
    </nuxt-link>
    <select>
      <option value="ru">Рус</option>
      <option value="ru">Каз</option>
    </select>
    <nuxt-link
      to="/auth?type=specialist"
      class="flex gap-[12px] items-center justify-center font-montserrat text-normal font-medium rounded-[44px] border border-[EBEBEB] h-[50px] max-w-[266px] w-[100%]">
      Войти как специалист
      <img
        src="/icons/main/arrow-transparent.svg"
        alt="arrow">
    </nuxt-link>
    <nuxt-link
      to="/auth?type=client"
      class="flex gap-[12px] items-center justify-center font-montserrat text-normal font-medium rounded-[44px] h-[50px] max-w-[130px] w-[100%] bg-[#B3DD62]">
      Войти
      <img
        src="/icons/main/arrow-transparent.svg"
        alt="arrow">
    </nuxt-link>
  </header>
</template>

<style lang="scss" scoped>

</style>
