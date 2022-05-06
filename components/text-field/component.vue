<template>
  <component :is="component"> </component>
</template>

<script>
import loader from "@/mixins/loader/component"

export default {
  name: "text-field",
  mixins: [ loader ],

  props: ["value", "placeholder"],
  computed: {
    model: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit("input", newValue)
      }
    },
  }
}
</script>
