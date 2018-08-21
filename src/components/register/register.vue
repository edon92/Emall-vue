<template lang="html">
  <transition>
    <div class="user-register">
      <div class="iconfont icon-houtui1" @click="back"></div>
      <h1 class="msg1">用户注册</h1>
      <!-- <h2 class="msg2">Sign in to continue</h2> -->
      <div class="login-content">
        <div class="user-name-box border-bottom">
          <input
          type="text"
          ame="textfield"
          style="border:0px"
          placeholder="输入用户名"
          class="username"
          ref="username"
          @blur="checkUsername"
          >
        </div>
        <div class="user-password-box border-bottom">
          <input
          type="password"
          ame="textfield"
          style="border:0px"
          placeholder="输入密码"
          class="password"
          ref="password"
          >
        </div>
        <div class="user-password-box border-bottom">
          <input
          type="password"
          ame="textfield"
          style="border:0px"
          placeholder="再次输入密码"
          class="password"
          ref="passwordRepeat"
          >
        </div>
        <div class="user-password-box border-bottom">
          <input
          type="text"
          ame="textfield"
          style="border:0px"
          placeholder="输入电话"
          class="password"
          ref="phone"
          >
        </div>
        <div class="user-password-box border-bottom">
          <input
          type="text"
          ame="textfield"
          style="border:0px"
          placeholder="输入邮箱"
          class="password"
          ref="email"
          >
        </div>
        <div class="user-password-box border-bottom">
          <input
          type="text"
          ame="textfield"
          style="border:0px"
          placeholder="输入密码提示"
          class="password"
          ref="question"
          >
        </div>
        <div class="user-password-box border-bottom">
          <input
          type="text"
          ame="textfield"
          style="border:0px"
          placeholder="输入密码提示答案"
          class="password"
          ref="answer"
          @keyup.13="register"
          >
        </div>
        <div class="forget-password-box" @click="back">已有账号，去登录>></div>
        <div class="login-box" @click="register">注册</div>
      </div>
    </div>
  </transition>
</template>

<script>
// eslint-disable-next-line
import {validate, getAxios, Salert,transformData} from 'common/js/mm'
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
    checkUsername() {
      this.username = this.$refs.username.value
      // 如果为空，什么也不做
      if (!validate(this.username, 'require')) {
        return
      }
      let data = transformData({
        str: this.username,
        type: 'username'
      })
      // 检查用户名
      getAxios({
        url: `/user/check_valid.do?${data}`,
        data: data
      }, (res) => {
        if (res.data.status === 1) {
          Salert('用户已存在', 'error')
        }
      })
    },
    register() {
      this.username = this.$refs.username.value
      this.password = this.$refs.password.value
      this.passwordRepeat = this.$refs.passwordRepeat.value
      this.email = this.$refs.email.value
      this.phone = this.$refs.phone.value
      this.question = this.$refs.question.value
      this.answer = this.$refs.answer.value
      let data = transformData({
        username: this.username,
        password: this.password,
        email: this.email,
        phone: this.phone,
        question: this.question,
        answer: this.answer
      })
      if (!validate(this.username, 'require')) {
        Salert('用户名不能为空', 'error')
        return
      }
      if (!validate(this.password, 'require')) {
        Salert('密码不能为空', 'error')
        return
      }
      if (!validate(this.passwordRepeat, 'require')) {
        Salert('两次输入的密码不能为空', 'error')
        return
      }
      if (this.password !== this.passwordRepeat) {
        Salert('两次输入的密码不一样', 'error')
        return
      }
      if (!validate(this.phone, 'require')) {
        Salert('手机号不能为空', 'error')
        return
      }
      if (!validate(this.phone, 'phone')) {
        Salert('不是正确的手机号码', 'error')
        return
      }
      if (!validate(this.email, 'require')) {
        Salert('邮箱不能为空', 'error')
        return
      }
      if (!validate(this.email, 'email')) {
        Salert('不是正确的邮箱号', 'error')
        return
      }
      if (!validate(this.question, 'require')) {
        Salert('密码提示不能为空', 'error')
        return
      }
      if (!validate(this.answer, 'require')) {
        Salert('密码提示答案不能为空', 'error')
        return
      }
      getAxios({
        url: `/user/register.do?${data}`
      }, (res) => {
        if (res.data.status === 1) {
          Salert(res.data.msg, 'error')
          return
        }
        Salert('注册成功！', 'success')
        this.$router.back()
      })
    }
  },
  created() {
    this.username = ''
    this.password = ''
    this.passwordRepeat = ''
    this.phone = ''
    this.email = ''
    this.question = ''
    this.answer = ''
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.user-register
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
  .msg1
    text-align: center
    margin-top: 15%
    margin-left: 29px
    font-size: 22px
    font-weight:  400
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
      font-size: 14px
      color: rgba(153,153,153,1)
      /* font-weight: bold */
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
