<!-- components/StarRating.vue -->
<template>
  <div class="inline-flex items-center">
    <svg
      v-for="i in maxStars"
      :key="i"
      :width="size"
      :height="size"
      viewBox="0 0 24 24"
      class="mr-0.2 last:mr-0"
    >
      <path
        :fill="i <= rating ? color : emptyColor"
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      />
    </svg>
  </div>
</template>
  
<script setup>
const props = defineProps({
  rating: {
    type: Number,
    required: true,
    validator: v => v >= 0
  },
  maxStars: {
    type: Number,
    default: 5
  },
  color: {
    type: String,
    default: '#f5a623' // золотой по умолчанию
  },
  emptyColor: {
    type: String,
    default: '#e0e0e0' // серый для пустых
  },
  size: {
    type: [Number, String],
    default: 20
  }
});
</script>
  