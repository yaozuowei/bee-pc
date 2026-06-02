<!--个人信息组件-->
<template>
    <div class="mine">
        <login-info></login-info>
        <!-- 个人功能展示 -->
        <div class="mt-24">
            <login-grid></login-grid>
        </div>
        <!-- 活动展示 -->
        <div class="activity mt-12" @click="toActivity">
            <img src="@/assets/images/index/mine/activity_01.png" alt="" />
        </div>
    </div>
</template>
<script>
import LoginInfo from './mine/login-info.vue';
import LoginGrid from './mine/login-grid.vue';
export default {
    components: { LoginInfo, LoginGrid },
    methods: {
        toActivity() {
            this.$router.push('/activity/new/index.html');
        }
    }
};
</script>
<style lang="less" scoped>
.mine {
    width: 240px;
    height: 506px;
    background: #ffffff;
    border-radius: 8px;
    padding: 16px;
    .activity {
        img {
            width: 208px;
            height: 112px;
            cursor: pointer;
        }
    }
}
</style>
