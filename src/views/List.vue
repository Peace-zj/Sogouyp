<template>
  <div>
    <listHeader><div class="lei">分类</div></listHeader>
    <div class="product" v-for="datalist in list" :key="datalist.categoryId">
      <div class="img"><img :src="datalist.categoryImage" alt="" /></div>
      <ul>
        <li v-for="data in datalist.productList" :key="data.productId" @click="jump(data.productId)">
          <div class="images"><img :src="data.image" /></div>
          <p>{{ data.name }}</p>
          <p class="price">￥{{ data.salePrice }}</p>
        </li>
      </ul>
    </div>
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
    jump (id) {
      this.$router.push({
        path: '/pages/detail/detail',
        query: {
          id: id
        }
      })
    }
  },
  mounted () {
    http({
      url:
        '/heihei/json/mobile/cate-home.json?c=h5&s=20000&t=1607857423507&v=1.0'
    }).then((res) => {
      // console.log(res.data.data.cateHome)
      this.list = res.data.data.cateHome
      // console.log(this.list)
    })
  }
}
</script>
<style lang="scss" scoped>
.lei {
  border-bottom: 1px solid #eee;
}
.product {
  width: 3.4rem;
  margin: 0.52rem 0.1rem 0;
  .img {
    width: 100%;
    height: 1.06rem;
    margin-bottom: 0.15rem;
    img {
      width: 100%;
    }
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    li {
      width: 1.08rem;
      height: 1.5rem;
      margin-right:0.05rem;
      margin-bottom: 0.2rem;
      .images {
        width: 100%;
        img {
          width: 100%;
        }
      }
      p {
        text-align: center;
        color: #262626;
        height: 0.14rem;
        line-height: 0.14rem;
        font-size: .12rem;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        word-break: break-all;
      }
      .price{
        height:0.23rem;
        line-height:0.23rem;
        text-align: center;
        font-size: .14rem;
        font-weight: 600;
        color: #eb4949;
      }
    }
  }
}
</style>
