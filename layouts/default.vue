<script setup>
import FooterDefault from '~/components/layout/footer-default.vue';
import HeaderDefault from '~/components/layout/header-default.vue';
</script>

<template>
  <section class="default">
    <HeaderDefault />
    <div class="main">
      <slot></slot>
    </div>
    <FooterDefault />
  </section>
</template>
<style lang="scss" scoped>
.default {
  background: #F5F6FA;
}
.main {
  max-width: 1200px;
  width: 100%;
  margin: auto;
}

.default__content {
  flex-grow: 1;
  padding: 30px;
}
</style>
