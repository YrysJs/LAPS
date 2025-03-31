<script setup>
import HeaderMain from '@/components/layout/header-main.vue'
</script>

<template>
  <div class="min-h-[100vh] relative overflow-hidden">
    <!-- Radial Elements -->
    <div class="top-radio w-[650px] h-[650px] rounded-[50%]"></div>
    <div class="bottom-radio w-[650px] h-[650px] rounded-[50%]"></div>

    <!-- Content Container -->
    <div class="container mx-auto py-[37px]">
      <!-- Header -->
      <HeaderMain />
      <!-- Main Section -->
      <section class="flex flex-col-reverse md:flex-row items-end justify-between px-8 pt-8">
        <!-- Text Section -->
        <div class="text-center md:text-left md:w-1/2">
          <h1 class="text-[48px] font-montserrat font-bold text-[#1A1C1F] leading-[105%] mb-2">Сервис по поиску юристов и психологов</h1>
          <p class="mt-4 text-[22px] font-montserrat font-extralight text-[#1A1C1F]">Мы поможем найти проверенного юриста или психолога и записаться на прием в удобное для Вас время</p>
          <div class="mt-[128px] flex justify-center md:justify-start space-x-6">
            <nuxt-link
              to="/specialists?type=lawyers"
              class="pt-[29px] pl-[18px] pb-[14px] bg-blue-600 text-white rounded-[48px] text-[36px] font-montserrat_alt font-bold hover:bg-blue-700">
              Выбрать юриста
              <img
                src="/icons/main/arrow.svg"
                alt="link"
                class="mt-[57px]">
            </nuxt-link>
            <nuxt-link
              to="/specialists?type=psychologists"
              class="pt-[29px] pl-[18px] pb-[14px] bg-green-600 text-white rounded-[48px] text-[36px] font-montserrat_alt font-bold hover:bg-green-700">
              Выбрать психолога
              <img
                src="/icons/main/arrow.svg"
                alt="link"
                class="mt-[57px]">
            </nuxt-link>
          </div>
        </div>

        <!-- Image Section -->
        <div class="mt-12 min-w-[300px] max-w-[550xp] md:mt-0 flex justify-center items-center">
          <img
            src="/images/main.webp"
            alt="main image"
            class="w-full rounded-[45px] shadow-lg">
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.top-radio {
  background: radial-gradient(circle, rgba(31,142,251,1) 0%, rgba(31,142,251,0) 70%);
  position: absolute;
  top: -30%;
  left: -15%;
  z-index: -1;
}
.bottom-radio {
  background: radial-gradient(circle, #00BCCC 0%, rgba(31,142,251,0) 70%);
  position: absolute;
  bottom: -30%;
  right: -15%;
  z-index: -1;
}
</style>
