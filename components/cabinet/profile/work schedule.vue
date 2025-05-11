<template>
  <div class="settings">
    <div class="settings__content">
      <div class="settings__item">
        <p>Длительность слота (минут):</p>
        <input
          v-model.number="schedule.slot_time"
          type="number"
          min="0"
          placeholder="Введите длительность"
        >
      </div>
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
            class="flex items-center gap-2 mb-2"
          >
            <div class="flex items-center gap-1 border p-2">
              <div class="flex items-center gap-2">
                <span>Начало:</span>
                <VDatePicker
                  v-model="slot.start_time"
                  mode="time"
                  is-inline
                  is24hr
                  hide-time-header
                  class="w-24"
                />
              </div>
              <div class="flex items-center gap-2">
                <span>Конец:</span>
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
              class="remove-slot-btn"
              @click="removeSlot(key, idx)"
            >
              ✕
            </button>
          </div>

          <button
            type="button"
            class="add-slot-btn"
            @click="addSlot(key)"
          >
            + Добавить время
          </button>
        </div>
      </div>
    </div>

    <button
      class="content-submit"
      @click="stepHandler"
    >
      Сохранить
    </button>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useUserStore } from '~/store/useUserStore'

const userStore = useUserStore()
const specialistId = userStore.specialistsMainInfo?.id || userStore.user.id

const sheduleData = reactive({
  slot_time: 30,
  week_schedule: {}
})

const days = [
  { key: 'monday',    label: 'Понедельник' },
  { key: 'tuesday',   label: 'Вторник'     },
  { key: 'wednesday', label: 'Среда'       },
  { key: 'thursday',  label: 'Четверг'     },
  { key: 'friday',    label: 'Пятница'     },
  { key: 'saturday',  label: 'Суббота'     },
  { key: 'sunday',    label: 'Воскресенье' }
]

function formatYMD(d) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

const today = new Date()
const nextWeek = new Date(today)
nextWeek.setDate(today.getDate() + 7)

const date_from = formatYMD(today)
const date_to   = formatYMD(nextWeek)

const schedule = reactive({
  slot_time: 30,
  week_schedule: days.reduce((acc, { key }) => {
    acc[key] = { work_time: [] }
    return acc
  }, {})
})

function parseTimeString(str) {
  const [h, m] = str.split(':').map(Number)
  const d = new Date(); d.setHours(h, m, 0, 0)
  return d
}

function initWeekSchedule() {
  schedule.slot_time = sheduleData.slot_time || 30
  days.forEach(({ key }) => {
    const list = sheduleData.week_schedule[key]?.work_time || []
    schedule.week_schedule[key].work_time = list.map(slot => ({
      start_time: typeof slot.start_time === 'string'
        ? parseTimeString(slot.start_time)
        : new Date(slot.start_time),
      end_time: typeof slot.end_time === 'string'
        ? parseTimeString(slot.end_time)
        : new Date(slot.end_time)
    }))
  })
}
const dataShedule = computed(() => {
  return userStore.shedule
})
async function fetchSchedule() {
  await userStore.getShedule({ specialist_id: specialistId, date_from: date_from, date_to: date_to })
  sheduleData.slot_time     = dataShedule.value.slot_time
  sheduleData.week_schedule = dataShedule.value.week_schedule
  initWeekSchedule()
}

onMounted(fetchSchedule)

function addSlot(dayKey) {
  schedule.week_schedule[dayKey].work_time.push({
    start_time: new Date(),
    end_time:   new Date()
  })
}
function removeSlot(dayKey, idx) {
  schedule.week_schedule[dayKey].work_time.splice(idx, 1)
}

async function stepHandler() {
  const week = {}
  days.forEach(({ key }) => {
    const slots = schedule.week_schedule[key].work_time
    if (slots.length > 0) {
      week[key] = {
        work_time: slots.map(slot => ({
          start_time: slot.start_time.toTimeString().slice(0,5),
          end_time:   slot.end_time.toTimeString().slice(0,5)
        }))
      }
    }
  })

  const payload = {
    slot_time:     schedule.slot_time,
    week_schedule: week
  }

  if (Object.keys(sheduleData.week_schedule).length > 0) {
    await userStore.updateSpecialistShedule(payload)
  } else {
    await userStore.addSpecialistShedule(payload)
  }

  await fetchSchedule()
}
</script>

<style lang="scss" scoped>
.content-submit {
  max-width: 418px;
  margin: 55px auto 0;
  width: 100%;
  height: 50px;
  background: #1F72EE;
  color: #fff;
  border-radius: 8px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
}
.remove-slot-btn {
  width: 30px;
  height: 30px;
  background: #FFD8D8;
  color: #e53e3e;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.add-slot-btn {
  margin-top: 4px;
  padding: 6px 12px;
  background: #ebf8ff;
  color: #3182ce;
  border-radius: 4px;
  cursor: pointer;
}
.settings__item {
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  p {
    font-weight: 600;
  }
  input {
    width: 80px;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
}
.settings__wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
}
@media (max-width: 768px) {
  .settings__wrapper {
    grid-template-columns: 1fr;
  }
}
</style>
