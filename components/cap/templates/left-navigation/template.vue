<template>
  <header class="left-navigation">
    <nuxt-link to="/cabinet" class="flex ai-center jc-center icon-block">
       <i class="fas fa-bat"></i>
    </nuxt-link>

    <div class="flex ai-center jc-center icon-block exit">
      <i class="far fa-door-closed"></i>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    async logout() {
      const resp = await this.$auth.logout("local")
    },
  }
}
</script>

<style scoped lang="scss">
.left-navigation {
  width: 98px;
  height: 100vh;
  background-color: $blue;
  position: fixed;
  left: 0;

  .icon-block > i {
    color: white;
    font-size: 24px;
  }

  .exit {
    position: absolute;
    bottom: 0;
  }
}

.icon-block {
  width: 100%;
  height: 98px;
  cursor: pointer;

  &:hover {
    background-color: rgba(51, 51, 51, 0.15);
  }
}
</style>
