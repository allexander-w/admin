<template>
  <div>

    Главная страница
    layout:  { main }

    <nuxt-link to="/signin"> Войти </nuxt-link>
    <nuxt-link to="/signup"> Регистрация </nuxt-link>

  </div>
</template>

<script>
export default {
  auth: false,
  name: 'IndexPage'
}
</script>
