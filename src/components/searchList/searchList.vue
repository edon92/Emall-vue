<template lang="html">
  <div class="search-list">
    <div class="search-wrapper">
      <div class="box">
        <div class="iconfont icon-chazhao"></div>
        <input
        type="text"
        placeholder="输入关键字搜索商品"
        class="input"
        ref="searchInput"
        :value="keyword"
        @keyup.13="submitSearch"
        >
      </div>
    </div>
    <div class="hasNotiong" v-show="!this.searchList.length">没有此类商品，请搜索其他</div>
    <scroll class="search" :click="true">
      <div class="goods-wrapper">
        <div
         class="good border-bottom"
         v-for="(item, index) in searchList"
         :key="index"
         @click="selectItem(item.id)"
         >
          <div class="img">
            <img v-lazy="'http://img.happymmall.com/' + item.mainImage" width="85" height="85">
          </div>
          <div class="msg">
            <div class="name" ref="goodName">{{item.name}}</div>
            <div class="subtitle">{{item.subtitle}}</div>
            <div class="price">￥{{item.price}}</div>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Search from 'components/home/components/search'
import axios from 'axios'
import Scroll from 'base/scroll/scroll'
import {mapGetters, mapMutations} from 'vuex'
export default {
  components: {
    Search,
    Scroll
  },
  data() {
    return {
      searchWord: '',
      searchList: []
    }
  },
  methods: {
    submitSearch(e) {
      let word = this.$refs.searchInput.value
      if (word === '') {
        return
      }
      this.setKeyword(word)
      this.$router.push({
        path: `/search/searchList=${word}`
      })
    },
    ...mapMutations({
      setKeyword: 'SET_KEYWORD'
    }),
    _getSearchList(word) {
      axios.get(`/product/list.do?keyword=${word}`).then((res) => {
        this.searchList = res.data.data.list
        console.log(this.searchList)
      })
    },
    selectItem(id) {
      this.$router.push({
        path: `/detail/productId=${id}`
      })
    }
  },
  computed: {
    ...mapGetters([
      'keyword'
    ])
  },
  activated() {
    console.log('act', this.keyword)
    this._getSearchList(this.keyword)
  },
  watch: {
    keyword() {
      console.log('change')
      this._getSearchList(this.keyword)
    }
  }

}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.search-list
  position: absolute
  top: 0px
  left: 0px
  right: 0px
  bottom: 44px
  z-index: 400
  background: $color-background
  overflow: hidden
  .hasNotiong
    margin-top: 15%
    text-align: center
    color: $color-text-o-d
    font-size: $font-size-large
  .search-wrapper
    background: #eee
    padding: 4px 4px 4px 18px
    width: 100%
    height: 30px
    .box
      position: relative
      top: 2.5px
      background: #f9f9f9
      height: 24px
      width: 90%
      border-radius: 1px
      .iconfont
        position: relative
        top: 2px
        display: inline-block
        vertical-align: center
        color: #ccc
      .input
        display: inline-block
        vertical-align: center
        width: 94%
        @media only screen and (min-width:320px)
          width: 92%
        @media only screen and (min-width:375px)
          width: 94%
  .search
    position: absolute
    top: 38px
    left: 0px
    right: 0px
    bottom: 0
    overflow: hidden
    .goods-wrapper
      padding: 2px 10px
      .good
        margin-top: 10px
        padding: 5px 2px
        font-size: 0px
        display: flex
        .img
          flex: 0 0 85px
          margin-top: 10px
          width: 85px
          display: inline-block
        .msg
          flex: 1
          padding: 10px 0px 2px 10px
          display: inline-block
          font-size: $font-size-medium
          .name
            no-wrap()
            max-width: 290px
            color: $color-text
          .subtitle
            margin-top: 16px
            color: $color-text-l
          .price
            margin-top: 16px
            color: $color-text-o-s

</style>
