<script setup>
import { reactive } from 'vue'
const days = [
  { key: 'monday',    label: 'Понедельник' },
  { key: 'tuesday',   label: 'Вторник'     },
  { key: 'wednesday', label: 'Среда'       },
  { key: 'thursday',  label: 'Четверг'     },
  { key: 'friday',    label: 'Пятница'     },
  { key: 'saturday',  label: 'Суббота'     },
  { key: 'sunday',    label: 'Воскресенье' }
]

const schedule = reactive({
  slot_time: 0,
  week_schedule: {
    monday:    { work_time: [ { start_time: new Date(), end_time: new Date() } ] },
    tuesday:   { work_time: [ { start_time: new Date(), end_time: new Date() } ] },
    wednesday: { work_time: [ { start_time: new Date(), end_time: new Date() } ] },
    thursday:  { work_time: [ { start_time: new Date(), end_time: new Date() } ] },
    friday:    { work_time: [ { start_time: new Date(), end_time: new Date() } ] },
    saturday:  { work_time: [ { start_time: new Date(), end_time: new Date() } ] },
    sunday:    { work_time: [ { start_time: new Date(), end_time: new Date() } ] }
  }
})

// Добавить новый слот для указанного дня
function addSlot(dayKey) {
  schedule.week_schedule[dayKey].work_time.push({
    start_time: '',
    end_time: ''
  })
}

// Удалить слот по индексу
function removeSlot(dayKey, idx) {
  schedule.week_schedule[dayKey].work_time.splice(idx, 1)
}
</script>

<template>
  <div class="settings">
    <div class="settings__content">
      <div class="settings__wrapper">
        <div
          v-for="({ key, label }) in days"
          :key="key"
          class="settings__wrapper-day"
        >
          <h4>{{ label }}:</h4>

          <div
            v-for="(slot, idx) in schedule.week_schedule[key].work_time"
            :key="idx"
            class="flex items-center justify-start gap-[8px] mb-2"
          >
            <div class="flex flex-wrap items-center gap-[8px] mb-2 w-[230px] sm:w-fit border-1 border-gray-600">
              <div class="flex items-center gap-[18px]">
                <div class="w-[80px]">Начало:</div>
                <VDatePicker
                  v-model="slot.start_time"
                  mode="time"
                  is-inline
                  is24hr
                  hide-time-header
                  class="w-24"
                />
              </div>

              <div class="flex items-center gap-[18px]">
                <div class="w-[80px]">Конец:</div>
                <VDatePicker
                  v-model="slot.end_time"
                  mode="time"
                  is-inline
                  is24hr
                  hide-time-header
                  class="w-24"
                />
              </div>
            </div>

            <button
              type="button"
              class="text-red-500 w-[30px] h-[30px] bg-[#FFD8D8] rounded-full"
              @click="removeSlot(key, idx)"
            >
              ✕
            </button>
          </div>

          <button
            type="button"
            class="mt-1 px-3 py-1 bg-blue-100 text-blue-700 rounded"
            @click="addSlot(key)"
          >
            + Добавить время
          </button>
        </div>
      </div>
    </div>
    <button
      class="content-submit"
      @click="stepHandler">
      Сохранить
    </button>
  </div>
</template>

<style lang="scss" scoped>
.content-submit {
  max-width: 418px;
  display: block;
  width: 100%;
  height: 50px;
  margin: 55px 0 0 auto;
  color: #fff;
  border-radius: 8px;
  font-family: 'Montserrat', sans-serif;
  background: #1F72EE;
  font-weight: 700;
  font-size: 14.38px;

  cursor: pointer;
}

.settings {
  &__title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    font-size: 32px;
    line-height: 100%;
    letter-spacing: -0.11px;
  }

  &__content {
    margin-top: 24px;
    border-radius: 14px;
    background: #fff;
    padding: 48px;
  }

  &__wrapper {
    display: grid;
    grid-template-columns: 2fr 2fr;
    gap: 60px;

    h4 {
      font-family: 'Montserrat', sans-serif;
      font-weight: 600;
      font-size: 18px;
      line-height: 100%;
      letter-spacing: 0px;
      margin-bottom: 14px;
    }
  }

  &__item {
    max-width: 360px;
    width: 100%;
  }

  @media (max-width: 1340px) {
    &__wrapper {
      display: flex;
      flex-wrap: wrap;
    }
  }
  @media (max-width: 640px) {
    &__content {
      padding: 24px 16px;
      margin-top: 0;
    }
  }
}
</style>