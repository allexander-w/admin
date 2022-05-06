<script>
import { flattenDeep } from "lodash"

function transform( data ) {
  let output = []

  if ( typeof data === 'object' && data !== null ) {
    output = flattenDeep([ ...Object.values(data) ])
  }

  return output
}

export default {
  name: "common-error",
  computed: {
    getError() {
      return transform( this.$parent.data )
    }
  }
}
</script>

<template>
  <div class="common-error-wrapper">
    <div class="common-error" v-for="err in getError" :key="err">
      <i class="far fa-exclamation-square"></i>
      <p >{{ err }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.common-error {
  background-color: rgba(#FB6340, .1 );
  width: 100%;
  padding: 12px 24px;
  border-radius: 2px;

  display: flex;
  align-items: center;


  &:not(:last-child) {
    margin-bottom: 16px;
  }

  p {
    color: #BD081C;
  }

  i {
    color: #BD081C;
    margin-right: 12px;
  }
}
</style>
