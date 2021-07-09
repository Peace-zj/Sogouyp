<template>
    <div id="head">
        <yHeader><div class="hui">优惠</div></yHeader>
        <div class="kind">
            <ul>
                <li v-for="data in kinds" :key="data.eliteId" :class="current===data.eliteId?'active':''" @click="current=data.eliteId">
                    {{data.name}}
                    <div></div>
                </li>
            </ul>
        </div>
        <div class="list">
                <div class="top" v-scolls="500">
                    <a href="#head"><van-icon name="back-top" size='0.26rem' color="#fff" class="icons"/></a>
                </div>
            <ul v-show="current===24">
                <li v-for="(data,index) in list1" :key="index" @click="Jump(data.skuId)">
                    <div class="img"><img :src="data.image"></div>
                    <div class="desc">
                        <p class="name">{{data.name}}</p>
                        <p class="comt">{{Math.round(data.commentNum/10000)}}万个评价  好评率{{data.goodCommentsShare}}</p>
                        <span>￥{{data.price/100}}</span>
                        <button>马上抢</button>
                    </div>
                </li>
            </ul>
            <ul v-show="current===27">
                <li v-for="(data,index) in list2" :key="index" @click="Jump(data.skuId)">
                    <div class="img"><img :src="data.image"></div>
                    <div class="desc">
                        <p class="name">{{data.name}}</p>
                        <p class="comt">{{Math.round(data.commentNum/10000)}}万个评价  好评率{{data.goodCommentsShare}}</p>
                        <span>￥{{data.price/100}}</span>
                        <button>马上抢</button>
                    </div>
                </li>
            </ul>
            <ul v-show="current===25">
                <li v-for="(data,index) in list3" :key="index" @click="Jump(data.skuId)">
                    <div class="img"><img :src="data.image"></div>
                    <div class="desc">
                        <p class="name">{{data.name}}</p>
                        <p class="comt">{{Math.round(data.commentNum/10000)}}万个评价  好评率{{data.goodCommentsShare}}</p>
                        <span>￥{{data.price/100}}</span>
                        <button>马上抢</button>
                    </div>
                </li>
            </ul>
            <ul v-show="current===26">
                <li v-for="(data,index) in list4" :key="index" @click="Jump(data.skuId)">
                    <div class="img"><img :src="data.image"></div>
                    <div class="desc">
                        <p class="name">{{data.name}}</p>
                        <p class="comt">{{Math.round(data.commentNum/10000)}}万个评价  好评率{{data.goodCommentsShare}}</p>
                        <span>￥{{data.price/100}}</span>
                        <button>马上抢</button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { Icon } from 'vant'
import Vue from 'vue'
import http from '@/util/http'
import yHeader from '@/views/header/head'
Vue.use(Icon)
Vue.directive('scolls', {
  inserted (el, binding) {
    window.onscroll = () => {
      var t = document.documentElement.scrollTop
      if (t > binding.value) {
        el.style.display = 'block'
      } else {
        el.style.display = 'none'
      }
    }
  }
})
export default {
  components: {
    yHeader
  },
  data () {
    return {
      kinds: [],
      list1: [],
      list2: [],
      list3: [],
      list4: [],
      current: 0,
      allkinds: []
    }
  },
  methods: {
    Jump (id) {
      this.$router.push({
        path: '/h5/pages/detail',
        query: {
          id: id
        }
      })
    }
  },
  mounted () {
    http({
      url: '/sgsg/api/union/product/elite/elite_list?c=h5&s=20000&t=1606203338365&v=1.0'
    }).then(res => {
      this.kinds = res.data.data.eliteList
      this.current = this.kinds[0].eliteId
    })
    http({
      url: '/sgsg/api/union/product/product_list?c=h5&s=20000&t=1606203338495&v=1.0&eliteId=24&pn=1&ps=20'
    }).then(res => {
      this.list1 = res.data.data.pageList
    })
    http({
      url: '/sgsg/api/union/product/product_list?c=h5&s=20000&t=1606208767165&v=1.0&eliteId=27&pn=1&ps=20'
    }).then(res => {
      this.list2 = res.data.data.pageList
    })
    http({
      url: '/sgsg/api/union/product/product_list?c=h5&s=20000&t=1606208768967&v=1.0&eliteId=25&pn=1&ps=20'
    }).then(res => {
      this.list3 = res.data.data.pageList
    })
    http({
      url: '/sgsg/api/union/product/product_list?c=h5&s=20000&t=1606208770497&v=1.0&eliteId=26&pn=1&ps=20'
    }).then(res => {
      this.list4 = res.data.data.pageList
    })
  }
}
</script>
<style lang="scss" scoped>
      .top{
         width: .39rem;
         height:.39rem;
         position:fixed;
         bottom:.8rem;
         right:.2rem;
         z-index:20;
         padding-top:.06rem;
         text-align: center;
         background: #8C8C8C;
         border-radius: 50%;
         display: none;
      }
    .active{
        color:#EA413C;
        div{
            width: .24rem;
            height: .02rem;
            background:#EA413C;
            margin:.05rem auto;
            display:block;
        }
    }
    .hui{
        border-bottom:1px solid #eee;
    }
    .kind{
        position:fixed;
        top:.5rem;
        width: 100%;
        height:.43rem;
        background: #fff;
        padding-top:.15rem;
        z-index:15;
        ul{
            width: 100%;
            display:flex;
            justify-content: space-around;
            li{
                font-size:.14rem;
            }
        }
    }
    .list{
        margin-top: 100px;
        width: 100%;
        .icons{
          vertical-align: top;
        }
        ul{
            width: 3.4rem;
            margin:0 0.1rem;
            li{
                width: 100%;
                padding:0.09rem 0;
                height:1.08rem;
                border-bottom:1px solid #eee;
                display:flex;
                justify-content: space-between;
                .img{
                    width: .95rem;
                    height: .95rem;
                    img{
                        width: 100%;
                    }
                }
                .desc{
                    position:relative;
                    .name{
                        width: 2.25rem;
                        height: .36rem;
                        color:#262626;
                        text-overflow: ellipsis;
                        overflow:hidden;
                        display:-webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp:2;
                        line-clamp:2;
                        font-size: .13rem;
                    }
                    .comt{
                        height:.2rem;
                        line-height:.2rem;
                        color:#8C8C8C;
                        margin-right:.1rem;
                        font-size: .12rem;
                    }
                    span{
                        position:absolute;
                        bottom:0;
                        left:0;
                        color:#262626;
                        font-size: .14rem;
                    }
                    button{
                        position:absolute;
                        bottom:0;
                        right:0;
                        width: .53rem;
                        height: .23rem;
                        border:none;
                        border:1px solid #EA413C;
                        color:#EA413C;
                        font-size: .12rem;
                        background: #fff;
                    }
                }
            }
        }
    }
</style>
