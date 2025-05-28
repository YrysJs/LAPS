<script setup>
import { ref, reactive, computed } from 'vue'
import { useMainStore } from '~/store/useMainStore'
import { useUserStore } from '~/store/useUserStore'
import { useI18n } from 'vue-i18n'

const userStore = useUserStore()
const mainStore = useMainStore()
const route = useRoute()
const emit = defineEmits(['close'])
const { t } = useI18n()

const stepText = [
  t('modal.steps.your_data'),
  t('modal.steps.consultation_info'),
  t('modal.steps.confirm_and_pay')
]
const step = ref(0)
const specialist_info = computed(() => {
  return mainStore.specialistById
})

const selected_date = ref(new Date().toLocaleDateString('en-CA'))
const free_slots = computed(() => {
  return mainStore.specialistFreeSlots?.free_slots || []
})

const recordData = reactive({
  full_name:              `${userStore.user.last_name} ${userStore.user.first_name} ${userStore.user.middle_name}`,
  phone_number:           userStore.user.phone,
  appointment_date:       selected_date.value,
  communication_method:   'phone',
  consultation_type:      'primary',
  specialist_id:          specialist_info.value.id,
  specialization_id:      specialist_info.value.specialization_id
})

const disabledStepButton = computed(() => {
  if (step.value === 0) {
    return recordData.full_name && recordData.phone_number
  }
  if (step.value === 1) {
    return !!recordData.appointment_date && recordData.communication_method
  }
  return step.value === 2
})

function stepHandler() {
  if (step.value !== 2) step.value++;
}

const calendarAttrs = computed(() => [{
  key: 'selected',
  highlight: { backgroundColor: '#3f51b5' },
  dates: selected_date.value
}])

async function createAppointment() {
  const data = {
    appointment_date: new Date(recordData.appointment_date.replace(' — ', 'T')).toISOString().replace('.000', ''),
    communication_method: recordData.communication_method,
    consultation_type: recordData.consultation_type,
    specialist_id:          specialist_info.value.id,
    specialization_id:      specialist_info.value.specialization_id
  }
  console.log(data);
  
  await mainStore.createAppointments(data)
} 

function closeModal() {
  emit('close', false)
}

const open = ref(false)

const displayText = computed(() => {
  return recordData.appointment_date || 'Выберите дату и время'
})

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

function onTimeSelect(time) {
  if (!selected_date.value) return

  recordData.appointment_date = `${selected_date.value} — ${time}`
  open.value = false
}
</script>

