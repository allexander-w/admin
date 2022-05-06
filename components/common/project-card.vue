<script>
export default {
  name: "project-tile",
  props: ["route"]
}
</script>

<template>
  <div class="project-tile">
    <div class="project-tile-img mb-24"><slot name="img"></slot></div>
    <nuxt-link :to="route" class="text-30 blue project-tile-route mb-8"> <slot name="route"></slot> </nuxt-link>
    <p class="text-16 gray"><slot name="desc"></slot></p>
  </div>
</template>

<style lang="scss" scoped>
.project-tile-route {
  @include line-limit( 1 )
}

.project-tile {
  width: 400px;
  height: 208px;
  border-radius: 5px;
  background-color: #fff;
  padding: 24px 32px;
  overflow: hidden;

  &:not(:last-child) {
    margin-right: 32px;
  }
}

.project-tile-img {
  width: 200px;
  height: 32px;
  overflow: hidden;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
}
</style>
