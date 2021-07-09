<template>
    <div>
        <editHead><div class="carHead"><van-icon name="arrow-left" class="icons" @click="back()"/>地址管理</div></editHead>
        <van-address-list
          class="lists"
          v-model="chosenAddressId"
          :list="list"
          @add="onAdd"
          @edit="onEdit"
          @select="onSelect"
        />
    </div>
</template>
<script>
import editHead from '@/views/header/head'
import Vue from 'vue'
import axios from 'axios'
import { Toast, Icon, AddressList } from 'vant'
Vue.use(Toast).use(Icon).use(AddressList)
export default {
  data () {
    return {
      // areaList,
      chosenAddressId: '',
      choose: [],
      list: [],
      obj: [],
      code: 0
    }
  },
  components: {
    editHead
  },
  mounted () {
    const obj = {}
    this.code = this.$route.params.code
    obj.user = localStorage.getItem('username')
    axios.post('http://localhost:3003/address/msg', obj).then(res => {
      console.log(res.data)
      this.list = res.data
      this.list.forEach(item => {
        item.id = item._id
      })
      if (res.data.length) {
        this.choose = res.data.filter(item => item.selected === true)
        this.chosenAddressId = this.choose[0]._id
      }

      // console.log(this.chosenAddressId)
    })
  },
  methods: {
    back () {
      this.obj = this.list.filter(item => item.selected === true)
      console.log(this.obj[0])
      axios.post('http://localhost:3003/address/editanother', this.obj[0]).then(() => {
        this.$router.push({ name: 'neworder', params: { code: this.code } })
      })
      // this.$router.push({ name: 'neworder', params: { code: this.code.code } })
    },
    onAdd () {
      this.$router.push('/Address')
    },
    onEdit (item, index) {
      this.$router.push({ name: 'address', params: { item, flag: 'edit' } })
      // console.log(item)
    },
    onSelect (item) {
      this.list.forEach(i => {
        i.selected = false
      })
      item.selected = true
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
.lists{
  margin-top:.5rem
}
</style>
