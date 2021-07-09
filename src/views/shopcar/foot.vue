<template>
    <div class="rec" v-if="recList.length">
        <h4>为你推荐</h4>
        <ul>
            <li v-for="data in recList" :key="data.productId" @click="shopfoo(data.productId)">
                <div><img :src="data.image" /></div>
                <p>{{data.name}}</p>
                <p class="des">{{data.desc}}</p>
                <p class="price">￥{{data.linePrice/100}}</p>
            </li>
        </ul>
    </div>
</template>
<script>
import http from '@/util/http'
export default {
  data () {
    return {
      recList: []
    }
  },
  methods: {
    shopfoo (id) {
      this.$router.push({ path: '/pages/detail/detail', query: { id: id } })
    }
  },
  mounted () {
    http({
      url: '/sgsg/api/product/product/product_list?c=h5&s=20000&t=1605257682140&v=1.0&category_id=0&sort_field=1&sort_order=2&pn=1&ps=4'
    }).then(res => {
      this.recList = res.data.data.pageList
    })
  }

}
</script>
<style lang="scss" scoped>
    .rec{
        height:5.32rem;
        background-color: #fff;
        h4{
            height:.25rem;
            line-height:.25rem;
            padding-top:.05rem;
            margin-left:.10rem;
            font-weight: 400;
            font-size: 15px;
            color:#262626;
        }
        ul{
            margin:.1rem;
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
    }
</style>
