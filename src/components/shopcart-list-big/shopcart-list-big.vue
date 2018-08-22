<template lang="html">
<transition>
  <div class="order-list">
    <div class="header border-bottom">
      <span class="title" @click="back">
        <i class="iconfont icon-houtui"></i>
        返回
      </span>
      <span class="edit" @click.prevent="edit">编辑</span>
    </div>
    <div class="loading-wrapper" v-show="showLoading">
      <loading></loading>
    </div>
    <div class="nothing-wrapper" v-show="!showLoading && !this.cartProductList.length" style="font-size: 18px;color: #f8762c; margin-left: 36%;margin-top: 30%">
      购物车空空如也
    </div>
    <scroll class="list-content" :click="true">
      <div class="goods-wrapper">
        <div
         class="good border-bottom"
         v-for="(item, index) in cartProductList"
         :key="index"
         @click="ToDetail(item.productId)"
        >
         <div
          class="iconfont icon-dui checked"
          :class="{Unchecked: !(item.productChecked === 1)}"
          @click.stop="Unchecked(item.productId,item.productChecked)"
          v-show="!IsEdit"
        >
        </div>
        <div class="iconfont icon-jianhao" v-show="IsEdit" @click.stop="deleteItem(item.productId)"></div>
           <div class="count">
             <div class="countBtn">
               <div class="iconfont icon-jian btn" @click.stop="decreaseCount(item.productId, item.quantity)"></div>
               <input
                type="text"
                class="num"
                :value="item.quantity"
                ref="goodCount"
                @blur.prevent="submitQuantity(item.productId, index)"
               >
               <div class="iconfont icon-jia btn" @click.stop="increaseCount(item.productId, item.quantity)"></div>
             </div>
           </div>
          <div class="img">
            <img v-lazy="'http://img.happymmall.com/' + item.productMainImage" width="85" height="85">
          </div>
          <div class="msg">
            <div class="name" ref="goodName">{{item.productName}}</div>
            <div class="subtitle">{{item.productSubtitle}}</div>
            <div class="price">￥{{item.productPrice}}</div>
          </div>
          <div class="gap-wrapper">
            <gap-box></gap-box>
          </div>
        </div>
      </div>
    </scroll>
    <div class="PriceAndPay">
      <div class="selected-all">
        <i class="iconfont icon-dui" :class="{unCheack: !AllCheck}" @click="selectAll"></i>
        <span class="text" >全选</span>
      </div>
      <div class="GoTopay">去支付</div>
      <div class="totalPrice">
        <div class="msg1">
          <span class="countAll">合计：</span>
          <span class="price">￥{{cartTotalPrice}}</span>
        </div>
        <div class="msg2">不含运费</div>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
