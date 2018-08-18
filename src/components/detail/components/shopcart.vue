<template lang="html">
  <div class="shopcart">
    <div class="content">
      <div class="left">
        <div class="shop-box">
          <div class="iconfont icon-home"></div>
          <router-link class="text" tag="span" to="/home">商城</router-link>
        </div>
        <div class="shopcart-box" @click="addCart">
          <div class="iconfont icon-gouwuche"></div>
          <span class="text">购物车</span>
        </div>
      </div>
      <div class="middle" @click="add"><span class="add-cart" >加入购物车</span></div>
      <div class="right" @click="loginOrPay"><span class="buy-now">立即购买</span></div>
    </div>
    <transition>
      <div class="shopcartList" v-show="fold">
        <div class="header">购物车</div>
        <scroll class="list-content" :click="true" ref="scroll">
          <div>
            <div class="good border-bottom nodata" v-show="!this.cartProductList.length">
              <div class="msg" style="text-align:center;margin-top: 20px">
                购物车空空如也
              </div>
            </div>
            <div
             class="good border-bottom"
             v-for="(item, index) in cartProductList"
             :key="index"
             v-show="item.quantity"
             >
              <div class="img">
                <img :src="'http://img.happymmall.com/' + item.productMainImage" width="85" height="85">
              </div>
              <div class="msg">
                <div class="name" ref="goodName">{{item.productName}}</div>
                <div class="iconfont icon-cuo" @click="deleteItem(item.productId)"></div>
                <div class="origina-cost">￥{{item.productPrice + 128}}</div>
                <div class="discount-price">￥{{item.productPrice}}</div>
              </div>
              <div class="count">
                <div class="countBtn">
                  <i class="iconfont icon-jian btn" @click="decreaseCount(item.productId, item.quantity)"></i>
                  <input type="text" class="num" :value="item.quantity" ref="goodCount">
                  <i class="iconfont icon-jia btn" @click="increaseCount(item.productId, item.quantity)"></i>
                </div>
              </div>
            </div>
          </div>
        </scroll>
        <div class="total-price" v-show="this.cartProductList.length">
          <div class="price">共计: ￥{{cartTotalPrice}}</div>
        </div>
        <div class="addToCart" @click="loginOrPay">去支付</div>
      </div>
    </transition>
    <transition>
      <div class="list-mask" v-show="fold" @click="addCart"></div>
    </transition>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Scroll from 'base/scroll/scroll'
