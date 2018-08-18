<template lang="html">
  <swiper :options="swiperOption" class="wrapper">
    <!-- slides -->
    <swiper-slide><img class="img" src="../../../common/image/banner/banner1.jpg"></swiper-slide>
    <swiper-slide><img class="img" src="../../../common/image/banner/banner2.jpg"></swiper-slide>
    <swiper-slide><img class="img" src="../../../common/image/banner/banner3.jpg"></swiper-slide>
    <swiper-slide><img class="img" src="../../../common/image/banner/banner4.jpg"></swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination"  slot="pagination"></div>
  </swiper>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import {
  swiper,
  swiperSlide
} from 'vue-awesome-swiper'
export default {
  name: 'Swiper',
  data() {
    return {
      swiperOption: {
        autoplay: 3000,
        loop: true,
        autoplayDisableOnInteraction: false,
        pagination: '.swiper-pagination'
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style lang="stylus" scoped>
.wrapper >>> .swiper-pagination-bullet
  border-radius: 0px
  height: 1px
  width: 15px
.wrapper >>> .swiper-pagination-bullet-active
  background: #fff
.wrapper
  .img
    width: 100%
</style>
