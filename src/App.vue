<template>
  <div id="app">
    <e-header></e-header>
    <keep-alive exclude="Home">
      <router-view/>
    </keep-alive>
    <footer-tab></footer-tab>
  </div>
</template>

<script>
import EHeader from 'base/header/EHeader'
import FooterTab from 'base/footerTab/footer-tab'
export default {
  name: 'App',
  components: {
    EHeader,
    FooterTab
  }
}
</script>

<style lang="stylus" scoped>
/* #app
  overflow: hidden
  position: relative
  top: 0
  left: 0
  right: 0
  bottom: 0
  background: $color-background
.swal-modal
  width: 60%
  height: 100px */
</style>
