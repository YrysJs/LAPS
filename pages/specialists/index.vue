<script setup>
import { ref, onMounted, watchEffect, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useMainStore } from '~/store/useMainStore'
import Pagination from '~/components/layout/pagination.vue'

const router = useRouter()
const route = useRoute()
const store = useMainStore()
const localPath = useLocalePath()

const searchQuery = ref('')
const suggestions = ref(store.getSpecializationsList || [])
const currentPage = ref(Number(route.query.page) || 1)
const totalPages = ref(1)
const ITEMS_PER_PAGE = 20

const bulletSpecializations = ref(store.getSpecializationsBulletList)
const specialist = ref(store.getSpecialistsList)
const selectedSpecialization = ref(null)

const fetchSpecializations = async (e) => {
  if (searchQuery.value.trim() === '') {
    suggestions.value = []
    return
  }
  
  await store.getSpecializations({
    limit: 10,
    type: route.query.type,
    search: e.target.value
  })
  
  // Проверяем доступны ли результаты в store
  suggestions.value = store.getSpecializationsList || []
}

const updateSpecialization = (specialization) => {
  const currentType = route.query.type || 'lawyers'

  suggestions.value = []
  searchQuery.value = ''
  selectedSpecialization.value = specialization

  router.push({
    path: '/specialists',
    query: {
      type: currentType,
      specialization: specialization.name,
      specialization_id: specialization.id,
    },
  })

  // Загрузить данные с учетом выбранной специализации
  loadInitialData({ 
    type: currentType,
    specialization_id: specialization.id 
  })
}

// Функция для сброса выбранной специализации
const resetSpecialization = () => {
  const currentType = route.query.type || 'lawyers'
  
  selectedSpecialization.value = null
  
  router.push({
    path: '/specialists',
    query: {
      type: currentType
    }
  })
  
  loadInitialData({ type: currentType })
}

async function getSpecializationsBullet(params) {
  await store.getSpecializationsBullet(params)
}

async function getSpecialists(params) {
  const response = await store.getSpecialists(params)
  if (response && response.total_pages) {
    totalPages.value = response.total_pages
  }
}

function formatLocalDate(d) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

async function onDayClick(date, id, spec) {
  const localDate = formatLocalDate(date)
  spec.selected_date = localDate

  const slots = await store.getSpecialistsFreeSlots({
    specialist_id: id,
    date: localDate
  })
  specialist.value.find(item => item.id == id).free_slots = slots
}

async function loadInitialData(params = {}) {
  const queryParams = {
    type: route.query.type || 'lawyers',
    specialization_id: route.query.specialization_id,
    date: new Date().toLocaleDateString('en-CA'),
    limit: ITEMS_PER_PAGE,
    offset: (currentPage.value - 1) * ITEMS_PER_PAGE,
    ...params
  }
  
  await getSpecializationsBullet({ type: queryParams.type })
  await getSpecialists(queryParams)

  // Если есть specialization_id в URL, найдем выбранную специализацию
  if (route.query.specialization_id && !selectedSpecialization.value) {
    const specId = route.query.specialization_id
    // Ищем в bulletSpecializations
    const foundSpec = bulletSpecializations.value.find(spec => spec.id == specId)
    if (foundSpec) {
      selectedSpecialization.value = foundSpec
    }
  }

  specialist.value = specialist.value.map(spec => ({
    ...spec,
    selected_date: new Date().toLocaleDateString('en-CA')
  }))
}

// Следим за изменениями страницы
watch(currentPage, () => {
  router.push({
    query: {
      ...route.query,
      page: currentPage.value
    }
  })
  loadInitialData()
})

onMounted(async () => {
  await loadInitialData()
})

// Следим за изменениями в маршруте
watchEffect(async () => {
  if (route.query) {
    await loadInitialData()
  }
})
</script>

