<script setup>
import { useAuthStore } from '~/store/useAuthStore';
import { useToast } from 'vue-toastification/dist/index.mjs';
import { useI18n } from 'vue-i18n';
import { setCookie } from '~/utlis/cookie';


const route = useRoute()
const emit = defineEmits()
const toast = useToast()
const authStore = useAuthStore()
const { t } = useI18n()

const phoneNumber = ref('')
const password = ref('')
const userType = ref('specialist')

const userTypeOptions = [
  { value: 'client', label: 'Клиент' },
  { value: 'specialist', label: 'Специалист' }
]

const userActions = (type) => {
  if (type == 'reset') {
    emit('action', 'reset')
  }

  if (type == 'register') {
    emit('action', 'register')
  }
}

const signIn = async () => {
  if (!phoneNumber.value.length || !password.value.length) {
    toast.warning(t('errors.fill_required_fields'))
    return
  }

  const cleanPhone = phoneNumber.value.replace(/[()\s-]/g, '')
  const phoneRegex = /^\+7\d{10}$/
  
  if (!phoneRegex.test(cleanPhone)) {
    toast.error('Неверный формат номера телефона')
    return
  }

  const userData = {
    login: cleanPhone,
    password: password.value
  }
  
  setCookie('user_type', userType.value)
  
  await authStore.auth(userData)
  await authStore.setUserType(userType.value)
}

watch(userType, (newType) => {
  setCookie('user_type', newType)
  authStore.setUserType(newType)
})

onMounted(() => {
  setCookie('user_type', userType.value)
  authStore.setUserType(userType.value)
})
</script>

<template>
  <div class="form">
    <img
      src="/images/logo-auth.svg"
      alt="logo"
      class="logo">
    <p class="logo-subtitle">{{ $t('auth.sign_in.specialist_cabinet') }}</p>
    <div class="mt-8 space-y-6">
      <div class="form-item">
        <img
          src="/icons/auth/stack-icon.svg"
          alt="icon">
        <select
          v-model="userType"
          class="form-item__input form-item__select">
          <option
            v-for="option in userTypeOptions"
            :key="option.value"
            :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
      <div
        class="form-item"
      >
        <img
          src="/icons/auth/phone.svg"
          alt="icon">
        <input
          v-model="phoneNumber"
          v-mask="'+7 (###) ###-##-##'"
          type="tel" 
          :placeholder="$t('auth.sign_in.phone_placeholder')"
          class="form-item__input">
      </div>
      <div class="form-item">
        <img
          src="/icons/auth/secure.svg"
          alt="icon">
        <input
          id="password"
          v-model="password"
          type="password"
          :placeholder="$t('auth.sign_in.password_placeholder')"
          class="form-item__input">
      </div>
      <button
        type="submit"
        class="submit"
        @click="signIn">
        {{ $t('auth.login') }}
      </button>
      <button
        type=""
        class="reset"
        @click.prevent="userActions('reset')">
        {{ $t('auth.sign_in.forgot_password') }}
      </button>
      <button
        class="register"
        @click.prevent="userActions('register')">
        {{ $t('auth.sign_in.register_prompt') }} <span>{{ $t('auth.sign_in.register_link') }}</span>
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

    &__select {
      appearance: none;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
      background-repeat: no-repeat;
      background-position: right 16px center;
      background-size: 20px;
      cursor: pointer;
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