<script setup>
import { MaskInput } from 'vue-3-mask'
const step = ref(0)

</script>

<template>
  <div class="modal-record">
    <div class="modal-record__main">
      <h3>Морозова Алена Олеговна</h3>
      <h4>Ваши данные {{ step + 1 }}/3</h4>
      <div class="modal-record__main-step">
        
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="modal-record__main-step-1">
        <div class="form-item">
          <img
            src="/icons/auth/electro-icon.svg"
            alt="icon">
          <input
            id="password"
            type="text"
            placeholder="|ФИО"
            class="form-item__input" >
        </div>
        <div class="form-item">
          <img
            src="/icons/auth/stack-icon.svg"
            alt="icon">
          <MaskInput
            v-model="phoneNumber"
            type="tel"
            mask="+7 (###) ###-##-##" 
            placeholder="Введите номер телефона"
            class="form-item__input"/>
        </div>
      </div>
      <div class="modal-record__main-step-1"></div>
      <div class="modal-record__main-step-1"></div>

      <button>Записаться на прием</button>
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
</style>
  