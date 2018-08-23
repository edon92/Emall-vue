<template lang="html">
  <div class="confirm">
    <div class="header">
      <div class="header-left" @click="back">
        <i class="iconfont icon-houtui"></i>
        返回
      </div>
      <div class="header-center">
        确认订单
      </div>
    </div>
    <div
     class="no-address user-Address"
     v-show="!AddressList.length"
     >
      <div class="iconfont icon-didian"></div>
      <div class="address-box">
        <div class="text text-line-1">
          <span class="name"></span>
          <span class="phone"></span>
        </div>
        <div class="text text-line-2">
          <span class="address">
            用户还未设置地址，请点击右侧箭头设置 >>>
          </span>
        </div>
      </div>
      <div class="iconfont icon-qianjin" @click="moreAddress"></div>
    </div>
    <div
     class="user-Address"
     v-if="AddressList.length"
     >
      <div class="iconfont icon-didian"></div>
      <div class="address-box">
        <div class="text text-line-1">
          <span class="name">{{defalutAddress.receiverName}}</span>
          <span class="phone">{{defalutAddress.receiverPhone}}</span>
        </div>
        <div class="text text-line-2">
          <span class="address">
            {{defalutAddress.receiverProvince + defalutAddress.receiverCity + defalutAddress.receiverAddress}}
          </span>
        </div>
      </div>
      <div class="iconfont icon-qianjin" @click="moreAddress"></div>
    </div>
    <div class="payList">
      <div class="list-header border-bottom">商品名称：Emall</div>
      <div class="loading-wrapper" v-show="!cartProductList.length">
        <loading></loading>
      </div>
      <scroll class="scroll">
        <div class="list-content">
          <div
          class="good border-bottom"
          v-for="(item, index) in cartProductList"
          :key="index"
          v-show="cartProductList.length"
          @click="ToDetail(item.productId)"
          >
          <div class="img">
            <img v-lazy="'http://img.happymmall.com/' + item.productImage" width="85" height="85">
          </div>
          <div class="msg">
            <div class="name" ref="goodName">{{item.productName}}</div>
            <div class="discount-price">￥{{item.currentUnitPrice}}</div>
          </div>
          <div class="count">
            <div class="countBtn">
              x {{item.quantity}}
            </div>
          </div>
        </div>
      </div>
    </scroll>
    </div>
    <transition>
      <div class="address-msg" v-show="showAdress">
        <div class="address-wrapper updatePassword" >
          <div class="address-box border-bottom" v-for="(item, index) in AddressList" :key="index">
            <div class="text text-line-1">
              <i class="iconfont icon-dui" :class="{active: item.id === defalutAddress.id}" @click.stop="selectAddress(index)"></i>
              <span class="name">{{item.receiverName}}</span>
              <span class="phone">{{item.receiverPhone}}</span>
            </div>
            <div class="text text-line-2">
              <span class="address">
                {{item.receiverProvince + item.receiverCity + item.receiverAddress}}
              </span>
            </div>
            <div class="iconfont icon-tianxie" @click="changeAddress"></div>
          </div>
          <div class="add address-box border-bottom" @click.stop="addAddress">
            <i class="iconfont icon-jia" style="font-size: 12px"></i>添加收货地址
          </div>
        </div>
      </div>
    </transition>
    <transition>
      <div class="address-msg" v-show="isChangeAdress">
        <div class="address-wrapper updatePassword" >
          <div class="address-box border-bottom" v-for="(item, index) in AddressList" :key="index">
            <div class="text text-line-1">
              <i class="iconfont icon-dui" :class="{active: item.id === defalutAddress.id}" @click.stop="selectAddress(index)"></i>
              <span class="name">{{item.receiverName}}</span>
              <span class="phone">{{item.receiverPhone}}</span>
            </div>
            <div class="text text-line-2">
              <span class="address">
                {{item.receiverProvince + item.receiverCity + item.receiverAddress}}
              </span>
            </div>
            <div class="iconfont icon-tianxie" @click="changeAddress"></div>
          </div>
          <div class="add address-box border-bottom" @click.stop="addAddress">
            <i class="iconfont icon-jia" style="font-size: 12px"></i>添加收货地址
          </div>
        </div>
      </div>
    </transition>
    <transition>
      <div class="add-address" v-show="isEditAddress">
        <div class="receiver-msg">
          <div class="receiver receiverName">
            <span class="name">收件人：</span>
            <input type="text" class="input nameInput" placeholder="姓名" ref="name">
          </div>
          <div class="receiver receiverPhone">
            <span class="phone">电话号码：</span>
            <input type="text" class="input phoneInput" placeholder="电话" ref="phone">
          </div>
          <div class="receiver receiverPlace">
            <span class="place">所在地区：</span>
            <div class="city-select-wrapper">
              <city-select @selectCity="selectCity"></city-select>
            </div>
          </div>
          <div class="receiver receiverSpecificAddress">
            <span class="SpecificAddress">详细地址：</span>
            <input type="text" class="input AddressInput" placeholder="填写街道地址到门牌号" ref="SpecificAddress">
          </div>
          <div class="receiver receiverZip">
            <span class="zip">邮政编码：</span>
            <input type="text" class="input zipInput" placeholder="填写邮政编码" ref="zip">
          </div>
          <div class="addToAddressList" @click="addToAddressList">添加到地址列表</div>
        </div>
      </div>
    </transition>
    <transition>
      <div class="filter-mask" v-show="showAdress" @click="toggleAddress"></div>
    </transition>
    <div class="toPay">
      <div class="pay" @click="createOrder">
        确认支付
      </div>
      <div class="total">
        <span class="sum">合计：</span>
        <span class="price">￥{{cartTotalPrice}}</span>
      </div>
    </div>
    <div class="payment-wrapper" v-if="isPayment">
      <payment :orderNumber="orderNumber"></payment>
    </div>
    <div class="clickAfterloading-wrapper" v-show="isClickAndLoad">
      <loading></loading>
    </div>
  </div>