<template>
  <NuxtLayout name="default">
    <main class="specialist">
      <h1>{{ $t('specialists.title') }}</h1>
      <div class="specialist__search">
        <input 
          v-model="searchQuery" 
          type="search" 
          :placeholder="$t('specialists.search_placeholder')" 
          @input="fetchSpecializations" >
    
        <ul v-if="suggestions.length > 0">
          <li 
            v-for="suggestion in suggestions" 
            :key="suggestion" 
            class="suggestion-item"
            @click="updateSpecialization(suggestion)">
            {{ suggestion.name }}
          </li>
        </ul>
      </div>

      <div class="specialist__category">
        <!-- Выбранная специализация идет первой, если она есть -->
        <button 
          v-if="selectedSpecialization"
          class="selected-specialization"
          @click="updateSpecialization(selectedSpecialization)">
          {{ selectedSpecialization.name }}
        </button>
        
        <button
          v-for="specialization in bulletSpecializations.filter(spec => !selectedSpecialization || spec.id !== selectedSpecialization.id)" 
          :key="specialization" 
          @click="updateSpecialization(specialization)">
          {{ specialization.name }}
        </button>
        
        <button 
          v-if="route.query.specialization_id" 
          class="reset-button"
          @click="resetSpecialization">
          {{ $t('specialists.reset_filter') }}
        </button>
      </div>
      <div class="specialist__list">
        <div
          v-for="specialisti of specialist"
          :key="specialisti.id"
          class="specialist__list-item">
          <nuxt-link
            :to="localPath(`/specialists/${specialisti.id}`)"
            class="specialist__list-item__left">
            <div class="specialist__list-avatar">
              <img
                :src="specialisti.profile_photo_url ? specialisti.profile_photo_url : '/images/test-image.png'"
                alt="avatar">
            </div>
            <div class="specialist__list-info">
              <div class="specialist__list-info-top">
                <div class="specialist__list-info__rating">
                  <span>{{ $t('specialists.rating') }}</span> <span>&#9733; {{ specialisti.rating }}</span>
                </div>
                <div class="specialist__list-info__reviews">
                  <img
                    src="/icons/comment-blue.svg"
                    alt="comment-icon">
                  <span>{{ specialisti.reviews_count }} {{ $t('specialists.reviews_count') }}</span>
                </div>
              </div>
          
              <div class="specialist__list-info-main">
                <div class="specialist__list-info__main-name">
                  {{ specialisti.user.last_name }} {{  specialisti.user.first_name }} {{ specialisti.user.middle_name }} • {{ $t('specialists.experience_years') }} {{ specialisti.experience_years }} {{ $t('specialists.years') }}
                </div>
                <div class="specialist__list-info__main-departure">
                  {{ specialisti.specialization }} • {{ $t('specialists.experience_years') }} {{ specialisti.experience_years }} {{ $t('specialists.years') }}
                </div>
              </div>

              <div class="specialist__list-info-bottom">
                <div class="specialist__list-info__price-first">
                  <h4>{{ $t('specialists.primary_appointment') }}</h4>
                  <p>{{ $t('specialists.price_from') }} {{ specialisti.primary_consult_price }} ₸</p>
                </div>
                <div class="line"></div>
                <div class="specialist__list-info__price-second">
                  <h4>{{ $t('specialists.secondary_appointment') }}</h4>
                  <p>{{ $t('specialists.price_from') }} {{ specialisti.secondary_consult_price }} ₸</p>
                </div>
              </div>
            </div>
          </nuxt-link>
          <div class="specialist__list-shedule">
            <v-calendar
              v-model.range="selected_date"
              view="weekly"
              transparent
              borderless
              expanded
              :attributes="[{     
                key: 'sel-' + specialisti.id,
                dates: specialisti.selected_date,
                highlight: { backgroundColor: '#3f51b5' }
              }]"
              :color="selectedColor"
              mode="dateTime"
              @dayclick="({date}) => onDayClick(date, specialisti.id, specialisti)"/>
            <div class="specialist__list-shedule__worktime">
              <p>{{ $t('specialists.available_time') }}</p>
              <div>
                <button
                  v-for="(slot, slotIndex) of specialisti.free_slots"
                  :key="slotIndex">
                  {{ slot }}
                </button>
              </div>
            </div>
          </div>
        </div>
        <Pagination 
          v-model:currentPage="currentPage"
          :total-pages="totalPages"
          :maxPagesToShow="5" />
      </div>
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
      background: #fff;
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
    
    .reset-button {
      background-color: #f44336;
      color: white;
      padding: 5px 10px;
      border-radius: 4px;
    }
    
    .selected-specialization {
      background-color: #3f51b5;
      color: white;
      padding: 5px 10px;
      border-radius: 4px;
      font-weight: 700;
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

    &-avatar {
      width: 180px;
      height: 180px;
      object-fit: cover;
      border-radius: 20px;
      overflow: hidden;

      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
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
          flex-wrap: wrap;
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

  @media (max-width: 1015px) {
    &__list {
      align-content: center;
      &-item {
        flex-wrap: wrap;
        justify-content: center;
        gap: 30px;
        max-width: 650px;
        margin: auto;

        &__left {
          justify-content: center;
          gap: 15px;
        }
      }
    }
  }

  @media (max-width: 680px) {
    padding-left: 16px;
    padding-right: 16px;
    h1 {
      font-size: 26px;
      
      line-height: 30px;
    }

    &__list {
      text-align: center;

      &-item {
        flex-wrap: wrap;
        gap: 15px;

        &__left {
          flex-direction: column;
          align-items: center;
        }
      }
      
      &-info {
        display: flex;
        flex-direction: column;

        &-main {
          order: 0;
          margin-bottom: 5px;
        }

        &-top {
          order: 1;
          margin-top: 10px;
        }

        &-bottom {
          order: 1;
          margin-top: 15px;
        }
      }

      &-info-top, &-info-bottom {
        justify-content: center;
      }
      &-info-top {
        margin-bottom: 0;
      }
    }
  }

  @media (max-width: 465px) {
    h1 {
      font-size: 21px;
      text-align: left;
    }
    &__list {
      &-avatar {
        max-height: 100px;
        max-width: 100px;
        border-radius: 50%;
        overflow: hidden;
        img {
          height: 100%;
          width: 100%;
        }
      }

      &-shedule {
        max-width: 300px;
        
        &__worktime {
          padding-left: 14px;
          margin-top: 10px;

          div {
            flex-wrap: wrap;
            margin-top: 10px;
          }
        }
      }

      &-info__main-name {
        font-size: 12px;
        line-height: 18px;
      }
    }
  }
}
</style>