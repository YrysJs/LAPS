<script setup>
import { useUserStore } from '~/store/useUserStore';
import { useToast } from 'vue-toastification/dist/index.mjs';

//fn
const userStore = useUserStore()
const toast = useToast()


//data
const newPassword = ref('')
const passwordRepeat = ref('')


//actions
const updatePassword = async () => {
  if (!newPassword.value.length || !passwordRepeat.value.length) {
    toast.warning('Заполните поля')
  } else {
    const data = {
      new_password: newPassword.value,
      old_password: passwordRepeat.value
    }
    await userStore.updateUserPassword(userStore.user.id, data)
  }
}

definePageMeta({
  middleware: 'cabinet'
})
</script>

<template>
  <NuxtLayout name="cabinet">
    <div class="settings">
      <h3 class="settings__title">
        Изменение пароля
      </h3>
      <div class="settings__content">
        <div class="settings__wrapper">
          <div class="settings__item">
            <p>
              Новый пароль
            </p>
            <input
              v-model="newPassword"
              type="password"
              placeholder="Введите пароль">
          </div>
          <div class="settings__item">
            <p>
              Старый пароль
            </p>
            <input
              v-model="passwordRepeat"
              type="password"
              placeholder="Старый пароль">
          </div>
        </div>
      </div>
      <button
        class="content-submit"
        @click="updatePassword">
        Сохранить
      </button>
    </div>
  </NuxtLayout>
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

  @media (max-width: 990px) {
    &__title {
      font-size: 24px;
    }

    &__content {
      padding: 24px 16px;
    }

    &__wrapper {
      gap: 32px;
    }
    &__item {
      max-width: 100%;

      input {
        height: 52px;
      }
    }
  }

  @media (max-width: 578px) {
    &__title {
      font-size: 18px;
    }

    &__wrapper {
      flex-wrap: wrap;
    }

    &__item {
      input {
        padding-left: 12px;
        height: 52px;
        font-size: 14px;
      }
    }
  }
}

@media (max-width: 578px) {
  .content-submit {
    height: 40px;
    font-size: 14px;
    margin-top: 30px;
  }
}
</style>