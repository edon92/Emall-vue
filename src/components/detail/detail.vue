<template lang="html">
  <transition>
    <div class="detail-page">
      <scroll class="detail" :click="true">
        <div>
          <swiper :options="swiperOption" class="wrapper" v-if="this.goodDetail.hasOwnProperty('id')">
            <!-- slides -->
            <swiper-slide
            v-for="item in ImgList"
            :key="item.id"
            class="img-box"
            >
            <img class="img" :src="'http://img.happymmall.com/' + item" >
          </swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
        <div class="icon-back" @click.stop="back">
          <i class="iconfont icon-houtui"></i>
        </div>
        <div class="msg-top">
          <span class="title">{{goodDetail.name}}</span>
          <div class="subtitle">{{goodDetail.subtitle}}</div>
          <div class="order-msg" v-show="this.ImgList">
            <div class="price">￥{{goodDetail.price}}</div>
            <div class="delivery">快递: 京东包邮</div>
            <div class="position">发货地: 北上广就近发货</div>
          </div>
        </div>
        <gap></gap>
        <div class="introduction">
          <div class="title-box-1">
            <span class="title">商品详情</span>
          </div>
          <div class="title-box-2">
            <span class="title">常见问题</span>
          </div>
          <div class="check-order">
            <div class="text-1"><span>查看订单: </span>打开APP > 我的 > 我的账号 > 实物订单</div>
            <div class="text-2">本实物商品只能用微信或者支付宝购买，无法用App账号"账户余额"支付</div>
            <div class="text-3">购买</div>
          </div>
          <div class="img-wrapper" v-for="(item, index) in ImgDetail" :key="index">
            <img :src="item" class="img">
          </div>
        </div>
        <div class="footer-wrapper">
          <e-footer></e-footer>
        </div>
      </div>
    </scroll>
    <shopcart @addCount="addCount" @decCount="decCount" @addToCart="addToCart" @deleteItem="deleteItem"></shopcart>
    </div>
  </transition>
</template>

