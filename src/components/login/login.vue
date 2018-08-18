<template lang="html">
  <transition>
    <div class="user-login">
      <div class="iconfont icon-houtui1" @click="back"></div>
      <div class="logo">E</div>
      <h1 class="msg1">Welcome Back,</h1>
      <h2 class="msg2">Sign in to continue</h2>
      <div class="login-content">
        <div class="user-name-box border-bottom">
          <input
          type="text"
          ame="textfield"
          style="border:0px"
          placeholder="请输入用户名"
          class="username"
          ref="username"
          >
        </div>
        <div class="user-password-box border-bottom">
          <input
          type="password"
          ame="textfield"
          style="border:0px"
          placeholder="请输入密码"
          class="password"
          ref="password"
          >
        </div>
        <div class="forget-password-box">Forget password</div>
        <div class="login-box" @click="doLogin">Login</div>
        <div class="signup-box">
          <span class="new-user">New user?</span>
          <span class="signup">Signup</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import swal from 'sweetalert'
import {validate, getAxios} from 'common/js/mm'
// import axios from 'axios'
export default {
  methods: {
    data() {
      return {
      }
    },
    back() {
      this.$router.back()
    },
    doLogin() {
      let inputUsername = this.$refs.username.value
      let inputPassword = this.$refs.password.value
      if (!validate(inputUsername, 'require') || !validate(inputPassword, 'require')) {
        this.tips('用户名或密码不能为空')
        return
      }
      getAxios({
        url: '/user/login.do',
        data: {
          username: inputUsername,
          password: inputPassword
        }
      }, (res) => {
        if (res.data.status === 1) {
          this.tips(res.data.msg)
          return
        }
        if (res.data.status === 0) {
          this.tips(res.data.msg, 'success')
          this.$router.push('/home')
        }
      })
      // axios({
      //   method: 'post',
      //   url: '/user/login.do',
      //   data: {
      //     username: inputUsername,
      //     password: inputPassword
      //   },
      //   transformRequest(obj) {
      //     var str = []
      //     for (let p in obj) {
      //       str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
      //     }
      //     return str.join('&')
      //   }
      // }).then((res) => {
      //   if (res.data.status === 1) {
      //     this.tips(res.data.msg)
      //     return
      //   }
      //   if (res.data.status === 0) {
      //     this.tips(res.data.msg, 'success')
      //     this.$router.push('/home')
      //   }
      // })
    },
    tips(msg, type) {
      type = type || 'error'
      /* eslint-disable */
      swal({
        icon: type,
        text: msg,
        timer: 1000
      }).then(
          function () {},
          // handling the promise rejection
          function (dismiss) {
            if (dismiss === 'timer') {
                console.log('I was closed by the timer')
            }
          }
      )
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.user-login
  position: absolute
  top: 0
  bottom: 0
  right: 0
  left: 0
  background: $color-background
  font-family: Microsoft YaHei
  z-index: 99
  &.v-enter-active, &.v-leave-active
    transition: all .4s
  &.v-enter, &.v-leave-to
    transform: translate3d(100%, 0, 0)
  .iconfont
    position: absolute
    top: 20px
    left: 15px
    color: $color-text-o-s
  .logo
    margin: 72px 277px 0 38px
    color: $color-text-o-s
    width: 77px
    height: 77px
    font-size: 77px
  .msg1
    margin-top: 19px
    margin-left: 29px
    font-size: 24px
    font-weight:  bold
    font-family: Microsoft YaHei
  .msg2
    margin-top: 19px
    margin-left: 29px
    font-family: Microsoft YaHei
    font-size: 14px
    font-weight: bold
    color: rgba(153,153,153,1)
  .login-content
    .user-name-box
      margin: 0 auto
      width: 80%
      &::before
        border-color: #555
      .username
        margin-top: 27px
        padding: 2px 7px
        width: 80%
        height: 36px
        background: $color-background
        border-bottom: 1px solid
    .user-password-box
      margin: 0 auto
      width: 80%
      &::before
        border-color: #555
      .password
        margin-top: 27px
        padding: 2px 7px
        width: 80%
        height: 36px
        background: $color-background
        border-bottom: 1px solid
    .forget-password-box
      margin-top: 10px
      margin-bottom: 23px
      padding-right: 27px
      font-size: 18px
      color: rgba(153,153,153,1)
      font-weight: bold
      line-height: 41px
      height: 41px
      text-align: right
    .login-box
      margin: 0 auto
      text-align: center
      width: 339px
      height: 62px
      line-height: 62px
      font-size: 21px
      color: #fff
      background: $color-text-o-d
    .signup-box
      margin-top: 31px
      text-align: center
      .new-user
        height: 56px
        line-height: 56px
        color: rgba(153,153,153,1)
        font-size: 18px
        font-weight: bold
      .signup
        height: 49px
        line-height: 49px
        color: $color-text-o-d
        font-size: 18px
        font-weight: bold
</style>