<template>
  <div class="modal-record">
    <div class="modal-record__main">
      <button
        class="close"
        @click="closeModal">
        <img
          src="/icons/x-close.svg"
          :alt="$t('modal.buttons.close')" >
      </button>
      <h3>{{ specialist_info.user?.last_name }} {{ specialist_info.user?.first_name }} {{ specialist_info.user?.middle_name }}</h3>
      <h4>{{ stepText[step] }} {{ $t('modal.steps.step') }} {{ step + 1 }}/3</h4>
      <div class="modal-record__main-step">
        <div :class="{ active: step >= 0 }"></div>
        <div :class="{ active: step >= 1 }"></div>
        <div :class="{ active: step == 2 }"></div>
      </div>

      <div
        v-if="step === 0"
        class="modal-record__main-step-1">
        <div class="form-item">
          <img
            src="/icons/auth/stack-icon.svg"
            alt="icon" >
          <input
            v-model="recordData.full_name"
            type="text"
            :placeholder="$t('modal.form.full_name')"
            class="form-item__input"
          >
        </div>
        <div class="form-item">
          <img
            src="/icons/auth/electro-icon.svg"
            alt="icon" >
          <input
            v-model="recordData.phone_number"
            v-mask="'+7 (###) ###-##-##'"
            type="tel"
            :placeholder="$t('modal.form.phone')"
            class="form-item__input"
          >
        </div>
      </div>

      <div
        v-if="step === 1"
        class="modal-record__main-step-2">
        <div class="modal-record__main-step-2__date">
          <p>{{ $t('modal.form.date_time') }}</p>
          <button
            type="button"
            @click="open = true">
            <img
              src="/icons/main/search-icon.svg"
              alt="icon" >
            {{ displayText || $t('modal.form.select_date_time') }}
          </button>

          <div
            v-if="open"
            class="specialist__list-shedule">
            <v-calendar
              v-model="selected_date"
              view="weekly"
              transparent
              borderless
              expanded
              :attributes="calendarAttrs"
              mode="dateTime"
              @dayclick="onDayClick"/>
            <div class="specialist__list-shedule__worktime">
              <p>{{ $t('modal.form.available_time') }}</p>
              <div>
                <button
                  v-for="(slot, slotIndex) of free_slots"
                  :key="slotIndex"
                  @click="onTimeSelect(slot)">
                  {{ slot }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <button
          class="modal-record__main-step-2__btn"
          :class="{ 'active-btn': recordData.communication_method === 'whatsapp' }"
          @click="recordData.communication_method = 'whatsapp'"
        >
          <div>
            <img
              src="/icons/wp-modal-icon.svg"
              alt="icon" >
            <span>{{ $t('modal.form.communication.whatsapp') }}</span>
          </div>
          <div>
            <img
              :src="recordData.communication_method === 'whatsapp'
                ? '/icons/main/checkbox-active.svg'
                : '/icons/main/checkbox-base.svg'"
              alt="icon"
            >
          </div>
        </button>
        <button
          class="modal-record__main-step-2__btn"
          :class="{ 'active-btn': recordData.communication_method === 'phone' }"
          @click="recordData.communication_method = 'phone'"
        >
          <div>
            <img
              src="/icons/main/phone-modal-icon.svg"
              alt="icon" >
            <span>{{ $t('modal.form.communication.phone') }}</span>
          </div>
          <div>
            <img
              :src="recordData.communication_method === 'phone'
                ? '/icons/main/checkbox-active.svg'
                : '/icons/main/checkbox-base.svg'"
              alt="icon"
            >
          </div>
        </button>
      </div>

      <div
        v-if="step === 2"
        class="modal-record__main-step-3">
        <div class="modal-record__main-step-3-block">
          <h3>{{ $t('modal.confirmation.client') }}</h3>
          <div class="block-wrapper">
            <div>
              <p>{{ $t('modal.form.full_name') }}</p> <span class="font-semibold">{{ recordData.full_name }}</span>
            </div>
            <div>
              <p>{{ $t('modal.confirmation.phone_number') }}</p> <span>{{ recordData.phone_number }}</span>
            </div>
          </div>
        </div>
        <div class="modal-record__main-step-3-block mt-4">
          <h3>{{ $t('modal.confirmation.consultation') }}</h3>
          <div class="block-wrapper">
            <div>
              <p>{{ $t('modal.confirmation.date_and_time') }}</p> <span>{{ recordData.appointment_date }}</span>
            </div>
          </div>
        </div>
      </div>

      <button
        v-if="step !== 2"
        :disabled="!disabledStepButton"
        @click="stepHandler">
        {{ $t('modal.buttons.continue') }}
      </button>
      <button
        v-else
        @click="createAppointment">
        {{ $t('modal.buttons.book_appointment') }}
      </button>
    </div>
  </div>
</template>
  
<style lang="scss" scoped>
.modal-record {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: #0000006e;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;

  &__main {
    background: #fff;
    max-width: 480px;
    width: 100%;
    height: fit-content;
    padding: 24px;
    border-radius: 16px;
    position: relative;

    > button {
      width: 100%;
      height: 56px;
      background: #1F72EE;
      color: #fff;
      border-radius: 16px;

      font-family: 'Montserrat', sans-serif;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      margin-bottom: 16px;
      margin-top: 16px;

      &:disabled {
        background: #afccf7;
      }
    }

    h3 {
      font-family: Inter;
      font-weight: 600;
      font-size: 18px;
      line-height: 28px;
    }

    h4 {
        font-family: 'Montserrat', sans-serif;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        margin-top: 24px;
      }
    
    &-step {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 5px;
      margin-top: 4px;
      margin-bottom: 20px;

      div {
        width: 33%;
        height: 6px;
        border-radius: 8px;
        background: #DBDFE2;
      }

      &-2__date {
        font-family: Inter;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #414651;

        > button {
          margin-top: 5px;
          display: flex;
          gap: 16px;
          align-items: center;
          padding: 16px;

          background: transparent;
          width: 100%;
          border-radius: 12px;
          border: 1px solid #E9EAEB;

          font-family: 'Montserrat', sans-serif;
          font-weight: 500;
          font-size: 16px;
          line-height: 20px;
        }
      }

      &-2__btn {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;

        background: transparent;
        width: 100%;
        border-radius: 12px;
        border: 1px solid #E9EAEB;

        font-family: 'Montserrat', sans-serif;
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
        margin-top: 12px;


        div {
          display: flex;
          align-items: center;
          gap: 16px;
        }
      }

      &-3-block {
        display: flex;
        flex-direction: column;

        font-family: 'Montserrat', sans-serif;
        font-weight: 400;
        font-size: 16px;
        line-height: 20px;

        h3 {
          font-family: 'Montserrat', sans-serif;
          font-weight: 500;
          font-size: 14px;
          line-height: 20px;
          color: #1F72EE;
        }
        .block-wrapper {
          background: #F7F7F7;
          border-radius: 5px;
          padding: 16px 8px;
          margin-top: 8px;

          display: flex;
          flex-direction: column;
          gap: 10px;
          div {
            display: flex;
            justify-content: space-between;
          }
        }
      }
    }
  }
}


.form {
  min-width: 300px;
  max-width: 630px;
  width: 100%;
  height: fit-content;
  padding: 60px 57px 57px 57px;
  background: #fff;
  border-radius: 24px;

  &-item {
    position: relative;
    margin-bottom: 12px;

    &__input {
      width: 100%;
      height: 64px;
      padding-left: 64px;
      border-radius: 12px;
      background: #ebeefc;
      border: 1px solid #E9EAEB;
      font-family: 'Montserrat', sans-serif;
      font-weight: 500;
      
      &:focus {
        outline: 2px solid #1F72EE;
      }
    }

    img {
      position: absolute;
      top: 50%;
      left: 16px;
      transform: translateY(-50%);
    }
  }
}

.active {
  background: #1F8EFB !important;
}
.active-btn {
  background: #E9F1FD;
  color: #1F72EE;
  border-color: #1F72EE;
}
.close {
  background: transparent !important;
  width: fit-content !important;
  position: absolute;
  top: -10px;
  right: 30px;
}

.specialist {
  
  &__list-shedule {
      border: 1px solid #E9EAEB;
      padding: 8px;
      border-radius: 16px;
      margin-top: 8px;

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

@media (max-width: 575px) {
  .modal-record {
    align-items: flex-end;

    &__main {
      width: 100%;
      max-width: initial;
      border-radius: 16px 16px 0px 0px;
    }
  }
}
</style>
  