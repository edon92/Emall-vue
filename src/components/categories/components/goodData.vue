<template lang="html">
  <scroll class="good-detail" :click="true">
    <div>
      <div class="no-data" v-show="!this.keywordData.length">空空如也，请查看其它品类 :)</div>
      <div class="good-wrapper">
        <div class="good border" v-for="item in keywordData" @click="selectProduct(item.id)" :key="item.id">
          <div class="img-box">
            <img :src="'http://img.happymmall.com/' + item.mainImage" class="img" width="158" height="184">
          </div>
          <div class="msg-box">
            <div class="name">{{item.name}}</div>
            <div class="price">￥{{item.price}}</div>
            <div class="iconfont icon-gouwuche cart"></div>
          </div>
        </div>
      </div>
    </div>
  </scroll>
</template>
<script>
import {
  mapGetters
} from 'vuex'
import axios from 'axios'
import Scroll from 'base/scroll/scroll'
export default {
  components: {
    Scroll
  },
  data() {
    return {
      keywordData: []
    }
  },
  methods: {
    _getKeyProduct() {
      axios.get(`/product/list.do?keyword=${this.keyword}`).then((res) => {
        this.keywordData = res.data.data.list
      })
    },
    selectProduct(id) {
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
  mounted() {
    this._getKeyProduct()
  },
  watch: {
    keyword() {
      this._getKeyProduct()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.good-detail
  position: absolute
  top: 50px
  bottom: 0px
  background: #fff
  z-index: 20
  .no-data
    padding: 10px
    color: $color-text-o-d
    font-size: $font-size-large
  .good-wrapper
    display: flex
    flex-wrap: wrap
    justify-content: space-between
    font-size:0
    overflow: hidden
    .good
      position: relative
      /* background: #eee */
      flex: 0 1 auto
      width: 49%
      padding-bottom: 75%
      font-size: $font-size-small
      margin-top: 5px
      overflow: hidden
      height: 0
      .img-box
        width: 100%
        padding-bottom: 116%
        height: 0
        overflow: hidden
        .img
          width: 100%
      .msg-box
        padding-left: 6px
        .name
          margin-top: 10px
          color: $color-text
          max-width: 150px
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
        .price
          position: absolute
          left: 6px
          bottom: 8px
          diplay: inline-block
          color: $color-text-o-d
        .cart
          diplay: inline-block
          position: absolute
          right: 6px
          bottom: 4px
</style>
