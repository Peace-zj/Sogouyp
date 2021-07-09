<template>
    <div>
      <van-sticky :offset-top="0">
        <van-nav-bar
                title="线下体验店"
                left-arrow
                @click-left="onClickLeft"
        />
        <span @click="toCity" class="city">{{cityName}}<van-icon name="arrow-down" class="city-icon"/></span>
        <van-nav-bar
        left-text="附近的线下门店"
        @click-left="onClickLeft">
        <template #right>
        <van-icon name="search" size="18"/>
        </template>
        </van-nav-bar>
      </van-sticky>
      <div class="wrapper" :style="{height:height}" ref="wrapp">
        <ul v-if="list.length">
            <li v-for="data in list" :key="data.id" >
            <van-panel :title="data.storeTitle" :desc="data.storeAddress" >
            </van-panel>
            </li>
            <div v-if="isShow" style="text-align:center">没有更多了</div>
        </ul>
        <template v-else>
          <div class="wu">您选择的城市暂无门店</div>
        </template>
      </div>
    </div>
</template>
<script>
import http from '@/util/http'
import Vue from 'vue'
import { NavBar, Icon, List, Panel, Sticky } from 'vant'
import { mapMutations, mapState } from 'vuex'

Vue.use(NavBar).use(Icon).use(List).use(Panel).use(Sticky)
export default {
  data () {
    return {
      list: [],
      cuttor: 1,
      totalCount: 0,
      height: 0,
      isShow: false
    }
  },
  computed: {
    ...mapState(['cityName', 'cityData'])
  },
  mounted () {
    this.height = document.documentElement.clientHeight - 364 + 'px'
    if (this.cityName) {
      http({
        url: `/sgsg/api/geo/get_store_list_by_location?c=h5&s=20000&t=1605235156222&v=1.0&city=${this.cityName}&pn=1&ps=10`
      }).then(res => {
        console.log(res.data.data)
        this.list = res.data.data.pageList
        this.totalCount = res.data.data.totalCount
      })
    } else {
      this.$router.push('/h5/pages/store-map/city')
    }
  },
  created () {
    this.hideAsides()
  },
  methods: {

    ...mapMutations(['showAsides', 'hideAsides']),
    onClickLeft () {
      // this.showAsides()
      this.$router.push('/h5/pages/home/index')
    },
    toCity () {
      // this.getcity()
      this.$router.push('/h5/pages/store-map/city')
    },
    onLoad () {
      this.cuttor++
      http({
        url: `/sgsg/api/geo/get_store_list_by_location?c=h5&s=20000&t=1605235156222&v=1.0&city=${this.cityName}&pn=${this.cuttor}&ps=7`
      }).then(res => {
        this.list = [...this.list, ...res.data.data.pageList]
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .van-nav-bar{
    color: #000;
  }
  .city{
    z-index:12;
    font-size:15px;
    position: absolute;
    top: 12px;
    right: 20px;
  }
  .city-icon{
      margin-left:3px;
  }
  .wu{
      line-height:290px;
      text-align:center;
      font-size:20px;
      font-weight: normal;
  }
</style>
