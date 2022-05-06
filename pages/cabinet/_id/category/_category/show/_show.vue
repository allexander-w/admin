<script>
export default {
  layout: "cabinet",
  async asyncData({ $axios, route }) {

    try {
      const res = await $axios.get("site/article/index", { params: { article_id: route.params.show } })
      return { article: res.data.data.article }

    } catch(e) {
      return { error: [ ...Object.values(e.response.data.messages) ] }
    }

  },

  data: () => ({
    html: ""
  }),



  methods: {
    tabsClick(e) {
      if ( !e.target.classList.contains("tablinks") ) return
      this.openCity(e, e.target.innerText)
    },

    openCity(evt, cityName) {
      var i, tabcontent, tablinks;

      // Get all elements with class="tabcontent" and hide them
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }

      // Get all elements with class="tablinks" and remove the class "active"
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }

      // Show the current tab, and add an "active" class to the button that opened the tab
      document.getElementById(cityName).style.display = "block";
      evt.currentTarget.className += " active";
    }
  },

  mounted() {

    const paragraph = ({ data }) => {
      return `<p class="text-16">${data.text}</p>`;
    }

    const tabs = ({ data }) => {
      let html = document.createElement("div")
      let tab = document.createElement("div")

      data.data.forEach( $el => {
        tab.insertAdjacentHTML('beforeend', `
          <button class="tablinks">${ $el.name }</button>
        `)

        html.insertAdjacentHTML('beforeend', `
           <div id="` + $el.name + `" class="tabcontent">
              <h3>${ $el.name }</h3>
              <p>${ $el.content }</p>
           </div>
        `)
      })

      html.insertAdjacentHTML("afterbegin", `<div class="tab">${ tab.innerHTML }</div>`)
      return html.innerHTML
    }

    const parser = this.$editor.parserEditor({ paragraph, tabs })
    const html = parser.parse(JSON.parse(this.article.content))

    this.html = html.join("")
  }
}
</script>

<template>
<common-field>
  <div class="text-area" @click="tabsClick" v-html="html"></div>
</common-field>
</template>

<style lang="scss" scoped>
.text-area {
  max-width: 700px;
  margin: 0 auto;
}
</style>
