<script>
export default {
  auth: "guest",
  data: () => ({
    email: "",
    password: "",

    error: []
  }),
  methods: {
    async submit() {
      this.error = []

      try {
        const resp = await this.$auth.loginWith("local", {
          data: { email: this.email, password: this.password }
        })
      } catch( e ) {
        this.error = [ ...this.error, ...Object.values( e.response.data.messages ) ]
      }

    }
  }
}
</script>

<template>
    <form @submit.prevent="submit">
        <input v-model="email" type="text" placeholder="Email">
        <input v-model="password" type="text" placeholder="Email">

        <message-component template="error" :data="error" />

        <button type="submit">Войти</button>
    </form>
</template>


