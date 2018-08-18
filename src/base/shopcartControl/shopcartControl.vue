<template lang="html">
  <div class="count">
    <div class="countBtn">
      <i class="iconfont icon-jian btn" @click="decreaseCount()"></i>
      <input
       type="text"
       class="num"
       :value="count"
       ref="goodCount"
      >
      <i class="iconfont icon-jia btn" @click="increaseCount()"></i>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line
import {getAxios, transformData} from 'common/js/mm'
export default {
  props: {
    good: {
      type: Object,
      default: () => {}
    },
    quantity: {
      type: Number,
      default: -1
    },
    productId: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      count: this.quantity || 0
    }
  },
  methods: {
    decreaseCount() {
      console.log(this.count - 1)
      let count = this.quantity
      let data = transformData({
        productId: this.productId,
        count: count - 1
      })
      getAxios({
        url: `/cart/update.do?${data}`,
        data: data
      }, (res) => {
        if (this.count > 0) {
          this.count -= 1
        }
      })
    },
    increaseCount() {
      console.log('。')
      let count = this.quantity
      let data = transformData({
        productId: this.productId,
        count: count + 1
      })
      getAxios({
        url: `/cart/update.do?${data}`,
        data: data
      }, (res) => {
        this.count += 1
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.count
  position: absolute
  top: 43px
  right: 10px
  padding: 10px 10px
  z-index: 300
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
      font-size: 14px !important
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
</style>
