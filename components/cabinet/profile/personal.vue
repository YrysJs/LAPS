<script setup>
</script>

<template>
  <div class="experience">
    <div class="experience__content">
      <div class="experience__wrapper">
        <div class="experience__avatar">
          <img
            src="/images/avatar.png"
            alt="avatar">
          <p>Фото профиля</p>
        </div>
        <div class="experience__wrapper-item">
          <div class="experience__item">
            <p>
              Имя
            </p>
            <input
              type="text"
              placeholder="Введите имя">
          </div>
          <div class="experience__item">
            <p>
              Фамилия
            </p>
            <input
              type="text"
              placeholder="Введите фамилию">
          </div>
          <div class="experience__item">
            <p>
              E-mail
            </p>
            <input
              type="text"
              placeholder="Введите email">
          </div>
          <div class="experience__item">
            <p>
              Номер телефона
            </p>
            <input
              type="text"
              placeholder="Введите ваш номер телефона">
          </div>
          <div class="experience__item">
            <p>
              Номер телефона WhatsApp
            </p>
            <input
              type="text"
              placeholder="Введите ваш номер телефона">
          </div>
          <div class="experience__item">
            <p>
              Стаж работы
            </p>
            <input
              type="text"
              placeholder="Стаж работы в годах">
          </div>
          <div class="experience__item">
            <p>
              Специализация
            </p>
            <input
              type="text"
              placeholder="Выберите специализацию">
          </div>
          <div class="experience__item">
            <p>
              Пол
            </p>
            <input
              type="text"
              placeholder="Введите год">
          </div>
          <div class="experience__item">
            <p>
              Стоимость первичной консультации
            </p>
            <input
              type="text"
              placeholder="Цена">
          </div>
          <div class="experience__item">
            <p>
              Стоимость вторичной консультации
            </p>
            <input
              type="text"
              placeholder="Цена">
          </div>
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
.delete {
  position: absolute;
  top: -20px;
  right: -20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: #f3f3f3;
  padding: 15px;
}
.add-item {
  border: 1px solid #0069FF;
  font-family: Nunito;
  font-weight: 400;
  font-size: 13px;
  line-height: 100%;
  color: #0069FF;
  width: fit-content;
  padding: 6px 15px;
  border-radius: 5px;
}
.experience {
  width: 100%;

  &__avatar {
    text-align: center;
    max-width: 116px;
    width: 100%;

    p {
      margin-top: 16px;
      font-family: 'Montserrat', sans-serif;
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      letter-spacing: 0.54px;
      color: #4379EE;
    }
  }

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
    display: flex;
    flex-wrap: wrap;
    gap: 60px;
    
    margin: auto;
    justify-content: center;
    align-items: flex-start;

    &-item {
      max-width: 780px;
      position: relative;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 32px;
    }
  }

  &__item {
    width: 100%;
    max-width: 360px;

    p {
      font-family: 'Montserrat', sans-serif;
      font-weight: 600;
      font-size: 14px;
      line-height: 100%;
      letter-spacing: 0px;
      margin-bottom: 14px;
    }

    input {
      width: 100%;
      height: 64px;
      padding-left: 24px;
      border-radius: 12px;
      background: #ebeefc;
      border: 1px solid #E9EAEB;
      font-family: 'Montserrat', sans-serif;
      font-weight: 500;

      &:focus {
          outline: 2px solid #1F72EE;
      }
    }
  }

  @media (max-width: 1285px) {
    &__item {
      max-width: 100%;
    }
  }

  @media (max-width: 940px) {
    &__item {
      max-width: 100%;
    }
  }

  @media (max-width: 640px) {
    &__content {
      margin-top: 0;
      padding: 16px;
    }

    &__wrapper {
      gap: 30px;
    }

    &__item {
      input {
        padding-left: 8px;
      }
    }
  }
}
</style>