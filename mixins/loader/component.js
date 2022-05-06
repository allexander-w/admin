export default {
  props: ["template"],
  computed: {
    component() {
      const template = this.template || "default"
      return `${ this.$options.name }-templates-${ template }-template`
    }
  },
}
