<template>
    <form @submit.prevent="submit">
        <input v-model="email" type="text" placeholder="Email">
        <input v-model="password" type="text" placeholder="Email">

        <button type="submit">Войти</button>
    </form>
</template>

<script>
export default {
    auth: "guest",
    data: () => ({
        email: "",
        password: ""
    }),
    methods: {
        async submit() {
            console.log( this.$auth )

            try {
                // const resp = await this.$auth.loginWith("local", {
                //     data: { email: this.email,
                //     password: this.password }
                // })

                // console.log( resp )

                

                const response = await fetch("https://api.merchant.itl.systems/account/auth", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                        },
                        body: JSON.stringify({ email: this.email, password: this.password }),
                      })

                const data = await response.json()

                console.log( data )

            } catch( e ) {
                console.log("catched", e)
            }
            
        }
    }
}
</script>
