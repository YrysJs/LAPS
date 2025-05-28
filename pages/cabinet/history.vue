<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '~/store/useUserStore'
import { useMainStore } from '~/store/useMainStore'
import AddReview from '~/components/modal/add-review.vue'

const userStore = useUserStore()
const mainStore = useMainStore()
const route = useRoute()
const router = useRouter()

const filterState = ref(route.query.filter === 'canceled' ? false : true)
const currentPage = ref(Number(route.query.page) || 1)
const totalPages = ref(0)
const showDropdown = ref(null)
const showReviewModal = ref(false)
const selectedAppointment = ref(null)

const appointments = ref([])

const ITEMS_PER_PAGE = 20

const params = computed(() => {
  const isClient = userStore.user.role === 'client'
  const idKey = isClient ? 'client_id' : 'specialist_id'
  const idValue = isClient
    ? userStore.user.id
    : userStore.specialistsMainInfo.id
  return {
    [idKey]: idValue,
    status: filterState.value ? null : 'canceled',
    limit: ITEMS_PER_PAGE,
    offset: (currentPage.value - 1) * ITEMS_PER_PAGE
  }
})

async function fetchAppointments() {
  const res = await userStore.getAppointments(params.value)

  totalPages.value = res.total_pages

  appointments.value = userStore.consultations || []
}

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function toggleDropdown(index) {
  if (showDropdown.value === index) {
    showDropdown.value = null
  } else {
    showDropdown.value = index
  }
}

async function cancelAppointment(id) {
  await userStore.deleteAppointments(id)
  fetchAppointments()
  showDropdown.value = null
}

function openReviewModal(appointment) {
  selectedAppointment.value = appointment
  showReviewModal.value = true
  showDropdown.value = null
}

function closeReviewModal() {
  showReviewModal.value = false
  selectedAppointment.value = null
}

async function submitReview(reviewData) {
  if (!selectedAppointment.value) return
  
  const review = {
    ...reviewData,
    appointment_id: selectedAppointment.value.id,
    specialist_id: selectedAppointment.value.specialist_id
  }
  
  await userStore.addReview(review)
  closeReviewModal()
}

onMounted(fetchAppointments)

watch([filterState, currentPage], ([f, p]) => {
  router.replace({
    query: { filter: f ? 'paid' : 'canceled', page: String(p) }
  })
  fetchAppointments()
})
</script>

