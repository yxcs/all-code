<template>
  <div class="image--editer__wrap">
    <div>
      <img @load="onImgLoad" :src="imgObj.src" />
      <div @click="onImgClick" class="img-cover">
        <div v-for="(k, idx) in imgObj.tags" @click.stop="1" :key="idx" class="tag" :style="{left: k.x + 'px', top: k.y + 'px' }"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageEditer',
  data () {
    return {
      imgObj: {
        src: 'http://172.17.3.180:8081/t1.jpg',
        width: 0,
        height: 0,
        tags: []
      }
    }
  },
  methods: {
    onImgLoad (e) {
      this.imgObj.width = e.path[0].width
      this.imgObj.height = e.path[0].height
      console.log(e)
      console.log(this.imgObj)
    },
    onImgClick (e) {
      console.log(e.target)
      const tag = {
        x: e.offsetX,
        y: e.offsetY
      }
      tag.x = tag.x < 5 ? 5 : tag.x
      tag.y = tag.y < 5 ? 5 : tag.y
      tag.x = tag.x > tag.x - 5 ? tag.x - 5 : tag.x
      tag.y = tag.y > tag.y - 5 ? tag.y - 5 : tag.y
      this.imgObj.tags.push(tag)
      console.log(this.imgObj)
    }
  }
}
</script>
<style lang="scss">
.image--editer__wrap {
  width: 100%;
  background: #eeeeee;
  & > div {
    position: relative;
    margin: 40px;
    width: 200px;
    height: auto;
    img {
      width: 100%;
    }
    .img-cover {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.3);
    }
  }
  .tag {
    position: absolute;
    width: 10px;
    height: 10px;
    background: yellowgreen;
    border-radius: 5px;
  }
}
</style>
