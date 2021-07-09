<template>
    <div id="box">
        <div class="back" @click="back()"><van-icon name="arrow-left" size='0.16rem' color='white' class="iconsF"/></div>
        <div class="img">
            <nswiper v-if="list">
                <div class="swiper-slide" v-for="(data,index) in list.product.image" :key="index">
                    <img :src="data" />
                </div>
            </nswiper>
        </div>
        <div class="detail" v-if="list">
            <p class="name">{{list.product.name}}</p>
            <p class="desc">{{list.product.desc}}</p>
            <p class="price">￥{{price}}.00 <span class="baoyou">包邮</span></p>

        </div>
        <div class="select">
            <div class="fir">
                <p>已选</p>
                <p>{{skuName}}</p>
                <div class="slt" @click="yixuanshow=true"><van-icon name="arrow" size='0.16rem' @click="yixuanshow=true" class="iconsS"/></div>
            </div>
            <div class="sec">
                <p><van-icon name="passed" size='0.13rem' color='#EA413C'/>搜狗自营</p>
                <p><van-icon name="passed" size='0.13rem' color='#EA413C'/>7天无理由退货</p>
                <p><van-icon name="passed" size='0.13rem' color='#EA413C'/>一年内保修</p>
            </div>
        </div>
        <div class="cmt" v-if="message.totalCount">
            <div class="fir">
                <p class="comment">商品评价({{message.totalCount}})</p>
                <div class="slt"><van-icon name="arrow" size='0.16rem' class="iconsT"/></div>
                <p>满意度<span>{{message.satisfaction}}%</span></p>
            </div>
            <div class="sec">
                <div class="img">
                    <img src="data:image/png;base64,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">
                </div>
                <div class="msg">
                    <div>{{nickName}}</div>
                    <div><van-rate v-model="value" size='0.09rem' gutter='0.02rem' readonly/></div>
                </div>
                <div class="cmts">{{content}}</div>
                <ul>
                    <li v-for="data in imageList" :key="data">
                        <img :src="data">
                    </li>
                </ul>
            </div>
        </div>
        <div class="dts">
            <ul>
                <li @click="handledetail()" :class="dtl?'active':''">商品详情</li>
                <li @click="handleparam()" :class="param?'active':''" v-if="pcParamDesc">详细参数</li>
            </ul>
            <div v-html="pcDetailDesc" v-show="dtl"></div>
            <div v-html="pcParamDesc" v-show="param"></div>
        </div>
        <div>
            <nfooter></nfooter>
        </div>
        <div class="fin">
            <van-goods-action>
                <van-goods-action-icon icon="shop-o" text="首页" to='/h5/pages/home/index'/>
                <van-goods-action-icon icon="chat-o" text="客服" />
                <van-goods-action-icon icon="cart-o" text="购物车" to='/shopcar'/>
                <van-goods-action-button type="warning" text="加入购物车" @click="yixuanshow=true"/>
                <van-goods-action-button type="danger" text="立即购买" @click="yixuanshow=true"/>
            </van-goods-action>
        </div>
        <selection v-show="yixuanshow" @selecshow="yixuanshow=false" @colorEvent='colorSelect'></selection>
    </div>
