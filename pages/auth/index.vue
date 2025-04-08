<script setup>
import SignInForm from '@/components/auth/sign-in-form.vue';
import SignUpForm from '@/components/auth/sign-up-form.vue';
import { ref } from 'vue'

const isAuth = ref(true)
const isRegister = ref(false)
const isReset = ref(false)

const actionPage = (data) => {
  if (data == 'register') {
    isRegister.value = true
    isAuth.value = false
    isReset.value = false
  }

  if (data == 'reset') {
    isRegister.value = false
    isAuth.value = false
    isReset.value = true
  }

  if (data == 'login') {
    isRegister.value = false
    isAuth.value = true
    isReset.value = false
  }
}

</script>

<template>
  <section
    class="auth">
    <SignInForm
      v-if="isAuth"
      @action="actionPage"
    />
    <SignUpForm
      v-else
      @action="actionPage"/>
  </section>
</template>

<style lang="scss" scoped>
.auth {
  background: url('/images/auth-bg.webp');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 16px;
}

@media (max-width: 540px) {
  .auth {
    padding: 0;
    background: #fff;
  }
}
</style>