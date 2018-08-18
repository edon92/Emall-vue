<template lang="html">
  <div>
    <div class="well-chosen">
      <div class="title">品牌精选</div>
      <div class="loading-wrapper" >
        <loading v-show="!this.chosenList.length"></loading>
      </div>
      <div class="goods-wrapper">
        <router-link
         class="good"
         v-for="item in chosenList"
         tag="div"
         :to="'detail/productId=' + item.id"
         :key="item.id">
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
  </div>
    <div class="more-goods border-top">
      查看更多
      <i class="iconfont icon-qianjin"></i>
    </div>
  </div>
</template>

<script>
import Loading from 'base/loading/loading'
export default {
  props: {
    chosenList: {
      type: Array,
      default: () => []
    }
  },
  components: {
    Loading
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.well-chosen
  padding: 10px 0px
  background: $color-background
  .title
    margin: 0 4px
    padding-left: 4px
    height: $font-size-large
    line-height: $font-size-large
    border-left: 2px solid rgb(2,176,233)
    color: $color-text-l
  .goods-wrapper
    margin: 10px auto 0px auto
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
.more-goods
  padding: 10px 0px
  // margin-top: 10px
  text-align: center
  color: $color-text-l
  font-size: $font-size-medium
  background: $color-background
</style>
