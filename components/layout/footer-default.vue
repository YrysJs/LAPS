<script setup>
</script>

<template>
  <footer class="footer">
    <div class="footer__wrapper">
      <div class="footer__left">
        <div class="footer__left-top">
          <nuxt-link to="/specialists?type=lawyer">{{ $t('navigation.lawyers') }}</nuxt-link>
          <nuxt-link to="/specialists?type=psychologist">{{ $t('navigation.psychologists') }}</nuxt-link>
        </div>
        <p>
          {{ $t('footer.copyright') }}
          {{ $t('footer.description') }}
        </p>
      </div>
      <div class="footer__right">
        <h3>{{ $t('footer.social_networks') }}</h3>
        <div class="footer__right-social">
          <a
            href=""
            :aria-label="$t('footer.instagram_aria')">
            <img
              src="/icons/inst.svg"
              alt="">
          </a>
          <a
            href=""
            :aria-label="$t('footer.youtube_aria')">
            <img
              src="/icons/youtube.svg"
              alt="">
          </a>
        </div>
        <p>{{ $t('footer.report_error') }}</p>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  background: #1F72EE;
  padding-top: 32px;
  padding-bottom: 64px;
  
  &__wrapper {
    color: #fff;
    display: flex;
    justify-content: space-between;
    gap: 30px;
    max-width: 1200px;
    width: 100%;
    margin: auto;
    padding-left: 16px;
    padding-right: 16px;
  }


  &__left {
    max-width: 730px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 42px;

    &-top {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      font-family: 'Montserrat', sans-serif;
      font-weight: 400;
      font-size: 16.59px;
      line-height: 28px;
    }

    p {
      font-family: 'Montserrat', sans-serif;
      font-weight: 400;
      font-size: 11.06px;
      line-height: 16px;
    }
  }

  &__right {
    max-width: 280px;
    width: 100%;

    h3 {
      font-family: 'Montserrat', sans-serif;
      font-weight: 500;
      font-size: 22.13px;
      line-height: 32px;
    }

    &-social {
      margin-top: 16px;
      margin-bottom: 21px;
      display: flex;
      gap: 18px;
    }

    p {
      font-family: 'Montserrat', sans-serif;
      font-weight: 500;
      font-size: 11.06px;
      line-height: 16px;
    }
  }

  @media (max-width: 680px) {
    &__wrapper {
      flex-direction: column;
    }
  }
  @media (max-width: 390px) {
      &__left {
        &-top {
          flex-direction: column;
          gap: 20px;
        }
      }
  }
}
</style>