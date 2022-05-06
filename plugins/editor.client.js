import EditorJS from "@editorjs/editorjs";
import parserEditor from "editorjs-html"

export default (app, inject) => {
  inject('editor', { EditorJS, parserEditor })
}