<script>
import axios from 'axios'
import 'swiper/dist/css/swiper.css'
import {
  swiper,
  swiperSlide
} from 'vue-awesome-swiper'
import Gap from 'base/gap/gap'
import Scroll from 'base/scroll/scroll'
import Shopcart from './components/shopcart'
import EFooter from 'base/footer/EFooter'
import {mapMutations} from 'vuex'
import {getAxios, transformData, Salert, doLogin} from 'common/js/mm'
export default {
  components: {
    swiper,
    swiperSlide,
    Gap,
    Scroll,
    Shopcart,
    EFooter
  },
  data() {
    return {
      goodDetail: {
        type: Object,
        default: {}
      },
      swiperOption: {
        autoplay: 3000,
        loop: true,
        autoplayDisableOnInteraction: false,
        pagination: '.swiper-pagination'
      },
      detail: ''
    }
  },
  mounted() {},
  methods: {
    back() {
      this.$router.back()
    },
    // 更新购物车数据
    _getShopcartList() {
      getAxios({
        url: 'cart/list.do'
      }, (res) => {
        this.cartProductList = res.data.data.cartProductVoList
        this.cartTotalPrice = res.data.data.cartTotalPrice
      })
    },
    // 执行添加到购物车和把商品同步到state与后端
    addToCart() {
      // 同步到后端，同步之前要进行数据类型转换，后端需要jsonp
      let data = transformData({
        productId: this.goodDetail.id,
        count: 1
      })
      getAxios({
        url: `/cart/add.do?${data}`,
        type: 'get',
        data: {
          productId: this.goodDetail.id,
          count: 1
        }
      }, (res) => {
        // 请求成功
        if (res.data.status === 0) {
          // 更新购物车
          this._getShopcartList()
          // 弹出成功信息
          Salert('已成功加入购物车', 'success')
          return
        }
        if (res.data.status === 10) {
          Salert('请先登录', 'error')
          doLogin()
        }
      })
    },
    addCount(id) {
      // 同步到后端，同步之前要进行数据类型转换，后端需要jsonp
      let data = transformData({
        productId: this.goodDetail.id,
        count: 1
      })
      getAxios({
        url: `/cart/update.do?${data}`,
        type: 'get',
        data: {
          productId: this.goodDetail.id,
          count: 1
        }
      }, (res) => {
        // 请求成功
        if (res.data.status === 0) {
          // 同步到state中
          this.addShopcart(this.goodDetail)
          // 弹出成功信息
          Salert('已成功加入购物车', 'success')
          return
        }
        if (res.data.status === 10) {
          Salert('请先登录', 'error')
          doLogin()
        }
      })
      // this.insShopcart(id)
    },
    decCount(id) {
      this.decShopcart(id)
    },
    deleteItem(id) {
      this.deleteShopcart(id)
    },
    ...mapMutations({
      addShopcart: 'ADD_SHOPCART',
      decShopcart: 'DEC_SHOPCART',
      insShopcart: 'INS_SHOPCART',
      deleteShopcart: 'DEL_SHOPCART'
    })
  },
  computed: {
    ImgList() {
      if (this.goodDetail.hasOwnProperty('id')) {
        let list = this.goodDetail.subImages.split(',')
        return list
      }
    },
    ImgDetail() {
      return this.detail.match(/http:\/\/.*?jpg/gi)
    }
  },
  activated() {
    let id = this.$route.params.id
    axios.get(`/product/detail.do?productId=${id}`).then((res) => {
      this.goodDetail = res.data.data
      this.detail = res.data.data.detail
    })
  },
  deactivated() {
    this.goodDetail = {}
  },
  watch: {}
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.detail >>> .swiper-pagination-bullet
  border-radius: 0px
  height: 2px
  width: 15px
.detail >>> .swiper-pagination-bullet-active
  background: #ffefdd
.detail >>> .swiper-container
  overflow: inherit
.detail-page
  position: relative
  margin-top: -44px
  width: 100%
  height: 100%
  z-index: 50
  &.v-enter-active, &.v-leave-active
    transition: all .4s
  &.v-enter, &.v-leave-to
    transform: translate3d(100%, 0, 0)
  .detail
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 43px
    z-index: 99
    background: #eee
    overflow: hidden
    .wrapper
      width: 100%
      height: 0
      padding-bottom: 108%
      overflow: hidden
      .img-box
        width: 100%
        height: 0
        padding-bottom: 108%
        overflow: hidden
        .img
          width: 100%
          height: 450px
    .icon-back
      position: absolute
      padding: 4px
      top: 10px
      left: 6px
      z-index: 20
      color: $color-text-o-d
    .msg-top
      padding: 10px 5px
      background: $color-background
      .title
        color: $color-text
        font-size: $font-size-medium-x
      .subtitle
        margin-top: 10px
        color: $color-text-l
      .price
        margin-top: 10px
        color: $color-text-o-d
        font-size: $font-size-large
      .delivery
        margin-top: 10px
        display: inline-block
        color: $color-text
      .position
        margin-top: 10px
        float: right
        display: inline-block
        color: $color-text
    .introduction
      background: $color-background
      padding: 5px 5px
      font-size: 0
      .title-box-1, .title-box-2
        padding: 4px 0px
      .title-box-1
        display: inline-block
        height: 30px
        line-height: 30px
        width: 50%
        text-align: center
        border-bottom: 1px solid $color-text-o-m
        .title
          color: $color-text-o-d
          font-size: $font-size-large
      .title-box-2
        display: inline-block
        height: 30px
        line-height: 30px
        width: 50%
        text-align: center
        .title
          color: $color-text-o-s
          font-size: $font-size-large
      .check-order
        margin-top: 20px
        padding: 18px 10px
        border: 1px solid #eee
        background: $color-background
        box-shadow: 1px 4px 0px #eee
        .text-1
          font-size: $font-size-small
          color: $color-text-l
        span
          color: $color-text
        .text-2
          margin-top: 10px
          color: $color-text
          font-size: $font-size-small
        .text-3
          margin-top: 10px
          color: $color-text
          font-size: $font-size-small
      .img-wrapper
        margin-top: 10px
        .img
          width: 100%
    /* .footer-wrapper */
</style>
