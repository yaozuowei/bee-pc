<template>
    <a-config-provider :locale="locale">
        <Nuxt />
    </a-config-provider>
</template>

<script>
import { ConfigProvider } from 'ant-design-vue';
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
export default {
    name: 'DefaultLayout',
    components: {
        AConfigProvider: ConfigProvider
    },
    data() {
        return {
            locale: zhCN
        };
    },
    async beforeCreate() {
        if (!process.server) {
            // 判断是否是微信环境跳转
            const wx = navigator.userAgent.toLowerCase().includes('micromessenger');
            if (wx) {
                await this.$api.common
                    .getAppletUrlLink({
                        path: 'pages/tabbar/index/index'
                    })
                    .then((data) => {
                        location.href = `${data}`;
                    });
                return false;
            }
            if (!this.$store.isLogin) {
                const token = this.$cookies.get('Author-Token');
                this.$store.dispatch('dict/getDict');
                if (token) {
                    this.$store.commit('user/SET_ACCESS_TOKEN', token);
                    this.$store.dispatch('user/getUserInfo');
                }
            }
        }
    }
};
</script>

<style>
#__nuxt,
#__layout {
    width: 100%;
    height: 100%;
    min-width: 1152px;
}
</style>
