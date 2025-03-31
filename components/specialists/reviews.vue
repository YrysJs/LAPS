<template>
  <div class="reviews">
    <div class="review-item">
      <div class="review-header">
        <div class="review-avatar">
          <img
            src="/images/test-image.png"
            alt="avatar" >
        </div>
        <div class="review-info">
          <span class="review-name">Усманова Арзыгуль</span>
          <span class="review-date">12 ноября 2024</span>
        </div>
      </div>
      <div class="review-rating">
        <span>⭐⭐⭐⭐⭐</span>
        <span>Обслуживание, Эффективность встречи, Профессионализм</span>
      </div>
      <p
        class="review-text"
        :class="{ 'expanded': isExpanded }">
        Алена очень юрист, профессионал. Порекомендовала именно её и всем рекомендую, всё подсказала, рассказала, всё докачно изучила, помогла, молодец, спасибо!
      </p>
      <button
        class="review-button"
        @click="toggleExpand">
        {{ isExpanded ? 'Скрыть' : 'Развернуть' }}
      </button>
      <div class="review-response">
        <span class="response-name">Ответ LAPS:</span>
        <p class="response-text">
          Спасибо за ваш отзыв, Арзыгуль! Мы рады, что вы остались довольны консультацией с Аленой Олеговной. Ваши слова благодарности важны для нас, и мы обязательно передадим их...
        </p>
      </div>
    </div>
  
    <!-- Добавьте другие отзывы по аналогии -->
    <button
      class="load-more"
      @click="showAllReviews">
      Показать еще
    </button>
  </div>
</template>
  
<script setup>
import { ref } from 'vue'
  
const isExpanded = ref(false)
  
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}
  
const showAllReviews = () => {
  // Логика для загрузки и отображения дополнительных отзывов
}
</script>
  
<style lang="scss" scoped>
.reviews {
  background-color: #f9fafb;
  padding: 20px;
  border-radius: 10px;
  max-width: 800px;
  margin: 0 auto;

  .review-item {
    background: #fff;
    padding: 20px;
    margin-bottom: 15px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    
    .review-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 15px;
    
    .review-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      
      img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      }
    }

      .review-info {
        display: flex;
        flex-direction: column;
        
        .review-name {
        font-weight: 700;
        font-size: 16px;
        }
        
        .review-date {
        font-size: 12px;
        color: #888;
        }
      }
    }

    .review-rating {
    font-size: 14px;
    margin-bottom: 10px;
    }

    .review-text {
      max-height: 60px;
      overflow: hidden;
      transition: max-height 0.3s ease;
      font-size: 14px;
      color: #333;
    }

    .review-text.expanded {
      max-height: 500px;
    }

    .review-button {
      background: #e1e9f1;
      color: #1f8efb;
      font-size: 14px;
      border: none;
      padding: 8px;
      cursor: pointer;
      border-radius: 4px;
      margin-top: 10px;
    }

    .review-response {
      margin-top: 15px;
      background-color: #f1f2f7;
      padding: 10px;
      border-radius: 6px;
    
    .response-name {
      font-weight: 700;
    }

    .response-text {
      font-size: 14px;
    }
    }
  }

  .load-more {
      display: block;
      background-color: #e1e9f1;
      color: #1f8efb;
      border: none;
      padding: 10px;
      text-align: center;
      width: 100%;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 20px;
    }
  }
</style>
  