<template>
  <NuxtLayout name="cabinet">
    <div class="history">
      <h3 class="history__title">Консультации</h3>

      <div class="history__filter">
        <div class="history__filter-item history__filter-1">
          <img
            src="/icons/cabinet/filter.svg"
            alt="filter-icon" >
        </div>
        <button
          class="history__filter-item history__filter-2"
          :class="{ active: filterState }"
          @click="filterState = true"
        >
          Предстоящие
        </button>
        <button
          class="history__filter-item history__filter-3"
          :class="{ active: !filterState }"
          @click="filterState = false"
        >
          Отмененные
        </button>
      </div>

      <div class="history__content flex flex-col gap-[16px]">
        <template v-if="appointments.length">
          <div
            v-for="(item, index) in appointments"
            :key="index"
            class="history__container"
          >
            <div class="history__header">
              <div>Имя</div>
              <div>Номер телефона</div>
              <div>Дата</div>
              <div>Статус</div>
              <div>Действия</div>
            </div>
            <div class="history__row history__row-desktop">
              <div>{{ item.client_name || item.specialist_name }}</div>
              <div class="history-phone">
                <img
                  class="phone-icon"
                  :src="item.communication_method == 'phone' ? '/icons/cabinet/phone.svg' : '/icons/cabinet/wp.svg'"
                  alt="phone-icon"
                >
                <a
                  :href="item.communication_method == 'phone'
                    ? `tel:${item.client_phone}`
                    : `https://wa.me/${item.client_phone.replace(/\D/g, '')}`"
                >{{ item.client_phone }}</a>
              </div>
              <div>{{ formatDate(item.appointment_date) }}</div>
              <div class="status">{{ item.status }}</div>
              <div class="actions">
                <button class="action-btn" @click="toggleDropdown(index)">
                  <span>Действия</span>
                </button>
                <div class="dropdown" v-if="showDropdown === index">
                  <button class="dropdown-item" @click="cancelAppointment(item.id)">
                    Отменить запись
                  </button>
                  <button 
                    v-if="userStore.user.role === 'client'" 
                    class="dropdown-item" 
                    @click="openReviewModal(item)"
                  >
                    Добавить отзыв
                  </button>
                </div>
              </div>
            </div>
            <div class="history__row history__row-mobile">
              <div class="history__row-mobile__item">
                <div class="label">Имя:</div>
                <div>{{ item.client_name || item.specialist_name }}</div>
              </div>
              <div class="history__row-mobile__item">
                <div class="label">Номер телефона:</div>
                <div class="history-phone">
                  <img
                    class="phone-icon"
                    :src="item.communication_method == 'phone' ? '/icons/cabinet/phone.svg' : '/icons/cabinet/wp.svg'"
                    alt="phone-icon"
                  >
                  <a
                    :href="item.communication_method == 'phone'
                      ? `tel:${item.client_phone}`
                      : `https://wa.me/${item.client_phone.replace(/\D/g, '')}`"
                  >{{ item.client_phone }}</a>
                </div>
              </div>
              <div class="history__row-mobile__item">
                <div class="label">Дата:</div>
                <div>{{ formatDate(item.appointment_date) }}</div>
              </div>
              <div class="history__row-mobile__item">
                <div class="label">Статус:</div>
                <div class="status">{{ item.status }}</div>
              </div>
              <div class="history__row-mobile__item">
                <div class="label">Действия:</div>
                <div class="actions ml-auto sm:mx-auto">
                  <button class="action-btn" @click="toggleDropdown(index)">
                    <span>Действия</span>
                  </button>
                  <div class="dropdown mobile" v-if="showDropdown === index">
                    <button class="dropdown-item" @click="cancelAppointment(item.id)">
                      Отменить запись
                    </button>
                    <button 
                      v-if="userStore.user.role === 'client'" 
                      class="dropdown-item" 
                      @click="openReviewModal(item)"
                    >
                      Добавить отзыв
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="pagination">
            <button
              :disabled="currentPage <= 1"
              @click="currentPage--"
            >
              &larr;
            </button>

            <span>Страница {{ currentPage }} из {{ totalPages }}</span>

            <button
              :disabled="currentPage >= totalPages"
              @click="currentPage++"
            >
              &rarr;
            </button>
          </div>
        </template>
        <div
          v-else
          class="history__empty">
          Здесь появятся все консультации
        </div>
      </div>
    </div>

    <!-- Review Modal -->
    <div v-if="showReviewModal" class="modal-overlay">
      <div class="modal-container">
        <button class="close-modal" @click="closeReviewModal">×</button>
        <div v-if="selectedAppointment" class="modal-content">
          <add-review 
            :appointment="selectedAppointment" 
            @submit="submitReview" 
            @close="closeReviewModal"
          />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
