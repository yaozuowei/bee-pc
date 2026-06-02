<template>
    <div class="order-success flex flex-v-c flex-v">
        <div class="header flex flex-v-c">
            <a-icon type="check-circle" class="font-30 mr-8" theme="filled" />订单已提交成功，请您及时付款，我们将尽快为您安排发货！
        </div>
        <div class="flex font-14 text-color-01 mt-16">
            <div class="mr-24">
                订单编号：<span class="font-color-02">{{ orderData?.orderNo || '-' }}</span>
            </div>
            <div>
                订单金额：<span class="text-color-red">¥{{ orderData?.totalPrice || '0.00' }}</span>
            </div>
            <div v-if="orderData?.sorderForms" class="ml-16">
                服务费：<span class="text-color-red">¥{{ orderData?.sorderForms.payAmountTotal || '0.00' }}</span>
            </div>
        </div>
        <!-- 倒计时 -->
        <div class="down-time flex flex-v-c font-14 text-color-black mt-16">
            请在<bee-down-time :time="timestamp" @timeEndFun="timeEndFun"></bee-down-time> 内完成付款，否则订单将自动取消
        </div>
        <!-- 按钮组 -->
        <div class="grops-btn mt-40">
            <a-button type="primary" @click="toHome"> 继续购物 </a-button>
            <a-button class="ml-16" @click="seeOrder">查看订单</a-button>
            <a-button v-if="orderData?.paymentState === 3" class="ml-16" @click="evidenceModalStatus = true">上传转账凭证</a-button>
        </div>
        <evidence-modal v-model="evidenceModalStatus" :trade-no="orderData ? orderData.tradeNo : ''" @success="complete"></evidence-modal>
    </div>
</template>
<script>
import moment from 'moment';
import BeeDownTime from '@/components/BeeDownTime.vue';
import EvidenceModal from '@/pageComponents/member/order/evidence-modal.vue';
export default {
    components: {
        BeeDownTime,
        EvidenceModal
    },
    props: {
        orderData: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            evidenceModalStatus: false // 转账凭证弹窗
        };
    },
    computed: {
        timestamp() {
            if (!this.orderData || !this.orderData.paymentDueTime) return '';
            return moment(this.orderData.paymentDueTime).format('x');
        }
    },
    methods: {
        // 倒计时结束
        timeEndFun() {
            if (!this.orderData || !this.orderData.paymentDueTime) return;
            this.$message.error('订单已结束');
            setTimeout(() => {
                this.$router.push('/');
            }, 800);
        },
        // 跳转首页
        toHome() {
            this.$router.push('/');
        },
        // 查看订单
        seeOrder() {
            this.$router.replace(`/member/order/${this.orderData.orderNo}/detail.html`);
        },
        // 完成上传转账凭证
        complete() {
            this.evidenceModalStatus = false;
            this.$router.replace(`/member/order/${this.orderData.orderNo}/detail.html`);
        }
    }
};
</script>
<style scoped lang="less">
.order-success {
    width: 1008px;
    border: 1px solid #e0e1e3;
    border-top: solid 3px @main-color;
    margin: 0 auto;
    padding: 40px 0;
    margin-top: 60px;
    .header {
        color: @main-color;
        font-size: 18px;
        font-weight: bold;
    }
}
</style>
