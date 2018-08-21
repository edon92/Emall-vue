<template lang="html">
  <div class="order-list">
    <div class="header border-bottom">
      <i class="iconfont icon-houtui" @click="back"></i>
      <div class="title">订单列表</div>
    </div>
    <div class="order-header">
      <div class="msg msg1">商品信息</div>
      <div class="msg msg2">单价</div>
      <div class="msg msg3">数量</div>
      <div class="msg msg4">合计</div>
    </div>
    <loading v-show="!this.orderListData.length"></loading>
    <scroll class="scroll-box" :click="true" v-show="this.orderListData.length">
      <div class="order-content">
        <div
         class="order-list-detail"
         v-for="(item, index) in this.orderListData"
         :key="index"
        >
          <div class="detail-header">
            <div class="msg orderNo">订单号: {{item.orderNo}}</div>
            <div class="msg more-msg">
              查看更多<i class="iconfont icon-qianjin msg"></i>
            </div>
          </div>
          <div
           class="item-detail"
           v-for="(good, index) in item.orderItemVoList"
           :key="index"
          >
            <div class="line-box imgAndName">
              <div class="line-box img">
                <img :src="'http://img.happymmall.com/' + good.productImage" width="60" height="60">
              </div>
              <div class="line-box name" ref="goodName">{{good.productName}}</div>
            </div>
            <div class="line-box price">￥{{good.currentUnitPrice}}</div>
            <div class="line-box count">{{good.quantity}}</div>
            <div class="line-box totalPrice">￥{{good.totalPrice}}</div>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import {getAxios} from 'common/js/mm'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
export default {
  components: {
    Scroll,
    Loading
  },
  data() {
    return {
      orderNoList: [],
      list: [],
      orderListData: []
    }
  },
  methods: {
    back() {
      this.$router.back()
    },
    // 请求用户订单信息汇总
    _getOrderList() {
      getAxios({
        url: '/order/list.do'
      }, (res) => {
        // console.log(res)
        this.orderNoList = res.data.data.list
        // 把获取用户订单号放在一个数组
        this.orderNoList.forEach((item) => {
          this.list.push(item.orderNo)
        })
      })
    },
    // 请求所有订单号里的信息
    _getOrderDetail() {
      this.list.forEach((item) => {
        getAxios({
          url: `/order/detail.do?orderNo=${item}`
        }, (res) => {
          this.orderListData.push(res.data.data)
        })
      })
    }
  },
  mounted() {
    this._getOrderList()
    this.$nextTick(() => {
      this._getOrderDetail()
    })
  },
  watch: {
    list() {
      this._getOrderDetail()
      console.log('detail', this.orderListData)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.order-list
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 44px
  background: $color-background
  /* padding: 0px 4px */
  /* z-index: 300 */
  .header
    position: relative
    top: 0px
    right: 0px
    height: 30px
    font-size: $font-size-medium-x
    line-height: 30px
    /* text-align: center */
    background: $color-background
    z-index: 30
    .title
      display: inline-block
      margin-left: 43%
      color: #444
    .edit
      float: right
      color: rgb(56,161,216)
  .order-header
    position: relative
    font-size: 0
    background: #eee
    height: 26px
    line-height: 26px
    z-index: 80
    .msg
      display: inline-block
      font-size: $font-size-medium
      font-weight: 400
      color: $color-text
      &.msg1
        text-align: left
        width: 60.7%
      &.msg2
        text-align: left
        width: 13%
      &.msg3
        text-align: center
        width: 11%
      &.msg4
        text-align: right
        width: 13%
  .scroll-box
    position: absolute
    top: 56px
    left: 0px
    right: 0px
    bottom: 0px
    padding: 2px 4px
    margin-top: 8px
    background: #fff
    z-index: 10
    .order-content
      background: #fff
      .order-list-detail
        .detail-header
          padding: 0px 2px
          margin-top: 8px
          background: #eee
          font-weight: 300
          color: $color-text
          font-size: 0
          height: 22px
          line-height: 22px
          .msg
            display: inline-block
            font-size: $font-size-small
            &.more-msg
              float: right
        .item-detail
          padding: 4px 2px
          font-size: 0
          background: #fafafa
          .line-box
            display: inline-block
            font-size: $font-size-small
            height: 60px
            line-height: 60px
            vertical-align: top
          .imgAndName
            font-size: 0
            width: 60.7%
            .img
              width: 60px
              font-size: $font-size-small
            .name
              padding: 0px 6px
              font-size: $font-size-small
              max-width: 160px
              no-wrap()
              @media only screen and (min-width:320px)
                max-width: 100px
              @media only screen and (min-width:375px)
                max-width: 140px
              @media only screen and (min-width:414px)
                max-width: 160px
              @media only screen and (min-width:768px)
                max-width: 370px
              @media only screen and (min-width:768px)
                max-width: 550px
          .price
            text-align: left
            width: 13%
          .count
            width: 11%
            text-align: center
          .totalPrice
            width: 13%
            color: $color-text
            text-align: right
</style>
