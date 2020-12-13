<template>
  <div id="selection">
    <div class="cove"></div>
    <div class="selectCar">
      <div class="fir">
        <div class="img">
          <img :src="imgUrl" />
        </div>
        <div>
          <p>{{ name }}</p>
          <span>￥{{ price }}</span>
        </div>
        <van-icon name="cross" size="0.2rem" @click="isShowfor" />
      </div>
      <div class="sec">
        <p>颜色</p>
        <ul>
          <li
            class="color"
            @click="changeBorder(index,data)"
            v-for="(data, index) in ColorList"
            :key="index"
            ref="Lis"
          >
            {{ data }}
          </li>
        </ul>
      </div>
      <div class="thir">
        <p>数量</p>
        <div class="numb">
          <button @click="num > 1 ? num-- : (num = 1)" :disabled="num === 1">
            -
          </button>
          <div>{{ num }}</div>
          <button @click="num++">+</button>
        </div>
      </div>
    </div>
    <div id="Btns">
      <button class="car" @click="addCar()">加入购物车</button>
      <button class="buy" @click="addCar()">立即购买</button>
    </div>
  </div>
</template>
<script>
// import { mapState } from "vuex"
import http from '@/util/http'
export var obj = {
  productId: 0,
  productNum: 1,
  productName: 'dddd',
  price: 1723,
  selected: false,
  skuName: '',
  image: ''
}
export default {
  data () {
    return {
      name: '',
      price: 0,
      imgUrl: '',
      num: 1,
      id: 1,
      skuName: '',
      //   isShow: true,
      ColorList: [],
      ImageList: [],
      CarList: [],
      shopCarList: {}
    }
  },
  mounted () {
    http({
      url: `/heihei/api/product/sku/sku_stock_detail?c=h5&s=20000&t=1606553777861&v=1.0&product_id=${this.$route.query.id}&stock_type=1`
    }).then(res => {
      // console.log(res.data.data.skuMap)
      // store.commit('setShopCarData', res.data.data.skuMap)
      this.shopCarList = res.data.data.skuMap
      for (var attr in this.shopCarList) {
        this.ColorList.push(this.shopCarList[attr].sku.skuName)
        if (this.shopCarList[attr].sku.image) {
          this.ImageList.push(this.shopCarList[attr].sku.image)
          this.imgUrl = this.ImageList[0]
        }
        this.id = this.shopCarList[attr].sku.productId
        this.name = this.shopCarList[attr].sku.productName
        this.price = this.shopCarList[attr].sku.linePrice / 100
        //   console.log(this.shopCarList[attr])
      }
    })

    // console.log(this.CarList)
    // bus.$emit

    // console.log(this.ColorList)

    http({
      url: `/heihei/api/product/product/product_detail?c=h5&s=20000&t=1606613408539&v=1.0&product_id=${this.$route.query.id}`
    }).then(res => {
      this.ImageList.push(res.data.data.product.image[0])
      this.imgUrl = this.ImageList[0]
    })
  },
  methods: {
    // ...mapActions(['getShopCarList']),
    isShowfor () {
      this.$emit('selecshow')
    },
    changeBorder (index, data) {
      var list = this.$refs.Lis
      list.forEach((element, index) => {
        element.style.borderColor = '#ddd'
        element.style.color = '#000'
      })
      list[index].style.borderColor = 'red'
      list[index].style.color = 'red'
      this.imgUrl = this.ImageList[index]
      this.skuName = data
      this.$emit('colorEvent', this.skuName)
    },
    addCar () {
      obj.productNum = this.num
      obj.image = this.imgUrl
      obj.productName = this.name
      obj.productId = this.id
      obj.price = this.price
      obj.skuName = this.skuName
      this.$router.push('/shopcar')
    }
  }
}
</script>
<style lang="scss" scoped>
#selection {
  width: 100%;
  height: 100%;
  .cove {
    background-color: rgba(80, 77, 77, 0.4);
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 10000;
  }
  .selectCar {
    background-color: #fff;
    width: 100%;
    height: 3.26rem;
    position: fixed;
    left: 0px;
    bottom: .48rem;
    z-index: 10001;
    overflow: scroll;
    .fir {
      height:0.8rem;
      margin: .20rem;
      display: flex;
      justify-content: space-between;
      .img {
        width: .77rem;
        height: .77rem;
        border: 1px solid #ddd;
        img {
          width: 100%;
          height: 100%;
          vertical-align:top;
        }
      }
      div p {
        height: .40rem;
        line-height: .40rem;
        font-size: .18rem;
        width: 2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      div span {
        font-size: .18rem;
        color: red;
        vertical-align:top;
      }
    }
    .sec {
      margin: .2rem;
      p {
        height: .18rem;
        line-height: .18rem;
        font-size: .15rem;
        margin-bottom: .1rem;
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          width: .72rem;
          height: .39rem;
          line-height: .39rem;
          border: 1px solid #ddd;
          text-align: center;
          font-size: .14rem;
          margin-right: .1rem;
          margin-bottom: .1rem;
          vertical-align:top;
        }
      }
    }
    .thir {
      margin: .20rem;
      p {
        height: .18rem;
        line-height: .18rem;
        font-size: .15rem;
        margin-bottom: .1rem;
      }
      .numb {
        border: 1px solid #ddd;
        margin-bottom: .3rem;
        width: 1.28rem;
        padding-bottom: .4rem;
        button {
          width: .39rem;
          height: .39rem;
          line-height: .39rem;
          border: none;
          background-color: #fff;
          text-align: center;
          font-weight: 400;
          font-size: .25rem;
          float: left;
          vertical-align:top;
        }
        div {
          float: left;
          width: .48rem;
          height: .39rem;
          line-height: .39rem;
          text-align: center;
          font-size: .15rem;
          border-left: 1px solid #ddd;
          border-right: 1px solid #ddd;
        }
      }
    }
  }
  #Btns {
    height: .48rem;
    position: fixed;
    left: 0px;
    bottom: 0px;
    width: 100%;
    z-index: 10001;
    button {
      text-align: center;
      height: .48rem;
      line-height: .48rem;
      font-size: .15rem;
      border: none;
      width: 50%;
      vertical-align:top;
    }
    .car {
      height: .47rem;
      line-height: .47rem;
      background-color: #fff;
      color: #000;
      border-top: 1px solid #eee;
    }
    .buy {
      background-color: rgb(245, 59, 59);
      color: #fff;
    }
  }
}
</style>
