<template>
    <div>
        <listHeader>
            <div class="lei">
                <van-icon name="arrow-left" size="0.2rem" color="black" @click="handleBack()" class="icon"/>
                <p>分 类</p>
            </div>
        </listHeader>
        <ul>
            <li v-for="data in list" :key="data.productId" @click="shopfoo(data.productId)">
                <div><img :src="data.image" /></div>
                <p>{{data.name}}</p>
                <p class="des">{{data.desc}}</p>
                <p class="price">￥{{data.linePrice/100}}</p>
            </li>
        </ul>
    </div>
</template>
<script>
import listHeader from './header/head'
import http from '../util/http'
export default {
  components: {
    listHeader
  },
  data () {
    return {
      list: []
    }
  },
  methods: {
    shopfoo () {},
    handleBack () {
      this.$router.push('/h5/pages/home/index')
    }
  },
  mounted () {
    http({
      url: `/sgsg/api/product/product/product_list?c=h5&s=20000&t=1607866591085&v=1.0&category_id=${this.$route.query.id}&sort_field=1&sort_order=2&pn=1&ps=6`
    }).then(res => {
    //   console.log(res.data.data.pageList)
      this.list = res.data.data.pageList
    })
  }
}
</script>
<style lang="scss" scoped>
.lei {
  border-bottom: 1px solid #eee;
  .icon{
      position:absolute;
      left:.1rem;
      top:.15rem;
  }
  p{
      text-align:center;
  }
}
 ul{
    margin:.1rem;
    margin-top:.6rem;
    display:flex;
    justify-content: space-between;
    flex-wrap: wrap;
    li{
        margin-bottom:.15rem;
        div{
            width: 1.65rem;
            height:1.65rem;
            margin-bottom:.05rem;
            img{
                width: 1.6rem;
                height: 1.6rem;
            }
        }
        p{
            height:.2rem;
            line-height: .2rem;
            font-size: 12px;
            width: 1.6rem;
            overflow:hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .des{
            color:#666
        }
        .price{
            color:red;
            font-size: 15px;
        }
    }
}
</style>
