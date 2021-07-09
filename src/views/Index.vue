<template>
    <div id="head">
        <header><span>搜狗有品</span></header>
        <div class="main">
            <div class="ic">
                <div>
                    <van-icon name="service-o" size='0.26rem' color="#999" class="icons"/>
                </div>
                <div class="top" v-scolls="300">
                    <a href="#head"><van-icon name="back-top" size='0.26rem' color="#999" class="icons"/></a>
                </div>
            </div>
            <nswiper :key="imageList.length">
                <div class="swiper-slide" v-for="(data,index) in imageList" :key="index">
                    <img :src="data.img" />
                </div>
            </nswiper>
            <div class="catalog">
                <ul>
                    <li v-for="(data,index) in catalogList" :key="index" @click="jumpTo(data.link)">
                        <img :src="`https:${data.img}`" />
                        <p>{{data.name}}</p>
                    </li>
                </ul>
            </div>
            <div class="new">
                <h1>新品首发</h1>
                <div v-for="data in newList" :key="data.id">
                    <img :src="data.img">
                    <div>
                        <h2>{{data.name}}</h2>
                        <p>{{data.desc}}</p>
                        <span>￥{{data.price}}</span>
                    </div>
                    <button>去购买></button>
                </div>
            </div>
            <div class="bargin">
                <h1>超值特惠</h1>
                <ul>
                    <li v-for="data in barginList" :key="data.id">
                        <div><img :src="data.img" alt=""><span class="label">{{data.label}}</span></div>
                        <p>{{data.name}}</p>
                        <p class="sec">{{data.desc}}</p>
                        <p class="thi">￥{{data.price}}</p>
                    </li>
                </ul>
                <ul class="UL">
                    <li v-for="data in giftList" :key="data.title">
                        <a :href="data.link"><img :src="data.img" alt=""></a>
                    </li>
                </ul>
            </div>
            <div class="bargin">
                <h1>智能AI办公</h1>
                <ul>
                    <li v-for="data in officeList" :key="data.id">
                        <div><img :src="data.img" alt=""></div>
                        <p>{{data.name}}</p>
                        <p class="sec">{{data.desc}}</p>
                        <p class="thi">￥{{data.price}}</p>
                    </li>
                </ul>
            </div>
            <div class="solve">
                <h1>搜狗AI录音笔行业解决方案</h1>
                <nswiper>
                    <div class="swiper-slide">
                        <img src="//img03.sogoucdn.com/app/a/201029/sale-bg-new.png" alt="">
                        <div class="cove">
                            <h2 :style="{color:'#EA413C'}">搜狗AI录音笔</h2>
                            <h3 :style="{color:'#EA413C'}">对销售行业赋能</h3>
                            <div>跟踪、整合销售人员谈话文案</div>
                            <div>大数据智能分析，快速整理销售智能方案</div>
                            <div>提高客户成交率，提高业绩</div>
                            <div class="btns">
                                <button>经典案例</button>
                                <button class="whit">我要咨询</button>
                            </div>
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <img src="//img03.sogoucdn.com/app/a/201029/office-bg.png" alt="">
                        <div class="cove">
                            <h2 :style="{color:'#3C9CFF'}">搜狗AI录音笔</h2>
                            <h3 :style="{color:'#3C9CFF'}">让办公更智能</h3>
                            <div>提升团队整体工作效率及整体素质</div>
                            <div>帮你打造更具战斗力团队</div>
                            <div>超额完成工作目标</div>
                            <div class="btns">
                                <button>经典案例</button>
                                <button class="whit">我要咨询</button>
                            </div>
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <img src="//img03.sogoucdn.com/app/a/201029/edu-bg.png" alt="">
                        <div class="cove">
                            <h2 :style="{color:'#2DE387'}">搜狗智能硬件</h2>
                            <h3 :style="{color:'#2DE387'}">为教育行业赋能</h3>
                            <div>智能整理各类学科学习方案</div>
                            <div>让教育更加数字化、智能化</div>
                            <div>快速提升学生们的学生成绩</div>
                            <div class="btns">
                                <button>经典案例</button>
                                <button class="whit">我要咨询</button>
                            </div>
                        </div>
                    </div>
                </nswiper>
            </div>
            <div class="lookFor">
                <h1>查找附近的体验店</h1>
                <div>
                    <img src="//img01.sogoucdn.com/app/a/201029/store.png" alt="">
                    <router-link tag="button" to="/h5/pages/store-map/index">800 + 线下门店为您服务 ></router-link>
                </div>
            </div>
            <div class="foot">
                <div>
                    <img src="//img02.sogoucdn.com/app/a/201029/icon-sogou.png" alt="">
                </div>
                <p>搜狗商城让生活更智能更方便</p>
                <button>400-123-7676</button>
                <ul>
                    <li>关于我们</li>
                    <li>意见反馈和投诉</li>
                    <li>售后服务</li>
                    <li>用户协议</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import nswiper from '@/views/index/Swiper'
