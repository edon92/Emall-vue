<template lang="html">
  <div class="footer">
    <h2 class="logo">好东西，有道理</h2>
    <div class="msg">
      <div class="text-one">
        <span class="text-title">客服电话</span>
        <span class="text">13924844793 (工作日8:00-20:00)</span>
      </div>
      <div class="text-two">
        <span class="text-title">客服邮箱</span>
        <span class="text">540324745@qq.com</span>
      </div>
      <div class="text-three">
        <span class="text">联系在线客服 9:00-24:00</span>
      </div>
    </div>
    <div class="line-box border-bottom"></div>
    <!-- <div class="commpany-msg">
      <div class="text">公司名称： 得到文化转播有限公司北京分公司</div>
      <div class="text">组织机构代码： 9911011238838077AHBK</div>
      <div class="text">地址： 广东省茂名市你猜路6号[3-3]8幢6层</div>
      <div class="text">电话： 0668-2135625</div>
    </div> -->
  </div>
</template>

<script>
export default {
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.footer
  padding: 30px 0px
  text-align: center
  width: 100%
  background: #eee
  .logo
    color: $color-text-o-d
    font-size: 22px
  .msg
    margin-top: 15px
    font-size: $font-size-medium
    color: $color-text-l
    .text-one
      .text-title
        color: $color-text-l
    .text-two
      margin-top: 8px
      .text-title
        color: $color-text-l
    .text-three
      padding: 4px
      margin: 8px auto 0px auto
      display: block
      width: 200px
      border-radius: 10px
      background: #fff
  .line-box
    display: inline-block
    width: 200px
    margin-top: 30px
    &:before
      border-color: #ccc
  .commpany-msg
    margin-top: 20px
    font-size: $font-size-small-s
    color: $color-text-l
    .text
      margin-bottom: 5px

</style>
