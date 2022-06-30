<template>
  <div class="about">
    <!-- <input v-focus/>
    <by-checkbox>选择</by-checkbox>
    <by-button>选择</by-button>
    <p>{{1574909288320 | date2str}}</p>-->
    <el-card style="height: 610px;">
      <quill-editor
        v-model="content"
        ref="myQuillEditor"
        style="height: 500px;"
        :options="editorOption"
      ></quill-editor>
    </el-card>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  name: 'FuncFormsEdit',
  components: {
    quillEditor
  },
  data () {
    return {
      content: null,
      editorOption: {}
    }
  },
  watch: {
    content (val) {
      console
    }
  }
}
</script>

<style scoped>
</style>
