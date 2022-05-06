<template>
  <component :is="component"> </component>
</template>

<script>
import loader from "@/mixins/loader/component"

export default {
  props: ["data"],
  name: "message",
  mixins: [ loader ]
}
</script>
