<template>
  <nuxt-link :to="$parent.route">
    <button class="btn main-button">
      <slot name="text"></slot>
    </button>
  </nuxt-link>
</template>

<style scoped lang="scss">
.main-button {
  width: 100%;
  height: 48px;
  background: $yellow;
  padding: 0 10px;
}
</style>
