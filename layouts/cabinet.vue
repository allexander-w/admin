<script>
export default {
  name: "cabinet-layout",
  middleware: ["auth"]
}
</script>

<template>
  <div class="cabinet-layout">
    <cap-component template="left-navigation" />
    <main class="cabinet-layout-content">
      <cap-component v-if="$route.params.id" template="top-navigation" class="nav" />
      <nuxt />
    </main>
  </div>
</template>

<style scoped lang="scss">
body {
  background: $light-blue;
}

.cabinet-layout {
  display: flex;
}

.cabinet-layout-content {
  margin-left: 98px;
  padding: 32px 40px;
  width: 100%;

  & > .nav {
    margin: -32px -40px 32px;
  }
}
</style>
