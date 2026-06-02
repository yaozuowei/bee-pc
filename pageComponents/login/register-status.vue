<template>
    <div class="flex flex-v flex-r-c flex-v-c">
        <img class="success-img" src="@/assets/images/login/submit-success.png" alt="已成功提交，等待审核" />
        <h4 v-if="info.status === 0" class="mt-16 font-16 font-bold text-color-black">已成功提交，等待审核</h4>
        <h4 v-else-if="info.status === 1" class="mt-16 font-16 font-bold text-color-black">企业申请已通过</h4>
        <h4 v-else-if="info.status === 2" class="mt-16 font-16 font-bold text-color-black">企业申请已拒绝</h4>
        <div v-if="info.status === 0" class="text font-12 text-color-02 text-c">
            您提交的企业认证信息，我们正在等待审核，将在 24 小时（1 个工作日内审核，节假日将顺延），结果将以短信的形式提示您
        </div>
        <a-button v-if="info.status === 2" class="button mt-40 font-16" type="primary" size="large" ghost @click="handlePrev"
            >重新编辑</a-button
        >
        <a-button v-else class="button mt-40 font-16" type="primary" size="large" ghost @click="handleBack">返回首页</a-button>
        <div class="mt-12 fnot-12 text-color-02">如需采购请拨打热线电话<span class="phone"> 4001848678 </span>或者联系客服</div>
    </div>
</template>

<script>
export default {
    name: 'RegisterStatus',
    props: {
        info: {
            type: Object,
            default: () => {}
        }
    },
    methods: {
        handleBack() {
            this.$router.push('/');
        },
        handlePrev() {
            this.$emit('prev');
        }
    }
};
</script>
<style scoped lang="less">
.success-img {
    width: 150px;
    height: 150px;
}
.text {
    max-width: 450px;
}
.button {
    width: 108px;
}
.phone {
    color: #0066ff;
}
</style>
