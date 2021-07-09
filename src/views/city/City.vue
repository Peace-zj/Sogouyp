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
        <!-- <van-list
          v-model="loading"
          :finished="finished"
          :immediate-check='false'
          finished-text="没有更多了"
          @load="onLoad"
          ref="trans"
        > -->

        <ul v-if="list.length">
            <li v-for="data in list" :key="data.id" >
            <!-- <img :src="data.image" alt="">
            <div class="name">{{data.name}}</div>
            <div class="desc">{{data.desc}}</div>
            <div class="price">￥ {{data.salePrice | relaPrice}}</div> -->
            <van-panel :title="data.storeTitle" :desc="data.storeAddress" >
            </van-panel>
            </li>
            <div v-if="isShow" style="text-align:center">没有更多了</div>
        </ul>
        <template v-else>
          <div class="zan">您选择的城市暂无门店</div>
        </template>
        <!-- </van-list> -->
      </div>
    </div>
</template>
<script>
import http from '@/util/http'
import Vue from 'vue'
import { NavBar, Icon, List, Panel, Sticky } from 'vant'
import { mapMutations, mapState } from 'vuex'
// import BetterScroll from 'better-scroll'

Vue.use(NavBar).use(Icon).use(List).use(Panel).use(Sticky)
export default {
  data () {
    return {
      // finished: false,
      // loading: false,
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
    // console.log(this.height)
    if (this.cityName) {
      http({
        url: `/heihei/api/geo/get_store_list_by_location?c=h5&s=20000&t=1605235156222&v=1.0&city=${this.cityName}&pn=1&ps=10`
      }).then(res => {
        console.log(res.data.data)
        this.list = res.data.data.pageList
        this.totalCount = res.data.data.totalCount

        this.$nextTick(() => {
        //   const scroll = new BetterScroll('.wrapper', {
        //     // scrollbar: {
        //     //   fade: true
        //     // },
        //     movable: true,
        //     zoom: true,
        //     // mouseWheel: true,
        //     probeType: 3
        //   })

        //   scroll.on('scroll', (pos) => {
        //     console.log(pos.x + '~' + pos.y)
        //     if (Number(pos.y) === -353) {
        //       // this.loading = true
        //       this.onLoad()
        //     }
        //   })
        })
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
      // console.log(this.list.length, this.list, this.cuttor)
      // if (this.list.length === 0) {
      //   this.loading = false
      //   return
      // }
      // if (this.list.length === this.totalCount) {
      //   this.finished = true
      //   return
      // }
      this.cuttor++
      http({
        url: `/heihei/api/geo/get_store_list_by_location?c=h5&s=20000&t=1605235156222&v=1.0&city=${this.cityName}&pn=${this.cuttor}&ps=7`
      }).then(res => {
        this.list = [...this.list, ...res.data.data.pageList]
        // this.loading = false
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
//   .map{
//     width: 100%;
//     height: 272px;
//     background: url(//webmap0.bdimg.com/image/api/bg.png);
//   }
//   .wrapper{
//     height: 500px;
//     overflow: hidden;
//   }
  .zan{
      line-height:290px;
      text-align:center;
      font-size:20px;
      font-weight: normal;
  }
</style>
