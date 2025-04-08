<script setup>
import { useAuthStore } from '~/store/useAuthStore';
import { useToast } from 'vue-toastification';
import { setCookie } from '~/utlis/cookie';


const route = useRoute()
const emit = defineEmits()
const toast = useToast()
const authStore = useAuthStore()

const phoneNumber = ref('')
const password = ref('')

const userActions = (type) => {
  if (type == 'reset') {
    emit('action', 'reset')
  }

  if (type == 'register') {
    emit('action', 'register')
  }
}

const signIn = async () => {
  if (phoneNumber.value.length && password.value.length) {
    const userData = {
      login: phoneNumber.value.replace(/[()\s-]/g, ''),
      password: password.value
    }
    await authStore.auth(userData)
    await authStore.setUserType(route.query.type)
  } else {
    toast.warning('Заполните поля логин и пароль')
  }
}

onMounted(() => {
  setCookie('user_type', route.query.type)
  authStore.setUserType(route.query.type)
})
</script>

<template>
  <div class="form">
    <img
      src="/images/logo-auth.svg"
      alt="logo"
      class="logo">
    <p class="logo-subtitle">Личный кабинет специалиста</p>
    <div class="mt-8 space-y-6">
      <div
        class="form-item"
      >
        <img
          src="/icons/auth/stack-icon.svg"
          alt="icon">
        <input
          v-model="phoneNumber"
          v-mask="'+7 (###) ###-##-##'"
          type="tel" 
          placeholder="Введите номер телефона"
          class="form-item__input">
      </div>
      <div class="form-item">
        <img
          src="/icons/auth/electro-icon.svg"
          alt="icon">
        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="Введите пароль"
          class="form-item__input">
      </div>
      <button
        type="submit"
        class="submit"
        @click="signIn">
        Войти
      </button>
      <button
        type=""
        class="reset"
        @click.prevent="userActions('reset')">
        Не помню пароль
      </button>
      <button
        class="register"
        @click.prevent="userActions('register')">
        Не зарегистрированы? <span>Регистрация</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form {
  min-width: 300px;
  max-width: 630px;
  width: 100%;
  height: fit-content;
  padding: 60px 57px 57px 57px;
  background: #fff;
  border-radius: 24px;

  &-item {
    position: relative;

    &__input {
      width: 100%;
      height: 64px;
      padding-left: 64px;
      border-radius: 12px;
      background: #ebeefc;
      border: 1px solid #E9EAEB;
      font-family: 'Montserrat', sans-serif;
      font-weight: 500;
      
      &:focus {
        outline: 2px solid #1F72EE;
      }
    }

    img {
      position: absolute;
      top: 50%;
      left: 16px;
      transform: translateY(-50%);
    }
  }

  .logo {
    width: fit-content;
    margin: 0 auto 15px auto;

    &-subtitle {
      font-family: 'Montserrat', sans-serif;
      font-weight: 600;
      margin-top: 8px;
      text-align: center;
      font-size: 18px;
      color: #202224;
    }
  }

  .reset {
    max-width: 418px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
    margin: 18px auto 0 auto;
    border: 2px solid #FF0000;
    color: #FF0000;
    font-size: 14px;
    border-radius: 8px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
  }

  .submit {
    max-width: 418px;
    display: block;
    width: 100%;
    height: 50px;
    margin: 55px auto 0 auto;
    color: #fff;
    font-size: 16px;
    border-radius: 8px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    background: #1F72EE;
    cursor: pointer;
  }

  .register {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 18px;
    line-height: 100%;
    text-align: right;
    color: #202224;
    display: block;
    margin: 18px auto 0 auto;
    text-align: center;
    font-weight: 500;

    span {
      color: #5A8CFF;
      font-weight: 600;
    }
  }
}

@media (max-width: 540px) {
  .form {
    padding: 0px 16px;

    &-item {
      &__input {
        height: 54px;
      }
    }

    .logo {
      &-subtitle {
        font-weight: 500;
        font-size: 16px;
        letter-spacing: -0.06px;
      }
    }
    .submit, .reset {
      height: 40px;
      font-size: 14px;
    }
    .register {
      font-size: 14px;
      line-height: normal;
    }
  }
}
</style>