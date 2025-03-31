<script setup>
import Sidebar from '~/components/cabinet/sidebar.vue';
</script>

<template>
  <section class="cabinet">
    <Sidebar />
    <main class="cabinet__content">
      <slot></slot>
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
  padding: 30px;
}
</style>
