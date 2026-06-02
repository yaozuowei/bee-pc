<template>
    <div ref="remittaceModal">
        <a-modal
            title="线下支付"
            :visible="value"
            :get-container="() => $refs.remittaceModal"
            ok-text="上传转账凭证"
            width="700px"
            @ok="handleOk"
            @cancel="handleCancel"
        >
            <div class="font-14 text-color-black">
                <div class="font-bold">订单信息</div>
                <a-row class="mt-20" :gutter="20">
                    <a-col :span="10">订单编号：{{ orderData.orderNo }}</a-col>
                    <a-col :span="14">下单时间：{{ orderData.createTime }}</a-col>
                </a-row>
                <a-row class="mt-20" :gutter="20">
                    <a-col :span="10">订单状态：{{ orderData.statusName }}</a-col>
                    <a-col :span="14">支付方式：{{ orderData.payment }}</a-col>
                </a-row>
                <div class="mt-20 flex">
                    <div style="flex-shrink: 0">备注信息：</div>
                    <div>
                        {{ orderData.remark }}
                    </div>
                </div>
            </div>
            <div class="info mt-28 pt-28 font-14 text-color-black">
                <div class="font-bold">
                    线下转账信息<span class="font-12 text-color-02" style="font-weight: lighter"
                        >（请按照一下信息进行线下转账汇款操作）</span
                    >
                </div>
                <a-row class="mt-20" :gutter="20">
                    <a-col :span="10">开户银行：{{ remittanceData.bankName }}</a-col>
                    <a-col :span="14">银行账号：{{ remittanceData.bankNo }}</a-col>
                </a-row>
                <div class="mt-20">公司名称：{{ remittanceData.companyName }}</div>
            </div>
        </a-modal>
    </div>
</template>
<script>
export default {
    name: 'RemittaceModal',
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        orderId: {
            type: String,
            default: ''
        },
        value: {
            type: Boolean,
            default: false
        },
        order: {
            type: Object,
            default: undefined
        },
        remittance: {
            type: Object,
            default: undefined
        }
    },
    data() {
        return {
            orderData: {},
            remittanceData: {}
        };
    },
    watch: {
        value(val) {
            if (val) {
                if (JSON.stringify(this.orderData) === '{}') {
                    this.getOrderData();
                }
                if (JSON.stringify(this.remittanceData) === '{}') {
                    this.getRemittanceData();
                }
            }
        },
        orderId(val) {
            if (val) {
                this.getOrderData();
            }
        }
    },
    methods: {
        handleCancel() {
            this.$emit('change', false);
        },
        handleOk() {
            this.$emit('ok');
        },
        getOrderData() {
            if (this.order) {
                this.orderData = this.order;
                return false;
            }
            this.$api.member.getOrderDetail(this.orderId).then((data) => {
                this.orderData = data;
            });
        },
        getRemittanceData() {
            if (this.remittance) {
                this.remittanceData = this.remittance;
                return false;
            }
            this.$api.common.getBankAccounts().then((data) => {
                this.remittanceData = data[0];
            });
        }
    }
};
</script>
<style scoped lang="less">
.info {
    border-top: 1px solid rgba(0, 8, 22, 0.08);
}
</style>
