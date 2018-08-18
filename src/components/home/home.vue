<template lang="html">
  <scroll :click="true" class="scroll" ref="sc" :style="{height: this.height}">
    <div class="home">
      <swiper class="swiper-wrapper" ></swiper>
      <search></search>
      <recommend :recommendList="recommendList"></recommend>
      <gap></gap>
      <spacial :spacialList="spacialList"></spacial>
      <gap></gap>
      <well-chosen :chosenList="chosenList"></well-chosen>
      <e-footer></e-footer>
    </div>
  </scroll>
</template>

<script>
/* eslint-disable */
import Swiper from './components/swiper'
import Search from './components/search'
import Recommend from './components/recommend'
import Scroll from 'base/scroll/scroll'
import EFooter from 'base/footer/EFooter'
import Gap from 'base/gap/gap'
import Spacial from './components/spacial'
import WellChosen from './components/well-chosen'
import axios from 'axios'
import {getAxios} from 'common/js/mm'
export default {
  name: 'Home',
  data() {
    return {
      height: 0,
      recommendList: [],
      spacialList: [],
      chosenList: []
    }
  },
  methods: {
    _getHeight() {
      // let h = window.screen.height
      // this.height = h - 160 + 'px'
      this.height = '725px'
    },
    _getHomeProduct() {
      axios.get('/product/list.do?keyword=2').then((res) => {
        this.recommendList = res.data.data.list
      })
    },
    _getSpacialProduct() {
      axios.get('/product/list.do?keyword=1').then((res) => {
        let list = res.data.data.list
        this.spacialList = list.splice(list.length - 3, 3)
      })
    },
    _getChosenProduct() {
      axios.get('/product/list.do?keyword=1').then((res) => {
        let list = res.data.data.list
        this.chosenList = list.splice(0, 6)
      })
    },
    activated() {
      this.$nextTick(() => {
        this.$refs.sc.refresh()
      })
    },
    deactivated() {
      this.$nextTick(() => {
        this.$refs.sc.refresh()
      })
    }
  },
  components: {
    Swiper,
    Search,
    Recommend,
    Scroll,
    EFooter,
    Gap,
    Spacial,
    WellChosen
  },
  mounted() {
    this._getHomeProduct()
    this._getSpacialProduct()
    this._getChosenProduct()
    this._getHeight()
    this.$nextTick(() => {
      this.$refs.sc.refresh()
    })
    // getAxios({
    //   url: '/user/logout.do'
    // },(res) => {
    //     console.log(res)
    // })
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
  .scroll
    position: relative
    top: 0px
    left: 0px
    right: 0px
    bottom: 43px
    // width: 100%
    overflow: hidden
    .home
      .swiper-wrapper
        width: 100%
        height: 0
        padding-bottom: 44%
</style>
