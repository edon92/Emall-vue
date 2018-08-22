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
          @keyup.13="doLogin"
          >
        </div>
        <router-link class="forget-password-box" tag="div" to="/pass-reset">Forget password</router-link>
        <div class="login-box" @click="doLogin">Login</div>
        <div class="signup-box">
          <span class="new-user">New user?</span>
          <router-link class="signup" tag="span" to="/register">Signup</router-link>
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
  },
  mounted() {
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.user-login
  position: relative
  top: 0rem
  right: 0rem
  bottom: 0rem
  left: 0rem
  height: 736px
  overflow: hidden
  background: $color-background
  font-family: Microsoft YaHei
  z-index: 99
  &.v-enter-active, &.v-leave-active
    transition: all .4s
  &.v-enter, &.v-leave-to
    transform: translate3d(100%, 0, 0)
  .iconfont
    position: absolute
    top: .4rem
    left: .3rem
    color: $color-text-o-s
  .logo
    margin: 1.44rem 5.44rem 0 .76rem
    color: $color-text-o-s
    width: 1.56rem
    height: 1.56rem
    font-size: 1.56rem
  .msg1
    margin-top: .38rem
    margin-left: .48rem
    font-size: .48rem
    font-weight:  bold
    font-family: Microsoft YaHei
  .msg2
    margin-top: .38rem
    margin-left: .58rem
    font-family: Microsoft YaHei
    font-size: .28rem
    font-weight: bold
    color: rgba(153,153,153,1)
  .login-content
    .user-name-box
      margin: 0 auto
      width: 80%
      &::before
        border-color: #555
      .username
        margin-top: .54rem
        padding: .04rem .14rem
        width: 80%
        height: .72rem
        background: $color-background
        border-bottom: .02rem solid
    .user-password-box
      margin: 0 auto
      width: 80%
      &::before
        border-color: #555
      .password
        margin-top: .54rem
        padding: 2px 7px
        width: 80%
        height: 36px
        background: $color-background
        border-bottom: .02rem solid
    .forget-password-box
      margin-top: 10px
      margin-bottom: .46rem
      padding-right: .54rem
      font-size: .36rem
      color: rgba(153,153,153,1)
      font-weight: bold
      line-height: .82rem
      height: .82rem
      text-align: right
    .login-box
      margin: 0 auto
      text-align: center
      width: 6.78rem
      height: 1.24rem
      line-height: 1.24rem
      font-size: .42rem
      color: #fff
      background: $color-text-o-d
    .signup-box
      margin-top: .62rem
      text-align: center
      .new-user
        height: 1.02rem
        line-height: 1.02rem
        color: rgba(153,153,153,1)
        font-size: .36rem
        font-weight: bold
      .signup
        height: .98rem
        line-height: .98rem
        color: $color-text-o-d
        font-size: .36rem
        font-weight: bold
</style>
