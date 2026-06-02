<template>
    <div class="page-container" :head-bar="false">
        <!-- 顶部bar -->
        <bee-simple-head :scene="statusStr"></bee-simple-head>

        <!-- 登录内容 -->
        <div class="bee-content-width page-content">
            <div class="login-box flex flex-r-e flex-v-c">
                <login-form></login-form>
            </div>
        </div>

        <!-- 底部mod -->
        <div class="bee-mod-service bee-content-width flex flex-r-c">
            <bee-mod-service :has-background="false"></bee-mod-service>
        </div>

        <!-- 底部文字 -->
        <div class="mt-32 flex flex-r-c">
            <login-footer class="bee-content-width"></login-footer>
        </div>
    </div>
</template>

<script type="ts">
import LoginForm from "@/pageComponents/login/login-form";
import LoginFooter from "@/pageComponents/login/login-footer";

export default {
    name: 'LoginPage',
    components: {
        LoginForm,
        LoginFooter
    },
    data() {
        return {
            statusStr: 'login'
        };
    }
};
</script>
<style scoped lang="less">
.page-container {
    padding-bottom: 30px;
    .page-content {
        margin: 60px auto;

        .login-box {
            width: 100%;
            height: 480px;
            background: rgba(0, 8, 22, 0.08);
            background-image: url('@/assets/images/login/login-bg.jpg');
            background-size: 100% 100%;
            border-radius: 8px;
            padding-right: 100px;
        }
    }
    .bee-mod-service {
        width: 100%;
        margin: 48px auto 0;
    }
}
</style>
