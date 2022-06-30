<template>
  <div class="carousel-wrap">
    <div class="bg"></div>
    <div class="carousel">
      <el-carousel height="460px" direction="vertical" :autoplay="false">
        <el-carousel-item v-for="item in 3" :key="item">
          <div class="img-wrap">
            <img src="../assets/cover.jpg" />
            <div class="over-img">
              MSG
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyCarousel'
}
</script>

<style lang="scss" scoped>
.carousel-wrap {
  position: relative;
  height: 460px;
  .bg {
    width: 100%;
    height: 260px;
    background-color: #212429;
  }
  .carousel {
    position: absolute;
    top: 0;
    left: 50%;
    width: 1200px;
    height: 100%;
    margin-left: -600px;
    background-color: rgba(200, 200, 200, 0.3);
    .img-wrap {
      width: 100%;
      height: 100%;
    }
    img {
      width: 100%;
      height: 100%;
    }
    .over-img {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
  }
}
</style>
