<template>
  <div class="home">
    <MyHeader></MyHeader>
    <MyCarousel></MyCarousel>
    <MyNav></MyNav>
    <router-view/>
    <MyFooter></MyFooter>
    <MyCopy></MyCopy>
  </div>
</template>

<script>
import MyHeader from './MyHeader'
import MyCarousel from './MyCarousel'
import MyNav from './MyNav'
import MyFooter from './MyFooter'
import MyCopy from './MyCopy'
export default {
  name: 'MyLayout',
  components: {
    MyHeader,
    MyCarousel,
    MyNav,
    MyFooter,
    MyCopy
  }
}
</script>
