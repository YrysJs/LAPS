<template>
  <div
    ref="container"
    class="custom-select">
    <div
      class="select-trigger"
      @click="toggle">
      <span>{{ selectedLabel }}</span>
      <span
        class="arrow"
        :class="{ open: isOpen }">▾</span>
    </div>
    <div
      v-if="isOpen"
      class="options">
      <div
        v-for="option in options"
        :key="option[valueKey]"
        class="option"
        :class="{ selected: option[valueKey] === internalValue }"
        @click="selectOption(option)"
      >
        {{ option[labelKey] }}
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
  
const props = defineProps({
  modelValue: null,
  options: Array,
  labelKey: {
    type: String,
    default: 'label'
  },
  valueKey: {
    type: String,
    default: 'value'
  },
  placeholder: {
    type: String,
    default: 'Select...'
  }
});
  
const emit = defineEmits(['update:modelValue']);
  
const isOpen = ref(false);
const internalValue = ref(props.modelValue);
  
watch(() => props.modelValue, val => internalValue.value = val);
  
const selectedLabel = computed(() => {
  const found = props.options.find(o => o[props.valueKey] === internalValue.value);
  return found ? found[props.labelKey] : props.placeholder;
});
  
function toggle() {
  isOpen.value = !isOpen.value;
}
  
function selectOption(option) {
  internalValue.value = option[props.valueKey];
  emit('update:modelValue', internalValue.value);
  isOpen.value = false;
}
  
// Закрываем при клике вне
const container = ref(null);
function clickOutsideHandler(e) {
  if (container.value && !container.value.contains(e.target)) {
    isOpen.value = false;
  }
}
  
onMounted(() => {
  document.addEventListener('click', clickOutsideHandler);
});
  
onBeforeUnmount(() => {
  document.removeEventListener('click', clickOutsideHandler);
});
</script>
  
  <style scoped>
  .custom-select {
    position: relative;
    width: 100%;
    height: 100%;
    font-family: sans-serif;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .select-trigger {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    padding: 8px 12px;
    border-radius: 4px;
    background: transparent;
    cursor: pointer;
  }
  .arrow {
    transition: transform 0.2s ease;
  }
  .arrow.open {
    transform: rotate(180deg);
  }
  .options {
    position: absolute;
    width: 100%;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-top: 4px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    z-index: 10;
    max-height: 200px;
    overflow-y: auto;
    top: 63px;
  }
  .option {
    padding: 8px 12px;
    cursor: pointer;
  }
  .option:hover {
    background: #f5f5f5;
  }
  .option.selected {
    background: #e6f7ff;
  }
  </style>
  