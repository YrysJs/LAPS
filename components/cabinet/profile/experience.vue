<script setup>
</script>

<template>
  <div class="experience">
    <div class="experience__content">
      <div class="experience__wrapper">
        <div class="experience__wrapper-item">
          <button class="delete">
            &#10006;
          </button>
          <div class="experience__item">
            <p>
              Место работы
            </p>
            <input
              type="text"
              placeholder="Введите название">
          </div>
          <div class="experience__item">
            <p>
              Должность
            </p>
            <input
              type="text"
              placeholder="Введите название">
          </div>
          <div class="experience__item">
            <p>
              Год начала работы
            </p>
            <input
              type="date"
              placeholder="Введите год">
          </div>
          <div class="experience__item">
            <p>
              Год окончания работы
            </p>
            <input
              type="date"
              placeholder="Введите год">
          </div>
        </div>
        <button class="add-item">
          &#10011; Добавить место работы
        </button>
      </div>
    </div>
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
    flex-direction: column;
    gap: 60px;
    max-width: 850px;
    margin: auto;
    justify-content: center;

    &-item {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 32px;
      border: 1px solid rgb(223, 223, 223);
      padding: 30px;
      border-radius: 10px;
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
}
</style>