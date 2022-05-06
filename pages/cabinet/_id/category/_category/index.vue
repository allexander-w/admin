<script>
export default {
  name: "general",
  layout: "cabinet",
  async asyncData({ $axios, route }) {
    try {
      const res = await $axios.get("site/category/index", { params: { site_id: route.params.id, category_id: route.params.category }})
      return { articles: res.data.data.category.articles || [],  error: [], data: res.data.data.category }

    } catch(e) {
      return { articles: [], error: [ ...Object.values(e.response.data.messages) ] }
    }
  },
  methods: {
    async remove(id) {
      this.error = []
      try {
        await this.$axios.post("site/secure/article/delete", { article_id: id } )
        this.articles = this.articles.filter( article => article.id !== id )
      } catch(e) {
        this.error = [ ...Object.values(e.response.data.messages) ]
      }

    }
  }

}
</script>

<template>
  <div class="articles-list">
    <message-component v-if="error && error.length" template="error" :data="error" />

    <div v-if="!error.length" class="heading flex ai-center jc-between mb-40">
      <h3 class="text-24">{{ articles && articles.length ? data && data.name || "Неизвестно" : "Нет доступных статей" }}</h3>
      <btn-component :route="`/cabinet/${ $route.params.id }/category/${ $route.params.category }/create`" class="article-button" template="main-link"> <i class="far fa-plus"></i> Добавить статью </btn-component>
    </div>

    <div class="articles-table" v-if="articles && articles.length">
      <table>
        <thead>
        <tr>
          <td>ID</td>
          <td>Название</td>
          <td></td>
        </tr>
        </thead>

        <tbody>
        <tr v-for="article in articles" :key="article.id">
          <td>{{ article.id }}</td>
          <td>{{ article.name }}</td>
          <td class="actions">
            <nuxt-link :to="`/cabinet/${ $route.params.id }/category/${ $route.params.category }/edit/${ article.id }`"><i class="far fa-pencil"></i></nuxt-link>
            <nuxt-link :to="`/cabinet/${ $route.params.id }/category/${ $route.params.category }/show/${ article.id }`"><i class="far fa-eye"></i></nuxt-link>
            <i @click="remove(article.id)" class="far fa-trash"></i>
          </td>
        </tr>
        </tbody>
      </table>

    </div>

  </div>
</template>

<style scoped lang="scss">
.articles-table {
  margin: 0 -40px;
}
.articles-list {
  .wrap {
    margin: -8px -8px;
  }

  .heading {
    .article-button {
      width: 200px;
    }
  }
}

td.actions {
  text-align: right;

  a {
    &:not(:last-child) {
      margin-right: 8px;
    }
  }

  i {
    color: $blue;
    padding: 12px;
    border-radius: 50%;
    cursor: pointer;
    transition: .3s ease;

    &:hover {
      background-color: rgba($blue, .1);
    }
  }
}

</style>
