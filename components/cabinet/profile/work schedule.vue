<script setup>
</script>

<template>
  <div class="settings">
    <div class="settings__content">
      <div class="settings__wrapper">
        <v-calendar />
        <div class="settings__item">
          <p>
            Новый пароль
          </p>
          <input
            type="password"
            placeholder="Введите пароль">
        </div>
        <div class="settings__item">
          <p>
            Повторите новый пароль
          </p>
          <input
            type="password"
            placeholder="Повторите пароль">
        </div>
      </div>
    </div>
  </div>
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

.settings {
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

  &__item {
    max-width: 360px;
    width: 100%;

    p {
      font-family: 'Montserrat', sans-serif;
      font-weight: 600;
      font-size: 14px;
      line-height: 100%;
      letter-spacing: 0px;
      margin-bottom: 14px;
    }

    input {
      width: 100%;
      height: 64px;
      padding-left: 24px;
      border-radius: 12px;
      background: #ebeefc;
      border: 1px solid #E9EAEB;
      font-family: 'Montserrat', sans-serif;
      font-weight: 500;

      &:focus {
          outline: 2px solid #1F72EE;
      }
    }
  }
}
</style>