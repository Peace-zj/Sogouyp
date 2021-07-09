// import http from '@/util/http'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAsidesShow: true,
    cityName: '北京市',
    cityData: [],
    shoplist: [],
    product: {},
    username: 1
  },
  mutations: {
    showAsides (state) {
      state.isAsidesShow = true
    },
    hideAsides (state) {
      state.isAsidesShow = false
    },
    setCitydata (state, city) {
      state.cityData = city
    },
    setCityName (state, name) {
      state.cityName = name
    },
    setUsername (state, name) {
      state.username = name
    },
    setShopList (state, list) {
      state.shoplist = list
    },
    setProduct (state, pdt) {
      // state.product = pdt
      for (var attr in pdt) {
        state.product[attr] = pdt[attr]
        // obj = {}
      }
    }
    // setList (state, data) {
    //   state.list = [...state.list, data]
    // },
    // setList2 (state, data) {

    // }
  },
  actions: {
    getCityData (store) {
      return fetch('../../../city.json').then(res => res.json()).then(res => {
        // console.log(res)
        store.commit('setCitydata', res.rows)
      })
    }
  }

})
