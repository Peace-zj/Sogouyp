<template>
    <div id="box">
        <centerHead><div>个人中心</div></centerHead>
        <div id="bo">
            <div class="navBar">
                <p @click="exit()">退出登录</p>
                <div>
                    <div class="head"></div>
                    <div>{{name}}</div>
                </div>
            </div>
            <div class="all">
                <div class="fir">
                    <div>
                        <h2>我的订单</h2>
                        <span>全部订单 ></span>
                    </div>
                    <ul>
                        <li>
                            <van-icon name="pending-payment" size=".32rem" @click="myOrder()" color="red"/>
                            <p>待付款</p>
                        </li>
                        <li>
                            <van-icon name="send-gift-o" size=".32rem" @click="myOrder()" color="red"/>
                            <p>待发货</p>
                        </li>
                        <li>
                            <van-icon name="logistics" size=".32rem" @click="myOrder()" color="red"/>
                            <p>待收货</p>
                        </li>
                        <li>
                            <van-icon name="comment-o" size=".32rem" @click="myOrder()" color="red"/>
                            <p>待评价</p>
                        </li>
                        <li>
                            <van-icon name="service-o" size=".32rem" @click="myOrder()" color="red"/>
                            <p>退款/售后</p>
                        </li>
                    </ul>
                </div>
                <div class="sec">
                    <ul>
                        <li><van-icon name="bill-o" size=".22rem" color="red"/><span>我的优惠券</span><div><van-icon name="arrow" size=".15rem"/></div></li>
                        <li><van-icon name="vip-card-o" size=".22rem" color="red"/><span>S码通道</span><div><van-icon name="arrow" size=".15rem"/></div></li>
                        <li><van-icon name="calendar-o" size=".22rem" color="red"/><span>我的预售</span><div><van-icon name="arrow" size=".15rem"/></div></li>
                        <li><van-icon name="gift-o" size=".22rem" color="red"/><span>我的礼物</span><div><van-icon name="arrow" size=".15rem"/></div></li>
                        <li><van-icon name="location-o" size=".22rem" color="red"/><span>地址管理</span><div><van-icon name="arrow" size=".15rem"/></div></li>
                        <li><van-icon name="records" size=".22rem" color="red"/><span>意见反馈</span><div><van-icon name="arrow" size=".15rem"/></div></li>
                        <li><van-icon name="shop-o" size=".22rem" color="red"/><span>关于商城</span><div><van-icon name="arrow" size=".15rem"/></div></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import { Icon, Toast } from 'vant'
import centerHead from '@/views/header/head'
Vue.use(Icon)
export default {
  components: {
    centerHead
  },
  data () {
    return {
      name: ''
    }
  },
  methods: {
    exit () {
      this.$router.push('/login')
      localStorage.setItem('username', '')
      localStorage.setItem('password', '')
      localStorage.setItem('code', '')
      Toast('退出成功')
    }
  },
  mounted () {
    this.name = localStorage.getItem('username')
  }
}
</script>
<style lang="scss" scoped>
    #box{
        display:flex;
        flex-direction: column;
        height:100%;

        #bo{
            margin-top:.5rem;
            background-color: #eee;
            height:6.8rem;
            position:relative;
            .navBar{
                background-color: #000;
                height:1.9rem;
                p{
                    position:absolute;
                    text-align: center;
                    height:.5rem;
                    width:.5rem;
                    line-height:.5rem;
                    right:0;
                    margin-right:.2rem;
                    font-size:.12rem;
                    color:#aaa;
                }
                div{
                    margin-left:.15rem;
                    div{
                        float:left;
                        color:#fff;
                        font-size:.15rem;
                        height:.6rem;
                        line-height:.6rem;
                        margin-top:.5rem;
                    }
                    .head{
                        float:left;
                        width: .6rem;
                        height: .6rem;
                        background-color: rgb(255,255,255,0.8);
                        border-radius: 50%;
                        margin-right:.1rem;
                        margin-top:.5rem;

                    }
              }
            }
        .all{
            position: absolute;
            width: 3.4rem;
            left:50%;
            margin-left:-1.7rem;
            top:1.5rem;
            z-index: 5;
            .fir,.sec{
                background-color: #fff;
            }
            .fir{
                height:1.4rem;
                margin-bottom: .2rem;
                div{
                    height:.35rem;
                    line-height:.35rem;
                    h2{
                        float:left;
                        margin-left:.1rem;
                        font-size:.15rem;
                        width: 1rem;
                    }
                    span{
                        float:right;
                        margin-right:.1rem;
                        font-size:.12rem;
                    }
                }
                ul{
                    margin-top:.1rem;
                    width: 100%;
                    display: flex;
                    justify-content: space-around;
                    li{
                        margin:0 0.1rem;
                        height:.6rem;
                        line-height:.3rem;
                        text-align:center;
                        p{
                            font-size:.14rem;
                        }
                    }
                }
            }
            .sec{
                ul{
                    width: 3.4rem;
                li{
                    border-bottom:0.01rem solid #eee;
                    height:.48rem;
                    width: 3.3rem;
                    line-height:.01rem;
                    margin:0 0.05rem;
                    span{
                        font-size:.14rem;
                        margin-left:0.05rem;
                    }
                    div{
                        float:right;
                        margin-right:0.05rem;
                    }
                }
                }
            }
        }
        }
    }
</style>
