<!--搜索组件-->
<template>
    <div class="container flex flex-r-c">
        <div class="bee-content-width" style="padding-top: 27px; box-sizing: border-box; height: 100%">
            <div class="flex flex-w flex-r-c">
                <div class="main-logo flex flex-r-b flex-v-c" @click="toHome">
                    <img class="mr-12" src="@/assets/images/logo/logo.png" alt="" />
                    <div class="font-15">小蜜蜂数字科技</div>
                </div>
                <div class="main-box flex flex-v flex-r-b">
                    <div>
                        <div class="flex flex-v-c" style="height: 60px">
                            <search-input ref="search"></search-input>
                            <div class="cart-btn font-16 flex flex-v-c flex-r-c ml-40" @click="myMallCart">
                                <img src="@/assets/images/index/cart-icon.png" class="mr-4" alt="" /> 我的购物车
                            </div>
                            <img class="code-left" src="@/assets/images/whcbqhn.jpg" alt="" />
                            <img class="code" src="@/assets/images/applet.png" alt="" />
                        </div>
                        <!-- 热门搜索 -->
                        <hot-search-values></hot-search-values>
                    </div>
                </div>
            </div>
            <div class="main-tab">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
import SearchInput from '../pageComponents/index/search/search-input.vue';
import HotSearchValues from '../pageComponents/index/search/hot-search-values.vue';

export default {
    components: {
        SearchInput,
        HotSearchValues
    },

    data() {
        return {};
    },
    methods: {
        myMallCart() {
            // this.$message.error('暂未开放');
            this.$verifyLogin(() => {
                const routeUrl = this.$router.resolve('/cart/cart.html');
                window.open(routeUrl.href, '_blank');
            });
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
    margin-top: 1px;
    height: 162px;
    .main-tab {
        padding-bottom: 8px;
        margin-top: 30px;
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
        width: 0;
        height: 100%;
        position: relative;
        margin-left: 80px;
        flex: 1;
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
  .code-left {
    width: 100px;
    height: 100px;
    position: absolute;
    top: -10px;
    right: 10px;
  }
    .code {
        width: 100px;
        height: 100px;
        position: absolute;
        top: -10px;
        right: -100px;
    }
    @media screen and (max-width: 1400px) {
        .code {
            //right: 0;
        }
    }
}
</style>
