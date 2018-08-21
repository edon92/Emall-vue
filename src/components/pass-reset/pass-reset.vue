<template lang="html">
  <transition>
    <div class="user-register">
      <div class="iconfont icon-houtui1" @click="back"></div>
      <h1 class="msg1">重置密码</h1>
      <div class="login-content">
        <div class="user-name-box border-bottom" v-show="this.stage === 1">
          <input
          type="text"
          ame="textfield"
          style="border:0px"
          placeholder="输入用户名"
          class="username"
          ref="username"
          >
        </div>
        <div class="user-password-box border-bottom" v-show="this.stage === 2">
          <div class="question">密码提示：{{question}}</div>
          <input
          type="text"
          ame="textfield"
          style="border:0px"
          placeholder="输入密码提示答案"
          class="password"
          ref="answer"
          >
        </div>
        <div class="user-password-box border-bottom" v-show="this.stage === 3">
          <div class="question">请输入新密码</div>
          <input
          type="password"
          ame="textfield"
          style="border:0px"
          placeholder="请输入新密码"
          class="password"
          ref="password"
          >
        </div>
        <div class="forget-password-box"> </div>
        <div class="login-box" @click="nextStep">下一步</div>
      </div>
    </div>
  </transition>
</template>

<script>
// eslint-disable-next-line
import {validate, getAxios, Salert,transformData} from 'common/js/mm'
// import axios from 'axios'
export default {
  data() {
    return {
      stage: 1,
      question: '',
      forgetToken: ''
    }
  },
  methods: {
    back() {
      this.$router.back()
    },
    stepOne(username) {
      getAxios({
        url: `user/forget_get_question.do?username=${username}`
      }, (res) => {
        if (res.data.status === 1) {
          Salert(res.data.msg, 'error')
        } else {
          this.question = res.data.data
          this.stage = 2
        }
      })
    },
    stepTwo(username, question, answer) {
      getAxios({
        url: `/user/forget_check_answer.do?username=${username}&question=${question}&answer=${answer}`
      }, (res) => {
        if (res.data.status === 0) {
          this.stage = 3
          this.forgetToken = res.data.data
        } else {
          Salert(res.data.msg, 'error')
        }
      })
    },
    stepThree(username, passwordNew, forgetToken) {
      getAxios({
        url: `/user/forget_reset_password.do?username=${username}&passwordNew=${passwordNew}&forgetToken=${forgetToken}`
      }, (res) => {
        if (res.data.status === 0) {
          Salert(res.data.msg, 'success')
          setTimeout(() => {
            window.location.href = '/home'
          }, 500)
        } else {
          Salert(res.data.msg, 'error')
        }
      })
    },
    nextStep() {
      if (this.stage === 1) {
        this.username = this.$refs.username.value
        if (!validate(this.username, 'require')) {
          Salert('用户名不能为空', 'error')
          return
        }
        this.stepOne(this.username)
        return
      }
      if (this.stage === 2) {
        this.answer = this.$refs.answer.value
        this.state += 1
        if (!validate(this.answer, 'require')) {
          Salert('密码提示答案不能为空', 'error')
          return
        }
        this.stepTwo(this.username, this.question, this.answer)
        return
      }
      if (this.stage === 3) {
        console.log(3)
        this.passwordNew = this.$refs.password.value
        if (!validate(this.passwordNew, 'require')) {
          Salert('密码不能为空', 'error')
          return
        }
        if (this.passwordNew.length < 5) {
          Salert('密码不能小于5位数', 'error')
          return
        }
        this.stepThree(this.username, this.passwordNew, this.forgetToken)
      }
    }
  },
  activated() {
    this.stage = 1
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
    margin-bottom: 30px
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
      .question
        text-align: center
        color: $color-text-l
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
      height: 44px
      line-height: 44px
      font-size: 18px
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
        height: 30px
        line-height: 30px
        color: $color-text-o-d
        font-size: 18px
        font-weight: bold
</style>
