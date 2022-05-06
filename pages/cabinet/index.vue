<script>
export default {
  layout: "cabinet",
  async asyncData({ $axios }) {
    const res = await $axios({ url: 'site' })
    return { sites: res.data.data.site || [] }
  },
  methods: {
    async remove(id) {

      try {
        await this.$axios.post("site/secure/delete", { site_id: id } )
        this.sites = this.sites.filter( site => site.id !== id )

      } catch(e ) {
        console.log( e.response )
      }

    },

    toCabinet(event, id) {
      if ( event.target.closest(".actions") )
        return

      this.$router.push('/cabinet/' + id)
    }
  }
}
</script>

<template>
  <div class="projects">

    <div class="flex ai-center jc-between mb-32">
      <h3 class="text-24">Ваши проекты</h3>
      <btn-component route="/cabinet/site/create" template="main-link">Создать</btn-component>
    </div>

      <div class="articles-table" v-if="sites && sites.length">
        <table>
          <thead>
          <tr>
            <td style="width: 10%">ID</td>
            <td style="width: 10%">Название</td>
            <td style="width: 10%"></td>
            <td></td>
          </tr>
          </thead>

          <tbody>
           <tr class="c-pointer" @click="e => toCabinet(e, site.id)" v-for="site in sites" :key="site.id">
              <td>{{ site.id }}</td>
              <td>{{ site.name }}</td>
              <td ><div class="project-tile-img"> <img src="../../assets/img/itlmerchant.png" alt=""> </div></td>
              <td class="actions">
                <nuxt-link :to="`/cabinet/${ $route.params.id }/edit/${ site.id }`"><i class="far fa-pencil"></i></nuxt-link>
                <i @click="remove(site.id)" class="far fa-trash"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

  </div>
</template>

<style lang="scss" scoped>
p {
  margin-bottom: 1000px;
}

.project-tile-img {
  width: 60px;
  height: 24px;
  overflow: hidden;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
}
</style>

