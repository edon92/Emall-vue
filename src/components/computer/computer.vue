<template lang="html">
  <scroll class="phone" :click="true">
    <div class="goods-wrapper">
      <div class="good"
       v-for="item in PcData"
       :key="item.id"
       @click="selectProduct(item.id)"
       >
        <div class="img-box">
          <img :src="'http://img.happymmall.com/' + item.mainImage" class="good-img">
        </div>
        <div class="good-msg">
          <div class="good-name">{{item.name}}</div>
          <div class="desc">{{item.subtitle}}</div>
          <div class="price">￥{{item.price}}</div>
        </div>
      </div>
    </div>
  </scroll>
</template>

<script>
import axios from 'axios'
import Scroll from 'base/scroll/scroll'
export default {
  components: {
    Scroll
  },
  data() {
    return {
      PcData: []
    }
  },
  methods: {
    _getPhoneData() {
      axios.get('/product/list.do?keyword=电脑').then((res) => {
        this.PcData = res.data.data.list
        console.log(res)
      })
    },
    selectProduct(id) {
      this.$router.push({
        path: `/detail/productId=${id}`
      })
    }
  },
  mounted() {
    this._getPhoneData()
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.phone
  position: absolute
  top: 40px
  left: 0px
  right: 0px
  bottom: 43px
  // width: 100%
  overflow: hidden
  .goods-wrapper
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
</style>
