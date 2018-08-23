import * as types from './mutation-types'
import Vue from 'vue'
const mutations = {
  [types.SET_KEYWORD](state, keyword) {
    state.keyword = keyword
  },
  [types.ADD_SHOPCART](state, good) {
    // 什么都没有，直接加
    if (!state.shopcartList.length) {
      Vue.set(good, 'count', 1)
      state.shopcartList.push(good)
      return
    }
    // 有东西，判断有没有该商品
    for (let i = 0; i < state.shopcartList.length; i++) {
      // 如果有
      if (state.shopcartList[i].id === good.id) {
        state.shopcartList[i].count += 1
        return
      }
    }
    // 有东西，但没改商品
    Vue.set(good, 'count', 1)
    state.shopcartList.push(good)
  },
  [types.DEC_SHOPCART](state, id) {
    for (let i = 0; i < state.shopcartList.length; i++) {
      // 如果有
      if (state.shopcartList[i].id === id) {
        state.shopcartList[i].count -= 1
        if (state.shopcartList[i].count <= 0) {
          state.shopcartList.splice(i, 1)
        }
        return
      }
    }
  },
  [types.INS_SHOPCART](state, id) {
    for (let i = 0; i < state.shopcartList.length; i++) {
      // 如果有
      if (state.shopcartList[i].id === id) {
        state.shopcartList[i].count += 1
        return
      }
    }
  },
  [types.DEL_SHOPCART](state, id) {
    for (let i = 0; i < state.shopcartList.length; i++) {
      if (state.shopcartList[i].id === id) {
        state.shopcartList.splice(i, 1)
      }
    }
  },
  [types.SET_USERINFORMATION](state, information) {
    state.userInformation = information
  }
}
export default mutations
