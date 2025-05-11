<script setup>
import { ref } from 'vue';
import Rating from './rating.vue';

const isExpanded = ref(false);
function toggle() {
  isExpanded.value = !isExpanded.value;
}
</script>

<template>
  <div class="reviews">
    <div class="reviews-item">
      <div class="reviews-avatar">
        <img
          src="/images/avator-none.jpg"
          alt="avatar" >
      </div>
      <div class="reviews-content">
        <div class="reviews-content__top">
          <div>
            <h3>Усманова Арзыгуль</h3>
            <Rating
              rating="4.2"
              color="#1F72EE" />
          </div>
          <div class="date">12 ноября 2024</div>
        </div>
        <div class="reviews-bullet">
          <div>Обслуживание</div>
          <div>Эффективность встречи</div>
          <div>Профессионализм</div>
          <div>Цена</div>
          <div>Профессионализм</div>
          <div>Цена</div>
        </div>
        <div class="reviews-text">
          Алена очень юрист, профессионал.
          Порекомендовали именно ее👍 и я всем рекомендую, всё подсказала,
          рассказала , всё досконально изучила, помогла ,молодец, спасибо 💐
        </div>

        <div class="reviews-send">
          <h4>Ответ</h4>
          <div class="reviews-send__top">
            <div class="reviews-send__top-left">
              <div class="reviews-avatar">
                <img
                  src="/images/avator-none.jpg"
                  alt="avatar" >
              </div>
              <h3>LAPS</h3>
            </div>
            <div class="date">12 ноября 2024</div>
          </div>

          <div
            class="reviews-text reviews-send__text"
            :class="{ 'reviews-send__text--expanded': isExpanded }"
          >
            Спасибо за ваш отзыв, Арзыгуль! ❤️ Мы рады, что вы остались
            довольны консультацией с Аленой Олеговной. Ваши слова благодарности
            важны для нас, и мы обязательно передадим их
            Спасибо за ваш отзыв, Арзыгуль! ❤️ Мы рады, что вы остались
            довольны консультацией с Аленой Олеговной. Ваши слова благодарности
            важны для нас, и мы обязательно передадим их
          </div>

          <button
            class="reviews-send__btn"
            @click="toggle">
            {{ isExpanded ? 'Свернуть' : 'Развернуть' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
  
<style lang="scss" scoped>
.reviews {
  width: 100%;
  background: #fff;
  padding: 24px;

  &-avatar {
    min-width: 44px;
    height: 44px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  
  &-item {
    border-radius: 0px 0px 20px 20px;
    border: 1px solid #E5E7EB;
    border-radius: 16px;
    padding: 17px;

    display: flex;
    gap: 16px;
    align-items: flex-start;
  }

  &-content {
    &__top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      h3 {
        font-family: 'Montserrat', sans-serif;
        font-weight: 700;
        font-size: 14.38px;
        line-height: 24px;
      }

      .date {
        font-family: 'Montserrat', sans-serif;
        font-weight: 400;
        font-size: 11.44px;
        line-height: 16px;
        color: #6B7280;
      }
    }
  }

  &-bullet {
    padding-top: 16px;
    padding-bottom: 24px;

    display: flex;
    flex-wrap: wrap;
    gap: 16px;

    div {
      padding: 5px 8px;
      border-radius: 12px;
      background: #F1F2F7;

      font-family: 'Montserrat', sans-serif;
      font-weight: 400;
      font-size: 12.91px;
      line-height: 20px;

      width: fit-content;
    }
  }


  &-text {
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    font-size: 12.8px;
    line-height: 20px;
    color: #242424;
  }

  &-send {
    >h4 {
      padding-top: 10px;
      padding-bottom: 14px;
      font-family: 'Montserrat', sans-serif;
      font-weight: 400;
      font-size: 11.63px;
      line-height: 16px;
      color: #6B7280;
    }

    &__text {
      max-width: 600px;
      width: 100%;
      height: 50px;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &__text--expanded {
      height: auto;
      overflow: visible;
    }

    &__top {
      padding-bottom: 24px;

      display: flex;
      justify-content: space-between;
      align-items: center;

      &-left {
        display: flex;
        gap: 16px;
        align-items: center;

        h3 {
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: 14.38px;
          line-height: 24px;
        }
      }

      .date {
        font-family: 'Montserrat', sans-serif;
        font-weight: 400;
        font-size: 11.44px;
        line-height: 16px;
        color: #6B7280;
      }
    }

    button {
      margin-top: 14px;
      font-family: 'Montserrat', sans-serif;
      font-weight: 400;
      font-size: 12.91px;
      line-height: 20px;
      color: #1F72EE;
    }
  }
}
</style>
  