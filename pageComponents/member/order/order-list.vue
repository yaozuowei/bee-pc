<template>
    <div class="order-list-container">
        <a-row class="mt-24 table-header pl-32 pr-32">
            <a-col :span="9">订单详情</a-col>
            <a-col class="text-c" :span="2">收货人</a-col>
            <a-col class="text-c" :span="3">实付金额</a-col>
            <a-col class="text-c" :span="3">下单时间</a-col>
            <a-col class="text-c" :span="3">订单状态</a-col>
            <a-col class="text-c" :span="4">操作</a-col>
        </a-row>
        <div class="mt-24">
            <div v-for="item in list" :key="item.id" class="order-card mb-12">
                <div class="head-box flex flex-v-c flex-r-b pl-32 pr-32">
                    <div class="font-12 text-color-01">
                        订单号：{{ item.orderNo }}
                        <template v-if="item.countDownText">
                            (<span class="font-12 text-color-red"> 待付款：{{ item.countDownText }}</span
                            >)
                        </template>
                    </div>
                    <div class="font-12 text-color-0">下单时间：{{ item.createTime }}</div>
                </div>
                <a-row class="pl-32 pt-28 pb-16 pr-32 flex flex-v-c">
                    <a-col :span="14">
                        <div v-for="sku in item.inventoryList" :key="sku.skuId" class="mb-12 pruduct-item">
                            <div class="col-item flex flex-v-c" @click="toPruductDetail(sku.skuId)">
                                <div class="goods-pic">
                                    <bee-img :src="sku.imgUrl" :lazy="true" :radius="4"></bee-img>
                                </div>
                                <div class="ml-32" style="width: 100%">
                                    <div class="mr-32 text-color-black line-1 font-14">{{ sku.title }}</div>
                                    <a-row class="mt-8">
                                        <a-col class="font-12 text-color-01 line-1" :span="12">数量：{{ sku.number }}</a-col>
                                        <a-col class="font-12 text-color-01 line-1" :span="12">规格：{{ sku.specMap | filterSpec }}</a-col>
                                    </a-row>
                                    <a-row class="mt-4">
                                        <a-col class="font-12 text-color-01 line-1" :span="12">价格：{{ sku.price }}</a-col>
                                        <a-col class="font-12 text-color-01 line-1" :span="12">SKU：{{ sku.skuId }}</a-col>
                                    </a-row>
                                </div>
                            </div>
                        </div>
                    </a-col>
                    <!-- <a-col class="col-item flex flex-v flex-r-c text-c font-12 text-color-black" :span="2">张伟</a-col> -->
                    <a-col class="col-item flex flex-v flex-r-c text-c font-12 text-color-01" :span="4">
                        <div><span class="text-r" style="display: inline-block">商品含税总额：</span>¥{{ item.priceSumVO.priceTotal }}</div>
                        <div>
                            <span class="text-r" style="display: inline-block">运费：</span>
                            <template v-if="item.status === 4">待运营确认</template>
                            <template v-else-if="item.eorderForms">¥{{ item.eorderForms.payAmountTotal }} </template>
                        </div>
                        <div v-if="item.sorderForms">
                            <span class="text-r" style="display: inline-block">服务费：</span>¥{{ item.sorderForms.payAmountTotal }}
                        </div>
                        <div><span class="text-r" style="display: inline-block">优惠：</span>-¥{{ item.priceSumVO.pricePreferential }}</div>
                        <div class="text-color-red">
                            <span class="text-r" style="display: inline-block">合计：</span>¥{{ item.priceSumVO.totalPrice }}
                        </div>
                    </a-col>
                    <!-- <a-col class="col-item flex flex-v flex-r-c text-c font-12 text-color-black" :span="3">{{ item.createTime }}</a-col> -->
                    <a-col class="col-item flex flex-v flex-r-c text-c" :span="2">
                        <div class="font-12 text-color-black">{{ item.statusName }}</div>
                        <nuxt-link class="mt-8 font-12" :to="`/member/order/${item.orderNo}/detail.html`">查看详情</nuxt-link>
                    </a-col>
                    <a-col class="col-item flex flex-v flex-r-c text-c" :span="4">
                        <a-button
                            v-if="[2, -1].includes(item.status)"
                            type="link"
                            class="button font-12"
                            @click="handleDelete(item.orderNo)"
                            >删除订单</a-button
                        >
                        <a-button
                            v-if="[8].includes(item.status) && item.paymentState === 3"
                            class="button font-12"
                            type="link"
                            @click="showEvidenceModal(item.tradeNo)"
                            >上传转账凭证</a-button
                        >
                        <a-button
                            v-if="[2, 16, 32, -1].includes(item.status)"
                            type="link"
                            class="button font-12"
                            @click="handleBuyAgain(item.orderNo)"
                            >再次购买</a-button
                        >
                        <a-button
                            v-if="[8].includes(item.status) && item.paymentState === 3"
                            type="link"
                            class="button font-12"
                            @click="showRemittanceModal(item)"
                            >线下汇款</a-button
                        >
                        <!-- <a-button v-if="showTransferBtn && info.paymentState === 1" type="primary" class="mr-12" ghost>微信支付</a-button> -->
                        <nuxt-link
                            v-if="[8].includes(item.status) && item.paymentState !== 3"
                            class="button font-12"
                            :to="`/confirmOrder/${item.orderNo}/4/confirm-success.html`"
                            >去支付</nuxt-link
                        >
                        <a-button
                            v-if="[32].includes(item.status)"
                            type="link"
                            class="button font-12"
                            @click="handleConfirmReceipt(item.orderNo)"
                            >确认订单</a-button
                        >
                        <nuxt-link
                            v-if="item.paymentState === 3"
                            :to="`/member/order/${item.orderNo}/evidence-list.html`"
                            class="button font-12"
                        >
                            我的凭证
                        </nuxt-link>
                    </a-col>
                </a-row>
            </div>
        </div>
        <remittance-modal v-model="remittanceModalStatus" :order-id="orderId" @ok="handleOpenEvidenceModal"></remittance-modal>
        <evidence-modal v-model="evidenceModalStatus" :trade-no="tradeNo" @success="handleEvidenceSuccess"></evidence-modal>
    </div>
