<template lang="html">
  <div class="category">
    <scroll class="items-scroll" :click="true">
      <div class="items">
        <div
        class="item border-bottom"
        v-for="(item,index) in itemList"
        :key="index"
        :class="{'active': keyword===item}"
        @click="selectItem"
        >{{item}}</div>
      </div>
    </scroll>
    <div class="goods">
      <div class="top border">
        <div class="new">最新</div>
        <div class="price">金额</div>
        <div class="sellCout">效率</div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import {
  mapMutations,
  mapGetters
} from 'vuex'
export default {
  components: {
    Scroll
  },
  data() {
    return {
      itemList: ['手机', '电脑', '数码', '办公配件', '电视', '空调', '冰箱', '洗衣机', '小家电', '厨卫家电', '图书', '珠宝', '索尼', 'Apple', '小米', '手表']
    }
  },
  methods: {
    selectItem(e) {
      let newKeyword = e.target.innerHTML
      this.$router.push({
        path: `/category/keyword=${this.keyword}`
      })
      this.setKeyword(newKeyword)
    },
    ...mapMutations({
      setKeyword: 'SET_KEYWORD'
    })
  },
  computed: {
    ...mapGetters([
      'keyword'
    ])
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.category
  position: fixed
  top: 0
  right: 0
  left: 0
  bottom: 43px
  background: #fff
  display: flex
  &.v-enter-active, &.v-leave-active
    transition: all .4s
  &.v-enter, &.v-leave-to
    transform: translate3d(100%, 0, 0)
  .items-scroll
    positon: fixed
    top: 0px
    left: 0px
    bottom: 43px
    overflow: hidden
    .items
      flex: 0 0 80px
      width: 80px
      background: #eee
      color: $color-text
      .item
        text-align: center
        height: 50px
        line-height: 50px
        &:before
          border-color: #ccc
        &.active
          background: #fff
  .goods
    position: relative
    margin: 0px 6px
    flex: 1
    .top
      position: relative
      height: 50px
      color: $color-text-l
      font-size: 0
      z-index: 100
      background: $color-background
      &:before
        border-color: #ccc
      div
        display: inline-block
        width: 33.333%
        line-height: 50px
        text-align: center
        font-size: $font-size-medium
</style>
