<script>
export default {
  name: "site-create",
  layout: "cabinet",
  data: () => ({
    name: "",
  }),
  methods: {
    async create() {
      const body = { name: this.name }

      try {
        const response = await this.$axios.post("site/secure/create", body )
        this.$router.push("/cabinet" )
      } catch(e ) {
        console.log( e.response )
      }

    }
  }
}
</script>

<template>
<main class="site-create">
  <h3 class="text-24 mb-32">Создание сайта</h3>
  <common-field width="864px">
    <text-field-component v-model="name" class="mb-32" placeholder="Название" />

    <btn-component style="width: 200px" template="main" @event="create"> Сохранить </btn-component>
  </common-field>
</main>
</template>

