<script setup>
import Info from '~/components/specialists/info.vue'
import Reviews from '~/components/specialists/reviews.vue'
import Modal from '~/components/modal/modal.vue'
import { useMainStore } from '~/store/useMainStore'

//fn
const router = useRouter()
const route = useRoute()
const mainStore = useMainStore()

//data
const activeTab = ref(0)
const recordModal = ref(false)

//tab fn
const tabSegment = [Info, Reviews]
const setTab = (index) => {
  activeTab.value = index

  router.push({ query: { tab: index } });
}


onMounted(async() => {
  await mainStore.getSpecialistById(route.params.id)
  await mainStore.getReviews()
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
                  src="/images/test-image.png"
                  alt="avatar">
              </div>
              <div class="specialist__list-info">
                <div class="specialist__list-info-top">
                  <div class="specialist__list-info__rating">
                    <span>Юрист</span>
                  </div>
                </div>
                <div class="specialist__list-info-main">
                  <div class="specialist__list-info__main-name">
                    Морозов Алена Олеговна
                  </div>
                  <div class="specialist__list-info__main-departure">
                    Гражданство • Стаж 12 лет
                  </div>
                </div>

                <div class="specialist__list-info-bottom">
              
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
                      Основная информация
                    </button>
                    <button
                      :class="{ 'active': activeTab === 1 }"
                      @click="setTab(1)">
                      Отзывы (5)
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
              <div class="specialist__list-shedule__price">
                <div><p>Первичный приём</p><strong>11 000 ₸</strong></div>
                <div><p>Вторичный приём</p><strong>9 000 ₸</strong></div>
              </div>
              <button @click="recordModal = true">Записаться онлайн</button>
              <a href="tel:79093332211">Позвонить</a>
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

.active {
  color: #1F72EE !important;
  border-bottom: 3px solid #1F72EE;
}
</style>