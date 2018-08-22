<template lang="html">
  <scroll class="good-detail" :click="true">
    <div>
      <div class="loading-wrapper" v-show="!showNothing && !this.keywordData.length">
        <loading></loading>
      </div>
      <div class="no-data" v-show="showNothing">空空如也，请查
        看其它品类 :)</div>
      <div class="good-wrapper">
        <div class="good border" v-for="item in keywordData" @click="selectProduct(item.id)" :key="item.id">
          <div class="img-box">
            <img v-lazy="'http://img.happymmall.com/' + item.mainImage" class="img" width="158" height="184">
          </div>
          <div class="msg-box">
            <div class="name">{{item.name}}</div>
            <div class="price">￥{{item.price}}</div>
            <div class="iconfont icon-gouwuche cart" @click.stop="addToCart(item.id)"></div>
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
import Loading from 'base/loading/loading'
import {getAxios, transformData, Salert, doLogin} from 'common/js/mm'
export default {
  components: {
    Scroll,
    Loading
  },
  data() {
    return {
      keywordData: [],
      showNothing: false
    }
  },
  methods: {
    addToCart(id) {
      // 同步到后端，同步之前要进行数据类型转换，后端需要jsonp
      let data = transformData({
        productId: id,
        count: 1
      })
      getAxios({
        url: `/cart/add.do?${data}`,
        type: 'get',
        data: {
          productId: id,
          count: 1
        }
      }, (res) => {
        // 请求成功
        if (res.data.status === 0) {
          // 弹出成功信息
          Salert('已成功加入购物车', 'success')
          return
        }
        if (res.data.status === 10) {
          Salert('请先登录', 'error')
          doLogin()
        }
      })
    },
    _getKeyProduct() {
      this.showNothing = false
      this.keywordData = {}
      axios.get(`/product/list.do?keyword=${this.keyword}`).then((res) => {
        this.keywordData = res.data.data.list
        // 如果把数据长度为0，则显示空空如也
        if (!this.keywordData.length) {
          this.showNothing = true
        }
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
  activated() {
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
  .loading-wrapper
    width: 100%
    margin-top: 20%
    margin-left: 260%
    transform: translate3d(-22px, 0, 0)
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
      @media only screen and (max-width: 1024px)
        padding-bottom: 66%
      @media only screen and (max-width: 768px)
        padding-bottom: 70%
      @media only screen and (max-width: 414px)
        padding-bottom: 75%
      .img-box
        width: 100%
        padding-bottom: 116%
        height: 0
        overflow: hidden
        .img
          width: 100%
          @media only screen and (max-width: 1024px)
            height: 529px
          @media only screen and (max-width: 768px)
            height: 384px
          @media only screen and (max-width: 414px)
            height: 184px
          @media only screen and (max-width: 375px)
            height: 161px
      .msg-box
        padding-left: 6px
        @media only screen and (max-width: 1024px)
          font-size: 24px
        @media only screen and (max-width: 768px)
          font-size: 22px
        @media only screen and (max-width: 414px)
          font-size: 14px
        @media only screen and (max-width: 375px)
          font-size: 12px
        .name
          margin-top: 10px
          color: $color-text
          max-width: 150px
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
          @media only screen and (max-width: 1024px)
            max-width: 425px
          @media only screen and (max-width: 768px)
            max-width: 400px
          @media only screen and (max-width: 414px)
            max-width: 150px
          @media only screen and (max-width: 375px)
            max-width: 140px
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
          @media only screen and (max-width: 1024px)
            font-size: 30px
          @media only screen and (max-width: 768px)
            font-size: 28px
          @media only screen and (max-width: 414px)
            font-size: 18px
          @media only screen and (max-width: 375px)
            font-size: 16px
</style>
