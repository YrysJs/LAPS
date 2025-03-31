<script setup>

const connect = ref(true)
const filterState = ref(true)

</script>

<template>
  <NuxtLayout name="cabinet">
    <div class="history">
      <h3 class="history__title">
        Консультации
      </h3>
      <div class="history__filter">
        <div class="history__filter-item history__filter-1">
          <img
            src="/icons/cabinet/filter.svg"
            alt="filter-icon">
        </div>
        <button
          class="history__filter-item history__filter-2"
          :class="{ active: filterState }"
          @click="filterState = true">
          Предстоящие
        </button>
        <button
          class="history__filter-item history__filter-3"
          :class="{ active: !filterState }"
          @click="filterState = false">
          Отмененные
        </button>
      </div>
      <div class="history__content">
        <div
          v-if="true"
          class="history__container">
          <div class="history__header">
            <div>Имя</div>
            <div>Номер телефона</div>
            <div>Дата</div>
            <div>Статус</div>
          </div>
          <div class="history__row">
            <div>Сымбат Алтынбекова</div>
            <div class="history-phone">
              <img
                class="phone-icon"
                :src="connect == true ? '/icons/cabinet/phone.svg' : '/icons/cabinet/wp.svg'"
                alt="phone-icon"> <a :href="connect == true ? 'tel:88005553535' : 'https://wp/88005553535'">+7 777 77 77</a>
            </div>
            <div>14 марта 2025</div>
            <div class="status">Оплачено</div>
          </div>
        </div>
        <div
          v-else
          class="history__empty">
          Здесь появятся все консультации
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
.active {
  color: #1F72EE;
}

.history {
  &__title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    font-size: 32px;
    line-height: 100%;
    letter-spacing: -0.11px;
  }

  &__filter {
    margin-top: 24px;
    margin-bottom: 24px;
    height: 70px;
    background: #fff;
    border-radius: 14px;
    max-width: 360px;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    img {
      padding-left: 24px;
      padding-right: 24px;
    }

    button {
      padding-left: 16px;
      padding-right: 32px;
      height: 70px;

      font-family: Nunito Sans;
      font-weight: 700;
      font-size: 14px;
      line-height: 100%;
      letter-spacing: 0px;

    }

    &-2 {
      border-right: 1px solid #e6e6e6;
      border-left: 1px solid #e6e6e6;
    }
  }

  &__empty {
    border-radius: 14px;
    background: #fff;
    padding: 48px;

    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    font-size: 16px;
    line-height: 100%;
    letter-spacing: 0%;
    color: #718EBF;

  }

  &__container {
    display: flex;
    flex-direction: column;
    border: .5px solid #e0e0e0;
    border-radius: 14px;
  }

  &__header {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    background-color: #fff;
    padding: 10px 20px;
    border-radius: 14px 14px 0px 0px;
    padding-top: 24px;
    padding-bottom: 24px;

    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    font-size: 14px;
    line-height: 100%;

    div {
      display: flex;
      align-items: center;
    }
  }

  &__row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    background-color: #fff;
    padding: 10px 20px;
    border-radius: 0px 0px 14px 14px;
    padding-top: 24px;
    padding-bottom: 24px;

    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 100%;
    border-top: 1px solid #D5D5D5;

    div {
      display: flex;
      align-items: center;
    }
  }
}



.status {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100px;
  width: 100%;
  height: 27px;
  padding: 5px 10px;
  background-color: #a5f1e6;
  color: #00B69B;
  border-radius: 4.5px;

  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0px;
}
.phone-icon {
  margin-right: 8px;
}

</style>