</template>

<script>
import CitySelect from 'components/city-select/city-select'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import Payment from 'components/payment/payment'
import {mapGetters, mapMutations} from 'vuex'
import {
  getAxios,
  doLogin,
  transformData,
  Salert
} from 'common/js/mm'
export default {
  components: {
    Scroll,
    Loading,
    CitySelect,
    Payment
  },
  data() {
    return {
      AddressList: [],
      defalutAddress: {},
      cartProductList: [],
      cartTotalPrice: 0,
      showAdress: false,
      isEditAddress: false,
      isChangeAdress: false,
      selectAddressNum: 0,
      selectAddressData: [],
      isClickAndLoad: false,
      isPayment: false,
      orderNumber: 0
    }
  },
  computed: {
    ...mapGetters([
      'userInformation'
    ])
  },
  methods: {
    back() {
      this.$router.back()
    },
    ...mapMutations({
      setUserInformation: 'SET_USERINFORMATION'
    }),
    changeAddress() {
      alert('接口维修中，请点添加新地址')
    },
    createOrder() {
      if (this.cartTotalPrice <= 0) {
        return
      }
      this.isClickAndLoad = true
      getAxios({
        url: `/order/create.do?shippingId=${this.defalutAddress.id}`
      }, (res) => {
        this.isClickAndLoad = false
        this.orderNumber = res.data.data.orderNo
        this.isPayment = true
      })
    },
    addAddress() {
      this.isEditAddress = !this.isEditAddress
    },
    selectCity(value) {
      this.selectAddressData = value
    },
    // 点添加到地址列表后，提交地址
    addToAddressList() {
      let msg = {
        userId: this.userInformation.id,
        receiverName: this.$refs.name.value,
        receiverPhone: 100,
        receiverMobile: this.$refs.phone.value,
        receiverProvince: this.selectAddressData[1],
        receiverCity: this.selectAddressData[2],
        receiverAddress: this.$refs.SpecificAddress.value,
        receiverZip: this.$refs.zip.value
      }
      if (!msg.receiverName || !msg.receiverMobile || !msg.receiverAddress || !msg.receiverZip) {
        return
      }
      let data = transformData(msg)
      getAxios({
        url: `/shipping/add.do?${data}`
      }, (res) => {
        Salert('添加地址成功', 'success')
        this.isEditAddress = false
        window.location.reload()
      })
    },
    selectAddress(index) {
      this.selectAddressNum = index
      this._getUserAddress()
    },
    toggleAddress() {
      if (this.isEditAddress === true) {
        this.isEditAddress = !this.isEditAddress
        return
      }
      this.showAdress = !this.showAdress
    },
    moreAddress() {
      this.showAdress = !this.showAdress
    },
    _checkLogin() {
      getAxios({
        url: '/user/get_information.do'
      }, (res) => {
        if (res.data.status === 10) {
          doLogin()
          return
        }
        if (res.data.status === 1) {
          doLogin()
          return
        }
        if (res.data.status === 0) {
          this.setUserInformation(res.data.data)
          this._getUserAddress()
          this._getShopcartList()
        }
      })
    },
    _getUserAddress() {
      getAxios({
        url: '/shipping/list.do'
      }, (res) => {
        this.AddressList = res.data.data.list
        this.defalutAddress = this.AddressList[this.selectAddressNum]
      })
    },
    // 请求购物车数据
    _getShopcartList() {
      getAxios({
        url: '/order/get_order_cart_product.do'
      }, (res) => {
        this.cartProductList = res.data.data.orderItemVoList
        this.cartTotalPrice = res.data.data.productTotalPrice
      })
    }
  },
  mounted() {

  },
  activated() {
    this._checkLogin()
    this.isPayment = false
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.confirm
  position: fixed
  top: 0
  bottom: 0
  left: 0
  right: 0
  z-index: 40
  background: #FFF
  .header
    font-size: 0
    height: .88rem
    line-height: .88rem
    background: #eee
    .header-left
      display: inline-block
      font-size: $font-size-medium-x
      color: $color-text
    .header-center
      display: inline-block
      text-align: right
      width: 50%
      font-size: $font-size-medium-x
  .user-Address
    position: relative
    padding: .4rem
    font-size: $font-size-medium-x
    background: $color-background
    border-bottom: 2px dashed $color-text-o-d
    .icon-didian
      display: inline-block
      color: #999
      font-size: $font-size-large
    .address-box
      margin-left: .1rem
      display: inline-block
      .text-line-1
        font-weight: 500
        .phone
          margin-left: .8rem
      .text-line-2
        margin-top: .2rem
    .icon-qianjin
      position: absolute
      right: .2rem
      bottom: .2rem
  .payList
    position: relative
    /* height: 100% */
    .list-header
      padding-left: .2rem
      height: .8rem
      line-height: .8rem
      color: $color-text
      background: #fff
    .scroll
      position: fixed
      top: 3.36rem
      left: 0em
      right: 0rem
      bottom: .88rem
      z-index: -1
      .list-content
        padding: 0rem .2rem
        .good
          position: relative
          display: flex
          padding: 10px px
          box-sizing: border-box
        .img
          flex: 0 0 85px
          width: 85px
          height: 85px
        .msg
          position: relative
          flex: 1
          padding: 10px 10px 0px 20px
          font-size: $font-size-medium-x
          color: $color-text
          .name
            margin: 0px
            no-wrap()
            max-width: 270px
            @media only screen and (min-width:320px)
              max-width: 180px
            @media only screen and (min-width:375px)
              max-width: 240px
          .icon-cuo
            position: absolute
            padding: 5px
            right: -4px
            top: -5px
          .discount-price
            margin-top: .8rem
            color: #333
            font-size: $font-size-medium
        .count
          position: absolute
          bottom: .4rem
          right: .2rem
          font-weight: 100
  .address-msg
    position: absolute
    bottom: 0px
    width: 100%
    background: $color-background
    z-index: 500
    background: #fff
    &.v-enter-active, &.v-leave-active
      transition: all .4s
    &.v-enter, &.v-leave-to
      transform: translate3d(0, 100%, 0)
    .address-wrapper
      /* height: 1.3rem
      line-height: 1.3rem */
      color: #666
      .address-box
        position: relative
        padding: .2rem .4rem
        .text-line-1
          font-weight: 500
          padding-left: .2rem
          height: .44rem
          line-height: .44rem
          .icon-dui
            position: relative
            top: .22rem
            font-size: .32rem
            height: .44rem
            line-height: .44rem
            &.active
              color: $color-text-o-d
          .name
            margin-left: 1rem
          .phone
            margin-left: .8rem
        .text-line-2
          margin-left: 1.59rem
          height: .44rem
          line-height: .44rem
          margin-top: .1rem
          font-weight: 200
        .icon-tianxie
          position: absolute
          right: .4rem
          top: 12%
          font-size: $font-size-large
          line-height: .88rem
          height: .88rem
      .add
        height: .6rem
        line-height: .6rem
        text-align: center
  .add-address
    position: fixed
    left: 0rem
    right: 0rem
    bottom: 0rem
    height: 4.86rem
    background: $color-background
    z-index: 600
    &.v-enter-active, &.v-leave-active
      transition: all .4s
    &.v-enter, &.v-leave-to
      transform: translate3d(0, 100%, 0)
    .receiver-msg
      padding: .2rem .6rem .2rem .4rem
      font-size: $font-size-medium-x
      font-weight: 200
      input::-webkit-input-placeholder
        color: #ccc
        font-size: $font-size-medium
      .receiver
        text-align: right
        .input
          width: 4rem
          -webkit-appearance: none
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
      .receiverName
        .name
          font-weight: 200
        .nameInput
          color: $color-text
          border: 1px solid #eee
          box-sizing: border-box
          padding: .04rem .1rem
      .receiverPhone
        margin-top: .18rem
        .phone
          font-weight: 200
        .phoneInput
          color: $color-text
          border: 1px solid #eee
          box-sizing: border-box
          padding: .04rem .1rem
      .receiverPlace
        /* text-align: left */
        .place
        .city-select-wrapper
          display: inline-block
      .receiverSpecificAddress
        .SpecificAddress
          font-weight: 200
        .AddressInput
          color: $color-text
          border: 1px solid #eee
          box-sizing: border-box
          padding: .04rem .1rem
      .receiverZip
        margin-top: .18rem
        .zip
          font-weight: 200
        .zipInput
          color: $color-text
          border: 1px solid #eee
          box-sizing: border-box
          padding: .04rem .1rem
      .addToAddressList
        position: absolute
        border-radius: .1rem
        margin-left: 6%
        bottom: .24rem
        width: 80%
        text-align: center
        height: .64rem
        line-height: .64rem
        background: #fc8045
        color: #fff
  .filter-mask
    position: fixed
    top: 0
    right: 0
    left: 0
    bottom: 0
    z-index: 50
    background: rgba(7,17,27,.6)
    backdrop-filter: blur(10px)
    overflow: hidden
    &.v-enter-active, &.v-leave-active
      transition: all .4s
    &.v-leave-to, &.v-enter
      opacity: 0
  .toPay
    position: fixed
    left: 0rem
    right: 0rem
    bottom: 0rem
    height: .88rem
    line-height: .88rem
    font-size: 0rem
    background: $color-background
    z-index: 50
    .total
      display: inline-block
      font-size: $font-size-medium-x
      float: right
      margin-right: .3rem
      .sum
        color: #333
        font-weight: 200
      .price
        color: $color-text-o-d
    .pay
      padding: 0rem .3rem
      box-sizing: border-box
      display: inline-block
      font-size: $font-size-medium-x
      background: $color-text-o-d
      float: right
      color: #FFF
  .clickAfterloading-wrapper
    position: relative
    top: 20%
    z-index: 100
</style>
