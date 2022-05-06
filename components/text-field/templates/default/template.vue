<script>
export default {
  name: "common-input",
  methods: {
    focus(e) {
      e.target.previousElementSibling.focus()
    }
  }
}
</script>

<template>
  <div class="purchase-input flex ai-center">
    <input v-on:keyup.enter="$emit('enter')" v-model="$parent.model" type="text">
    <span class="placeholder" @click="focus" :class="{'in-focus': $parent.model.trim() }">{{ $parent.placeholder }}</span>
  </div>
</template>

<style lang="scss" scoped>

</style>
