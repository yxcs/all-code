<template>
  <div class="by-editor-quill">
    <slot name="toolbar"></slot>
    <div ref="byEditor"></div>
  </div>
</template>
<script>
import _Quill from 'quill'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import './editor.scss'
const Quill = window.Quill || _Quill

const colors = ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466']

export default {
  name: 'ByEditor',
  data() {
    return {
      _options: {},
      _content: ''
    }
  },
  props: {
    content: String,
    value: String,
    disabled: {
      type: Boolean,
      default: false
    },
    font: {
      type: Array,
      required: false,
      default: () => ['bold', 'italic', 'underline', 'strike']
    },
    block: {
      type: Array,
      required: false,
      default: () => ['blockquote', 'code-block']
    },
    header: {
      type: Array,
      required: false,
      default: () => [1, 2]
    },
    headerType: {
      type: String,
      required: false,
      default: 'sole',
      validator: (v) => {
        return ['sole', 'select'].indexOf(v) > -1
      }
    },
    list: {
      type: Array,
      required: false,
      default: () => ['ordered', 'bullet']
    },
    script: {
      type: Array,
      required: false,
      default: () => ['sub', 'super']
    },
    indent: {
      type: Array,
      required: false,
      default: () => ['-1', '+1']
    },
    direction: {
      type: String,
      default: 'rtl'
    },
    fontSize: {
      type: Array,
      default: () => ['small', 'normal', 'large', 'huge']
    },
    color: {
      type: Array,
      default: () => [...colors]
    },
    background: {
      type: Array,
      default: () => [...colors]
    },
    fontFamily: {
      type: Array,
      default: () => [ 'normal', 'serif', 'monospace' ]
    },
    align: {
      type: Array,
      default: () => [ 'normal', 'center', 'right', 'justify' ]
    },
    media: {
      type: Array,
      default: () => [] // ['link', 'image', 'video', 'formula']
    },
    placeholder: {
      type: String,
      required: false,
      default: '开始书写内容...'
    },
    readOnly: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  mounted() {
    this.initialize()
  },
  beforeDestroy() {
    this.quill = null
    delete this.quill
  },
  methods: {
    // Init Quill instance
    initialize() {
      if (this.$el) {

        // Options
        this._options = Object.assign({}, this.defaultOptions)

        // Instance
        this.quill = new Quill(this.$refs.byEditor, this._options)

        this.quill.enable(false)

        // Set editor content
        if (this.value || this.content) {
          this.quill.pasteHTML(this.value || this.content)
        }

        // Disabled editor
        if (!this.disabled) {
          this.quill.enable(true)
        }

        // Mark model as touched if editor lost focus
        this.quill.on('selection-change', range => {
          if (!range) {
            this.$emit('blur', this.quill)
          } else {
            this.$emit('focus', this.quill)
          }
        })

        // Update model if text changes
        this.quill.on('text-change', (delta, oldDelta, source) => {
          let html = this.$refs.byEditor.children[0].innerHTML
          const quill = this.quill
          const text = this.quill.getText()
          if (html === '<p><br></p>') html = ''
          this._content = html
          this.$emit('input', this._content)
          this.$emit('change', html, text, quill)
        })

        // Emit ready event
        this.$emit('ready', this.quill)
      }
    }
  },
  watch: {
    // Watch content change
    content(newVal, oldVal) {
      if (this.quill) {
        if (newVal && newVal !== this._content) {
          this._content = newVal
          this.quill.pasteHTML(newVal)
        } else if(!newVal) {
          this.quill.setText('')
        }
      }
    },
    // Watch content change
    value(newVal, oldVal) {
      if (this.quill) {
        if (newVal && newVal !== this._content) {
          this._content = newVal
          this.quill.pasteHTML(newVal)
        } else if(!newVal) {
          this.quill.setText('')
        }
      }
    },
    // Watch disabled change
    disabled(newVal, oldVal) {
      if (this.quill) {
        this.quill.enable(!newVal)
      }
    }
  },
  computed: {
    defaultOptions () {
      const options = {
        theme: 'snow',
        boundary: document.body
      }
      options.placeholder = this.placeholder
      options.readOnly = this.readOnly

      const toolbar = []
      let store = []
      this.font.forEach(item => {
        if (['bold', 'italic', 'underline', 'strike'].indexOf(item) > -1) {
          store.push(item)
        }
      })
      toolbar.push(store)
      store = []
      this.block.forEach(item => {
        if (['blockquote', 'code-block'].indexOf(item) > -1) {
          store.push(item)
        }
      })
      toolbar.push(store)
      store = []
      this.header.forEach(item => {
        if ([1, 2, 3, 4, 5, 6, 'normal'].indexOf(item) > -1) {
          store.push(item)
        }
      })
      if (this.headerType === 'sole') {
        store = store.filter(item => item !== 'normal')
        store = store.map(item => ({header: item}))
      } else {
        store = {header: store.map(item => item === 'normal' ? false : item)}
      }
      toolbar.push(store)
      store = []
      this.list.forEach(item => {
        if (['ordered', 'bullet'].indexOf(item) > -1) {
          store.push({list: item})
        }
      })
      toolbar.push(store)
      store = []
      this.script.forEach(item => {
        if (['sub', 'super'].indexOf(item) > -1) {
          store.push({script: item})
        }
      })
      toolbar.push(store)
      store = []
      this.indent.forEach(item => {
        if (['-1', '+1'].indexOf(item) > -1) {
          store.push({indent: item})
        }
      })
      toolbar.push(store)
      store = []
      if (this.direction) {
        toolbar.push([{direction: this.direction}])
      }
      store = {size: []}
      this.fontSize.forEach(item => {
        if (['small', 'normal', 'large', 'huge'].indexOf(item) > -1) {
          store.size.push(item)
        }
      })
      store.size =  store.size.map(item => item === 'normal' ? false : item)
      toolbar.push([store])
      store = {
        color: [...colors],
        background: [...colors]
      }
      if (this.color.length) {
        store.color = this.color
      }
      if (this.background.length) {
        store.background = this.background
      }
      toolbar.push([{color: store.color}, {background: store.background}])
      store = {font: [ 'normal', 'serif', 'monospace' ]}
      const fontFamily = this.fontFamily.map(item => item === 'normal' ? false : item)
      if (fontFamily.length) {
        store.font = fontFamily
      }
      toolbar.push([store])
      store = {align: [ 'normal', 'center', 'right', 'justify' ]}
      const align = this.align.map(item => item === 'normal' ? false : item)
      if (align.length) {
        store.align = align
      }
      toolbar.push([store])
      store = []
      this.media.forEach(item => {
        if (['link', 'image', 'video', 'formula'].indexOf(item) > -1) {
          store.push(item)
        }
      })
      if (store.length) {
        toolbar.push([store])
      }
      options.modules = { toolbar }
      return options
    }
  }
}
</script>