.active {
  color: #1F72EE;
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 24px;

  button {
    background-color: #1F72EE;
    color: white;
    padding: 8px 16px;
    border-radius: 6px;
    font-weight: 600;
    transition: 0.2s ease;

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }
}
.history {
  &__title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    font-size: 32px;
    line-height: 100%;
    letter-spacing: -0.11px;
  }

  &__filter {
    margin-top: 24px;
    margin-bottom: 24px;
    height: 70px;
    background: #fff;
    border-radius: 14px;
    max-width: 360px;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    img {
      padding-left: 24px;
      padding-right: 24px;
    }

    button {
      padding-left: 16px;
      padding-right: 32px;
      height: 70px;

      font-family: Nunito Sans;
      font-weight: 700;
      font-size: 14px;
      line-height: 100%;
      letter-spacing: 0px;

    }

    &-2 {
      border-right: 1px solid #e6e6e6;
      border-left: 1px solid #e6e6e6;
    }
  }

  &__empty {
    border-radius: 14px;
    background: #fff;
    padding: 48px;

    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 16px;
    line-height: 100%;
    letter-spacing: 0%;
    color: #718EBF;

  }

  &__container {
    display: flex;
    flex-direction: column;
    border: .5px solid #e0e0e0;
    border-radius: 14px;
  }

  &__header {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    background-color: #fff;
    padding: 10px 20px;
    border-radius: 14px 14px 0px 0px;
    padding-top: 24px;
    padding-bottom: 24px;

    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    font-size: 14px;
    line-height: 100%;

    div {
      display: flex;
      align-items: center;
    }
  }

  &__row {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    background-color: #fff;
    padding: 10px 20px;
    border-radius: 0px 0px 14px 14px;
    padding-top: 24px;
    padding-bottom: 24px;

    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 100%;
    border-top: 1px solid #D5D5D5;

    &-desktop {
      display: grid;
    }

    &-mobile {
      display: none;
    }

    div {
      display: flex;
      align-items: center;
    }
  }

  @media (max-width: 990px) {
    &__title {
      font-size: 24px;
    }
    &__filter {
      height: 55px;

      button {
        padding-left: 16px;
        padding-right: 15px;
        height: 70px;

        font-family: Nunito Sans;
        font-weight: 700;
        font-size: 14px;
        line-height: 100%;
        letter-spacing: 0px;

      }
    }
    &__content {
      padding: 24px 16px;
    }

    &__header {
      display: none;
    }

    &__row {
      &-desktop {
        display: none;
      }
      &-mobile {
        display: flex;
        flex-direction: column;
        gap: 12px;

        &__item {
          display: flex;
          gap: 30px;

          .label {
            min-width: 230px;
          }
        }
      }
    }

    &__empty {
      padding: 24px 18px;
    }
  }

  @media (max-width: 578px) {
    &__title {
      font-size: 18px;
    }
    &__filter {
      height: 55px;
      margin: 15px auto;

      &-1 {
        display: none;
      }
      &-2 {
        border: none;
      }
      button {
        padding-left: 16px;
        padding-right: 15px;
        height: 70px;

        font-family: Nunito Sans;
        font-weight: 700;
        font-size: 14px;
        line-height: 100%;
        letter-spacing: 0px;

      }
    }
    &__content {
      padding: 0px 0px 16px 0px;
    }

    &__row {
      &-desktop {
        display: none;
      }
      &-mobile {
        display: flex;
        flex-direction: column;
        gap: 0;
        &__item {
          border-bottom: 1px solid rgb(221, 221, 221);
          padding-bottom: 16px;
          padding-top: 16px;
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          font-size: 12px;

          .label {
            font-size: 12px;
            font-weight: bold;
            min-width: 230px;
          }
        }
      }
    }
  }
}

.status {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100px;
  width: 100%;
  height: 27px;
  padding: 5px 10px;
  background-color: #a5f1e6;
  color: #00B69B;
  border-radius: 4.5px;

  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0px;
}
.phone-icon {
  margin-right: 8px;
}

.actions {
  position: relative;
}

.action-btn {
  background-color: #1F72EE;
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 13px;
}

.dropdown {
  position: absolute;
  top: calc(100% + 10px);
  left: -40px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  min-width: 180px;
  z-index: 10;
  display: flex;
  flex-direction: column;

  &.mobile {
    left: auto;
    right: 0;
  }
}

.dropdown-item {
  display: block;
  width: 100%;
  text-align: left;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 400;
  color: #333;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f5f5f5;
  }
  
  &:first-child {
    border-radius: 8px 8px 0 0;
  }
  
  &:last-child {
    border-radius: 0 0 8px 8px;
  }
  
  &:only-child {
    border-radius: 8px;
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background-color: white;
  border-radius: 14px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  padding: 24px;
}

.close-modal {
  position: absolute;
  top: 12px;
  right: 16px;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
}
</style>