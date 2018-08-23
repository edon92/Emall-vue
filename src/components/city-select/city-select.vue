<template lang="html">
  <div class="block">
    <el-cascader
      placeholder="试试搜索：地址"
      :options="options"
      filterable
      @change="handleChange"
      class="select"
    ></el-cascader>
  </div>
</template>

<script>
import options from 'common/js/country-data'
export default {
  components: {},
  methods: {
    handleChange(value) {
      this.$emit('selectCity', value)
    }
  },
  data() {
    return {
      selectedOptions: [],
      selectedOptions2: [],
      options: options
    }
  }
}
</script>

<style lang="stylus">
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
/* .block >>> .el-input__inner
  height: 30px */
.block >>> .el-input__inner:focus
  border-color: $color-text-o-d
.block
  display: inline-block
  width: 4rem
  @media only screen and (min-width: 320px)
    width: 3.6rem
  @media only screen and (min-width: 375px)
    width: 4.6rem
  @media only screen and (min-width: 414px)
    width: 5.4rem
  @media only screen and (min-width: 768px)
    width: 12.5rem
  @media only screen and (min-width: 1024px)
    width: 17rem
  .el-cascader
    width: 4rem
    @media only screen and (min-width: 320px)
      width: 3.6rem
    @media only screen and (min-width: 375px)
      width: 4.6rem
    @media only screen and (min-width: 414px)
      width: 5.4rem
    @media only screen and (min-width: 768px)
      width: 12.5rem
    @media only screen and (min-width: 1024px)
      width: 17rem
    .el-input__inner
       height: 30px

</style>