</template>
<script>
import RemittanceModal from '@/pageComponents/member/order/remittance-modal.vue';
import EvidenceModal from '@/pageComponents/member/order/evidence-modal.vue';
export default {
    name: 'OrderList',
    filters: {
        filterSpec(input) {
            let str = '';
            if (input && input.length > 0) {
                input.forEach((item) => {
                    str += item.label + ':' + item.value + '；';
                });
            }

            return str;
        }
    },
    components: {
        RemittanceModal,
        EvidenceModal
    },
    props: {
        list: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            orderId: '',
            tradeNo: '',
            remittanceModalStatus: false,
            evidenceModalStatus: false
        };
    },
    methods: {
        // 跳转到商品详情页
        toPruductDetail(id) {
            this.$router.push(`/product/${id}/1/pruduct-detail.html`);
        },
        // 显示线下付款
        showRemittanceModal(data) {
            this.orderId = data.orderNo;
            this.tradeNo = data.tradeNo;
            this.remittanceModalStatus = true;
        },
        // 显示上传凭证付款
        showEvidenceModal(tradeNo) {
            this.tradeNo = tradeNo;
            this.evidenceModalStatus = true;
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
        handleBuyAgain(orderId) {
            this.$api.member.anotherOrderByOrderNo(orderId).then((data) => {
                this.$router.push('/cart/cart.html');
            });
        },
        // 删除订单
        handleDelete(orderId) {
            this.$api.member.deleteOrderNo(orderId).then((data) => {
                this.$message.success('删除订单成功');
                this.$router.push('/member/order/index.html');
            });
        },
        // 确认收货
        handleConfirmReceipt(orderId) {
            this.$api.member.receivingOrder(orderId).then((data) => {
                this.$message.success('确认订单成功');
                this.$emit('refresh');
            });
        }
    }
};
</script>
<style scoped lang="less">
.order-list-container {
    .table-header {
        background: rgba(0, 8, 22, 0.04);
        line-height: 42px;
        border-radius: 4px;
    }

    .order-card {
        border-radius: 4px;
        border: 1px solid #e0e1e3;
        overflow: hidden;
        .head-box {
            background: rgba(0, 8, 22, 0.04);
            height: 40px;
        }
        .col-item {
            height: 82px;
            .goods-pic {
                height: 82px;
                width: 82px;
                flex-shrink: 0;
            }
            .button {
                margin-bottom: 12px;
                &:last-child {
                    margin-bottom: 0;
                }
            }
        }
        .pruduct-item {
            cursor: pointer;
            padding-bottom: 12px;
            border-bottom: 1px solid #eaeaea;
            &:last-child {
                border-bottom: none;
                padding-bottom: 0;
            }
        }
    }
}
</style>