import {getAxios, transformData} from 'common/js/mm'
import GapBox from 'base/gap/gap'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
export default {
  components: {
    GapBox,
    Scroll,
    Loading
  },
  data() {
    return {
      cartProductList: [],
      cartTotalPrice: 0,
      currentQuantity: 0,
      AllCheck: true,
      IsEdit: false
    }
  },
  methods: {
    // 请求购物车数据
    _getShopcartList() {
      getAxios({
        url: 'cart/list.do'
      }, (res) => {
        this.cartProductList = res.data.data.cartProductVoList
        this.cartTotalPrice = res.data.data.cartTotalPrice
        this.showLoading = false
        console.log('_get', this.cartProductList)
      })
    },
    back() {
      this.$router.back()
    },
    ToDetail(id) {
      this.$router.push({
        path: `/detail/productId=${id}`
      })
    },
    edit(id) {
      this.IsEdit = !this.IsEdit
    },
    deleteItem(id) {
      console.log(id)
      let data = transformData({
        productIds: id
      })
      getAxios({
        url: `/cart/delete_product.do?${data}`,
        data: data
      }, (res) => {
        console.log(res)
        this._getShopcartList()
      })
    },
    submitQuantity(id, index) {
      let count = this.$refs.goodCount[index].value
      let data = transformData({
        productId: id,
        count: count
      })
      getAxios({
        url: `/cart/update.do?${data}`,
        data: data
      }, (res) => {
        this._getShopcartList()
      })
    },
    increaseCount(id, nowCount) {
      let data = transformData({
        productId: id,
        count: nowCount + 1
      })
      getAxios({
        url: `/cart/update.do?${data}`,
        data: data
      }, (res) => {
        console.log('success')
        this._getShopcartList()
      })
    },
    decreaseCount(id, nowCount) {
      let data = transformData({
        productId: id,
        count: nowCount - 1
      })
      getAxios({
        url: `/cart/update.do?${data}`,
        data: data
      }, (res) => {
        console.log('success')
        this._getShopcartList()
      })
    },
    selectAll() {
      this.AllCheck = !this.AllCheck
      // 如果已经全选啊
      if (this.AllCheck === false) {
        getAxios({
          url: '/cart/un_select_all.do'
        }, (res) => {
          this._getShopcartList()
        })
      } else {
        getAxios({
          url: '/cart/select_all.do'
        }, (res) => {
          this._getShopcartList()
        })
      }
    },
    Unchecked(id, status) {
      console.log(id, status)
      // 如果已经选中，那么删除
      if (status === 1) {
        let data = transformData({
          productId: id
        })
        getAxios({
          url: `/cart/un_select.do?${data}`,
          data: data
        }, (res) => {
          this._getShopcartList()
        })
        return
      }
      // 未选中,添加
      if (status === 0) {
        let data = transformData({
          productId: id
        })
        getAxios({
          url: `/cart/select.do?${data}`,
          data: data
        }, (res) => {
          this._getShopcartList()
        })
      }
    }
  },
  created() {
    this.showLoading = true
  },
  activated() {
    this._getShopcartList()
    this.$nextTick(() => {
      console.log('sec')
      if (this.cartTotalPrice > 0) {
        console.log('>')
        this.AllCheck = true
      } else {
        console.log('=')
        this.AllCheck = false
      }
    })
  },
  watch: {
    cartTotalPrice() {
      if (this.cartTotalPrice > 0) {
        this.AllCheck = true
        return
      }
      if (this.cartTotalPrice === 0) {
        this.AllCheck = false
      }
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
  padding: 2px 10px
  z-index: 100
  &.v-enter-active, &.v-leave-active
    transition: all .4s
  &.v-enter, &.v-leave-to
    transform: translate3d(100%, 0, 0)
  .header
    position: absolute
    top: 0
    left: 0
    right: 0
    height: 43px
    padding: 0px 10px
    font-size: $font-size-medium-x
    line-height: 43px
    background: #eee
    z-index: 300
    .title
      color: #444
    .edit
      float: right
      color: rgb(56,161,216)
  .loading-wrapper
    margin-top: 150px
  .nothing-wrapper
  .list-content
    position: absolute
    left: 0px
    right: 0px
    top: 44px
    bottom: 0px
    .goods-wrapper
      .good
        position: relative
        display: flex
        padding: 30px 2px 30px 2px
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
      .count
        position: absolute
        top: 70px
        right: 10px
        padding: 10px 10px
        z-index: 300
        .countBtn
          position: relative;
          width: 100px
          font-size: $font-size-medium
          font-size: 0px
          .num
            margin-top: 5px
            padding: 0px
            margin-left: 19px
            vertical-align: top
            text-align: center
            width: 50px
            height: 20px
            font-size: 14px !important
            border: 1px solid #ccc
            box-sizing: border-box
          .btn
            height: 18px
            border: 1px solid #ccc
          .icon-jian
            position: absolute
          .icon-jia
            margin-left: 68px
      .iconfont
        position: absolute
        top: 50%
        margin-top: -8px
        font-size: $font-size-large
        &.checked
          color: $color-text-o-d
        &.Unchecked
          color: $color-text
        &.icon-jianhao
          font-size: $font-size-large
          color: $color-text-o-d
      .img
        margin-left: 30px
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
          @media only screen and (max-width:1024px)
            max-width: 85%
          @media only screen and (max-width:768px)
            max-width: 70%
          @media only screen and (max-width:414px)
            max-width: 240px
          @media only screen and (max-width:375px)
            max-width: 210px
            font-size: 16px
          @media only screen and (max-width:320px)
            max-width: 150px
        .subtitle
          margin-top: 8px
          no-wrap()
          max-width: 200px
          @media only screen and (max-width:1024px)
            font-size: 18px
          @media only screen and (max-width:768px)
            font-size: 16px
          @media only screen and (max-width:414px)
            font-size: 14px
          @media only screen and (max-width:375px)
            font-size: 12px
          @media only screen and (max-width:320px)
            font-size: 10px
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
        .price
          margin-top: 15px
          color: #333
          font-size: $font-size-large
      .gap-wrapper
        position: absolute
        bottom: 0px
        left: 0px
        right: 0px
  .PriceAndPay
    position: absolute
    bottom: -44px
    left: 0
    right: 0
    height: 44px
    background: #eee
    padding: 0px 0px 0 10px
    z-index: 300
    .selected-all
      display: inline-block
      float: left
      height: 44px
      line-height: 44px
      .iconfont
        color: $color-text-o-d
        &.unCheack
          color: $color-text
    .totalPrice
      padding: 5px 10px
      display: inline-block
      float: right
      height: 44px
      font-size: 0px
      .msg1
        .countAll
          font-size: $font-size-medium
        .price
          color: $color-text-o-d
          font-size: $font-size-medium
      .msg2
        text-align: right
        margin-top: 5px
        font-size: $font-size-medium
    .GoTopay
      display: inline-block
      float: right
      height: 44px
      width: 20%
      background: $color-text-o-d
      line-height: 44px
      text-align: center
      color: #fff
</style>
