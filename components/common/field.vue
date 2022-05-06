<script>
export default {
  props: ["width"]
}
</script>

<template>
  <div class="field" :style="{ width }">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.field {
  background: #FFFFFF;
  border-radius: 5px;
  padding: 40px 32px;
}
</style>
