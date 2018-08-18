<template lang="html">
  <transition>
    <div class="user-center">
      <div class="header border-bottom">
        <div class="header-left">我的订单</div>
        <div class="header-right">
          全部
          <i class="iconfont icon-qianjin"></i>
        </div>
      </div>
      <div class="center-icon">
        <div class="outer toPay-content">
          <div class="icon-box">
            <i class="iconfont icon-icon-test"></i>
          </div>
          <div class="msg-box">待付款</div>
        </div>
        <div class="outer toPay-content">
          <div class="icon-box">
            <i class="iconfont icon-icon-test"></i>
          </div>
          <div class="msg-box">完成订单</div>
        </div>
        <div class="outer toPay-content">
          <div class="icon-box">
            <i class="iconfont icon-gerenxinxi"></i>
          </div>
          <div class="msg-box">个人信息</div>
        </div>
        <div class="outer toPay-content">
          <div class="icon-box">
            <i class="iconfont icon-xiaofeiweiquan"></i>
          </div>
          <div class="msg-box">消费维权</div>
        </div>
      </div>
      <gap></gap>
      <div class="contact-customer">
        <div class="left">联系客服</div>
        <div class="right iconfont icon-qianjin"></div>
      </div>
      <gap></gap>
      <div class="settings" @click="toggleSettings">
        <div class="left">设置</div>
        <div class="right iconfont icon-qianjin"></div>
      </div>
      <transition>
        <div class="setting-msg" v-show="showSettings">
          <div class="item updatePassword">修改密码</div>
          <div class="item loginOut" @click="doLogout">退出登录</div>
        </div>
      </transition>
      <transition>
        <div class="filter-mask" v-show="showSettings" @click="toggleSettings"></div>
      </transition>
    </div>
  </transition>
</template>

<script>
import Gap from 'base/gap/gap'
import {getAxios, Salert} from 'common/js/mm'
export default {
  data() {
    return {
      showSettings: false
    }
  },
  methods: {
    toggleSettings() {
      this.showSettings = !this.showSettings
    },
    doLogout() {
      getAxios({
        url: '/user/logout.do'
      }, (res) => {
        if (res.data.status === 0) {
          Salert('成功登出', 'success')
          this.showSettings = !this.showSettings
          this.$router.push({
            path: '/home'
          })
        }
      })
    },
    mounted() {
    }
  },
  components: {
    Gap
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.user-center
  position: absolute
  top: 0px
  bottom: 0px
  left: 0px
  right: 0px
  background: #eee
  &.v-enter-active, &.v-leave-active
    transition: all .4s
  &.v-enter, &.v-leave-to
    transform: translate3d(100%, 0, 0)
  .header
    padding: 0px 10px
    height: 44px
    font-size: 0px
    background: $color-background
    font-weight: 350
    color: $color-text
    &::before
      border-color: #ccc
    .header-left
      display: inline-block
      font-size: $font-size-medium-x
      line-height: 44px
    .header-right
      display: inline-block
      font-size: $font-size-medium-x
      line-height: 44px
      float: right
      color: $color-text
  .center-icon
    display: flex
    flex-direction: row
    width: 100%
    height: 88px
    background: $color-background
    /* background: pink */
    .outer
      flex: 1
      padding: 15px 10px
      box-sizing: border-box
      width: 25
      text-align: center
      /* background: green */
      .icon-box
        margin: 0 auto
        height: 35px
        width: 35px
        background: #eee
        line-height: 35px
        border-radius: 50%
        .iconfont
          font-size: $font-size-large-x
      .msg-box
        height: 30px
        line-height: 30px
        color: $color-text
        font-weight: 300
        /* background: yellow */
  .contact-customer
    padding: 0px 10px
    height: 44px
    line-height: 44px
    font-size: 0px
    color: #777
    font-weight: 300
    background: $color-background
    .left
      display: inline-block
      font-size: $font-size-medium-x
    .right
      display: inline-block
      float: right
      font-size: $font-size-medium-x
  .settings
    padding: 0px 10px
    height: 44px
    line-height: 44px
    font-size: 0px
    color: #777
    font-weight: 300
    background: $color-background
    .left
      display: inline-block
      font-size: $font-size-medium-x
    .right
      display: inline-block
      float: right
      font-size: $font-size-medium-x
  .setting-msg
    position: absolute
    bottom: 0px
    width: 100%
    background: $color-background
    z-index: 300
    background: #fff
    &.v-enter-active, &.v-leave-active
      transition: all .4s
    &.v-enter, &.v-leave-to
      transform: translate3d(0, 100%, 0)
    .item
      height: 44px
      line-height: 44px
      color: #666
      text-align: center
  .filter-mask
    position: fixed
    top: 0
    right: 0
    left: 0
    bottom: 0
    z-index: 50
    background: rgba(7,17,27,.6)
    backdrop-filter: blur(10px)
    overflow: hidden
    &.v-enter-active, &.v-leave-active
      transition: all .4s
    &.v-leave-to, &.v-enter
      opacity: 0
</style>
