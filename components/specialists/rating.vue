<template>
  <div class="inline-flex items-center">
    <svg
      v-for="i in maxStars"
      :key="i"
      :width="size"
      :height="size"
      viewBox="0 0 24 24"
      class="mr-0.2 last:mr-0 cursor-pointer"
      @click="update(i)"
    >
      <path
        :fill="i <= ratingValue ? color : emptyColor"
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      />
    </svg>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0
  },
  rating: {
    type: [Number, String],
    default: 0
  },
  maxStars: {
    type: Number,
    default: 5
  },
  color: {
    type: String,
    default: '#f5a623'
  },
  emptyColor: {
    type: String,
    default: '#e0e0e0'
  },
  size: {
    type: [Number, String],
    default: 20
  }
})

const emit = defineEmits(['update:modelValue'])

// Use either modelValue or rating prop
const ratingValue = computed(() => {
  if (props.modelValue > 0) return props.modelValue;
  return typeof props.rating === 'string' ? parseFloat(props.rating) : props.rating;
})

function update(i) {
  emit('update:modelValue', i)
}
</script>
