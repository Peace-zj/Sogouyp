<template>
<van-index-bar :index-list="computedList" @select="dian">
    <div class="lists" v-for="data in list" :key="data.type">
            <van-index-anchor :index="data.type">{{data.type}}</van-index-anchor>

            <van-cell v-for="item in data.list" :key="item.adcode" :title="item.name" @click="hank(item.name)" />
    </div>
</van-index-bar>
</template>
<script>
import Vue from 'vue'
import { IndexBar, IndexAnchor, Toast, Cell } from 'vant'
import { mapActions, mapMutations, mapState } from 'vuex'

Vue.use(IndexBar).use(IndexAnchor).use(Cell)
export default {
  data () {
    return {
      list: []
    }
  },
  computed: {
    ...mapState(['cityData']),
    computedList () {
      return this.list.map(item => item.type)
    }
  },
  created () {
    this.hideAsides()
  },
  mounted () {
    if (this.cityData.length === 0) {
      this.getCityData().then(res => {
        this.list = this.filterList(this.cityData)
      })
    } else {
      this.list = this.filterList(this.cityData)
    }
  },
  methods: {
    ...mapActions(['getCityData']),
    ...mapMutations(['hideAsides', 'showAsides', 'setCityName']),
    filterList (data) {
      const arr = []
      const newList = []
      for (var i = 65; i < 91; i++) {
        arr.push(String.fromCharCode(i))
      }
      arr.forEach(item => {
        // console.log(data)
        const fileList = data.filter(elem => elem.parent.toUpperCase() === item)
        fileList.length && newList.push({
          type: item,
          list: fileList
        })
      })
      return newList
    },
    dian (data) {
      Toast(data)
    },
    hank (name) {
      this.setCityName(name)
      this.$router.push('/h5/pages/store-map/index')
    }
  }
}
</script>
<style lang="scss" scoped>
.lists{
    background: #f4f4f4;
}
</style>
