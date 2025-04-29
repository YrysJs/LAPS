<script setup>
import Sidebar from '~/components/cabinet/sidebar.vue';
import HeaderCabinet from '~/components/layout/header-cabinet.vue';

import { useUserStore } from '~/store/useUserStore'
import { useAuthStore } from '~/store/useAuthStore'

const userStore = useUserStore()
const authStore = useAuthStore()


if (authStore.user_type === 'client') {
  userStore.getUserInfo()
} else {
  userStore.getSpecialistInfo()
}
</script>

<template>
  <section class="cabinet">
    <Sidebar />
    <main class="cabinet__content">
      <HeaderCabinet />
      <div class="cabinet__content-wrapper">
        <slot></slot>
      </div>
    </main>
  </section>
</template>
<style lang="scss" scoped>
.cabinet {
  display: flex;
  min-height: 100vh;
  background: #F5F6FA;
}
.cabinet__content {
  flex-grow: 1;
}
.cabinet__content-wrapper {
  flex-grow: 1;
  padding: 30px;
}

@media (max-width: 768px) {
  .cabinet__content-wrapper {
    padding: 30px 8px;
  }
}
</style>