import {doLogin, getAxios, transformData} from 'common/js/mm'
export default {
  components: {
    Scroll
  },
  data() {
    return {
      fold: false,
      cartProductList: [],
      cartTotalPrice: 0
    }
  },
  computed: {
    ...mapGetters([
      'shopcartList'
    ]),
    totalPrice() {
      let price = 0
      this.shopcartList.forEach((item) => {
        price += item.count * item.price
      })
      return price
    }
  },
  methods: {
    addCart() {
      this._getShopcartList()
      this.fold = !this.fold
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    },
    getAjax(from, to) {
      getAxios({
        url: from
      }, (res) => {
        if (res.data.status === 10) {
          doLogin()
          return
        }
        if (res.data.status === 1) {
          doLogin()
          return
        }
        if (res.data.status === 0) {
          this.$router.push(to)
        }
      })
    },
    loginOrPay() {
      this._checkLogin()
    },
    _checkLogin() {
      this.getAjax('/user/get_information.do', '/shopcart-list-big')
    },
    decreaseCount(id, nowCount) {
      // this.$emit('decCount', id)
      let data = transformData({
        productId: id,
        count: nowCount - 1
      })
      getAxios({
        url: `/cart/update.do?${data}`,
        data: data
      }, (res) => {
        this._getShopcartList()
      })
    },
    increaseCount(id, nowCount) {
      // this.$emit('addCount', id)
      let data = transformData({
        productId: id,
        count: nowCount + 1
      })
      getAxios({
        url: `/cart/update.do?${data}`,
        data: data
      }, (res) => {
        this._getShopcartList()
      })
    },
    deleteItem(id) {
      // this.$emit('deleteItem', id)
      let data = transformData({
        productIds: id
      })
      getAxios({
        url: `/cart/delete_product.do?${data}`,
        data: data
      }, (res) => {
        this._getShopcartList()
      })
    },
    // 请求购物车数据
    _getShopcartList() {
      getAxios({
        url: 'cart/list.do'
      }, (res) => {
        this.cartProductList = res.data.data.cartProductVoList
        this.cartTotalPrice = res.data.data.cartTotalPrice
        console.log('更新购物车')
      })
    },
    // 点击[加入购物车]，先检查是否登录
    add() {
      getAxios({
        url: '/user/get_information.do'
      }, (res) => {
        if (res.data.status === 10) {
          doLogin()
          return
        }
        if (res.data.status === 1) {
          doLogin()
          return
        }
        if (res.data.status === 0) {
          // 更新购物车数据
          this._getShopcartList()
          this.$emit('addToCart')
        }
      })
    }
  },
  mounted() {
    this._getShopcartList()
  }
  // watch: {
  //   cartProductList() {
  //     console.log('change')
  //     this._getShopcartList()
  //   }
  // }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.shopcart
  position: fixed
  left: 0px
  bottom: 0px
  z-index: 300
  font-size: 0
  width: 100%
  height: 43px
  .content
    position: relative
    z-index: 99
    .left, .middle, .right
      display: inline-block
      width: 33.3333%
      height: 100%
      font-size: 0
      vertical-align: top
    .left
      background: #eee
      color: $color-text
      vertical-align: top
      font-size: 0
      .shop-box
        display: inline-block
        width: 50%
        height: 100%
        text-align: center
        margin-top: 4px
        .icon-home
          font-size: $font-size-large-x
        .text
          font-size: $font-size-medium
      .shopcart-box
        display: inline-block
        width: 50%
        height: 43px
        text-align: center
        .icon-gouwuche
          font-size: $font-size-large-x
        .text
          font-size: $font-size-medium
    .middle
      background: #fc9f37
      color: rgba(250,250,250,.9)
      font-size: $font-size-large
      text-align: center
      .add-cart
        line-height: 43px
        height: 43px
    .right
      font-size: $font-size-medium-x
      text-align: center
      color: rgba(250,250,250,.9)
      background: $color-text-o-d
      line-height: 43px
  .list-mask
    position: fixed
    top: 0px
    right: 0px
    bottom: 43px
    left: 0px
    z-index: 40
    background: rgba(7,17,27,.6)
    backdrop-filter: blur(10px)
    overflow: hidden
    &.v-enter-active, &.v-leave-active
      transition: all .4s
    &.v-leave-to, &.v-enter
      opacity: 0
  .shopcartList
    position: absolute
    left: 0
    bottom: 0px
    z-index: 500
    width: 100%
    background: $color-background
    box-sizing: border-box
    &.v-enter-active, &.v-leave-active
     transition: all .4s
    &.v-leave-to, &.v-enter
     transform: translate3d(0,100%,0)
    .header
     padding: 10px 0px
     font-size: $font-size-large
     color: $color-text-o-d
     text-align: center
    .list-content
      padding: 0 10px
      max-height: 300px
      overflow: hidden
      background: #fff
      .good
        display: flex
        padding: 10px px
        // min-height: 100px
        box-sizing: border-box
        &.nodata
          margin-top: 50px
          margin-bottom: 61px
        &.v-enter-active, &.v-leave-active
          transition: all .4s
        &.v-enter, &.v-leave-to
          opacity: 0
          .msg
            color: rgb(255,161,36)
      .img
        flex: 0 0 85px
        width: 85px
        height: 85px
      .msg
        position: relative
        flex: 1
        padding: 10px 10px 0px 20px
        font-size: $font-size-medium-x
        color: $color-text
        .name
          margin: 0px
          no-wrap()
          max-width: 270px
          @media only screen and (min-width:320px)
            max-width: 180px
          @media only screen and (min-width:375px)
            max-width: 240px
        .icon-cuo
          position: absolute
          padding: 5px
          right: -4px
          top: -5px
        .origina-cost
          margin-top: 10px
          font-size: $font-size-medium
          color: $color-text-d
          text-decoration:line-through
        .discount-price
          margin-top: 10px
          color: $color-text-o-d
          font-size: $font-size-large
      .count
        position: absolute
        top: 43px
        right: 10px
        padding: 10px 10px
        .shuliang
          font-size: $font-size-small
          color: $color-text
        .countBtn
          margin-top: 10px
          width: 100px
          font-size: $font-size-medium
          font-size: 0px
          .num
            padding: 0px
            margin-top: -1px
            vertical-align: top
            text-align: center
            width: 50px
            height: 20px
            font-size: $font-size-small
            border: 1px solid #ccc
            box-sizing: border-box
          .btn
            vertical-align: top
            width: 40px
            height: 20px
            font-size: 18px
            border: 1px solid #ccc
          .icon-jian
            margin-right: -1px
          .icon-jia
            margin-left: -1px
    .total-price
      padding: 10px 10px
      .price
       font-size: $font-size-medium-x
       color: $color-text
  .addToCart
    height: 43px
    background: rgb(255,161,36)
    color: #fff
    font-size: $font-size-large
    line-height: 43px
    text-align: center
    // position: absolute
    // bottom: 0px
    // left: 0px
    // right: 0px
</style>
