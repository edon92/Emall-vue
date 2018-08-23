<template lang="html">
  <transition>
    <div class="user-information">
      <div class="header border-bottom">
        <div class="header-left" @click="back">
          <i class="iconfont icon-houtui"></i>
          <div class="msg">我的信息</div>
        </div>
      </div>
      <div class="information-content">
        <div class="avatar-content border-bottom">
          <div class="avatar">
            <img src="../../../common/image/avatar.png" width="80" height="80">
          </div>
          <div class="username">{{name}}</div>
        </div>
        <div class="text-line username border-bottom">
          <span class="text-label">用户名：</span>
          <span class="text-msg" ref="username">{{userInformation.username}}</span>

        </div>
        <div class="text-line username border-bottom">
          <span class="text-label">手机：</span>
          <span class="text-msg" ref="phone" v-show="!IsEdit">{{userInformation.phone}}</span>
          <input
           type="text inputSth"
           class="text-msg"
           placeholder="输入要更改的手机"
           style="background-color:#eee"
           v-show="IsEdit"
           ref="inputPhone"
          >
        </div>
        <div class="text-line username border-bottom">
          <span class="text-label">邮箱：</span>
          <span class="text-msg" v-show="!IsEdit" ref="email">{{userInformation.email}}</span>
          <input
           type="text inputSth"
           class="text-msg"
           placeholder="输入要更改的邮箱"
           style="background-color:#eee"
           v-show="IsEdit"
           ref="inputEmail"
          >
        </div>
        <div class="text-line username border-bottom">
          <span class="text-label">提示：</span>
          <span class="text-msg" v-show="!IsEdit" ref="question">{{userInformation.question}}</span>
          <input
           type="text inputSth"
           class="text-msg"
           placeholder="输入要更改的提示"
           style="background-color:#eee"
           v-show="IsEdit"
           ref="inputQuestion"
          >
        </div>
        <div class="text-line username border-bottom">
          <span class="text-label">答案：</span>
          <span class="text-msg" v-show="!IsEdit" ref="answer">{{userInformation.answer}}</span>
          <input
           type="text inputSth"
           class="text-msg"
           placeholder="输入要更改的密码"
           style="background-color:#eee"
           v-show="IsEdit"
           ref="inputAnswer"
          >
        </div>
      </div>
      <div class="edit" @click.stop="edit" v-show="!IsEdit">编辑</div>
      <div class="edit" @click.stop="submit" v-show="IsEdit">提交</div>
    </div>
  </transition>
</template>

<script>
import {getAxios, transformData, Salert} from 'common/js/mm'
export default {
  data() {
    return {
      userInformation: {},
      name: '摆渡人',
      IsEdit: false
    }
  },
  methods: {
    _getUserInformation() {
      getAxios({
        url: '/user/get_information.do'
      }, (res) => {
        this.userInformation = res.data.data
        this.showInformation = true
      })
    },
    back() {
      this.$router.back()
    },
    edit() {
      this.IsEdit = true
    },
    submit() {
      let email = this.$refs.inputEmail.value
      let phone = this.$refs.inputPhone.value
      let question = this.$refs.inputQuestion.value
      let answer = this.$refs.inputAnswer.value
      // 如果什么都不输入，则return
      if (!email && !phone && !question && !question && !answer) {
        this.IsEdit = false
        return
      }
      let data = transformData({
        phone: phone,
        email: email,
        question: question,
        answer: answer
      })
      getAxios({
        url: `/user/update_information.do?${data}`
      }, (res) => {
        this._getUserInformation()
        Salert('修改信息成功', 'success')
        this.IsEdit = false
      })
    }
  },
  created() {
    this.showInformation = false
    this.username = ''
    this.password = ''
    this.email = ''
    this.phone = ''
    this.question = ''
    this.answer = ''
  },
  mounted() {
    this._getUserInformation()
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
      .inputSth
        color: $color-text
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
