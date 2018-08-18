<template lang="html">
  <div ref="scrollWrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  props: {
    click: {
      type: Boolean,
      dafault: true
    },
    probeType: {
      type: Number,
      default: 1
    },
    data: {
      type: Array,
      default: null
    },
    listenScroll: {
      type: Boolean,
      dafault: false
    }
  },
  methods: {
    _initScroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.scrollWrapper, {
          click: this.click,
          probeType: this.probeType
        })
      } else {
        this.scroll.refresh()
      }
      if (this.listenScroll) {
        let me = this
        this.scroll.on('scroll', (pos) => {
          me.$emit('scroll', pos)
        })
      }
    },
    enable() {
      this.scroll && this.scroll.enable()
    },
    disable() {
      this.scroll && this.scroll.disable()
    },
    refresh() {
      console.log('refresh')
      this.scroll && this.scroll.refresh()
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  watch: {
    data() {
      setTimeout(() => {
        this.scroll.refresh()
      }, 20)
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
