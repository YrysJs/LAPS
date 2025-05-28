<script setup>
import Info from '~/components/specialists/info.vue'
import Reviews from '~/components/specialists/reviews.vue'
import Modal from '~/components/modal/modal.vue'
import Rating from '~/components/specialists/rating.vue'
import { useMainStore } from '~/store/useMainStore'
import { useAuthStore } from '~/store/useAuthStore'
import { useToast } from 'vue-toastification/dist/index.mjs'

//fn
const router = useRouter()
const route = useRoute()
const mainStore = useMainStore()
const authStore = useAuthStore()
const toast = useToast()
const specialist_info = computed(() => {
  return mainStore.specialistById
})
const free_slots = computed(() => {
  return mainStore.specialistFreeSlots?.free_slots || []
})
const selected_date = ref(new Date().toLocaleDateString('en-CA'))

//data
const activeTab = ref(0)
const recordModal = ref(false)

//tab fn
const tabSegment = [Info, Reviews]
const setTab = (index) => {
  activeTab.value = index

  router.push({ query: { tab: index } });
}

const calendarAttrs = computed(() => [{
  key: 'selected',
  highlight: { backgroundColor: '#3f51b5' },
  dates: selected_date.value
}])

function formatLocalDate(d) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

async function onDayClick({ date }) {
  selected_date.value = formatLocalDate(date)

  await mainStore.getSpecialistsFreeSlots({specialist_id: route.params.id, date: selected_date.value})
}

function handleAppointmentClick() {
  if (authStore.user && authStore.user !== false) {
    recordModal.value = true
  } else {
    toast.error($t('errors.auth_required'))
  }
}

onMounted(async() => {
  await mainStore.getSpecialistById(route.params.id)
  await mainStore.getReviews({specialist_id: route.params.id})
  await mainStore.getSpecialistsFreeSlots({specialist_id: route.params.id, date: selected_date.value})
  
  authStore.initialize()
})
</script>

