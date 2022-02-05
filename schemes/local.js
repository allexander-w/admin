export default {
    endpoints: {
      login: {
        url: "account/auth", method: "post", propertyName: "data.token"
      },
      user: {
        url: "account", method: "get", propertyName: "data.user"
      }
    }
}