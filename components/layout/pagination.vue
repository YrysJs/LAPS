<template>
  <div class="overflow-x-auto mx-auto w-fit">
    <nav class="inline-flex items-center whitespace-nowrap space-x-1 py-4 sm:hidden">
      <button
        :class="btnClass(currentPage === 1)"
        @click="goTo(1)"
      >
        1
      </button>

      <span
        v-if="showStartEllipsis"
        class="px-2 select-none"
      >
        …
      </span>

      <button
        v-for="page in middlePages"
        :key="page"
        :class="btnClass(currentPage === page)"
        @click="goTo(page)"
      >
        {{ page }}
      </button>

      <span
        v-if="showEndEllipsis"
        class="px-2 select-none"
      >
        …
      </span>

      <button
        v-if="totalPages > 1"
        :class="btnClass(currentPage === totalPages)"
        @click="goTo(totalPages)"
      >
        {{ totalPages }}
      </button>
    </nav>

    <nav class="hidden sm:inline-flex items-center justify-center space-x-2 py-4">
      <button
        v-if="currentPage > 1"
        class="px-3 py-2 bg-[#F1F2F7] rounded-[10px] hover:bg-gray-300 transition"
        @click="goTo(1)"
      >
        1
      </button>
      <button
        v-if="currentPage > 2"
        class="px-3 py-2 bg-[#F1F2F7] rounded-[10px] hover:bg-gray-300 transition"
        @click="goTo(currentPage - 1)"
      >
        ‹
      </button>

      <button
        v-for="page in pagesToShow"
        :key="page"
        :class="[
          'px-3 py-2 rounded-[10px] cursor-pointer transition',
          currentPage === page
            ? 'bg-[#E9F1FD] text-teal-700'
            : 'bg-[#F1F2F7] hover:bg-gray-300'
        ]"
        @click="goTo(page)"
      >
        {{ page }}
      </button>

      <button
        v-if="currentPage < totalPages - 1"
        class="px-3 py-2 bg-[#F1F2F7] rounded-[10px] hover:bg-gray-300 transition"
        @click="goTo(currentPage + 1)"
      >
        ›
      </button>
      <button
        v-if="currentPage < totalPages"
        class="px-3 py-2 bg-[#F1F2F7] rounded-[10px] hover:bg-gray-300 transition"
        @click="goTo(totalPages)"
      >
        Последняя
      </button>
    </nav>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  currentPage:    { type: Number, default: 1 },
  totalPages:     { type: Number, required: true },
  maxPagesToShow: { type: Number, default: 5 }
});
const emit = defineEmits(['update:currentPage']);

function goTo(page) {
  if (page >= 1 && page <= props.totalPages) {
    emit('update:currentPage', page);
  }
}

const pagesToShow = computed(() => {
  const half  = Math.floor(props.maxPagesToShow / 2);
  let start   = props.currentPage - half;
  let end     = props.currentPage + half;

  if (start < 1) {
    start = 1;
    end   = Math.min(props.maxPagesToShow, props.totalPages);
  }
  if (end > props.totalPages) {
    end   = props.totalPages;
    start = Math.max(1, props.totalPages - props.maxPagesToShow + 1);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

const showStartEllipsis = computed(() => props.currentPage > 3);
const showEndEllipsis   = computed(() => props.currentPage < props.totalPages - 2);

const middlePages = computed(() => {
  if (props.totalPages <= 5) {
    return Array.from({ length: props.totalPages - 2 }, (_, i) => i + 2);
  }
  if (props.currentPage <= 3) {
    return [2, 3, 4].filter(p => p < props.totalPages);
  }
  if (props.currentPage >= props.totalPages - 2) {
    return [props.totalPages - 3, props.totalPages - 2, props.totalPages - 1]
      .filter(p => p > 1);
  }
  return [props.currentPage - 1, props.currentPage, props.currentPage + 1];
});

function btnClass(isActive) {
  return [
    'px-2 py-1 text-sm bg-[#F1F2F7] transition',
    isActive
      ? 'bg-[#E9F1FD] text-teal-700'
      : 'bg-[#F1F2F7] hover:bg-gray-300'
  ];
}
</script>