<template>
  <NuxtLayout name="default">
    <Modal
      v-if="recordModal"
      @close="data => recordModal = data"/>
    <div class="specialist">
      <div class="specialist__list">
        <div class="specialist__list-item">
          <div class="specialist__list-item__head">
            <div
              class="specialist__list-item__left">
              <div class="specialist__list-avatar">
                <img
                  class="w-[100%] h-[100%] object-cover"
                  :src="specialist_info.profile_photo_url ? specialist_info.profile_photo_url : '/images/test-image.png'"
                  alt="avatar">
              </div>
              <div class="specialist__list-info">
                <div class="specialist__list-info-top">
                  <div class="specialist__list-info__rating">
                    <span>{{ specialist_info.type == 'lawyer' ? $t('specialists.lawyer') : $t('specialists.psychologist') }}</span>
                  </div>
                </div>
                <div class="specialist__list-info-main">
                  <div class="specialist__list-info__main-name">
                    {{ specialist_info?.user?.last_name }} {{ specialist_info?.user?.first_name }} {{ specialist_info?.user?.middle_name }}
                  </div>
                  <div class="specialist__list-info__main-departure">
                    {{ specialist_info?.specialization }} • Стаж {{ specialist_info?.experience_years }} лет {{ specialist_info?.association_member ? '• Состоит в ассоциации' : '' }}
                  </div>
                </div>

                <div class="specialist__list-info-bottom">
                  <div class="specialist__list-info-bottom-count">
                    <Rating
                      :rating="specialist_info?.rating"
                      color="#f5a623"/>
                    <span>({{ specialist_info?.rating }})</span>
                  </div>
                  <div class="specialist__list-info__reviews">
                    <img
                      src="/icons/comment-blue.svg"
                      alt="comment-icon">
                    <span>{{ specialist_info?.reviews_count }} {{ $t('specialists.reviews_count') }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="specialist__subblock">
              <div class="specialist__subblock-btn">
                <div class="profile__content">
                  <div class="profile__tabs">
                    <button
                      :class="{ 'active': activeTab === 0 }"
                      @click="setTab(0)">
                      {{ $t('specialists.main_info') }}
                    </button>
                    <button
                      :class="{ 'active': activeTab === 1 }"
                      @click="setTab(1)">
                      {{ $t('reviews.title') }} ({{ specialist_info.reviews_count }})
                    </button>
                  </div>
                </div>
              </div>
              <div class="profile__wrapper">
                <component
                  :is="tabSegment[activeTab]"/>
              </div>
            </div>
          </div>
          <div class="specialist__list-shedule">
            <v-calendar
              v-model.range="selected_date"
              view="weekly"
              transparent
              borderless
              expanded
              :attributes="calendarAttrs"
              :color="selectedColor"
              mode="dateTime"
              @dayclick="onDayClick"/>
            <div class="specialist__list-shedule__worktime">
              <p>{{ $t('specialists.available_time') }}</p>
              <div
                class="flex flex-wrap gap-2">
                <button
                  v-for="(slot, slotIndex) of free_slots"
                  :key="slotIndex">
                  {{ slot }}
                </button>
              </div>
              <div class="specialist__list-shedule__price">
                <div><p>{{ $t('specialists.primary_appointment') }}</p><strong>{{ specialist_info.primary_consult_price }} ₸</strong></div>
                <div><p>{{ $t('specialists.secondary_appointment') }}</p><strong>{{ specialist_info.secondary_consult_price }} ₸</strong></div>
              </div>
              <button @click="handleAppointmentClick">{{ $t('specialists.make_appointment') }}</button>
              <a href="tel:79093332211">{{ $t('specialists.call') }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
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
  max-width: 1200px;
  width: 100%;
  margin: auto;
  padding-top: 36px;
  padding-bottom: 36px;

  &__subblock {
    max-width: 805px;
    width: 100%;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 12px;

    &-avatar {
      width: 180px;
      height: 180px;
      object-fit: cover;
      border-radius: 20px;
      overflow: hidden;
    }

    &-item {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;

      &__head {
        max-width: 830px;
        width: 100%;
      }

      &__left {
        display: flex;
        background: #fff;
        max-width: 805px;
        width: 100%;
        padding: 24px 18px;
        border-radius: 8px;
      }
    }

    &-shedule {
      max-width: 365px;
      width: 100%;
      background: #fff;
      padding: 26px 15px;
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

        &-count {
          display: flex;
          align-items: center;
          gap: 10px;

          font-weight: bold;
          font-size: 14px;
        }
      }
    }

    &-shedule {
      &__price {
        div {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;

          p {
            font-family: 'Montserrat', sans-serif;
            font-weight: 400;
            font-size: 12.47px;
            line-height: 20px;
            color: #767485;
          }
          
          strong {
            font-family: 'Montserrat', sans-serif;
            font-weight: 500;
            font-size: 13.45px;
            line-height: 20px;
            text-align: right;
          }
        }
      }

      &__worktime {
        > div {
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

        div > button {
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

        > button {
          width: 100%;
          height: 56px;
          background: #1F72EE;
          color: #fff;
          border-radius: 16px;

          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: 14.5px;
          line-height: 24px;
          margin-bottom: 16px;
          margin-top: 16px;
        }
        > a {
          width: 100%;
          height: 56px;
          background: #fff;
          border: 1px solid #1F72EE;
          border-radius: 16px;
          color: #1F72EE;

          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: 14.5px;
          line-height: 24px;

          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}

.profile {
  &__title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    font-size: 32px;
    line-height: 100%;
    letter-spacing: -0.11px;
  }

  &__content {
    margin-top: 24px;
    border-radius: 14px 14px 0px 0px;
    background: #fff;
    padding: 32px 48px 32px 48px;
  }

  &__wrapper {
    display: flex;
    gap: 60px;
  }

  &__tabs {
    display: flex;
    gap: 35px;

    button {
      font-family: 'Montserrat', sans-serif;
      font-weight: 500;
      font-size: 16px;
      line-height: 100%;
      letter-spacing: 0%;
      color: #718EBF;
      transition: .2s;
      padding-left: 30px;
      padding-right: 30px;
      padding-bottom: 10px;
      height: 30px;
    } 
  }
}
@media (max-width: 610px) {
  .specialist__list-item__left {
    flex-direction: column;
    align-items: center;
    text-align: center;

    * {
      width: fit-content;
      margin: 5px auto;
    }
  }
  .specialist__list-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      margin: 0;
    }
  }
  .specialist__list-shedule {
    margin-top: 30px;
  }
  .profile__content {
    padding: 20px 10px;
  }
  .profile__tabs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;

    button {
      height: initial;
    }
  }
  .reviews-avatar {
    display: none !important;
  }
}
.active {
  color: #1F72EE !important;
  border-bottom: 3px solid #1F72EE;
}
</style>