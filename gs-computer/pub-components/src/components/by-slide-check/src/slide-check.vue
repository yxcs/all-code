<template>
  <div
    class="slide-check-wrap"
    :style="{ width: width + 'px' }"
    @mouseup="onMouseup"
    @mousemove.stop="onMousemove"
    @mouseleave="onMouseup"
  >
    <div class="tips-info">
      <span class="tips">完成拼图验证</span>
      <span class="next-img" v-if="showNextImg" @click="onNextImg">换一张</span>
    </div>
    <div class="slider-check-wrap" :style="{ width: width + 'px' }">
      <canvas ref="bg" :width="width" :height="height" class="bg-canvas" />
      <canvas ref="card" :width="width" :height="height" class="card-canvas" />
      <div class="slider-wrap">
        <div class="progress-bar" ref="progress-bar"></div>
        <div class="btn" ref="btn" @mousedown.stop="onMousedown">></div>
        <div class="slider" ref="slider">{{ tips }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import './slide-check.scss'
const BTN_WIDTH = 50;
export default {
  name: 'BySlideCheck',
  props: {
    radius: {
      type: Number,
      default: 10
    },
    src: {
      type: [String, Array],
      default: ''
    },
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 300
    },
    theme: {
      type: String,
      default: '#409EFF'
    }
  },
  data() {
    return {
      range: 0,
      tips: '向右滑动完成拼图'
    };
  },
  computed: {
    showNextImg() {
      return Array.isArray(this.src) && this.src.length > 1;
    }
  },
  mounted() {
    if (Array.isArray(this.src)) {
      this.initCanvas(this.src[0]);
    } else {
      this.initCanvas(this.src);
    }
    this.initDomInfo();
  },
  methods: {
    onNextImg() {
      this.reset();
      if (Array.isArray(this.src)) {
        this.initCanvas(this.src[Math.floor(Math.random() * this.src.length)]);
      } else {
        this.initCanvas(this.src);
      }
    },
    initDomInfo() {
      this.pos = this.$refs['btn'].getBoundingClientRect();
      if (this.theme !== '#369') {
        this.$refs['slider'].style.boxShadow = `0 0 10px 0 ${this.theme}`;
        this.$refs['slider'].style.color = this.theme;
        this.$refs['btn'].style.background = this.theme;
        this.$refs['btn'].style.boxShadow = `0 0 10px 0 ${this.theme}`;
      }
    },
    onMousedown(e) {
      this.track = {
        top: e.clientY,
        bottom: e.clientY
      };
      this.track2 = {
        top: e.clientY,
        bottom: e.clientY
      };
      this.isEnterDown = true;
      this.clickPos = e.clientX;
      this.tips = '向右滑动完成拼图';
      this.$refs['btn'].style.transition = '';
      this.$refs['card'].style.transition = '';
      this.$refs['progress-bar'].style.transition = '';
      this.diff = e.clientX - this.pos.left;
    },
    calcTrack(y) {
      let moveToBottom = this.track.top;
      let moveToTop = this.track.bottom;
      if (y > this.track.top) {
        this.track.top = y;
        if (y > moveToTop) {
          moveToTop = y;
        }
      } else if (y < this.track.bottom) {
        this.track.bottom = y;
        if (y < moveToBottom) {
          moveToBottom = y;
        }
      }
    },
    onMousemove(e) {
      if (!this.isEnterDown) return;
      const slideWidth = this.$refs['slider'].clientWidth;
      if (
        e.clientX - this.pos.left - this.diff - 10 + BTN_WIDTH > slideWidth ||
        e.clientX - this.pos.left - this.diff - 10 < 0
      ) {
        return;
      }
      this.calcTrack(e.clientY);
      this.cardMovePos =
        ((this.width - this.radius * 5 + 2) /
          (this.$refs['slider'].clientWidth - BTN_WIDTH)) *
        (e.clientX - this.pos.left - this.diff - 11);
      this.$refs[
        'card'
      ].style.transform = `translate3d(${this.cardMovePos}px,0,0)`;
      this.$refs['btn'].style.transform = `translate3d(${e.clientX -
        this.pos.left -
        this.diff -
        10}px, 0, 0)`;
      this.$refs['progress-bar'].style.width = `${e.clientX -
        this.pos.left -
        this.diff -
        10}px`;
      this.$refs['progress-bar'].style.background = '#42c3fc';
    },
    onMouseup(e) {
      if (!this.isEnterDown) return;
      this.isEnterDown = false;

      if (this.clickPos === e.clientX) return;

      if (this.cardMovePos + 3 > this.x && this.cardMovePos - 3 < this.x) {
        this.tips = '验证通过';
        this.$refs['progress-bar'].style.background = '#2cd277';
        setTimeout(() => {
          this.$emit('success', {
            top: Math.abs(this.track.bottom - this.track2.bottom),
            bottom: Math.abs(this.track.top - this.track2.top)
          });
        }, 1000);
      } else {
        setTimeout(() => {
          this.$emit('fail');
          this.onStatusChange();
        }, 1000);
        this.$refs['progress-bar'].style.background = '#ff5b57';
      }
    },
    onStatusChange () {
      this.reset();
      this.$refs['progress-bar'].style.transition = '0.3s all';
      this.$refs['progress-bar'].style.width = '0px';
      this.$refs['btn'].style.transition = '0.3s all';
      this.$refs['btn'].style.transform = `translate3d(0,0,0)`;
      this.$refs['card'].style.transition = '0.3s all';
      this.$refs['card'].style.transform = `translate3d(0,0,0)`;
      if (Array.isArray(this.src)) {
        this.initCanvas(
          this.src[Math.floor(Math.random() * this.src.length)]
        );
      } else {
        this.initCanvas(this.src);
      }
    },
    random(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    initCanvas(src) {
      const bg = this.$refs['bg'];
      const card = this.$refs['card'];
      const bgCtx = bg.getContext('2d');
      const cardCtx = card.getContext('2d');
      const r = this.radius;
      const w = r * 4;
      const cardSize = r * 6;
      this.x = this.random(this.width / 2, this.width - cardSize);
      const y = this.random(2 * r, this.height - cardSize);
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        bgCtx.drawImage(img, 0, 0, this.width, this.height);
        cardCtx.drawImage(img, 0, 0, this.width, this.height);
        const _y = y - r * 2 + 3;
        const ImageData = cardCtx.getImageData(this.x, _y, cardSize, cardSize);
        card.width = cardSize;
        cardCtx.putImageData(ImageData, 0, _y);
      };
      const rect = {
        x: this.x,
        y,
        w,
        r
      };
      img.src = src;
      this.draw(bgCtx, 'fill', rect);
      this.draw(cardCtx, 'clip', rect);
    },
    reset() {
      const bgCtx = this.$refs['bg'].getContext('2d');
      const card = this.$refs['card'];
      const cardCtx = card.getContext('2d');
      bgCtx.clearRect(0, 0, this.width, this.height);
      cardCtx.clearRect(0, 0, this.width, this.height);
      card.width = this.width;
    },
    draw(ctx, operation, rect) {
      const PI = Math.PI;
      const { x, y, w, r } = rect;
      ctx.beginPath();
      ctx.lineTo(x, y);
      ctx.arc(x + w / 2, y, r, PI, 0);
      ctx.lineTo(x + w, y);
      ctx.arc(x + w, y + w / 2, r, 1.5 * PI, 0.5 * PI);
      ctx.lineTo(x + w, y + w);
      ctx.lineTo(x, y + w);
      ctx.arc(x, y + w / 2, r, 0.5 * PI, 1.5 * PI, true);
      ctx.closePath();
      ctx.lineWidth = 2;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.stroke();
      ctx[operation]();
      ctx.globalCompositeOperation = 'destination-over';
    }
  }
}
</script>
