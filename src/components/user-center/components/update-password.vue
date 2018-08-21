<template lang="html">
  <transition>
    <div class="user-information">
      <div class="header border-bottom">
        <div class="header-left" @click="back">
          <i class="iconfont icon-houtui"></i>
          <div class="msg">修改密码</div>
        </div>
      </div>
      <div class="information-content">
        <div class="text-line username border-bottom">
          <span class="text-label">原密码：</span>
          <input
           type="password"
           class="text-msg"
           placeholder="请输入原密码"
           style="background-color:#eee"
           ref="password1"
          >
        </div>
        <div class="text-line username border-bottom">
          <span class="text-label">新密码：</span>
          <input
           type="password"
           class="text-msg"
           placeholder="请输入新密码"
           style="background-color:#eee"
           ref="password2"
          >
        </div>
        <div class="text-line username border-bottom">
          <span class="text-label">确认密码：</span>
          <input
           type="password"
           class="text-msg inputSth"
           placeholder="请再次输入密码"
           style="background-color:#eee"
           ref="password3"
          >
        </div>
      </div>
      <div class="edit" @click.stop="submit">提交</div>
    </div>
  </transition>
</template>

<script>
import {getAxios, transformData, Salert, doLogout} from 'common/js/mm'
export default {
  data() {
    return {
    }
  },
  methods: {
    back() {
      this.$router.back()
    },
    submit() {
      let passwordOld = this.$refs.password1.value
      let passwordNew = this.$refs.password2.value
      let passwordNew2 = this.$refs.password3.value
      if (passwordNew !== passwordNew2) {
        Salert('两次密码不一样', 'error')
        return
      }
      if (passwordNew.length < 5) {
        Salert('密码不能小于5位数', 'error')
        return
      }
      let data = transformData({
        passwordOld: passwordOld,
        passwordNew: passwordNew
      })
      getAxios({
        url: `/user/reset_password.do?${data}`
      }, (res) => {
        console.log(res)
        if (res.data.status === 1) {
          Salert('旧密码输入错误', 'error')
          return
        }
        if (res.data.status === 0) {
          Salert('修改密码成功', 'success')
          doLogout()
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.user-information
  position: absolute
  top: 0px
  bottom: 0px
  left: 0px
  right: 0px
  background: #eee
  z-index: 200
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
      font-size: $font-size-medium-x
      line-height: 44px
      .iconfont
        font-size: $font-size-medium-x
      .msg
        margin-left: 50%
        transform: translate3d(-50%, 0, 0)
        display: inline-block
        font-weight: 300
  .information-content
    margin-top: 2px
    padding: 10px
    font-size: $font-size-large
    /* text-align: center */
    color: $color-text
    .avatar-content
      padding: 30px 10px 10px 20px
      font-size: 0px
      &::before
        border-color: #ccc
      .avatar
        display: inline-block
        img
          border-radius: 50%
      .username
        display: inline-block
        font-size: $font-size-medium-x
        margin-left: 30px
    .text-line
      height: 44px
      line-height: 44px
      font-size: $font-size-medium-x
      color: #999
      font-weight: 300
      input::-webkit-input-placeholder
        color: #ccc
        font-weight: 200
      &::before
        border-color: #ccc
      .text-label
      /* .inputSth
        color: $color-text */
      .text-msg
        /* font-weight: 200 */
  .edit
    margin: 0 auto
    width: 100px
    height: 30px
    background: $color-text-o-s
    border-radius: 10px
    text-align: center
    line-height: 30px
    color: #fff
</style>
