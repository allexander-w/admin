<template>
  <component :is="component"> <template #text><slot></slot></template> </component>
</template>

<script>
import loader from "@/mixins/loader/component"

export default {
  name: "btn",
  props: ["route"],
  mixins: [ loader ],
  methods: {
    event() {
      this.$emit("event")
    }
  }
}
</script>
