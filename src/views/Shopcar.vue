<template>
    <div>
        <carHeader><div class="carHead">购物车</div></carHeader>
        <div id="box">
            <div class="car">
                <div class="fir">
                    <div class="outer l" @click="allCheck()">
                        <div class="inter" v-show="notShow"></div>
                    </div>
                    <div class="l allin">全选</div>
                    <div class="edit" @click="edt()" v-show="edtShow">编辑</div>
                    <div class="edit" @click="edt()" v-show="cplShow">完成</div>
                </div>
                <div v-show="!list.length" class="blk">
                    <div>
                        <van-icon name="shopping-cart-o" size="0.4rem" />
                    </div>
                    <p>您的购物车还是空的</p>
                    <button @click="jumptoIndex()">去逛逛</button>
                </div>
                <ul class="sec" v-show="list.length">
                    <li v-for="(data,index) in list" :key="data._id" >
                        <div class="outer l single" @click="singleCheck(index)">
                            <div class="inter" v-show="data.selected" ></div>
                        </div>
                        <div class="img l"><img :src="data.image"></div>
                        <div class="rig l">
                            <p>{{data.productName}}</p>
                            <p>{{data.skuName}}</p>
                            <span>￥{{data.price}}</span>
                            <div class="numb">
                                <button @click="data.productNum>1?data.productNum--:data.productNum=1" :disabled="data.productNum===1" class="jian">-</button>{{data.productNum}}<button @click="data.productNum++" class="jia">+</button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div>
              <nfooter></nfooter>
            </div>
            <!-- <div class="final">没有更多了</div> -->
        </div>
        <div class="sub">
            <div class="outer l" @click="allCheck()">
                <div class="inter" v-show="notShow"></div>
            </div>
            <div class="l allin">全选</div>
            <div v-if="ordShow">
                <button @click="order()">结算</button>
                <p>￥{{sum}}.00</p>
                <span>合计：</span>
            </div>
            <button class="del" v-if="delShow" @click="del()">删除</button>
        </div>
    </div>
</template>
<script>
// import { obj } from '@/views/category/Selection'
import nfooter from '@/views/shopcar/foot'
import http from '@/util/http'
import axios from 'axios'
import carHeader from '@/views/header/head'
import Vue from 'vue'
import { SubmitBar, Icon, Toast } from 'vant'
import { mapMutations, mapState } from 'vuex'

