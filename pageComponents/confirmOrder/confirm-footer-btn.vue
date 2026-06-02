<!-- 确认订单底部按钮 -->
<template>
    <div class="footer-box">
        <div>
            <div class="flex mb-8">
                <div class="font-12 text-color-01 left-text">商品总件数：</div>
                <div class="font-12 text-color-red right-num">{{ priceSumVO?.productCount || '-' }}件</div>
            </div>
            <div v-if="isInvoice" class="flex mb-8">
                <div class="font-12 text-color-01 left-text">税费：</div>
                <div class="font-12 text-color-red right-num">￥{{ priceSumVO?.invoiceTaxTotalPrice || '0.00' }}</div>
            </div>
            <div class="flex mb-8">
                <div class="font-12 text-color-01 left-text">商品含税总额：</div>
                <div class="font-12 text-color-red right-num">￥{{ priceSumVO?.totalMoney || '0.00' }}</div>
            </div>

            <div class="flex mb-8">
                <div class="font-12 text-color-01 left-text">运费：</div>
                <div class="font-12 text-color-red right-num">{{ freightPrice }}</div>
            </div>
            <div class="flex mb-8">
                <div class="font-12 text-color-01 left-text">优惠：</div>
                <div class="font-12 text-color-red right-num">￥{{ priceSumVO?.pricePreferential }}</div>
            </div>
            <div class="flex mb-8">
                <div class="font-12 text-color-01 left-text">注：</div>
                <div class="font-12 text-color-red right-num">付款为信用卡分期付时您需要在订单提交后支付服务费</div>
            </div>
        </div>
        <!-- 提交订单按钮 -->
        <div class="btn-box flex flex-r-e flex-v-c mt-32">
            <div>
                <div class="flex flex-v-s pt-4">
                    <div class="font-14 text-color-02">应付含税总额：</div>
                    <div class="font-18 text-color-red">
                        <div>￥{{ priceTotalFun }}</div>
                        <div class="font-12">优惠：￥{{ priceSumVO?.pricePreferential || '0.00' }}</div>
                    </div>
                </div>
            </div>
            <div class="right-btn">
                <a-button type="primary" :disabled="freightPrice === '运费计算中...'" @click="$emit('submit')"> 提交订单 </a-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        priceSumVO: {
            type: Object,
            default: () => ({})
        },
        // 是否展示税费
        isInvoice: {
            type: Boolean,
            default: false
        },
        // 运费
        freightPrice: {
            type: [String, Number],
            default: '待物流核算运费'
        }
    },

    data() {
        return {};
    },
    computed: {
        // 计算总价
        priceTotalFun() {
            if (!this.priceSumVO) return;
            let price = Number(this.priceSumVO.priceTotal);
            // 有税费
            if (this.isInvoice) {
                price = price + Number(this.priceSumVO.invoiceTaxTotalPrice);
            }
            // 有运费
            if (typeof this.freightPrice === 'number') {
                price = price + Number(this.freightPrice);
            }
            return Number(price).toFixed(2);
        }
    }
};
</script>
<style lang="less" scoped>
.footer-box {
    margin-bottom: 109px;
}
.left-text {
    flex: 1;
    width: 0;
    text-align: right;
}
.right-num {
    min-width: 120px;
    text-align: right;
}
.btn-box {
    height: 60px;
    background: rgba(0, 8, 22, 0.04);
    border-radius: 4px;
    .right-btn {
        margin-left: 48px;
        .ant-btn {
            width: 190px;
            height: 60px;
            font-size: 18px;
            border-radius: 0;
        }
    }
}
</style>
