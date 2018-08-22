<template lang="html">
  <div>
    <div class="recomend-wrapper">
      <div class="title">推荐</div>
      <div class="loading-wrapper" v-show="!this.recommendList.length">
        <loading></loading>
      </div>
      <div class="goods-wrapper">
        <div class="good"
         v-for="item in recommendList"
         :key="item.id"
         @click="selectProduct(item.id)"
         >
          <div class="img-box">
            <img v-lazy="'http://img.happymmall.com/' + item.mainImage" class="good-img">
          </div>
          <div class="good-msg">
            <div class="good-name">{{item.name}}</div>
            <div class="desc">{{item.subtitle}}</div>
            <div class="price">￥{{item.price}}</div>
          </div>
        </div>
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
    recommendList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      url: []
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
  },
  computed: {
  },
  mounted() {
    this.$nextTick(() => {
      console.log('recomend', this.recommendList)
    })
  },
  watch: {
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.recomend-wrapper
  padding: 8px 8px 0px 8px
  .title
    padding: 0 4px
    height: $font-size-large
    line-height: $font-size-large
    border-left: 2px solid #e62e6f
    color: $color-text-l
  .goods-wrapper
    margin-top: 10px
    overflow: hiddden
    font-size: 0
    .good
      position: relative
      display: inline-block
      vertical-align: top
      margin-top: 10px
      margin-left: 5px
      width: 48%
      .img-box
        padding-top: 6%
        box-sizing: border-box
        border: 1px solid #eee
        width: 100%
        height:0
        padding-bottom: 100%
        text-align:center
        .good-img
          width: 90%
      .good-msg
        margin-top: 5px
        padding-left: 10px
        .good-name
          color: $color-text-l
          font-size: $font-size-medium
          no-wrap()
        .desc
          box-sizing: border-box
          margin-top: 5px
          padding: 0px 2px 0px 4px
          color: $color-text-d
          font-size: 15px
          // text-indent: 4px
          no-wrap()
        .price
          // position: absolute
          // bottom: 10px
          margin-top: 5px
          color: $color-text-o-d
          font-size: $font-size-medium-x
.more-goods
  padding: 10px 0px
  margin-top: 10px
  text-align: center
  color: $color-text-l
  font-size: $font-size-medium
  background: $color-background
</style>
