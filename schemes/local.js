export default {
    endpoints: {

      login: {
        url: "account/auth", method: "post", propertyName: "data.token"
      },

      logout: {
        url: "account/logout", method: "POST"
      },

      user: {
        url: "account", method: "get", propertyName: "data.user"
      }

    }
}
