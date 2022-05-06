<script>

import {Tabs} from "~/editor/tabs/tabs";
import "~/editor/tabs/tabs.scss"
export default {
  name: "edit-article",
  layout: "cabinet",
  data: () => ({
    editor: null,
    name: "",
    path: ""
  }),

  async asyncData({ $axios, route }) {

    try {
      const res = await $axios.get("site/article/index", { params: { article_id: route.params.edit } })
      return { article: res.data.data.article, path: process.env.baseURL + res.data.data.article.avatar.path, name: res.data.data.article.name || "" }

    } catch(e) {
      return { error: [ ...Object.values(e.response.data.messages) ] }
    }

  },

  async mounted() {
    this.editor = await new this.$editor.EditorJS({
      autofocus:true,
      tools: {
        tabs: {
          class: Tabs,
          inlineToolbar: true
        },
      },
      data: JSON.parse(this.article.content)
    })
  },

  computed: {
    base() {
      return process.env.baseURL
    }
  },

  methods: {
    loadImage() {
      let reader = new FileReader();

      reader.onload = e => {
        this.$refs.img.src = e.target.result
      }

      reader.readAsDataURL(this.$refs.upload.files[0]);
    },

    async save() {
      const content = await this.editor.save()
      const payload = new FormData()

      const body = {
        article_id: this.$route.params.edit,
        site_id: this.$route.params.id,
        content: JSON.stringify(content),
        name: this.name,
        image: this.$refs.upload.files[0]
      }

      Object.keys(body).forEach( element => {
        payload.append(element, body[element])
      })

      try {
        await this.$axios.post("site/secure/article/update", payload )
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

    <h3 class="text-24 mb-40">Редактирование статьи</h3>

    <common-field width="864px">
      <label for="editImg" class="preview"><img ref="img" :src="path" alt=""> </label>
      <input id="editImg" type="file" @change="loadImage" ref="upload">

      <text-field-component class="mb-32" v-model="name" placeholder="Название" />
      <div id="editorjs"></div>
      <btn-component template="main" @event="save"> Сохранить </btn-component>

    </common-field>

  </main>
</template>


<style scoped lang="scss">
#editImg {
  display: none;
}

.preview {
  height: 300px;
  overflow: hidden;

  margin-bottom: 32px;

  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
}
</style>
