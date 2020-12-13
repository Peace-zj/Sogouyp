<template>
    <div>
        <header>
            <div>
                <slot name="a"></slot>
            </div>
            <slot name="b"></slot>
        </header>
        <h1>搜狗商城</h1>

    </div>
</template>
<script>

export default {
}
</script>
<style lang="scss" scoped>
    header{
            position:fixed;
            left:0px;
            top:0px;
            background-color: #000;
            width: 100%;
            height:.6rem;
            line-height:.6rem;
            text-align: center;
            div{
                position:fixed;
                left:.1rem;
                top:-.25rem;
            }
            span{
                vertical-align:top;
                width:100%;
                height:.6rem;
                line-height:.6rem;
                color:#fff;
                font-size:.18rem;
            }
        }
        h1{
            width:1rem;
            position:fixed;
            top:1rem;
            left:50%;
            margin-left:-0.5rem;
            text-align: center;
            font-size:.18rem
        }

</style>
