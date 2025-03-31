<template>
  <div class="pagination">
    <button
      v-if="currentPage > 1"
      class="pagination-btn"
      @click="changePage(1)"
    >
      1
    </button>
    <button
      v-if="currentPage > 2"
      class="pagination-btn"
      @click="changePage(currentPage - 1)"
    >
      &lt;
    </button>
  
    <button
      v-for="page in pagesToShow"
      :key="page"
      :class="['pagination-btn', { active: currentPage === page }]"
      @click="changePage(page)"
    >
      {{ page }}
    </button>
  
    <button
      v-if="currentPage < totalPages - 1"
      class="pagination-btn"
      @click="changePage(currentPage + 1)"
    >
      &gt;
    </button>
  
    <button
      v-if="currentPage < totalPages"
      class="pagination-btn"
      @click="changePage(totalPages)"
    >
      Последняя
    </button>
  </div>
</template>
  
<script setup>
import { ref, computed } from 'vue';
  
const currentPage = ref(1);
const totalPages = ref(10); // всего страниц
const maxPagesToShow = 5; // количество страниц для отображения в пределах
  
// Генерация страниц для отображения
const pagesToShow = computed(() => {
  const start = Math.max(currentPage.value - Math.floor(maxPagesToShow / 2), 1);
  const end = Math.min(start + maxPagesToShow - 1, totalPages.value);
    
  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});
  
const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
};
</script>
  
<style scoped>
.pagination {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  margin-top: 62px;
  margin-bottom: 22px;
}

.pagination-btn {
  min-width: 48px;
  height: 48px;
  padding: 5px 10px;
  background-color: #eaeaec;
  cursor: pointer;
  border-radius: 16px;

  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 14.63px;
  line-height: 24px;
}

.pagination-btn.active {
  background-color: #00f7ff27;
  color: #029AAD;
}

.pagination-btn:disabled {
  background-color: #e0e0e0;
  cursor: not-allowed;
}
</style>
  