// import { mapState, mapMutations } from 'vuex'
// var lists = []
Vue.use(SubmitBar).use(Icon).use(Toast)
export default {
  data () {
    return {
      edtShow: true,
      cplShow: false,
      ordShow: true,
      delShow: false,
      checked: true,
      selList: [],
      recList: [],
      notShow: false,
      list: []
    }
  },
  mounted () {
    // const param = new URLSearchParams()
    // param.append('c', 'h5')
    // param.append('s', '20000')
    // param.append('t', '1605267606318')
    // param.append('v', '1.0')
    // for(var attr in this.shopCarList){
    //    this.list.push(this.shopCarList[attr].sku)
    // }

    http({
      url: '/heihei/api/product/product/product_list?c=h5&s=20000&t=1605257682140&v=1.0&category_id=0&sort_field=1&sort_order=2&pn=1&ps=4'
    }).then(res => {
      this.recList = res.data.data.pageList
    })
    const product = {}
    product.user = localStorage.getItem('username')
    axios.post('http://localhost:3003/carlists/msg', product).then(res => {
      console.log(res.data)
      this.list = res.data
    })
    // if (obj != null) {
    //   var newObj = {}
    //   for (var attr in obj) {
    //     newObj[attr] = obj[attr]
    //     // obj = {}
    //   }

    //   if (newObj.productId !== 0) {
    //     if (lists.length) {
    //       for (var i = 0; i < lists.length; i++) {
    //         if (lists[i].productId === newObj.productId) {
    //           // console.log(lists[i].productId, newObj.productId, lists)
    //           lists[i].productNum += newObj.productNum
    //           // console.log('id同，颜色同')
    //           axios.post('http://localhost:3003/carlists/editnum', lists[i]).then(res => {
    //             console.log(res.data)
    //           })
    //           break
    //         } else {
    //           if (i === lists.length - 1) {
    //             lists.push(newObj)
    //             break
    //           }
    //           // console.log('id不同')
    //         }
    //       }
    //     } else {
    //       lists.push(newObj)
    //       // console.log('xinde ')
    //     }

    //     obj.productId = 0
    //   }
    //   //
    //   this.list = lists

    //   // console.log(obj)
    // }
    // http({

    //   url: '/heihei/api/user/cart/list_product',
    //   method: 'post',
    //   data: param,

    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   }
    // }).then(res => {
    //   this.list = res.data.data.productList
    //   console.log(res.data.data.productList)
    // })
  },

  methods: {
    ...mapMutations(['setShopList']),
    edt () {
      this.ordShow = !this.ordShow
      this.delShow = !this.delShow
      this.edtShow = !this.edtShow
      this.cplShow = !this.cplShow
      // console.log(this.shopCarList)
    },
    del () {
      axios.post('http://localhost:3003/carlists/delelists', this.selList).then((res) => {
        console.log(res.data)
      })
      this.list = this.list.filter(item => item.selected === false)
      this.selList = this.list.filter(item => item.selected === true)
      if (!this.list.length) {
        this.notShow = false
      }
      // lists = this.list
      // obj.productId = 0
      // obj.selected = false
    },
    order () {
      const code = Math.floor(Math.random() * 100000000000 + 100000000000)
      this.selList[0].code = code
      if (this.selList.length) {
        axios.post('http://localhost:3003/unsubmitteds/newpdts', this.selList).then(res => {
          console.log(res.data)
        })
        axios.post('http://localhost:3003/carlists/delelists', this.selList).then(res => {
          console.log(res.data)
        })
        this.$router.push({ name: 'neworder', params: { code: code } })
      } else {
        Toast('您还未选择商品')
      }
    },

    allCheck () {
      this.notShow = !this.notShow
      this.list.forEach(item => {
        item.selected = this.notShow
      })
      if (this.notShow) {
        this.selList = this.list
      } else {
        this.selList = []
      }
      // console.log(this.selList)
    },
    singleCheck (index) {
      this.list[index].selected = !this.list[index].selected
      this.selList = this.list.filter(item => item.selected === true)
      this.setShopList(this.selList)

      if (this.judge()) {
        this.notShow = true
      } else {
        this.notShow = false
      }
    },
    judge () {
      for (var i = 0; i < this.list.length; i++) {
        if (!this.list[i].selected) {
          return false
        }
      }
      return true
    },
    jumptoIndex () {
      this.$router.push('/h5/pages/home/index')
    }
  },
  components: {
    carHeader,
    nfooter
  },
  computed: {
    ...mapState(['shoplist']),
    sum () {
      var res = 0
      for (var i = 0; i < this.selList.length; i++) {
        res += this.selList[i].price * this.selList[i].productNum
      }
      return res
    }
  }
}
</script>
<style lang="scss" scoped>
.l{
    float:left;
}
.outer{
    margin:.1rem;
    width: .2rem;
    height: .2rem;
    border:1px solid #ddd;
    border-radius: 50%;
    background-color: #fff;
    position:relative;
    .inter{
        width: .1rem;
        height: .1rem;
        position: absolute;
        left:23%;
        top:23%;
        border-radius: 50%;
        background-color: red;
    }
}
    .carHead{
        border-bottom: 1px solid #eee;
    }
    #box{
        width:100%;
        background-color:rgb(241, 240, 240);
        .car{
            width:100%;
            background-color:#fff;
            margin-top:.5rem;
            margin-bottom:.15rem;
            .fir{
                width:100%;
                border-bottom:1px solid #eee;
                height:.4rem;
                .allin{
                    height:.4rem;
                    line-height:.4rem;
                    font-size:.13rem;
                }
                .edit{
                    height: 0.4rem;
                    line-height:.4rem;
                    float:right;
                    margin-right:.1rem;
                    font-size:.13rem;
                }
            }
            .sec{
                width: 100%;
                background-color : #fff;
                li{
                    margin:0 0.1rem;
                    padding:0.1rem 0;
                    border-bottom:1px solid #eee;
                    height:1.2rem;
                    .single{
                        margin-top:.35rem;
                    }
                    .img{
                        width: 1rem;
                        height: 1rem;
                        border:1px solid red;
                        margin-right:.1rem;
                        img{
                          width: 100%;
                          height: 100%;
                          vertical-align:top;

                        }
                    }
                    .rig{
                        position:relative;
                        p{
                            font-size:.12rem;
                            margin-bottom: .1rem;
                            width:1.9rem;
                        }
                        span{
                            font-size: .14rem;
                            color:red;
                            position:absolute;
                            top:.7rem;
                        }
                        .numb{
                            float:right;
                            text-align:center;
                            font-size: .15rem;
                            position:absolute;
                            top:.6rem;
                            right:0rem;
                            button{
                                width: .3rem;
                                height: .3rem;
                                font-size: .2rem;
                                font-weight: 500;
                                border:none;

                                background-color:#fff;
                            }
                        }
                    }
                }
            }
            .blk{
                height:1.6rem;
                background-color:#fff;
                position:relative;
                div{
                    position:absolute;
                    top:10%;
                    left:45%;
                    width: 1rem;
                    height:.48rem;
                    line-height:.48rem;
                }
                p{
                    position:absolute;
                    top:50%;
                    left:50%;
                    margin-left:-1rem;
                    text-align:center;
                    width: 2rem;
                    height:.2rem;
                    line-height:.2rem;
                    font-size:.16rem;
                }
                button{
                    position:absolute;
                    top:70%;
                    left:50%;
                    margin-left:-.48rem;
                    width: .96rem;
                    height: .26rem;
                    line-height: .26rem;
                    border:none;
                    border:1px solid red;
                    text-align: center;
                    font-size: .15rem;
                    color:red;
                    vertical-align:top;
                    background-color: #fff;
                }
            }
        }
        .rec{
            height:5.32rem;
            background-color: #fff;
            h4{
                height:.25rem;
                line-height:.25rem;
                margin-left:.1rem;
                font-weight: 400;
            }
            ul{
                margin:.1rem;
                display:flex;
                justify-content: space-between;
                flex-wrap: wrap;
                li{
                    height:2rem;
                    margin-bottom:.15rem;
                    div{
                        width: 1.65rem;
                        height:1.65rem;
                        margin-bottom:.05rem;
                        img{
                            width: 1.6rem;
                            vertical-align:top;
                            height: 1.6rem;
                        }
                    }
                    p{
                        height:.2rem;
                        line-height: .2rem;
                        font-size: .12rem;
                        width: 1.6rem;
                        overflow:hidden;
                    }
                    .des{
                        color:#666
                    }
                    span{
                        color: red;
                        font-size: .15rem;
                        font-weight: 500;
                        vertical-align:top;

                    }
                }
            }
        }
        .final{
            color:#aaa;
            font-size: .13rem;
            text-align:center;
            font-weight: 300;
            height:.9rem;
            line-height:.3rem;
        }

    }
    .sub{
        position:fixed;
        bottom:.5rem;
        z-index:15;
        background-color: #fff;
        height:.5rem;
        width: 100%;
        .allin{
            height:.50rem;
            line-height:.5rem;
            font-size:.15rem;
        }
        .outer{
            margin-top:.14rem;
        }
        p{
            font-size:.15rem;
            float:right;
            height:.5rem;
            line-height: .5rem;
            margin-right:.2rem;
            color:red;
            width: .5rem;
        }
        span{
            display: block;
            float:right;
            color:#000;
            height:.5rem;
            line-height: .5rem;
            vertical-align:top;
            font-size:.15rem;
        }
        button{
            float:right;
            height:.5rem;
            line-height: .5rem;
            width: 1rem;
            border:none;
            text-align: center;
            background:rgb(240, 72, 72);
            color:#fff;
            font-size: .15rem;
            vertical-align:top;

        }
        .del{
            width: .86rem;
            height: .29rem;
            line-height: .29rem;
            border:none;
            border:1px solid #eee;
            text-align: center;
            background:#fff;
            float:right;
            border-radius: .2rem;
            margin:.1rem;
            color:#000;
            font-size: .15rem;
        }
    }
</style>
