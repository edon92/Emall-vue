<template lang="html">
  <div class="spacial">
    <div class="banner-wrapper">
      <img src="https://img13.360buyimg.com/da/jfs/t22393/79/1504022080/133824/a5cec886/5b66fccbN7a3ae71a.jpg!q90.jpg" class="banner-image">
    </div>
    <div class="goods-wrapper">
      <router-link class="good"
       v-for="item in spacialList"
       :key="item.id"
       tag="div"
       :to="'/detail/productId=' + item.id"
       >
        <div class="good-img-box">
          <img :src="'http://img.happymmall.com/' + item.mainImage" class="good-img">
        </div>
        <div class="good-msg-box">
          <div class="good-name">{{item.name}}</div>
          <div class="desc">{{item.subtitle}}</div>
          <div class="price">￥{{item.price}}</div>
        </div>
      </router-link>
    </div>
    <div class="loading-wrapper" >
      <loading v-show="!this.spacialList.length"></loading>
    </div>
  </div>
</template>

<script>
import Loading from 'base/loading/loading'
export default {
  props: {
    spacialList: {
      type: Array,
      dafault: () => []
    }
  },
  components: {
    Loading
  },
  methods: {
    selectProduct(id) {
      this.$router.push({
        path: `/detail/productId=${id}`
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.spacial
  padding: 10px 0px
  background: $color-background
  .banner-wrapper
    margin: auto
    width: 95%
    height: 0
    padding-bottom: 43%
    .banner-image
      width: 100%
  .goods-wrapper
    margin: auto
    width: 95%
    font-size: 0
    .good
      margin-top: 3px
      display: inline-block
      width: 33%
      margin-right: 1px
      .good-img-box
        padding-top: 6%
        box-sizing: border-box
        border: 1px solid #eee
        background: #fff
        width: 100%
        height:0
        padding-bottom: 100%
        text-align:center
        .good-img
          margin: auto
          width: 90%
      .good-msg-box
        margin-top: 5px
        padding-left: 10px
        .good-name
          color: $color-text-l
          font-size: $font-size-small
          no-wrap()
        .desc
          box-sizing: border-box
          margin-top: 5px
          padding: 0px 2px 0px 4px
          color: $color-text-d
          font-size: $font-size-small-s
          no-wrap()
        .price
          margin-top: 5px
          color: $color-text-o-d
          font-size: $font-size-medium
          no-wrap()
</style>
