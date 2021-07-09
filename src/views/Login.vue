<template>
<div id="Login">
    <loginHeader>
        <van-icon slot="a" name="arrow-left" size="0.2rem" color="white" @click="handleBack()"/>
        <span slot="b">登 录</span>
    </loginHeader>
    <div class="phNum"><input type="text" placeholder="请输入用户名" v-model="text1"></div>
    <div class="sec_inp" v-show="isHidden"><input type="password" placeholder="请输入密码" v-model="pword" ref="pd"><div class="ic" v-show="eyeClose"><van-icon name="closed-eye" size="0.2rem" @click="handlepw()"/></div><div class="ic" v-show="eyeOpen"><van-icon name="eye-o" size="0.2rem" @click="handlepw()"/></div></div>
    <div class="fir_btn"><button class="login" @click="Login()">登录</button></div>
    <div class="sec_btn" v-show="isShow"><button class="phone" @click="mesg()">账号密码登录</button></div>
    <div class="sp" v-show="isHidden">
        <span class="fir" @click="regis()">立即注册</span>
        <span><a href="">找回密码</a></span>
    </div>
    <div class="sp" v-show="isShow">
        <span @click="regis()">邮箱快速注册></span>
    </div>
    <p>
        登录即代表您已经同意<a href="">《用户协议》</a>和<a href="">《隐私政策》</a>
    </p>
</div>
</template>
<script>
// import nodemailer from 'nodemailer'
import axios from 'axios'
import Vue from 'vue'
import { Icon, Toast } from 'vant'
import { mapMutations } from 'vuex'
import loginHeader from '@/views/Login/Login_header'
Vue.use(Icon)
export default {
  data () {
    return {
      eyeOpen: false,
      eyeClose: true,
      isShow: false,
      isHidden: true,
      text1: '',
      pword: '',
      code: ''
    }
  },
  components: {
    loginHeader
  },
  methods: {
    ...mapMutations(['showAsides', 'hideAsides', 'setUsername']),
    // 改变密码类型
    handlepw () {
      this.eyeOpen = !this.eyeOpen
      this.eyeClose = !this.eyeClose
      if (this.$refs.pd.type === 'password') {
        this.$refs.pd.type = 'text'
      } else {
        this.$refs.pd.type = 'password'
      }
    },
    mesg () {
      this.isShow = !this.isShow
      this.isHidden = !this.isHidden
    },
    regis () {
      this.$router.push('/register')
    },
    Login () {
      if (this.text1 && this.pword) {
        axios.get(`http://localhost:3003/customers/login?name=${this.text1}&password=${this.pword}`).then(res => {
          if (res.data.length !== 0) {
            localStorage.setItem('username', this.text1)
            localStorage.setItem('password', this.pword)
            this.setUsername(2)
            this.$router.push('/center/home')
          } else {
            Toast('用户名或密码错误')
          }
        })
      } else {
        Toast('用户名或密码不能为空')
      }
    },
    handleBack () {
      if (localStorage.getItem('username')) {
        this.$router.push('/center/home')
      } else {
        Toast('需要用户登录')
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
        .sec_inp{
              top:2.4rem;
              position:relative;
              vertical-align:top;
            }
        .fir_btn{
            top:3rem;
            vertical-align:top;
        }
        .sec_btn{
            top:3.6rem;
            vertical-align:top;
        }
        div{
            width:3rem;
            position: fixed;
            top:1.8rem;
            left:50%;
            margin-left:-1.5rem;
            margin-bottom:.1rem;
            input{
                width: 100%;
                border:none;
                border-bottom:1px solid #ddd;
                padding-bottom:.1rem;
                font-size:.15rem;
                vertical-align:top;
            }
            .ic{
                position: absolute;
                top:0px;
                left:90%;
                width: .2rem;
                height:.2rem;
                border:none;
                margin:0px;
            }
            button{
                width: 100%;
                height:.45rem;
                line-height:.45rem;
                text-align: center;
                border:none;
                border-radius: .05rem;
                font-size:.17rem;
                vertical-align:top;

            }
            #code{
                position: absolute;
                top:-.12rem;
                right:0px;
                width: .8rem;
                height: .35rem;
                line-height:.35rem;
                border:none;
                border:1px solid #aaa;
                color:#aaa;
                text-align:center;
                background-color: #fff;
                font-size:.12rem
            }
            .login{
                background-color: rgb(245, 70, 70);
                color:#eee
            }
            .phone{
                background-color: #fff;
                border:1px solid rgb(245, 70, 70);
                color:rgb(245, 70, 70)
            }
        }
        .sp{
            width:2.5rem;
            position: fixed;
            top:4.2rem;
            left:50%;
            margin-left:-1.25rem;
            color:#eee;
            font-size:.14rem;
            text-align:center;
            span{
                margin-left:.1rem;
                color:#aaa;
                a{
                    color:#aaa;
                }
            }
            .fir::after{
                content:'';
                border:1px solid #ddd;
                height:.01rem;
                width:.01rem;
                margin-left:.1rem
            }
        }
        p{
            width:2.8rem;
            position: fixed;
            top:5.4rem;
            left:50%;
            margin-left:-1.4rem;
            font-size:.12rem;
            color:#aaa;
            text-align:center;
            a{
                color:#000
            }
        }
    }

</style>
