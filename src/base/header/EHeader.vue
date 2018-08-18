<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/home">
      <span class="tab-link">首页</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/phone">
      <span class="tab-link">手机</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/computer">
      <span class="tab-link">电脑</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/digital">
      <span class="tab-link">小米</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/eletrical">
      <span class="tab-link">小家电</span>
    </router-link>
  </div>
</template>

<script>
export default {
  mounted() {
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.tab
  display: flex
  height: 44px
  line-height: 44px
  font-size: $font-size-medium
  background: $color-background
  .tab-item
    flex: 1
    text-align: center
    .tab-link
      padding-bottom: 5px
      color: $color-text-l
    &.router-link-active
      .tab-link
        color: #fbaf5e
        border-bottom: 2px solid $color-theme
</style>
