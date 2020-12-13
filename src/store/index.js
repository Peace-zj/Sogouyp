// import http from '@/util/http'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAsidesShow: true
    // list: []
  },
  mutations: {
    showAsides (state) {
      state.isAsidesShow = true
    },
    hideAsides (state) {
      state.isAsidesShow = false
    }
    // setList (state, data) {
    //   state.list = [...state.list, data]
    // },
    // setList2 (state, data) {

    // }
  }
  // actions: {
  //   // getShopCarList (store, id) {
  //   //   return http({
  //   //     url: `/heihei/api/product/sku/sku_stock_detail?c=h5&s=20000&t=1606553777861&v=1.0&product_id=${id}&stock_type=1`
  //   //   }).then(res => {
  //   //     // console.log(res.data.data.skuMap)
  //   //     store.commit('setShopCarData', res.data.data.skuMap)
  //   //   })
  //   }

})
