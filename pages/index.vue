<script setup>
import HeaderMain from '@/components/layout/header-main.vue'
const localPath = useLocalePath()
</script>

<template>
  <div class="main-page min-h-[100vh] relative overflow-hidden">
    <!-- Radial Elements -->
    <div class="top-radio w-[650px] h-[650px] rounded-[50%]"></div>
    <div class="bottom-radio w-[650px] h-[650px] rounded-[50%]"></div>
    <HeaderMain />
    <!-- Content Container -->
    <div class="container mx-auto py-[37px]">
      <!-- Header -->
      
      <!-- Main Section -->
      <section class="main">
        <div class="main-left">
          <h1 class="main-title text-[48px] font-montserrat font-bold text-[#1A1C1F] leading-[105%] mb-2">{{ $t('main.title') }}</h1>
          <p class="main-subtitle mt-4 text-[22px] font-montserrat font-extralight text-[#1A1C1F]">{{ $t('main.subtitle') }}</p>
          <div class="main-btn mt-[128px] flex justify-center md:justify-start space-x-6">
            <nuxt-link
              :to="localPath('/specialists?type=lawyer')"
              class="main-btn__item pt-[29px] pl-[18px] pb-[14px] bg-blue-600 text-white rounded-[48px] text-[36px] font-montserrat_alt font-bold hover:bg-blue-700">
              {{ $t('main.choose_lawyer') }}
              <img
                src="/icons/main/arrow.svg"
                alt="link"
                class="mt-[57px]">
            </nuxt-link>
            <nuxt-link
              :to="localPath('/specialists?type=psychologist')"
              class="main-btn__item pt-[29px] pl-[18px] pb-[14px] bg-green-600 text-white rounded-[48px] text-[36px] font-montserrat_alt font-bold hover:bg-green-700">
              {{ $t('main.choose_psychologist') }}
              <img
                src="/icons/main/arrow.svg"
                alt="link"
                class="mt-[57px]">
            </nuxt-link>
          </div>
        </div>
        <div class="main-right max-w-[530px]">
          <img
            src="/images/main.jpg"
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

.main {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-top: 20px;

  &-left {
    max-width: 706px;
  }

  @media (max-width: 1281px) {
    gap: 40px;

    &-left {
      max-width: initial;
    }

    &-right {
      min-width: 530px;
    }

    &-title {
      font-size: 36px;
    }
    &-btn {
      flex-wrap: wrap;
      gap: 16px;
      margin-top: 30px;

      &__item {
        min-width: 306px;
        font-size: 24px;
        word-wrap: break-word;
        word-wrap: break-word;
        padding-right: 18px;
        margin-left: 0 !important;
      }
    }
  }

  @media (max-width: 1030px) {
    padding-left: 20px;
    padding-right: 20px;
    min-height: 70vh;
    align-items: center;
    &-right {
      display: none;
    }

    &-title {
      color: #fff;
    }
    &-subtitle {
      color: #fff;
    }
  }

  @media (max-width: 769px) {
    &-title {
      color: #fff;
    }
    &-subtitle {
      color: #fff;
    }

    &-btn {

      &__item {
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        justify-content: left;
        gap: 50px;
        padding: 16px;
        width: 100%;
        min-width: none;

        img {
          margin-top: 0;
        }
      }
    }
  }

  @media (max-width: 590px) {
    padding: 16px;
    min-height: 80vh;
    align-items: flex-end;
    &-title {
      font-size: 20px;
      margin-bottom: 0;
    }
    &-subtitle {
      font-size: 12px;
      margin-top: 8px;
      font-weight: 400;
    }

    &-btn {
      gap: 11px;
      a {
        font-size: 16px;

        img {
          width: 32px;
          height: 32px;
        }
      }
    }
  }
}
@media (max-width: 1030px) {
  .top-radio, .bottom-radio {
    display: none;
  }
  .main-page {
    background-image:
    linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)),
    url('/images/main.jpg');
    background-size: cover;
    background-position: center;
  }
  .container {
    padding-top: 0px;
  }
}
</style>
