<script setup>
import { computed, reactive } from 'vue';

const emit = defineEmits()

const step = ref(0)
const stepText = ['Ваши данные', 'Информация о консультации', 'Подтвердите и оплатите']
const recordData = reactive({
  full_name: '',
  phone_number: '',
  appointment_date: '',
  communication_method: "phone",
  consultation_type: "primary",
  specialist_id: 0,
  specialization_id: 0
})

const disabledStepButton = computed(() => {
  if (step.value == 0) {
    return (recordData.full_name && recordData.phone_number)
  }
  if (step.value == 1) {
    return (recordData.appointment_date && recordData.communication_method)
  }
  if (step.value == 2) {
    return true
  }

  return false
})

const stepHandler = () => {
  if (step.value < 2) {
    step.value += 1
  }
}

const closeModal = () => {
  emit('close', false)
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
          alt="close icon">
      </button>
      <h3>Морозова Алена Олеговна</h3>
      <h4>{{ stepText[step] }} {{ step + 1 }}/3</h4>
      <div class="modal-record__main-step">
        <div :class="{ 'active': step == 0 }"></div>
        <div :class="{ 'active': step == 1 }"></div>
        <div :class="{ 'active': step == 2 }"></div>
      </div>
      <div
        v-if="step == 0"
        class="modal-record__main-step-1">
        <div class="form-item">
          <img
            src="/icons/auth/stack-icon.svg"
            alt="icon">
          <input
            id="password"
            v-model="recordData.full_name"
            type="text"
            placeholder="|ФИО"
            class="form-item__input">
        </div>
        <div class="form-item">
          <img
            src="/icons/auth/electro-icon.svg"
            alt="icon">
          <input
            v-model="recordData.phone_number"
            v-mask="'+7 (###) ###-##-##'"
            type="tel" 
            placeholder="Введите номер телефона"
            class="form-item__input">
        </div>
      </div>
      <div
        v-if="step == 1"
        class="modal-record__main-step-2">
        <div>
          <p>Дата и время</p>
          <input type="date">
        </div>
        <button @click="recordData.communication_method == 'whatsapp'">
          <img
            src="/icons/wp-modal-icon.svg"
            alt="icon"> <span></span> <div>
              <img
                src=""
                alt="icon">
            </div>
        </button>
        <button @click="recordData.communication_method == 'phone'">
          <img
            src="/icons/phone-modal-icon.svg"
            alt="icon"> <span></span> <div>
              <img
                src=""
                alt="icon">
            </div>
        </button>
      </div>
      <div class="modal-record__main-step-1">
        
      </div>

      <button
        :disabled="!disabledStepButton"
        @click="stepHandler">
        Записаться на прием
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

  &__main {
    background: #fff;
    max-width: 480px;
    width: 100%;
    height: fit-content;
    padding: 24px;
    border-radius: 16px;
    position: relative;

    button {
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
    }

    h3 {
      font-family: Inter;
      font-weight: 600;
      font-size: 18px;
      line-height: 28px;
    }

    h4 {
        font-family: Montserrat;
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
.close {
  background: transparent !important;
  width: fit-content !important;
  position: absolute;
  top: -10px;
  right: 30px;
}
</style>
  