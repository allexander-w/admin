<template>
  <component :is="component"> </component>
</template>

<script>
import loader from "@/mixins/loader/component"

export default {
  name: "cap",
  mixins: [ loader ]
}
</script>
