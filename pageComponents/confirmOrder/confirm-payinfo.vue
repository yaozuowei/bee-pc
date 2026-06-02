<!-- 支付方式 -->
<template>
    <div class="pay-info">
        <!-- 标题 -->
        <div class="header flex flex-v-c">
            <div class="font-18 text-color-black font-bold">支付方式</div>
        </div>
        <!-- 发票tab -->
        <div class="invoice-tab flex mt-24">
            <div
                v-for="(item, index) in tabList"
                :key="index"
                class="tab-item pointer mr-12"
                :class="[changeValue === index ? 'tab-item-select' : '']"
                @click="changeTab(item, index)"
            >
                {{ item.text }}
            </div>
        </div>
        <!-- 支持 -->
        <div v-if="changeValue === 0" class="mt-12 flex">
            <div class="font-12 text-color-01">支持：</div>
            <div class="flex">
                <div v-for="(val, cur) in payTypeList" :key="cur" class="info-item font-12 text-color-black mr-12 flex flex-v-c">
                    <img :src="val.imgUrl" alt="" />{{ val.text }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'PayInfo',
    data() {
        return {
            tabList: [
                {
                    id: '4',
                    text: '在线支付'
                },
                {
                    id: '3',
                    text: '线下汇款'
                }
            ],
            changeValue: 0, // 当前tab选择的值
            payTypeList: [
                // { text: '微信支付', imgUrl: require('../../assets/images/detail/wx-pay.png') },
                // { text: '银行借记卡支付', imgUrl: require('../../assets/images/detail/bank-pay.png') },
                { text: '小蜜蜂信用卡分期', imgUrl: require('../../assets/images/detail/xmf-pay.png') }
                // { text: '会员借记卡分期', imgUrl: require('../../assets/images/detail/hy-pay.png') },
                // { text: '线下汇款', imgUrl: require('../../assets/images/detail/hy-pay.png') }
            ]
        };
    },
    mounted() {
        this.$emit('getParams', { key: 'payState', value: this.tabList[0].id });
    },
    methods: {
        // tab 切换
        changeTab(item, index) {
            this.$emit('getParams', { key: 'payState', value: item.id });
            this.changeValue = index;
        }
    }
};
</script>
<style lang="less" scoped>
.pay-info {
    border: 1px solid #e0e1e3;
    padding: 20px;

    .tab-item {
        height: 30px;
        border-radius: 4px 4px 4px 4px;
        border: 1px solid rgba(0, 8, 22, 0.12);
        line-height: 30px;
        padding: 0 40px;

        &:hover {
            border: 1px solid #65c3b8;
            color: @main-color;
        }
    }
    .tab-item-select {
        border: 1px solid #65c3b8;
        color: @main-color;
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
}
</style>
