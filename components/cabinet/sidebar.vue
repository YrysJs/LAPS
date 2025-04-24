<script setup>
// Здесь могут быть дополнительные настройки или импорты.
</script>

<template>
  <div class="sidebar">
    <div class="sidebar__header">
      <img
        src="/images/logo-cabinet.svg"
        alt="">
    </div>

    <nav class="sidebar__nav">
      <ul class="sidebar__list">
        <li
          class="sidebar__item"
          :class="{ active: $route.path === '/cabinet/profile'}">
          <nuxt-link
            to="/cabinet/profile"
          >
            <img
              src="/icons/cabinet/man.svg"
              alt="person-icon"> Личные данные
          </nuxt-link>
        </li>
        <li
          class="sidebar__item"
          :class="{ active: $route.path === '/cabinet/history' }">
          <nuxt-link
            to="/cabinet/history"
          >
            <img
              src="/icons/cabinet/list.svg"
              alt="list-icon"> История обращений
          </nuxt-link>
        </li>
        <li
          class="sidebar__item"
          :class="{ active: $route.path === '/cabinet/reviews' }">
          <nuxt-link
            to="/cabinet/reviews"
          >
            <img
              src="/icons/cabinet/review.svg"
              alt=""> Отзывы
          </nuxt-link>
        </li>
        <li
          class="sidebar__item"
          :class="{ active: $route.path === '/cabinet/settings' }">
          <nuxt-link
            to="/cabinet/settings"
          >
            <img
              src="/icons/cabinet/settings.svg"
              alt=""> Настройки
          </nuxt-link>
        </li>
        <li class="sidebar__item">
          <nuxt-link
            to="/"
          >
            <img
              src="/icons/cabinet/logout.svg"
              alt=""> Выйти
          </nuxt-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  max-width: 280px;
  width: 100%;
  min-height: 100vh;
  background-color: #ffffff;
  font-family: 'Arial', sans-serif;
  padding-top: 22px;
  padding-bottom: 22px;

  @media (max-width: 990px) {
    display: none;
  }
}

.sidebar__header {
  width: fit-content;
  margin: 0 auto 30px auto;
}

.sidebar__nav {
  display: flex;
  flex-direction: column;
}

.sidebar__list {
  list-style: none;
  padding: 0;
}

.sidebar__item {
  height: 50px;
  transition: 1s;

  a {
    display: flex;
    align-items: center;
    height: inherit;
    max-width: 210px;
    margin: auto;

    font-family: Nunito Sans;
    font-weight: 600;
    font-size: 14px;
    line-height: 100%;
    letter-spacing: 0.3px;
    border-radius: 6px;
    
  }

  img {
    margin-left: 16px;
    margin-right: 16px;
  }
}

.sidebar__item.active img {
  filter: brightness(0) invert(1);
}

.active a {
  background: #1F72EE !important;
  color: #fff;

  &::before {
    content: '';
    display: block;
    height: 60px;
    width: 5px;
    background: #1F72EE;
    position: absolute;
    left: 0;
    border-radius: 6px;
  }
}

.sidebar__link {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  text-decoration: none;
  color: #333;
  font-size: 16px;
  font-weight: 600;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.sidebar__link:hover {
  background-color: #f4f4f4;
  color: #007bff;
}

.sidebar__link--active {
  background-color: #007bff;
  color: #fff;
}

.sidebar__icon {
  margin-right: 15px;
}
</style>