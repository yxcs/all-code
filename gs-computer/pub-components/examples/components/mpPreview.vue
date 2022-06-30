<template lang="html">
  <div class="preview-content">
    <img class="preview-img" :src="demoPic" />
    <div v-if="false" class="qrcode-btn">
      <img src="/static/qrcode-icon.png" />
    </div>
    <div class="qrcode">
      <div>
        <img :src="mpQrcode" />
        <p>扫码体验</p>
      </div>
    </div>
  </div>
</template>
<script>
import { stringify } from 'querystring'
export default {
  name: 'mp-preview',
  props: {
    demoPic: String,
    mpQrcode: String
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>