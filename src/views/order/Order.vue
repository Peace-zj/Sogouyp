<template>
    <div class="all">
        <orderHead><div class="carHead"><van-icon name="arrow-left" class="icons" @click="back()"/>填写订单</div></orderHead>
        <div class="card">
          <div class="cont">
            <div v-show="!show" class="box" @click="adslist()">
              <div v-if="list[0]">
                <span class="nm">{{list[0].name}}</span>
                <span class="tel">{{list[0].tel}}</span>
              </div>
              <p v-if="list[0]">{{list[0].address}}</p>
              <van-icon name="arrow" class="ic" size='.15rem'/>
            </div>
            <div class="btn" @click="address()" v-show="show">
              <button>+</button>
            <span>添加收货地址和联系方式</span></div>
          </div>
          <div class="borders"></div>
        </div>
        <div class="pay zero"><span class="left">支付方式</span><span class="right">在线支付</span></div>
        <div :style="{marginTop:'.1rem'}">
            <van-card
                :style="{background:'#fff',marginTop:'0'}"
                v-for="data in shoplist"
                :key="data._id"
                :num="data.tradeNum"
                :price="data.tradePrice"
                :desc="data.tradeColor"
                :title="data.tradeName"
                :thumb="data.tradeImg"
            />
        </div>
        <div class="pay zero"><span class="left">配送方式</span><span class="right">快递包邮</span></div>
        <div class="pay zero">
            <span class="left">订单备注</span>
            <input class="right ipt" placeholder="选填，请先与客服协商一致"/>
        </div>
        <div class="last zero">
            <div class="pay"><span class="left">商品总价</span><span class="right">￥{{sum}}.00</span></div>
            <div class="pay"><span class="left">优惠卷</span><span class="right">暂无可用</span></div>
            <div class="pay"><span class="left">运费</span><span class="right red">￥0.00</span></div>
        </div>
        <div class="sub">
                <span :style="{float:'left',marginLeft:'.1rem'}">共{{num}}件</span>
                <button @click="order()">提交订单</button>
                <p>￥{{sum}}.00</p>
                <span>合计：</span>
        </div>
    </div>
</template>
<script>
import orderHead from '@/views/header/head'
import Vue from 'vue'
import axios from 'axios'
import { Icon, AddressList, Card, Toast } from 'vant'
import { mapMutations, mapState } from 'vuex'

Vue.use(AddressList).use(Icon).use(Card)

export default {
  data () {
    return {
      list: [],
      show: false,
      shoplist: [],
      code: {}
    }
  },
  components: {
    orderHead
  },
  computed: {
    ...mapState(['username']),
    sum () {
      var res = 0
      for (var i = 0; i < this.shoplist.length; i++) {
        res += this.shoplist[i].tradePrice * this.shoplist[i].tradeNum
      }
      return res
    },
    num () {
      var res = 0
      for (var i = 0; i < this.shoplist.length; i++) {
        res += this.shoplist[i].tradeNum
      }
      return res
    }
  },
  methods: {
    ...mapMutations(['showAsides', 'hideAsides']),
    back () {
      this.$router.push('/shopcar')
    },
    address () {
      this.$router.push('/Address')
    },
    order () {
      this.shoplist[0].name = this.list[0].name
      this.shoplist[0].tel = this.list[0].tel
      this.shoplist[0].address = this.list[0].address
      // console.log(this.shoplist)
      // this.$nextTick(() => {
      //
      // })
      axios.post('http://localhost:3003/unsubmitteds/delunsbted', this.shoplist).then(res => {
        console.log(res.data)
      })
      axios.post('http://localhost:3003/orders/neworder', this.shoplist).then((res) => {
        Toast('提交成功')
        console.log(this.shoplist)
      })
      this.$router.push('/shopcar')
      // axios.post('http://localhost:3003/carlists/delelists', this.list).then((res) => {
      //   console.log(res.data)
      // })
    },
    adslist () {
      this.$router.push({ name: 'edit', params: { code: this.code.code } })
      // this.$router.push('/edit')
      // this.$router.push({ name: 'neworder', params: { code: code } })
    }
  },
  mounted () {
    this.hideAsides()
    const obj = {}
    obj.user = localStorage.getItem('username')
    this.code.code = this.$route.params.code
    console.log(this.code)
    axios.post('http://localhost:3003/unsubmitteds/msg', this.code).then(res => {
      // console.log(res.data)
      this.shoplist = res.data
      // console.log(res.data)
    })
    axios.post('http://localhost:3003/address/msg', obj).then(res => {
      // console.log(res.data)
      this.list = res.data.filter(item => item.selected === true)
      if (res.data.length) {
        this.show = false
      } else {
        this.show = true
      }
    })
  },
  destroyed () {
    this.showAsides()
  }
}
</script>
<style lang="scss" scoped>
.all{
    background: #eee;
}
.carHead{
        border-bottom: 1px solid #eee;
    }
.icons{
    float:left;
    margin-top:.17rem;
    margin-left:.1rem
}
.card{
    margin-top:.5rem;
    height:.74rem;
    background:#fff;
    .borders{
      height:.04rem;
      background: repeating-linear-gradient(
        to right,
        rgb(44, 44, 247) 0rem,
        rgb(44, 44, 247) .15rem,
        #fff .15rem,
        #fff .3rem,
        rgb(247, 44, 54) .3rem,
        rgb(247, 44, 54) .45rem,
        #fff .45rem,
        #fff .6rem);
    }
    .cont{
      height:.7rem;
      position: relative;
      .btn{
        width:2.1rem;
        line-height:.2rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        font-size: .15rem;
          button{
            height:.3rem;
            width: .3rem;
            background:rgb(231, 231, 231);
            border:none;
            font-size:.25rem;
            color:#aaa;
            margin-right:.1rem;
            float:left;
          }
          span{
            float:left;
            line-height:.3rem;
          }
      }

      .box{
        height:.7rem;
        margin-left:.2rem;
        position:relative;
        div{
          height:.3rem;
          line-height:.35rem;
          font-size:.17rem;
          font-weight:bold;
          span{
            margin-right:.2rem
          }
        }
        p{
          height:.4rem;
          line-height:.4rem;
          font-size:.15rem;
        }
        .ic{
          position:absolute;
          top:50%;
          right:.17rem;
          margin-top:-.08rem
        }
      }
    }
}

.pay{
    height:.5rem;
    background: #fff;
    .left{
        float:left;
        margin-left:.12rem;
        font-size:.15rem;
        margin-top:.13rem;
    }
    .right{
        float:right;
        margin-right:.12rem;
        font-size:.15rem;
        font-weight: bold;
        margin-top:.13rem;
    }
    .red{
        color:red
    }

}
.zero{
        margin-top:.1rem
    }
.ipt{
    border:none;
    height:.3rem;
    font-size: .15rem;
    text-align:right;
    font-weight: normal;
}
.sub{
        position:fixed;
        bottom:0;
        z-index:15;
        background-color: #fff;
        height:.6rem;
        width:100%;
        p{
            font-size:.15rem;
            float:right;
            height:.6rem;
            line-height: .6rem;
            margin-right:.25rem;
            color:red;
            width: .5rem;
        }
        span{
            display: block;
            float:right;
            color:#000;
            height:.6rem;
            line-height: .6rem;
            vertical-align:top;
            font-size:.15rem;
        }
        button{
            float:right;
            height:.6rem;
            line-height: .6rem;
            width: 1rem;
            border:none;
            text-align: center;
            background:rgb(240, 72, 72);
            color:#fff;
            font-size: .15rem;
            vertical-align:top;

        }
}
</style>
