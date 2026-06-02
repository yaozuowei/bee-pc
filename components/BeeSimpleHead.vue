<template>
    <div class="head-lead-container bee-content-width flex flex-r-c">
        <div class="bee-content-width flex flex-v-c flex-r-b">
            <div class="flex flex-v-c left-content">
                <nuxt-link to="/" class="flex flex-v-c">
                    <img class="logo mr-16" src="@/assets/images/logo/logo.png" alt="小蜜蜂园林产业互联网平台" />
                    <h1 class="font-18 title">小蜜蜂园林产业互联网平台</h1>
                </nuxt-link>
                <div v-if="scene" class="split-border ml-24 mr-24"></div>
                <div v-if="scene" class="title-link font-18 font-bold">{{ scene === 'register' ? '欢迎注册' : '欢迎登录' }}</div>
            </div>
            <slot>
                <div v-if="scene === 'register'" class="flex flex-v-c">
                    <span class="mr-4">如有疑问？</span>
                    <nuxt-link class="font-bold mr-24" to="/about/contact-us.html">客服咨询</nuxt-link>
                    <span class="mr-4">已有账号？</span>
                    <nuxt-link class="font-bold" to="/login/index.html">去登录</nuxt-link>
                </div>
            </slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BeeSimpleHead',
    props: {
        // register 注册  login 登录
        scene: {
            type: String,
            default: ''
        }
    }
};
</script>
<style scoped lang="less">
.head-lead-container {
    width: 100%;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.06);
    background: #ffffff;
    height: 80px;
    .logo {
        width: 44px;
        height: 44px;
    }
    .title {
        margin: 0;
    }
    .split-border {
        width: 1px;
        height: 20px;
        background: rgba(0, 8, 22, 0.12);
        border-radius: 0px 0px 0px 0px;
        opacity: 1;
    }
    .title-link {
        color: @main-color;
    }
}
</style>
