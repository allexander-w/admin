<script>
export default {
  name: "general",
  layout: "cabinet",
  async asyncData({ $axios, route }) {
      try {
        const res = await $axios({ url: "site/index?site_id=" + route.params.id })
        return { articles: res.data.data.articles || [], error: [], data: res.data.data.site }
      } catch(e) {
        return { articles: [], error: [ ...Object.values(e.response.data.messages) ] }
      }
  },
  methods: {
    async remove(id) {

      try {
        const res = await this.$axios.post("site/secure/article/delete", { article_id: id } )
        this.articles = this.articles.filter( article => article.id !== id )
      } catch(e) {
        console.log( e.response )
      }

    }
  }

}
</script>

<template>
  <div class="articles-list">
    <message-component v-if="error && error.length" template="error" :data="error" />

    <div v-if="!error.length" class="heading flex ai-center jc-between mb-40">
      <h3 class="text-24">{{ articles && articles.length ? "Доступные статьи для " + data.name + ":" : "Нет доступных статей" }}</h3>
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
                  <nuxt-link :to="`/cabinet/${ $route.params.id }/category/${ article.category_id }/edit/${ article.id }`"><i class="far fa-pencil"></i></nuxt-link>
                  <nuxt-link :to="`/cabinet/${ $route.params.id }/category/${ article.category_id }/show/${ article.id }`"><i class="far fa-eye"></i></nuxt-link>
                  <i @click="remove(article.id)" class="far fa-trash"></i>
                </td>
              </tr>
            </tbody>
        </table>

    </div>

  </div>
</template>

<style scoped lang="scss">


</style>
