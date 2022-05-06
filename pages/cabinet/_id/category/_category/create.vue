<script>
import { Tabs } from "~/editor/tabs/tabs.js"
import "~/editor/tabs/tabs.scss"

export default {
  name: "edit-article",
  layout: "cabinet",
  data: () => ({
    editor: null,
    name: "",
    image: {}
  }),

  async mounted() {
    this.editor = await new this.$editor.EditorJS({
      autofocus:true,
      tools: {
        tabs: {
          class: Tabs,
          inlineToolbar: true
        },
      }
    })
  },

  methods: {
    async create() {
      const content = await this.editor.save()

      const payload = new FormData()

      const body = {
        site_id: this.$route.params.id,
        content: JSON.stringify(content),
        category_id: this.$route.params.category,
        name: this.name,
        image: this.$refs.upload.files[0]
      }

      Object.keys(body).forEach( element => {
        payload.append(element, body[element])
      })

      console.log( this.$refs.upload.files )

      try {
        await this.$axios.post("site/secure/article/create", payload )
        this.$router.push(`/cabinet/${ this.$route.params.id }/category/${ this.$route.params.category }`)

      } catch(e ) {
        console.log( e.response )
      }

    }
  }
}
</script>

<template>
  <main>
    <h3 class="text-24 mb-40">Создание статьи</h3>

    <common-field width="864px">
      <input type="file" ref="upload">
      <text-field-component v-model="name" class="mb-32" placeholder="Название" />
      <div id="editorjs"></div>
      <btn-component template="main" @event="create"> Создать статью </btn-component>
    </common-field>
  </main>
</template>
