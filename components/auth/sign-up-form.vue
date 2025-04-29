<script setup>
import { ref } from 'vue'
import { useAuthStore } from '~/store/useAuthStore'
import { useToast } from 'vue-toastification'
import Select from '../ui/select.vue'

const emit = defineEmits()
const authStore = useAuthStore()
const route = useRoute()
const toast = useToast()

const email = ref('')
const first_name = ref('')
const last_name = ref('')
const middle_name = ref('')
const password = ref('')
const phone = ref('')
const role = ref(route.query.type)
const specialistType = ref({
  label: '',
  value: ''
})
const selectValue = [
  {
    value: 'lawyer',
    label: 'Юрист'
  },
  {
    value: 'psychologist',
    label: 'Психолог'
  }
]

const userActions = (type) => {
  if (type === 'login') {
    emit('action', 'login')
  }
}

async function createSpecialistProfile(user_id, token) {
  const data = {
    type: specialistType.value,
    user_id: user_id,
  }
  console.log(data);
  
  const res = await authStore.createSpecialistProfile(data, token)

  if (res.status) {
    toast('Регистрация прошла успешно')
    emit('action', 'login')
  }
}

const signUp = async () => {
  if (
    !email.value ||
    !first_name.value ||
    !last_name.value ||
    !middle_name.value ||
    !password.value ||
    !phone.value
  ) {
    toast.error('Пожалуйста, заполните все поля')
    return
  }

  if (!/\d/.test(password.value)) {
    toast.error('Пароль должен содержать хотя бы одну цифру')
    return
  }

  const uppercaseCount = (password.value.match(/[A-Z]/g) || []).length
  if (uppercaseCount !== 1) {
    toast.error('Пароль должен содержать ровно одну заглавную букву (латиница)')
    return
  }

  const symbolMatches = password.value.match(/[^A-Za-z0-9]/g)
  if (!symbolMatches || symbolMatches.length !== 1) {
    toast.error('Пароль должен содержать ровно один спецсимвол')
    return
  }

  const userData = {
    email: email.value,
    first_name: first_name.value,
    last_name: last_name.value,
    middle_name: middle_name.value,
    password: password.value,
    phone: phone.value.replace(/[()\s-]/g, ''),
    role: role.value
  }

  const res = await authStore.register(userData)

  if (route.query.type !== 'client') {
    await createSpecialistProfile(res.data.id, res.data.access_token)
  }

  if (route.query.type == 'client' && res.status) {
    toast('Регистрация прошла успешно')
    emit('action', 'login')
  }
}

</script>

<template>
  <div class="form">
    <img
      src="/images/logo-auth.svg"
      alt="logo"
      class="logo" >
    <p class="logo-subtitle">Личный кабинет специалиста</p>
    <div class="mt-8 space-y-6">
      <div class="form-item">
        <img
          src="/icons/auth/stack-icon.svg"
          alt="icon" >
        <input
          id="first_name"
          v-model="first_name"
          type="text"
          placeholder="Имя"
          class="form-item__input"
        >
      </div>
      <div class="form-item">
        <img
          src="/icons/auth/stack-icon.svg"
          alt="icon" >
        <input
          id="last_name"
          v-model="last_name"
          type="text"
          placeholder="Фамилия"
          class="form-item__input"
        >
      </div>
      <div class="form-item">
        <img
          src="/icons/auth/stack-icon.svg"
          alt="icon" >
        <input
          id="middle_name"
          v-model="middle_name"
          type="text"
          placeholder="Отчество"
          class="form-item__input"
        >
      </div>
      <div class="form-item">
        <img
          src="/icons/auth/stack-icon.svg"
          alt="icon" >
        <input
          id="email"
          v-model="email"
          type="email"
          placeholder="Email"
          class="form-item__input"
        >
      </div>
      <div class="form-item">
        <img
          src="/icons/auth/stack-icon.svg"
          alt="icon" >
        <input
          v-model="phone"
          v-mask="'+7 (###) ###-##-##'"
          type="tel"
          placeholder="Введите номер телефона"
          class="form-item__input"
        >
      </div>
      <div class="form-item">
        <img
          src="/icons/auth/electro-icon.svg"
          alt="icon" >
        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="Введите пароль"
          class="form-item__input"
        >
      </div>
      <div class="form-item form-item__select">
        <img
          src="/icons/auth/electro-icon.svg"
          alt="icon" >
        <Select
          v-model="specialistType"
          :options="selectValue"
          label-key="label"
          value-key="value"
          placeholder="Выберите специализацию"/>
      </div>
      <button
        type="submit"
        class="submit"
        @click="signUp">
        Зарегистрироваться
      </button>
      <button
        class="register"
        @click.prevent="userActions('login')">
        Уже есть аккаунт? <span>Войти</span>
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

    &__select {
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
      font-size: 15px;
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
    padding: 64px 16px;

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