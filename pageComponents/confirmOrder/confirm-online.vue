<template>
    <div class="order-online">
        <div class="title font-18 text-color-black">支付方式</div>
        <div class="tab flex mt-40">
            <div class="tab-item font-14">小蜜蜂分期付</div>
        </div>
        <div class="code-box flex flex-v flex-v-c mt-28">
            <img v-if="codeUrl" :src="codeUrl" alt="" />
            <a-spin v-else size="large" style="height: 170px" class="flex flex-r-c flex-v-c flex-v" tip="付款码生成中，请耐心等待" />
            <div class="code-footer flex flex-v-c mt-16">
                <a-icon type="scan" class="font-24 mr-8" />
                <div style="width: 100px">打开手机端微信扫一扫继续付款</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        orderData: {
            type: Object,
            default: () => ({})
        },
        // 获取支付二维码的key
        pcMelonKey: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            codeUrl: ''
        };
    },
    watch: {
        pcMelonKey: {
            handler(val, e) {
                if (!this.pcMelonKey) return;
                this.init();
            },
            deep: true,
            immediate: true
        }
    },
    mounted() {},
    methods: {
        async init() {
            try {
                const res = await this.$api.order.generateCode(this.pcMelonKey);
                this.codeUrl = res.url;
            } catch (error) {
                this.$message.error('付款二维码创建失败，请联系客服');
            }
        }
    }
};
</script>
<style scoped lang="less">
.order-online {
    width: 1008px;
    height: auto;
    border: 1px solid #e0e1e3;
    padding: 20px;
    padding-bottom: 40px;
    margin: 0 auto;
    margin-top: 32px;
    margin-bottom: 40px;
    .tab {
        padding: 0 200px;
    }
    .tab-item {
        height: 40px;
        background: rgba(101, 195, 184, 0.04);
        border-radius: 4px;
        border: 1px solid #65c3b8;
        padding: 0 20px;
        text-align: center;
        line-height: 40px;
        color: @main-color;
    }
    .code-box {
        width: 250px;
        height: auto;
        background: #ffffff;
        box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        padding: 40px 0;
        margin: 0 auto;
        img {
            width: 170px;
            height: 170px;
        }
        .code-footer {
            color: #8a929f;
        }
    }
}
</style>
