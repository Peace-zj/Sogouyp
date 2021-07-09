<template>
    <div id="box">
        <span class="back" @click="back()"><van-icon name="arrow-left" size='0.16rem' color='white' class="icons"/></span>
        <div class="img">
            <nswiper :key="list.length">
                <div class="swiper-slide" v-for="(data,index) in list.imageList" :key="index">
                    <img :src="data" />
                </div>
            </nswiper>
            <div class="desc">
                <p class="name">{{list.name}}</p>
                <div class="sec">
                    <span>{{Math.round(list.commentNum/10000)}}万个评价</span>
                    <span>好评率{{list.goodCommentsShare}}</span>
                    <span>详情></span>
                </div>
                <p class="price">￥{{list.couponPrice/100}}</p>
            </div>
            <div class="mid">
                <span><van-icon name="passed" color='#EA413C'/>京东商品</span>
                <span><van-icon name="passed" color='#EA413C'/>品质保证</span>
                <span><van-icon name="passed" color='#EA413C'/>多快好省</span>
                <span><van-icon name="passed" color='#EA413C'/>售后无忧</span>
            </div>
        </div>
        <ul>
            <li v-for="(data,index) in list.imageList" :key="index">
                <img :src="data" alt="">
            </li>
        </ul>
        <div class="fin">
            <van-goods-action>
                <van-goods-action-icon icon="shop-o" text="首页" to='/h5/pages/home/index'/>
                <van-goods-action-icon icon="chat-o" text="客服" />
                <van-goods-action-icon icon="cart-o" text="购物车" to='/shopcar'/>
                <van-goods-action-button type="warning" text="加入购物车" />
                <van-goods-action-button type="danger" text="立即购买" />
            </van-goods-action>
        </div>
    </div>
</template>
<script>
import http from '@/util/http'
import nswiper from '@/views/index/Swiper'
import Vue from 'vue'
import { Icon, Rate, GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant'
import { mapMutations } from 'vuex'
Vue.use(Icon).use(Rate).use(GoodsAction).use(GoodsActionButton).use(GoodsActionIcon)
export default {
  data () {
    return {
      list: []
    }
  },
  components: {
    nswiper
  },
  mounted () {
    this.hideAsides()
    http({
      url: `/sgsg/api/union/product/product_detail?c=h5&s=20000&t=1607330838415&v=1.0&skuId=${this.$route.query.id}`
    }).then(res => {
      // console.log(this.$route.query)
      this.list = res.data.data
    })
  },
  destroyed () {
    this.showAsides()
  },
  methods: {
    ...mapMutations(['hideAsides', 'showAsides']),
    back () {
      this.$router.push('/pages/jd-union/list')
    }
  }
}
</script>
<style lang="scss" scoped>
.icons{
    vertical-align: middle;
}
#box{
    background:#eee;
    width: 100%;
    .back{
        width: .29rem;
        height: .29rem;
        line-height:.1rem;
        text-align:center;
        background:rgba(0,0,0,0.5);
        position:fixed;
        top:.05rem;
        left:.05rem;
        border-radius: 50%;
        z-index:16;
    }
    .img{
        width: 100%;
        background:#fff;
        img{
            width: 100%;
        }
        .desc{
            width: 3.51rem;
            margin:0.1rem 0.1rem 0 0.1rem;
            border-bottom: 1px solid #eee;
            .name{
                width:100%;
                color:#262626;
                font-size:.15rem;
            }
            .sec{
                margin:0.07rem 0;
                display:flex;
                justify-content: space-between;
                span{
                    font-size: .12rem;
                    color:#8C8C8C;
                }
            }
            .price{
                color:#EA413c;
                font-size:.2rem;
                margin:0.15rem 0;
            }
        }
        .mid{
            width:3.51rem;
            height:.39rem;
            line-height:.39rem;
            font-size:.12rem;
            margin:0 0 0 0.1rem;
            span{
                margin-right:.1rem;
            }
        }
    }
    ul{
        width: 100%;
        margin-top:.1rem;
        li{
            width: 100%;
            height:5rem;
            margin-bottom:0;
            img{
                width: 100%;
                height:100%;
            }
        }
    }
    .fin{
        width: 100%;
        position:fixed;
        bottom:0px;
        left:0px;
    }
}
</style>