import http from '@/util/http'
import { Icon } from 'vant'
import Vue from 'vue'
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
    nswiper
  },
  data () {
    return {
      isShow: true,
      imageList: [],
      catalogList: [],
      newList: [],
      barginList: [],
      giftList: [],
      officeList: []
    }
  },
  methods: {
    jumpTo (link) {
      const reg1 = /jd-union/
      const reg2 = /cate-list\?id=[0-9]+/
      const reg3 = /cate-home/
      const reg4 = /detail\?id=[0-9]+/
      if (link.match(reg1)) {
        this.$router.push('/pages/jd-union/list')
      } else if (link.match(reg2)) {
        const id = link.match(reg2)[0].substr(13)
        this.$router.push({
          path: '/classify',
          query: {
            id: id
          }
        })
      } else if (link.match(reg3)) {
        this.$router.push('/pages/cate/cate-home')
      } else if (link.match(reg4)) {
        const id = link.match(reg4)[0].substr(10)
        this.$router.push({
          path: '/pages/detail/detail',
          query: {
            id: id
          }
        })
      }
    }
  },
  mounted () {
    http({
      url: '/sgsg/json/mobile/new-home.json?c=h5&s=20000&t=1605940709616&v=1.0&autoHandle=false'
    }).then(res => {
      // console.log(res.data)
      this.imageList = res.data.data.mods[0].list
      this.catalogList = res.data.data.mods[1].list
      this.newList = res.data.data.mods[2].list
      this.barginList = res.data.data.mods[3].list
      this.giftList = res.data.data.mods[4].list
      this.officeList = res.data.data.mods[5].list
    })
  }
}
</script>
<style lang="scss" scoped>
#head{
    height:100%;
    overflow: scroll;
}
  header{
      height:.5rem;
      line-height:.5rem;
      background:#000;
      text-align:center;
      span{
          color:#fff;
          vertical-align:top;
          font-size:.16rem;
      }
  }
  .ic{
      width: .40rem;
      height:.90rem;
      position:fixed;
      bottom:1.3rem;
      right:.2rem;
      z-index:20;
      .icons{
          vertical-align: top;
        }
      div{
         width: .39rem;
         height:.39rem;
         padding-top:.06rem;
         text-align: center;
         background: #eee;
         border-radius: 50%;
      }
      .top{
         margin-top:.2rem;
         display: none;

      }
  }
  .main{
    width:100%;
    background-color: #eee;
    position: relative;
    .swiper-slide{
        width:100%;
        height:2.06rem;
        img{
            width: 100%;
            height:100%;
            vertical-align: top;

        }
    }
    .catalog{
        width: 3.44rem;
        height:1.53rem;
        background:#fff;
        position: absolute;;
        top:1.5rem;
        left:50%;
        margin-left:-1.72rem;
        z-index:5;
        padding:0.16rem 0.10rem 0 0.14rem;
        ul{
            width:100%;
            display:flex;
            flex-wrap: wrap;
            li{
                width: .60rem;
                height: .53rem;
                text-align:center;
                margin:0 0.2rem 0.15rem 0;
                img{
                    width: .35rem;
                    vertical-align: top;

                }
                p{
                    font-size: .12rem;
                    margin-top:-.7rem;
                }
            }
        }
    }
    .new{
        margin-top:1.50rem;
        margin-bottom: .20rem;
        width: 100%;
        h1{
            height:.4rem;
            line-height: .4rem;
            font-size: .18rem;
            margin-left:.1rem;
        }
        div{
            width: 3.41rem;
            height: 3.84rem;
            margin:.08rem auto;
            position: relative;
            img{
                vertical-align: top;
                width: 100%;
            }
            div{
                position:absolute;
                top:.2rem;
                left:.2rem;
                width: 3.10rem;
                height:3.60rem;
                color:#fff;
                h2{
                    font-size: .2rem;
                }
                p{
                    font-size:.12rem;
                    margin: 0.1rem 0;
                }
                span{
                    font-size: .17rem;
                    font-weight: 800;
                    vertical-align: top;
                }
            }
            button{
                position:absolute;
                bottom:.1rem;
                right:.15rem;
                border:none;
                border:1px solid #fff;
                border-radius: .1rem;
                background:(0,0,0,0);
                color:#fff;
                width: .5rem;
                height: .19rem;
                font-size: .11rem;
                vertical-align: top;

            }
        }
    }
    .bargin{
        margin-top:.5rem;
        margin-bottom: .2rem;
        width: 100%;
        h1{
            height:.4rem;
            line-height: .4rem;
            font-size: .18rem;
            margin-left:.1rem;
        }
        ul{
            margin:0 0.1rem;
            display:flex;
            flex-wrap: wrap;
            justify-content: space-between;
            width: 3.4rem;
            li{
                margin:0.1rem 0;
                background:#fff;
                width: 1.66rem;
                div{
                    width: 1.66rem;
                    height: 1.66rem;
                    position:relative;
                    text-align:center;
                    margin-bottom:.1rem;
                    img{
                        width: 100%;
                        height: 100%;
                        vertical-align: top;

                    }
                    .label{
                        height:.16rem;
                        background:#EA413C;
                        color:#fff;
                        font-size: .1rem;
                        text-align:center;
                        position: absolute;
                        bottom:0;
                        left:.55rem;
                        padding:0 0.05rem
                    }
                }
                .sec{
                    color:#8c8c8c;
                    font-weight:500;
                    margin-bottom: .05rem;
                    font-size:.12rem;
                    width: 100%;
                    text-align:center;
                    margin:0;
                }
                .thi{
                    width: 100%;
                    text-align:center;
                    color:#EA413C;
                    font-weight: 600;
                    font-size: .13rem;
                    margin:0;
                    margin-bottom: .08rem;
                }
                p{
                    height:.2rem;
                    line-height:.2rem;
                    font-size: .14rem;
                    font-weight:800;
                    margin-left:.12rem;
                    width: 1.47rem;
                    text-overflow: ellipsis;
                    overflow:hidden;
                    white-space: nowrap;
                    word-break: break-all;
                    text-align:center;
                }

            }
        }
        .UL{
            li{
                width: 1.66rem;
                height: .72rem;
                img{
                    width: 100%;
                    vertical-align: top;

                }
            }
        }
    }
    .solve{
        margin-top:.5rem;
        margin-bottom: .2rem;
        width: 100%;
        h1{
            height:.4rem;
            line-height: .4rem;
            font-size: .18rem;
            margin-left:.1rem;
        }
        .swiper-slide{
            width: 100%;
            height: 3.60rem;
            position: relative;
            img{
                width: 100%;
                vertical-align: top;
            }
            .cove{
                position:absolute;
                top:0;
                left:0;
                width: 100%;
                height:3.60rem;
                margin:0;
                h2{
                    text-align:center;
                    margin-bottom:.10rem;
                    margin-top:.50rem;
                    font-size: .26rem;
                }
                h3{
                    text-align:center;
                    margin-bottom:.10rem;
                    font-size:.24rem;
                }
                div{
                    margin:0 auto;
                    padding:0;
                    color:#fff;
                    height:.2rem;
                    line-height: .2rem;
                    font-size:.14rem;
                    text-align:center;
                }
                .btns{
                    width: 2.25rem;
                    height:.36rem;
                    margin:0.20rem auto;
                    display: flex;
                    justify-content: space-between;
                    button{
                        width: .96rem;
                        height: .36rem;
                        padding:0 0.14rem;
                        font-size:.14rem;
                        border:1px solid #fff;
                        color:#fff;
                        background:(0,0,0,0);
                        vertical-align: top;

                    }
                    .whit{
                        border:1px solid #fff;
                        color:#000;
                        background:#fff
                    }
                }
            }
        }
    }
    .lookFor{
        width: 100%;
        height: 2.11rem;
        padding:0.20rem 0.10rem;
        margin-bottom:1rem;
        h1{
            height:.4rem;
            line-height: .4rem;
            font-size: .18rem;
        }
        div{
            width: 100%;
            height: 100%;
            position:relative;
            img{
                width: 100%;
                vertical-align: top;

            }
            button{
                position: absolute;
                left:50%;
                margin-left:-.9rem;
                bottom:-.2rem;
                width: 1.80rem;
                height: .25rem;
                color:#fff;
                border:none;
                border:1px solid #fff;
                border-radius: .13rem;
                background: (0,0,0,0);
                font-size:.13rem;
            }
        }
    }
    .foot{
        width: 100%;
        height:2.20rem;
        text-align: center;
        div{
            width: 1.10rem;
            height:.23rem;
            margin:0 auto;
            margin-bottom:.10rem;
            img{
                width: 100%;
                vertical-align: top;

            }
        }
        p{
            color:#8c8c8c;
            font-size:.12rem;
            margin-bottom: .30rem;
        }
        button{
            width: 1.38rem;
            height:.36rem;
            border:none;
            border:1px solid #8c8c8c;
            font-size:.13rem;
            border-radius: .25rem;
            margin-bottom:.30rem;
            background: (0,0,0,0);
            vertical-align: top;

        }
        ul{
            width: 100%;
            margin-top:-.3rem;
            display: flex;
            justify-content: space-around;
            li{
                font-size: .12rem;
                color:#8c8c8c;
            }
        }
    }
  }

</style>
