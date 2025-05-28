<script setup>
import { ref } from 'vue'
import { useMainStore } from '~/store/useMainStore'
import { useI18n } from 'vue-i18n'

const isExpanded = ref(false)
const mainStore = useMainStore()
const { t } = useI18n()

const specialist_info = computed(() => {
  return mainStore.specialistById
})
  
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <div class="education">
    <p class="education__main">
      {{ specialist_info.description }}
    </p>
    <div
      class="education__text"
      :class="{ 'expanded': isExpanded }">
      <div class="mb-4">
        <h3>{{ $t('specialists.info.education') }}:</h3>
        <div>
          <p
            v-for="item of specialist_info.education"
            :key="item.id">
            - {{ item.graduation_year }}{{ $t('specialists.info.years') }} -- {{ item.institution }} ({{ item.degree }}, {{ item.specialization }})
          </p>
        </div>
      </div>
      <div>
        <h3>{{ $t('specialists.info.work_experience') }}:</h3>
        <div>
          <p
            v-for="item of specialist_info.work_experience"
            :key="item.id">
            - {{ item.start_year }} - {{ item.end_year }} -- {{ item.company }} ({{ $t('specialists.info.position') }}: {{ item.position }})
          </p>
        </div>
      </div>
    </div>
    <button
      class="education__button"
      @click="toggleExpand">
      {{ isExpanded ? $t('specialists.info.hide') : $t('specialists.info.show_more') }}
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

  &__main {
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 22.4px;
    color: #1F2937;
    margin-bottom: 20px;
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
  