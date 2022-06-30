<template>
 <transition name="fade" @after-enter="handleAfterEnter">
  <div class="notification" :style="style" v-show="visible">
   <span class="notification__content">
    {{content}}
   </span>
   <span class="notification__btn" @click="handleClose">{{btn}}</span>
  </div>
 </transition>
</template>
<script>
export default {
 name: 'Notification',
 props: {
  content: {
   type: String,
   required: true
  },
  btn: {
   type: String,
   default: 'close'
  }
 }
}
</script>
<style lang="less" scoped>
.fade-enter-active, .fade-leave-active{
 transition: opacity 1s;
}
.fade-enter, .fade-leave-to{
 opacity: 0;
 transform: translateX(100px);
}
.notification{
 display: flex;
 background-color: #303030;
 color: rgba(255, 255, 255, 1);
 align-items: center;
 padding: 20px;
 position: fixed;
 min-width: 280px;
 box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.3);
 flex-wrap: wrap;
 transition: all 0.3s;
 border-radius:10px ;
 &__content{
  padding: 0;
 }
 &__btn{
  color: #ff4081;
  padding-left: 24px;
  margin-left: auto;
  cursor: pointer;
 }
}
</style>
