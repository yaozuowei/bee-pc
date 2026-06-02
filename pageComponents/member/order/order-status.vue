<template>
    <div class="status-card flex">
        <div class="status-left flex flex-v flex-v-c">
            <div class="text-color-black font-12">订单号：{{ info.orderNo }}</div>
            <div class="status-text font-24 text-bold" :class="statusTextClass">{{ info.statusName }}</div>
            <div class="mt-12 text-color-02 font-12">
                <div v-if="info.status === 8 && countDownText">剩余 {{ countDownText }}</div>
                <div v-else-if="info.status === 32">你的订单已发货，请等待收货</div>
                <div v-else-if="info.status === 2">订单已完成，感谢您的支持</div>
                <div v-else-if="info.status === -1">订单已取消，期待您再次选择</div>
                <div v-else>你的订单已提交，请耐心等待</div>
            </div>
            <div class="mt-40 flex flex-v-c">
                <a-button v-if="[-1, 2].includes(info.status)" type="danger" class="mr-12" ghost @click="handleDelete">删除订单</a-button>
                <a-button v-if="[8].includes(info.status) && info.paymentState === 3" class="mr-12" @click="evidenceModalStatus = true"
                    >上传转账凭证</a-button
                >
                <a-button v-if="[2, 16, 32, -1].includes(info.status)" type="primary" class="mr-12" ghost @click="handleBuyAgain"
                    >再次购买</a-button
                >
                <a-button
                    v-if="[8].includes(info.status) && info.paymentState === 3"
                    type="primary"
                    class="mr-12"
                    ghost
                    @click="remittanceModalStatus = true"
                    >线下汇款</a-button
                >
                <!-- <a-button v-if="showTransferBtn && info.paymentState === 1" type="primary" class="mr-12" ghost>微信支付</a-button> -->
                <nuxt-link
                    v-if="[8].includes(info.status) && info.paymentState !== 3"
                    :to="`/confirmOrder/${orderId}/4/confirm-success.html`"
                >
                    <a-button type="primary" class="mr-12" ghost>去支付</a-button>
                </nuxt-link>
                <a-button v-if="[32].includes(info.status)" type="primary" class="mr-12" ghost @click="handleConfirmReceipt"
                    >确认订单</a-button
                >
                <nuxt-link v-if="info.paymentState === 3" :to="`/member/order/${orderId}/evidence-list.html`">
                    <a-button>我的凭证</a-button>
                </nuxt-link>
            </div>
        </div>
        <div class="status-right flex flex-v flex-v-c">
            <div class="mt-20 font-12 text-color-02">
                该订单会为你保留15天（从下单之日算起），超出付款时间后还未付款，系统讲自动取消订单
            </div>
            <div class="status-step flex flex-v-c flex-r-b">
                <div v-for="item in statusIcon" :key="item.text" class="flex flex-v flex-v-c flex-r-c">
                    <img class="icon" :src="orderStatusValue === item.value ? item.activeIcon : item.icon" />
                    <div
                        class="mt-28"
                        :class="{
                            'text-color-black': orderStatusValue === item.value,
                            'text-color-02': orderStatusValue !== item.value
                        }"
                    >
                        {{ item.text }}
                    </div>
                </div>
            </div>
        </div>
        <remittance-modal
            v-model="remittanceModalStatus"
            :order-id="orderId"
            :order="info"
            :remittance="remittanceData ? remittanceData[0] : undefined"
            @ok="handleOpenEvidenceModal"
        ></remittance-modal>
        <evidence-modal
            v-model="evidenceModalStatus"
            :trade-no="info.tradeNo ? info.tradeNo : ''"
            :remittance="remittanceData ? remittanceData : []"
            @success="handleEvidenceSuccess"
        ></evidence-modal>
    </div>
</template>
<script>
import RemittanceModal from '@/pageComponents/member/order/remittance-modal.vue';
import EvidenceModal from '@/pageComponents/member/order/evidence-modal.vue';

