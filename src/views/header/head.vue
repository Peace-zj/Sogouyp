<template>
    <header><slot></slot></header>
</template>
<style lang="scss" scoped>
        header{
            position:fixed;
            top:0;
            z-index:10;
            background-color: #fff;
            height:.5rem;
            width: 100%;
            text-align:center;
            line-height:.5rem;
            div{
                width: 100%;
                height:.5rem;
                font-size: .15rem;
                font-weight: 500;
            }
        }
</style>
