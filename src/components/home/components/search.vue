<template lang="html">
  <div class="search-box">
    <div class="box">
      <div class="iconfont icon-chazhao"></div>
      <div class="input-box">
        <input
         type="text"
         placeholder="输入关键字搜索商品"
         class="input"
         @keyup.13="searchSth"
         ref="searchInput"
         >
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  name: 'Search',
  methods: {
    searchSth(e) {
      let keyword = this.$refs.searchInput.value
      this.setKeyword(keyword)
      this.$router.push({
        path: `/search/searchList=${keyword}`
      })
    },
    ...mapMutations({
      setKeyword: 'SET_KEYWORD'
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.search-box
  padding: 8px 8px
  .box
    display: flex
    padding: 2px 4px
    border: 1px solid #ccc
    .iconfont
      margin: 2px 4px
      display: inline-block
      color: $color-text-d
      background: $color-background
    .input-box
      flex: 1
      display: inline-block
      input::-webkit-input-placeholder
        color: #ccc
      .input
        width: 100%
        outline:none
        border: 0
</style>
