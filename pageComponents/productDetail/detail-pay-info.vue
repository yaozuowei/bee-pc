<template>
    <div class="pay-info">
        <div v-for="(item, index) in list" :key="index" class="mb-12 flex">
            <div class="font-12 text-color-01">{{ item.text }}：</div>
            <div class="flex">
                <div v-for="(val, cur) in item.arr" :key="cur" class="info-item font-12 text-color-black mr-12 flex flex-v-c">
                    <img :src="val.imgUrl" alt="" />{{ val.text }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            list: [
                {
                    text: '支付方式',
                    arr: [
                        { text: '微信支付', imgUrl: require('../../assets/images/detail/wx-pay.png') },
                        // { text: '银行借记卡支付', imgUrl: require('../../assets/images/detail/bank-pay.png') },
                        { text: '小蜜蜂信用卡分期', imgUrl: require('../../assets/images/detail/xmf-pay.png') },
                        // { text: '会员借记卡分期', imgUrl: require('../../assets/images/detail/hy-pay.png') },
                        { text: '线下汇款', imgUrl: require('../../assets/images/detail/hy-pay.png') }
                    ]
                },
                {
                    text: '商品服务',
                    arr: [
                        { text: '正品保障', imgUrl: require('../../assets/images/detail/zpbz.png') },
                        { text: '增票速开', imgUrl: require('../../assets/images/detail/zpsk.png') },
                        { text: '售后保障', imgUrl: require('../../assets/images/detail/shbz.png') }
                    ]
                }
            ]
        };
    }
};
</script>
<style lang="less">
.pay-info {
    padding-bottom: 4px;
    border-bottom: solid 1px rgba(0, 8, 22, 0.08);
}
.info-item {
    cursor: pointer;
    img {
        width: 16px;
        height: 16px;
        margin-right: 4px;
    }
    &:hover {
        color: @main-color;
    }
}
</style>
