<template>
    <div>
        <ul>
            <router-link to="/h5/pages/home/index" tag="li" active-class="active"><div><van-icon name="home-o" size='0.2rem'/></div><div>首页</div></router-link>
            <router-link to="/pages/jd-union/list" tag="li" active-class="active"><div><van-icon name="coupon-o" size='0.2rem'/></div><div>优惠</div></router-link>
            <router-link to="/pages/cate/cate-home" tag="li" active-class="active"><div><van-icon name="apps-o" size='0.2rem'/></div><div>分类</div></router-link>
            <router-link to="/shopcar" tag="li" active-class="active"><div><van-icon name="shopping-cart-o" size='0.2rem'/></div><div>购物车</div></router-link>
            <router-link to="/center/home" tag="li" active-class="active"><div><van-icon name="user-o" size='0.2rem'/></div><div>我的</div></router-link>
        </ul>
    </div>
</template>
<script>
import { Icon } from 'vant'
import Vue from 'vue'
Vue.use(Icon)
export default {

}
</script>
<style lang="scss" scoped>
*{
    border: 0;
    padding: 0;
}
    .active{
        color: #f60;
    }
    ul{
        list-style: none;
        display: flex;
        position: fixed;
        bottom: 0;
        height: 0.50rem;
        line-height:0.20rem;
        background: #fff;
        width: 100%;
        text-align: center;
        z-index: 999;
        li{
            flex: 1;
            display: flex;
            flex-direction: column;
            padding-top:0.05rem;
            div:nth-of-type(1){
                font-size: .14rem;
            }
            div:nth-of-type(2){
                font-size: .14rem;
            }

        }
    }
</style>
