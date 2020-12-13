<template>
<div id="Login">
    <loginHeader>
         <van-icon slot="a" name="arrow-left" size="0.2rem" color="white" @click="handleBack()"/>
        <span slot="b">注册</span>
    </loginHeader>
    <div class="fir_inp"><input type="text" placeholder="请输入用户名" v-model="text1"></div>

    <div class="thr_inp"><input type="password" placeholder="设置6-10位密码（区分大小写）" v-model="text3" ref="pd" /><div class="ic" v-show="eyeClose"><van-icon name="closed-eye" size="0.2rem" @click="handlepw()" /></div><div class="ic" v-show="eyeOpen"><van-icon name="eye-o" size="0.2rem" @click="handlepw()"/></div></div>

    <div class="for_inp"><input type="password" placeholder="再次确认密码" v-model="text4"></div>
    <div class="fir_btn"><button class="register" @click="regist()">快速注册</button></div>
    <div class="agree"><input type="checkbox" ref="myagreed">我已阅读并同意 <a href="">《用户协议》</a>和<a href="">《隐私政策》</a></div>

    <p @click="backLogin()">已有账号？去登录></p>
</div>
</template>
<script>
import Vue from 'vue'
import { Icon, Toast } from 'vant'
import { mapMutations } from 'vuex'
import loginHeader from '@/views/Login/Login_header'
import axios from 'axios'
Vue.use(Icon)
export default {
  data () {
    return {
      eyeOpen: false,
      eyeClose: true,
      text1: '',
      text2: '',
      text3: '',
      text4: ''
    }
  },
  components: {
    loginHeader
  },
  methods: {
    ...mapMutations(['showAsides', 'hideAsides']),
    handlepw () {
      this.eyeOpen = !this.eyeOpen
      this.eyeClose = !this.eyeClose
      if (this.$refs.pd.type === 'password') {
        this.$refs.pd.type = 'text'
      } else {
        this.$refs.pd.type = 'password'
      }
    },
    backLogin () {
      this.$router.push('/login')
    },
    handleBack () {
      this.$router.push('/login')
    },
    regist () {
      if (!this.text1 || !this.text3 || !this.text4) {
        Toast('用户名或密码不能为空')
      } else if (!this.$refs.myagreed.checked) {
        Toast('请阅读协议并同意')
      } else if (this.text3 !== this.text4) {
        Toast('两次密码不一致')
      } else if (this.text3.length < 6) {
        Toast('密码不能少于6位')
      } else {
        axios.get(`http://localhost:7777/users?name=${this.text1}`).then(res => {
          if (res.data.length !== 0) {
            Toast('用户名已注册')
          } else {
            axios.post('http://localhost:7777/users', {
              name: this.text1,
              password: this.text3
            }).then(() => {
              this.$router.push('/login')
              Toast('注册成功')
            })
          }
        })
      }
    }
  },
  mounted () {
    this.hideAsides()
  },
  destroyed () {
    this.showAsides()
  }
}
</script>
<style lang="scss" scoped>

    #Login{
      .fir_inp{
        width:3rem;
        font-size:.15rem;
        position:fixed;
        top:1.5rem;
        left:50%;
        margin-left:-1.5rem;
        input{
          width:100%;
          height:.5rem;
          border:none;
          border-bottom: 1px solid #ddd;
        }
      }
      .for_inp{
        width:3rem;
        font-size:.15rem;
        position:fixed;
        top:2.7rem;
        left:50%;
        margin-left:-1.5rem;
        input{
          width:100%;
          height:.5rem;
          border:none;
          border-bottom: 1px solid #ddd;
        }
        #code{
          position: absolute;
          top:0.04rem;
          right:0;
          width: .8rem;
          height: .35rem;
          line-height:.35rem;
          border:none;
          border:1px solid #aaa;
          color:#aaa;
          text-align:center;
          background-color: #fff;
          font-size:.12rem;
          border-radius: .05rem;

        }
      }
      .thr_inp{
      width:3rem;
        font-size:.15rem;
        position:fixed;
        top:2.1rem;
        left:50%;
        margin-left:-1.5rem;
        input{
          width:100%;
          height:.5rem;
          border:none;
          border-bottom: 1px solid #ddd;
        }
        .ic{
          position: absolute;
          top:0.15rem;
          right:0;
        }
      }
      .fir_btn{
        width:3rem;
        font-size:.14rem;
        position:fixed;
        top:3.5rem;
        left:50%;
        margin-left:-1.5rem;
        button{
            width: 100%;
            height:.45rem;
            line-height:.45rem;
            text-align: center;
            border:none;
            border-radius: .05rem;
            font-size:.17rem;
            background-color: rgb(245, 70, 70);
            color:#eee
        }
      }
        .agree{
            width:3rem;
            height:.2rem;
            line-height: .2rem;
            position: fixed;
            top:4.2rem;
            left:50%;
            margin-left:-1.5rem;
            font-size:.12rem;
            color:#ccc;
            border:none;
            input{
                width: .15rem;
                font-size: .14rem;
            }
            a{
                color:#000
            }
        }
        p{
            width:2.8rem;
            position: fixed;
            top:5.8rem;
            left:50%;
            margin-left:-1.4rem;
            font-size:.13rem;
            color:#aaa;
            text-align:center;
            a{
                color:#000
            }
        }

    }

</style>
