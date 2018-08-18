<template lang="html">
  <div class="order-list">
    <div class="header border-bottom">
      <span class="title">商城</span>
      <span class="edit">编辑</span>
    </div>
    <div class="order-content">
      <div class="goods-wrapper">
        <!-- <div
         class="good border-bottom"
         v-for="(item, index) in orderList"
         :key="index"
         @click="selectItem(item.id)"
         >
          <div class="img">
            <img :src="'http://img.happymmall.com/' + item.mainImage" width="85" height="85">
          </div>
          <div class="msg">
            <div class="name" ref="goodName">{{item.name}}</div>
            <div class="subtitle">{{item.subtitle}}</div>
            <div class="price">￥{{item.price}}</div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
  .header
    height: 43px
    font-size: $font-size-medium-x
    line-height: 43px
    .title
      color: #444
    .edit
      float: right
      color: rgb(56,161,216)

</style>
