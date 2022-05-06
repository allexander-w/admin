<script>
export default {
  name: "top-navigation",
  async fetch() {
    try {
      const response = await this.$axios.get("site/category", { params: { site_id: this.$route.params.id } } )
      this.categories = response.data.data.categories

    } catch(e ) {
      console.log( e.response )
    }
  },

  data: () => ({
    categories: [],
    loading: false,
    category: "",
    renameCategory: "",

    renameMode: false,
    addMode: false,
  }),

  methods: {
    focus( e ) {
      this.addMode = true
      this.$refs.add.focus()
    },

    renameFocus( e ) {
      this.renameMode = true
      this.$refs.rename.focus()
    },

    rename() {
      this.rename = ""
    },

    async create() {
      this.loading = true
      try {
        const response = await this.$axios.post("site/secure/category/create", { site_id: this.$route.params.id, parent_id: null, name: this.category } )
        this.categories.push( response.data.data.category )
        this.category = ""

      } catch(e ) {
        console.log( e.response )
      }

      this.loading = false
    },

    async remove() {
      try {
        await this.$axios.post("site/secure/category/delete", { site_id: this.$route.params.id, category_id: this.$route.params.category } )
        this.categories = this.categories.filter( el => el.id.toString() !== this.$route.params.category.toString())
        if ( this.categories.length ) {
          this.$router.push(`/cabinet/${ this.$route.params.id }/category/${ this.categories[0].id }`)
          return true
        }

        this.$router.push(`/cabinet/${ this.$route.params.id }`)

      } catch(e ) {
        console.log( e.response )
      }
    }

  }
}
</script>

<template>
  <div class="top-navigation flex ai-center jc-between">

    <!--  [Табы]: Ссылки -->
    <div class="flex ai-center">
      <div class="top-navigation-categories flex ai-center">
        <nuxt-link :to="'/cabinet/' + $route.params.id + '/category/' + category.id" :class="{ 'active': $route.params.category && $route.params.category.toString() === category.id.toString() }" class="top-navigation-category" v-for="category in categories"> {{ category.name }} </nuxt-link>
      </div>
    </div>

    <!--  [Табы]: Действия  -->
    <div class="flex ai-center tab-actions">
      <div class="tab-action" @click="remove"> <i class="far fa-trash"></i> </div>

      <div class="tab-action" @click="focus">
        <i class="far fa-plus"></i>
        <input v-on:keydown.enter="create" :disabled="loading" v-show="addMode" type="text" ref="add" @blur="addMode = false" v-model="category">
      </div>

      <div class="tab-action" @click="renameFocus">
        <i class="far fa-pencil"></i>
        <input v-on:keydown.enter="rename" :disabled="loading" v-show="renameMode" type="text" ref="rename" @blur="renameMode = false" v-model="renameCategory">
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.top-navigation {
  border-bottom: 1px solid rgba( $blue, .15 );
  padding-left: 24px;
}

.tab-actions {
  margin-right: 40px;
  .tab-action:not(:last-child) {
    margin-right: 8px;
  }
}

.tab-action {
  @include icon-button()
}

.top-navigation-category {
  padding: 24px 24px;
  cursor: pointer;
  transition: .3s ease;
  color: $black;


  &.nuxt-link-exact-active, &.active {
    color: $blue;
    border-bottom: 1px solid $blue;
  }

  &:hover {
    color: $blue;
  }
}
</style>
