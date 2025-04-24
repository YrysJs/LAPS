<script setup>
import { ref } from 'vue'
  
const isExpanded = ref(false)
  
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <div class="education">
    <h3>Образование:</h3>
    <p
      class="education__text"
      :class="{ 'expanded': isExpanded }">
      — 2009 – 2011 гг. – Алматы Госуниверситет, специализация: «Нефрология»;
      <br >
      — 2008 г. – Казахский Нацмед Университет, специальность «Терапия»;
      <br >
      — 2009 – 2011 гг. – Алматы Госуниверситет, специализация: «Нефрология»;
      <br >
      — 2008 г. – Казахский Нацмед Университет, специальность «Терапия»;
    </p>
    <button
      class="education__button"
      @click="toggleExpand">
      {{ isExpanded ? 'Скрыть' : 'Показать еще' }}
    </button>
  </div>
</template>
  
<style lang="scss" scoped>
.education {
  max-width: 805px;
  width: 100%;
  margin: 0 auto;
  background: #fff;
  padding: 20px;
  border-radius: 0px 0px 14px 14px;

  h3 {
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 16px;
    line-height: 22.4px;
    color: #6B7280;
    margin-bottom: 8px;
  }

  &__text {
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 22.4px;
    color: #1F2937;
    max-height: 60px; 
    overflow: hidden;
    transition: max-height 0.3s ease;
  }

  &__text.expanded {
    max-height: fit-content;
  }

  &__button {
    background: #E9F1FD;
    color: #1F72EE;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    padding: 8px 16px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    margin-top: 20px;
    width: 100%;

    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    font-size: 14.63px;
    line-height: 24px;
    letter-spacing: 0%;
    text-align: center;
    vertical-align: middle;


    &:hover {
      background: #d0e1f1;
    }
  }
}
</style>
  