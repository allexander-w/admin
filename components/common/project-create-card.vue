<template>
  <div class="project-tile">
    <p class="text-16 mb-32"><slot name="desc"></slot></p>
    <btn-component route="/cabinet/site/create" template="main-link">Создать</btn-component>
  </div>
</template>

<style lang="scss" scoped>
.project-tile-route {
  @include line-limit( 1 )
}

.project-tile {
  width: 288px;
  height: 208px;
  border-radius: 5px;
  background-color: #fff;
  padding: 24px 32px;
  overflow: hidden;

  &:not(:last-child) {
    margin-right: 32px;
  }
}
</style>
