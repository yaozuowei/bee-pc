<template>
    <a-row v-if="info.deliveryInfoVO" class="address-box">
        <a-col class="row-item flex flex-v pl-24 pr-24" :span="8">
            <div class="text-color-black font-14">收货人信息</div>
            <div class="mt-20 text-color-01 font-14">收货人：{{ info.deliveryInfoVO.consignee }}</div>
            <div class="mt-16 text-color-01 font-14">地址：{{ info.deliveryInfoVO.provinces }}{{ info.deliveryInfoVO.address }}</div>
            <div class="mt-16 text-color-01 font-14">手机号：{{ info.deliveryInfoVO.tel }}</div>
        </a-col>
        <a-col class="row-item flex flex-v pl-24 pr-24" :span="8">
            <div class="text-color-black font-14">订单信息</div>
            <div v-if="info.deliveryInfoVO.express" class="mt-20 text-color-01 font-14">
                配送方式：{{ info.deliveryInfoVO.express === '1' ? '物流配送' : '自提' }}
            </div>
            <div class="mt-16 text-color-01 font-14">期望交货日期：{{ info.expectedDeliveryTime }}</div>
            <div class="mt-16 text-color-01 font-14">订单备注：{{ info.remark || '-' }}</div>
        </a-col>
        <a-col class="row-item flex flex-v pl-24 pr-24" :span="8">
            <div class="text-color-black font-14">付款信息</div>
            <div class="mt-20 text-color-01 font-14">付款方式：{{ info.payment }}</div>
        </a-col>
    </a-row>
</template>
<script>
export default {
    name: 'OrderAddress',
    props: {
        info: {
            type: Object,
            default: () => ({})
        }
    }
};
</script>
<style scoped lang="less">
.address-box {
    border: 1px solid #e0e1e3;
    border-radius: 4px;
    padding: 24px 0;
    .row-item {
        border-right: 1px solid #e0e1e3;
    }
}
</style>
