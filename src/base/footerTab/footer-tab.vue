<template lang="html">
  <div class="footer-tab">
    <router-link class="item home" tag="div" to="/home">
      <div class="iconfont icon-home"></div>
      <span class="text">商城</span>
    </router-link>
    <router-link class="item sort" tag="div" to="/category">
      <div class="iconfont icon-fenlei"></div>
      <span class="text">分类</span>
    </router-link>
    <div class="item shopcart"  @click="goOrderList">
      <div class="iconfont icon-gouwuche"></div>
      <span class="text">购物车</span>
    </div>
    <div class="item uesr-center" @click="goUserCenter">
      <div class="iconfont icon-wode"></div>
      <span class="text">我的</span>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import {doLogin, getAxios} from 'common/js/mm'
export default {
  name: 'FooterTab',
  methods: {
    goOrderList() {
      this.getAjax('/user/get_information.do', '/shopcart-list-big')
    },
    goUserCenter() {
      this.getAjax('/user/get_information.do', '/user-center')
    },
    getAjax(url, to) {
      getAxios({
        url: url
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
    goOrderCenter() {
      this.getAjax('/user/get_information.do')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.footer-tab
  position: absolute
  display: flex
  left: 0
  right: 0
  bottom: 0
  height: 43px
  z-index: 2
  background: #f8f8f8
  padding: 4px 0px
  box-sizing: border-box
  z-index: 30
  .item
    width: 25%
    text-align: center
    .iconfont
      font-size: $font-size-large-x
      color: $color-text-l
    .text
      font-size: $font-size-small
      color: $color-text-ll
</style>