</template>
<script>
import selection from '@/views/category/Selection'
import nfooter from '@/views/shopcar/foot'
import http from '@/util/http'
import nswiper from '@/views/index/Swiper'
import Vue from 'vue'
import { Icon, Rate, GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant'
import { mapMutations } from 'vuex'
Vue.use(Icon).use(Rate).use(GoodsAction).use(GoodsActionButton).use(GoodsActionIcon)
export default {
  components: {
    nswiper,
    nfooter,
    selection
  },
  data () {
    return {
      yixuanshow: false,
      list: null,
      price: 0,
      value: 5,
      message: {},
      nickName: '',
      content: '',
      imageList: [],
      pcDetailDesc: '',
      pcParamDesc: '',
      param: false,
      dtl: true,
      skuName: ''
    }
  },
  mounted () {
    this.hideAsides()
    http({
      url: `/sgsg/api/product/product/product_detail?c=h5&s=20000&t=1606531073107&v=1.0&product_id=${this.$route.query.id}`
    }).then(res => {
      // console.log(this.$route)

      this.list = res.data.data
      this.pcDetailDesc = this.list.product.pcDetailDesc
      this.pcParamDesc = this.list.product.pcParamDesc
    })
    http({
      url: `/sgsg/api/product/sku/sku_stock_detail?c=h5&s=20000&t=1606531075644&v=1.0&product_id=${this.$route.query.id}&stock_type=1`
    }).then(res => {
      this.price = res.data.data.skuLinePriceRange[0] / 100
    })
    http({
      url: `/sgsg/api/comment/list?c=h5&s=20000&t=1606542095535&v=1.0&productId=${this.$route.query.id}&pn=1&ps=1`
    }).then(res => {
      this.message = res.data.data
      if (this.message.pageList[0]) {
        this.nickName = this.message.pageList[0].nickName
        this.content = this.message.pageList[0].content
        this.imageList = this.message.pageList[0].imageList
      }
    })
    // this.getShopCarList(this.$route.query.id)
  },
  methods: {
    ...mapMutations(['hideAsides', 'showAsides']),
    // ...mapActions(['getShopCarList']),
    back () {
      this.$router.push('/pages/cate/cate-home')
    },
    handleparam () {
      this.dtl = false
      this.param = true
    },
    handledetail () {
      this.dtl = true
      this.param = false
    },
    colorSelect (skuName) {
      this.skuName = skuName
    }
  },
  destroyed () {
    this.showAsides()
    // obj = null
  }
}
</script>
<style lang="scss" scoped>
    .active{
        color:#EA413C
    }
    .iconsF{
        vertical-align:top;
        margin-top:.08rem;
    }
    .iconsS{
        vertical-align:top;
        margin-top:.18rem;
    }
    .iconsT{
        vertical-align:top;
        margin-top:.12rem;
    }
#box{
    background:#eee;
    width: 100%;
    .back{
        width: 0.29rem;
        height: 0.29rem;
        line-height:0.29rem;
        text-align:center;
        background:rgba(0,0,0,0.5);
        position:fixed;
        top:0.05rem;
        left:0.05rem;
        border-radius: 50%;
        z-index:16;

    }
    .img{
        width: 100%;
        height: 3.60rem;
        img{
            width: 100%;
        }
        margin-bottom:0.15rem;
    }
    .detail{
        width: 100%;
        padding:0.19rem 0.14rem;
        background: #fff;
        margin-bottom:0.1rem;
        .name{
            width: 3.51rem;
            line-height: 0.32rem;
            font-size: .17rem;
            color:#262626;
        }
        .desc{
            width: 3.51rem;
            line-height:.22rem;
            margin:0.07rem 0 0.1rem;
            font-size:.13rem;
            color:#8C8C8C;
        }
        .price{
            margin-left:0.01rem;
            font-size: .2rem;
            position:relative;
            color:#EA413C;
        }
        .baoyou{
            width: 0.31rem;
            margin-top:0.1rem;
            height: 0.16rem;
            line-height: 0.16rem;
            color:#EA413C;
            background: #FFE6DE;
            margin-left:0.21rem;
            font-size:.11rem;
            text-align:center;
            position:absolute;
            top:-.05rem;
            left:0.95rem;
        }
    }
    .select{
        background:#fff;
        width: 100%;
        margin-bottom:0.1rem;
        .fir{
            width: 3.12rem;
            height: 0.49rem;
            line-height:0.49rem;
            border-bottom:1px solid #eee;
            margin:0.05rem auto;
            p:nth-of-type(1){
                float:left;
                font-size:.13rem;
                color:#8C8C8C;
            }
            p:nth-of-type(2){
                float:left;
                margin-left:0.2rem;
                font-size: .13rem;
                color:#262626;
            }
            div{
                float:right;
            }

        }
        .sec{
            width: 3.12rem;
            height:0.39rem;
            line-height:0.09rem;
            margin:0.1rem auto;
            p{
                float:left;
                padding-top:0.1rem;
                color:#8C8C8C;
                font-size: .13rem;
                margin-right:0.15rem;
            }

        }
    }
    .cmt{
        width: 100%;
        background:#fff;
        margin-bottom: 0.1rem;
        .fir{
            width: 3.31rem;
            height: 0.43rem;
            line-height:0.43rem;
            margin:0 0.14rem;
            p{
                float:right;
                font-size: .12rem;
                color:#8C8C8C;
                span{
                    color:#EA413C;
                }
            }
            .comment{
                float:left;
                color:#262626;
                font-size: .14rem;
            }
            div{
                float:right;
                padding-top:0.03rem;
            }
        }
        .sec{
            width: 3.36rem;
            margin:0.05rem auto;
            .img{
                width: 0.29rem;
                height: 0.29rem;
                float:left;
                margin-right:0.1rem;
                img{
                    vertical-align:top;
                    width: 100%;
                }
            }
            .msg{
                width: 2.97rem;
                height: 0.29rem;
                line-height:0.14rem;
                color:#000;
                div{
                    font-size:.12rem;
                }
            }
            .cmts{
                width: 3.31rem;
                line-height:0.16rem;
                font-size: .14rem;
                color:#262626;
                margin:0.07rem auto;
            }
            ul{
                width: 3.31rem;
                margin:0.07rem auto;
                display: flex;
                flex-wrap: wrap;
                li{
                    width: 0.92rem;
                    height: 0.92rem;
                    margin-right:0.1rem;
                    margin-bottom:0.15rem;
                    img{
                        width: 100%;
                        height:100%;
                    }
                }
            }
        }
    }
    .dts{
        width: 100%;
        background:#fff;
        margin-bottom:0.1rem;
        ul{
            width: 100%;
            height: 0.48rem;
            display:flex;
            justify-content: space-around;
            li{
                height: 0.48rem;
                line-height:0.48rem;
                font-size:.14rem;
                text-align:center;
            }
        }
    }
    .fin{
        width: 100%;
        position:fixed;
        bottom:0;
        left:0;
    }
}

</style>
