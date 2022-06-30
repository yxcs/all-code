<template>
  <div class="photos">
    <Waterfall :gutterHeight="0">
      <WaterfallItem v-for="item in list" :key="item.id" :style="{width: 240 + 'px', height: item.height + 'px'}" :width="240">
        <div class="img-wrap" @click="showDialog(item.id)"><img :src="item.url" /></div>
      </WaterfallItem>
    </Waterfall>
    <MediaViewr :show="show" @change-show="closeDialog"></MediaViewr>
  </div>
</template>

<script>
import {Waterfall, WaterfallItem} from 'vue2-waterfall'
import MediaViewr from '../components/MediaViewr'
export default {
  name: 'PhotoWall',
  components: {
    Waterfall,
    WaterfallItem,
    MediaViewr
  },
  data () {
    return {
      show: false,
      showId: 0,
      list: [
        {
          id: 'cover_1',
          width: 320,
          height: 200,
          url: 'http://172.17.3.180:8080/images/cover_1.jpg'
        }, {
          id: 'cover_2',
          width: 140,
          height: 320,
          url: 'http://172.17.3.180:8080/images/2241.jpg_wh1200.jpg'
        }, {
          id: 'cover_3',
          width: 320,
          height: 200,
          url: 'http://172.17.3.180:8080/images/cover_2.jpg'
        }, {
          id: 'cover_4',
          width: 200,
          height: 160,
          url: 'http://172.17.3.180:8080/images/cover_3.jpg'
        }, {
          id: 'cover_5',
          width: 360,
          height: 230,
          url: 'http://172.17.3.180:8080/images/cover_4.jpg'
        }, {
          id: 'cover_6',
          width: 230,
          height: 230,
          url: 'http://172.17.3.180:8080/images/cover_5.jpg'
        }, {
          id: 'cover_7',
          width: 100,
          height: 100,
          url: 'http://172.17.3.180:8080/images/cover_6.jpg'
        }, {
          id: 'cover_8',
          width: 443,
          height: 200,
          url: 'http://172.17.3.180:8080/images/cover_7.jpg'
        }, {
          id: 'cover_9',
          width: 100,
          height: 200,
          url: 'http://172.17.3.180:8080/images/cover_8.jpg'
        }
      ]
    }
  },
  methods: {
    showDialog (id) {
      this.showId = id
      this.show = true
    },
    closeDialog () {
      this.show = false
      this.showId = 0
    }
  }
}
</script>

<style lang="scss" scoped>
.photos {
  width: 1200px;
  margin: 50px auto;
}
.img-wrap {
  width: 100%;
  height: 100%;
  font-size: 0;
  cursor: pointer;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    transition: all .5s;
  }
  img:hover {
    width: 110%;
    height: 110%;
  }
}
</style>
