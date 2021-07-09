<template>
    <div>
        <addressHead><div class="carHead"><van-icon name="arrow-left" class="icons" @click="back()"/>编辑地址</div></addressHead>
        <van-address-edit
        class="edit"
          :area-list="areaList"
          :address-info="addressInfo"
          show-delete
          show-search-result
          :search-result="searchResult"
          :area-columns-placeholder="['请选择', '请选择', '请选择']"
          @save="onSave"
          @delete="onDelete"
          @change-detail="onChangeDetail"
        />
    </div>
</template>
<script>
import addressHead from '@/views/header/head'
import Vue from 'vue'
import axios from 'axios'
import { Toast, Icon, AddressEdit } from 'vant'
import { mapState } from 'vuex'
import { areaList } from '@vant/area-data'
Vue.use(Toast).use(Icon).use(AddressEdit)
export default {
  data () {
    return {
      areaList,
      addressInfo: {},
      searchResult: [],
      flag: ''
    }
  },
  components: {
    addressHead
  },
  computed: {
    ...mapState(['username'])
  },
  mounted () {
    // console.log(this.$route.params.item)
    this.addressInfo = this.$route.params.item
    this.flag = this.$route.params.flag
  },
  methods: {
    back () {
      this.$router.push('/edit')
    },
    onSave (content) {
      content.user = localStorage.getItem('username')
      // console.log(content)
      if (this.flag) {
        axios.post('http://localhost:3003/address/editaddress', content).then(res => {
          // console.log(res)
          this.$router.push('/edit')
        })
      } else {
        axios.post('http://localhost:3003/address/newaddress', content).then(res => {
          // console.log(res)
          this.$router.push('/edit')
        })
      }
    },
    onDelete (content) {
      axios.post('http://localhost:3003/address/deletaddress', content).then(res => {
        console.log(res)
        this.$router.push('/edit')
      })
    },
    onChangeDetail (val) {
      // if (val) {
      //   this.searchResult = [
      //     {
      //       name: '黄龙万科中心',
      //       address: '杭州市西湖区'
      //     }
      //   ]
      // } else {
      //   this.searchResult = []
      // }
    }

  }
}
</script>
<style lang="scss" scoped>
.carHead{
        border-bottom: 1px solid #eee;
    }
.icons{
    float:left;
    margin-top:.17rem;
    margin-left:.1rem
}
.edit{
    margin-top:.5rem
}
</style>
