<!--搜索组件-->
<template>
    <div class="container flex flex-r-c">
        <div class="bee-content-width flex flex-r-c" style="box-sizing: border-box; height: 100%">
            <div class="main-logo flex flex-r-b flex-v-c" @click="toHome">
                <img class="mr-12" src="@/assets/images/logo/logo.png" alt="" />
                <div class="font-16">小蜜蜂园林产业互联网平台</div>
            </div>
            <div class="main-box flex flex-v flex-r-b">
                <div>
                    <div class="flex flex-v-c" style="height: 60px">
                        <search-input ref="search"></search-input>
                        <!-- <div class="cart-btn font-16 flex flex-v-c flex-r-c ml-40" @click="myMallCart">
                            <img src="@/assets/images/index/cart-icon.png" class="mr-4" alt="" /> 我的购物车
                        </div>
                        <img class="code" src="@/assets/images/index/wechart-code.png" alt="" /> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import SearchInput from '../pageComponents/index/search/search-input.vue';
export default {
    components: {
        SearchInput
    },

    data() {
        return {};
    },
    methods: {
        myMallCart() {
            this.$message.error('暂未开放');
        },
        toHome() {
            this.$router.push('/');
        }
    }
};
</script>
<style lang="less" scoped>
.container {
    width: 100%;
    background: #ffffff;
    height: auto;
    .main-tab {
        padding-bottom: 8px;
    }
    .main-logo {
        width: 180px;
        height: 60px;
        cursor: pointer;
        img {
            width: 60px;
            height: 60px;
        }
        div {
            width: 0;
            flex: 1;
            height: 48px;
            color: @main-black;
            font-weight: bold;
        }
    }
    .main-box {
        height: 100%;
        position: relative;
        margin-left: 50px;
        .cart-btn {
            width: 150px;
            height: 40px;
            border-radius: 4px;
            border: 1px solid #65c3b8;
            color: @main-color;
            font-weight: bold;
            cursor: pointer;
            img {
                width: 20px;
                height: 20px;
            }
        }
    }
    .code {
        width: 114px;
        height: 114px;
        position: absolute;
        top: 0;
        right: -134px;
    }
    @media screen and (max-width: 1400px) {
        .code {
            right: 0;
        }
    }
}
</style>
