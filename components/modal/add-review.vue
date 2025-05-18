<script setup>
import { ref, reactive, computed, defineProps, defineEmits } from 'vue';
import { useMainStore } from '~/store/useMainStore';
import Rating from '~/components/specialists/rating.vue';

const props = defineProps({
  appointment: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['submit', 'close']);

const mainStore = useMainStore();

const reviews = computed(() => {
  return mainStore.reviews;
});

const form = reactive({
  appointment_id: null,           // id вашей записи (приёма)
  specialist_id: null,            // id специалиста
  rating: 0,                      // общий рейтинг
  service_rating: 0,              // обслуживание
  meeting_efficiency: 0,          // эффективность встречи
  attentiveness: 0,               // внимательность
  cleanliness: 0,                 // чистоплотность
  grammar: 0,                     // грамотность
  price_quality: 0,               // соотношение цена-качество
  professionalism: 0,             // профессионализм
  specialist_experience: 0,       // опыт специалиста
  is_recommended: true,           // порекомендуете ли
  text: ''                        // текст отзыва
});

async function submitReview() {
  form.appointment_id = props.appointment.id;
  form.specialist_id = props.appointment.specialist_id;
  
  emit('submit', form);
}

function closeModal() {
  emit('close');
}
</script>

<template>
  <div class="review-form">
    <h3>Оставить отзыв</h3>
    <form @submit.prevent="submitReview">
      <div class="review-form__wrapper">
        <div class="form-row">
          <label>Общий рейтинг:</label>
          <Rating v-model="form.rating" />
        </div>
        <div class="form-row">
          <label>Обслуживание:</label>
          <Rating v-model="form.service_rating" />
        </div>
        <div class="form-row">
          <label>Эффективность встречи:</label>
          <Rating v-model="form.meeting_efficiency" />
        </div>
        <div class="form-row">
          <label>Внимательность:</label>
          <Rating v-model="form.attentiveness" />
        </div>
        <div class="form-row">
          <label>Чистоплотность:</label>
          <Rating v-model="form.cleanliness" />
        </div>
        <div class="form-row">
          <label>Грамотность:</label>
          <Rating v-model="form.grammar" />
        </div>
        <div class="form-row">
          <label>Цена-качество:</label>
          <Rating v-model="form.price_quality" />
        </div>
        <div class="form-row">
          <label>Профессионализм:</label>
          <Rating v-model="form.professionalism" />
        </div>
        <div class="form-row">
          <label>Опыт специалиста:</label>
          <Rating v-model="form.specialist_experience" />
        </div>
        <div class="form-row">
          <label>Порекомендуете ли:</label>
          <input
            v-model="form.is_recommended"
            type="checkbox" >
        </div>
      </div>
      <div class="form-row">
        <label>Текст отзыва:</label>
        <textarea
          v-model="form.text"
          rows="4"
          required ></textarea>
      </div>
      <div class="form-buttons">
        <button type="button" class="btn-cancel" @click="closeModal">Отмена</button>
        <button type="submit" class="btn-submit">Отправить отзыв</button>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.review-form {
  width: 100%;
  padding: 10px;

  h3 {
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: 700;
    text-align: center;
  }

  &__wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    margin-bottom: 20px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .form-row {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;

    label {
      margin-bottom: 5px;
      font-weight: 600;
    }

    textarea {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 10px;
      font-family: inherit;
      resize: vertical;
    }
  }

  .form-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    gap: 16px;

    button {
      flex: 1;
      padding: 10px;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .btn-cancel {
      background-color: #f5f5f5;
      color: #333;
      border: 1px solid #ddd;

      &:hover {
        background-color: #eaeaea;
      }
    }

    .btn-submit {
      background-color: #1F72EE;
      color: white;
      border: none;

      &:hover {
        background-color: #1a5fc5;
      }
    }
  }
}
</style>