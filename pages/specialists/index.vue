<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useMainStore } from '~/store/useMainStore'
import Pagination from '~/components/layout/pagination.vue'

const router = useRouter()
const route = useRoute()
const store = useMainStore()

const searchQuery = ref('')
const suggestions = ref([])
const currentPage = ref(1);
const totalPages = ref(10);

const specializations = [
  'Конституционное право',
  'Семейное право',
  'Трудовое право',
  'Гражданство',
  'Уголовное право',
  'Медицинское право',
  'Наследство',
  'Военное право',
  'Налоговое право',
  'Права потребителя'
]

const fetchSpecializations = async () => {
  if (searchQuery.value.trim() === '') {
    suggestions.value = []
    return
  }

  const mockData = specializations

  suggestions.value = mockData.filter(item => item.toLowerCase().includes(searchQuery.value.toLowerCase()))
}

const updateSpecialization = (specialization) => {
  const currentType = route.query.type || 'lawyers'

  suggestions.value = []
  searchQuery.value = ''

  router.push({
    path: '/specialists',
    query: {
      type: currentType,
      specialization: specialization,
    },
  })
}

async function getSpecializations(params) {
  await store.getSpecializations(params)
}

async function getSpecialists(params) {
  await store.getSpecialists(params)
}

onMounted( async() => {
  // await getSpecializations({type: 'lawyer'})
  await getSpecialists({type: 'lawyer'})
})

</script>

<template>
  <NuxtLayout name="default">
    <main class="specialist">
      <h1>Записаться к специалисту</h1>
      <div class="specialist__search">
        <input 
          v-model="searchQuery" 
          type="search" 
          placeholder="Введите специализацию" 
          @input="fetchSpecializations" >
    
        <ul v-if="suggestions.length > 0">
          <li 
            v-for="suggestion in suggestions" 
            :key="suggestion" 
            class="suggestion-item"
            @click="updateSpecialization(suggestion)">
            {{ suggestion }}
          </li>
        </ul>
      </div>

      <div class="specialist__category">
        <button
          v-for="specialization in specializations" 
          :key="specialization" 
          @click="updateSpecialization(specialization)">
          {{ specialization }}
        </button>
      </div>
      <div class="specialist__list">
        <div class="specialist__list-item">
          <nuxt-link
            to="/specialists/1"
            class="specialist__list-item__left">
            <div class="specialist__list-avatar">
              <img
                src="/images/test-image.png"
                alt="avatar">
            </div>
            <div class="specialist__list-info">
              <div class="specialist__list-info-top">
                <div class="specialist__list-info__rating">
                  <span>Рейтинг</span> <span>&#9733; 5</span>
                </div>
                <div class="specialist__list-info__reviews">
                  <img
                    src="/icons/comment-blue.svg"
                    alt="comment-icon">
                  <span>5 отзывов</span>
                </div>
              </div>
          
              <div class="specialist__list-info-main">
                <div class="specialist__list-info__main-name">
                  Морозов Алена Олеговна • Стаж 12 лет
                </div>
                <div class="specialist__list-info__main-departure">
                  Гражданство • Стаж 12 лет
                </div>
              </div>

              <div class="specialist__list-info-bottom">
                <div class="specialist__list-info__price-first">
                  <h4>Первичный приём</h4>
                  <p>от 7 000 ₸</p>
                </div>
                <div class="line"></div>
                <div class="specialist__list-info__price-second">
                  <h4>Вторичный приём</h4>
                  <p>от 5 000 ₸</p>
                </div>
              </div>
            </div>
          </nuxt-link>
          <div class="specialist__list-shedule">
            <v-calendar
              v-model.range="range"
              view="weekly"
              transparent
              borderless
              expanded 
              :color="selectedColor"
              mode="dateTime"/>
            <div class="specialist__list-shedule__worktime">
              <p>Свободное время</p>
              <div>
                <button>12:00</button>
                <button>12:30</button>
                <button>13:00</button>
                <button>13:30</button>
                <button>14:00</button>
                <button>14:30</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Pagination
        :current-page="currentPage"
        :total-pages="totalPages" />
    </main>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
.suggestion-item {
  cursor: pointer;
  padding: 5px 15px;
}
.line {
  height: 30px;
  width: 2px;
  background-color: #767485;
}
.suggestion-item:hover {
  background-color: #d0d0d0;
}

.specialist {
  max-width: 1100px;
  width: 100%;
  margin: auto;
  padding-top: 40px;
  padding-bottom: 40px;

  h1 {
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    font-size: 32.48px;
    line-height: 40px;
    letter-spacing: 0%;
    text-align: center;
    margin-bottom: 16px;
  }

  &__search {
    max-width: 397px;
    width: 100%;
    position: relative;
    margin: 20px auto 0px auto;

    input {
      width: 100%;
      height: 48px;
      background: #F1F2F7;
      border-radius: 28px;
      padding-left: 24px;
      padding-right: 24px;
    }

    ul {
      position: absolute;
      width: 100%;
      margin-top: 10px;
      border-radius: 10px;
      background-color: #FFF;
      box-shadow: 0px 0px 5px -1px gray;
      z-index: 1000;
    }
  }

  &__category {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 23px;

    button {
      font-family: 'Montserrat', sans-serif;
      font-weight: 500;
      font-size: 12.91px;
      line-height: 20px;
      letter-spacing: 0%;
      text-align: center;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 12px;

    &-item {
      background: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      border-radius: 28px;

      &__left {
        display: flex;
      }
    }

    &-shedule {
      max-width: 424px;
      width: 100%;
    }

    &-info {
      margin-left: 16px;
      &-top {
        display: flex;
        gap: 20px;
        align-items: center;
        margin-bottom: 22px;
      }

      &__main-name {
        font-family: 'Montserrat', sans-serif;
        font-weight: 700;
        font-size: 16.31px;
        line-height: 28px;
      }

      &__main-departure {
        font-family: 'Montserrat', sans-serif;
        font-weight: 400;
        font-size: 13.23px;
        line-height: 20px;
        margin-top: 7px;
        margin-bottom: 7px;
      }

      &__rating {
        font-family: 'Montserrat', sans-serif;
        font-weight: 400;
        font-size: 12.69px;
        line-height: 20px;
        letter-spacing: 0%;

        > span:last-child {
          font-weight: 700;
          font-size: 14px;
        }
      }

      &__reviews {
        display: flex;
        align-items: center;
        gap: 6px;

        font-family: 'Montserrat', sans-serif;
        font-weight: 400;
        font-size: 11.44px;
        color: #3B82F6;
      }

      &-bottom {
        display: flex;
        align-items: center;
        gap: 24px;
      }

      &__price-first, &__price-second {
        h4 {
          font-family: 'Montserrat', sans-serif;
          font-weight: 400;
          font-size: 10.69px;
          line-height: 16px;
        }
        p {
          font-family: 'Montserrat', sans-serif;
          font-weight: 500;
          font-size: 12.91px;
          line-height: 20px;
          margin-top: 4px;
        }
      }
    }

    &-shedule {
      &__worktime {
        padding-left: 28px;
        div {
          display: flex;
          gap: 12px;
          margin-top: 17px;
        }

        p {
          font-family: "Inter", sans-serif;
          font-weight: 500;
          font-size: 16px;
          line-height: 22.4px;
          color: #1F2937;
        }

        button {
          width: 55px;
          height: 32px;
          background: #E9F1FD;
          border-radius: 4px;

          color: #1F8EFB;
          font-family: "Inter", sans-serif;
          font-weight: 500;
          font-size: 14px;
          line-height: 19.6px;
        }
      }
    }
  }
}
</style>