export default {
    name: 'OrderStatus',
    components: {
        RemittanceModal,
        EvidenceModal
    },
    props: {
        orderId: {
            type: String,
            default: ''
        },
        info: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            countDownTimer: null,
            countDown: 0,
            countDownText: '',
            statusIcon: [
                {
                    icon: require('@/assets/images/order-status/status-01.png'),
                    activeIcon: require('@/assets/images/order-status/status-active-01.png'),
                    text: '待付款',
                    value: 1
                },
                {
                    icon: require('@/assets/images/order-status/status-02.png'),
                    activeIcon: require('@/assets/images/order-status/status-active-02.png'),
                    text: '待发货',
                    value: 2
                },
                {
                    icon: require('@/assets/images/order-status/status-03.png'),
                    activeIcon: require('@/assets/images/order-status/status-active-03.png'),
                    text: '待收货',
                    value: 3
                },
                {
                    icon: require('@/assets/images/order-status/status-04.png'),
                    activeIcon: require('@/assets/images/order-status/status-active-04.png'),
                    text: '已完成',
                    value: 4
                }
            ],
            // 线下转换凭证弹窗显示状态
            remittanceModalStatus: false,
            // 上传凭证弹窗显示状态
            evidenceModalStatus: false,
            // 账号信息
            remittanceData: null
        };
    },
    computed: {
        orderStatusValue() {
            let value = 0;
            if (this.info.status === 2) {
                value = 4;
            } else if (this.info.status === 4 || this.info.status === 8) {
                value = 1;
            } else if (this.info.status === 16) {
                value = 2;
            } else if (this.info.status === 32) {
                value = 3;
            }
            return value;
        },
        statusTextClass() {
            let className = 'text-color';
            if (this.info.status === -1) {
                className = 'text-color-02';
            } else if (this.info.status === 2) {
                className = 'text-color-black';
            } else if (this.info.status === 4 || this.info.status === 8) {
                className = 'text-color-red';
            }
            return className;
        }
    },
    watch: {
        info(val) {
            if (val && val.status === 8) {
                this.startCountDown();
            }
        }
    },
    beforeMount() {
        this.getRemittanceData();
        this.startCountDown();
    },
    beforeDestroy() {
        clearInterval(this.countDownTimer);
    },
    methods: {
        getRemittanceData() {
            this.$api.common.getBankAccounts().then((data) => {
                this.remittanceData = data;
            });
        },
        handleOpenEvidenceModal() {
            this.remittanceModalStatus = false;
            this.evidenceModalStatus = true;
        },
        // 上传凭证成功
        handleEvidenceSuccess() {
            this.evidenceModalStatus = false;
            this.$emit('refresh');
        },
        // 重新购买
        handleBuyAgain() {
            this.$api.member.anotherOrderByOrderNo(this.orderId).then((data) => {
                this.$router.push('/cart/cart.html');
            });
        },
        // 删除订单
        handleDelete() {
            this.$api.member.deleteOrderNo(this.orderId).then((data) => {
                this.$message.success('删除订单成功');
                this.$router.push('/member/order/index.html');
            });
        },
        // 确认收货
        handleConfirmReceipt() {
            this.$api.member.receivingOrder(this.orderId).then((data) => {
                this.$message.success('确认订单成功');
                this.$emit('refresh');
            });
        },
        startCountDown() {
            if (!this.info || !this.info.paymentDueTime) return false;
            const countDown = parseInt(new Date(this.info.paymentDueTime).getTime() - new Date().getTime());
            if (countDown <= 0) {
                clearInterval(this.countDownTimer);
                this.countDownText = '';
                return false;
            }
            this.countDown = countDown;

            this.countDownTimer = setInterval(() => {
                this.countDown = parseInt(this.countDown - 1000);
                if (this.countDown <= 0) {
                    this.countDown = 0;
                    this.countDownText = '';
                    clearInterval(this.countDownTimer);
                } else {
                    this.countDownText = this.countDownFormat(this.countDown);
                }
            }, 1000);
        },
        countDownFormat(cd) {
            const formatNumber = (n) => `0${n}`.slice(-2);
            const days = parseInt(cd / 1000 / 60 / 60 / 24, 10); // 计算剩余的天数
            const hours = formatNumber(parseInt((cd / 1000 / 60 / 60) % 24, 10)); // 计算剩余的小时
            const minutes = formatNumber(parseInt((cd / 1000 / 60) % 60, 10)); // 计算剩余的分钟
            const seconds = formatNumber(parseInt((cd / 1000) % 60, 10)); // 计算剩余的秒数
            return `${days}天${hours}小时${minutes}分${seconds}秒`;
        }
    }
};
</script>
<style scoped lang="less">
.status-card {
    border: 1px solid #e0e1e3;
    border-top: 4px solid @main-color;
    padding: 20px 0;
    .status-left {
        width: 338px;
        border-right: 1px solid #e0e1e3;
        padding: 20px 0 32px;
        .status-text {
            margin-top: 48px;
        }
    }
    .status-right {
        flex: auto;
    }
    .status-step {
        position: relative;
        width: 560px;
        margin-top: 62px;
        &::after {
            content: '';
            position: absolute;
            height: 2px;
            width: 95%;
            left: 2.5%;
            top: 14px;
            background: rgba(0, 8, 22, 0.08);
        }
        .icon {
            width: 26px;
            height: 26px;
            position: relative;
            z-index: 2;
        }
    }
}
</style>
