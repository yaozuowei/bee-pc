<template>
    <div class="cart-footer flex flex-v-c flex-r-b">
        <div class="cart-left">
            <a-checkbox :checked="isSelectAll" @change="$emit('selectAllEvent')"> 全选 </a-checkbox>
            <a-popconfirm
                title="确认删除选中商品吗？"
                placement="bottom"
                @cancel.stop="() => {}"
                @confirm.stop="$emit('deleteFun', 'selected')"
            >
                <span class="text-color-red pointer">删除选中商品</span></a-popconfirm
            >
        </div>
        <div class="cart-right flex flex-v-c">
            <div class="flex">
                <div style="padding-top: 3px">
                    已选 <span class="text-color-red">{{ totalSelectedCount }}</span> 件
                </div>
                <div class="flex flex-v-c ml-4">
                    <div class="text-r">
                        <div>应付含税总额：</div>
                        <div>优惠：</div>
                    </div>
                    <div>
                        <div>
                            <span class="text-color-red font-18">￥{{ totalPrice?.price || '0.00' }}</span>
                        </div>
                        <div>
                            <span class="text-color-red font-14">￥{{ totalPrice.preferential || '-' }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ml-24">
                <a-button type="primary" :loading="buyNowLoading" @click="$emit('submit')"> 去结算 </a-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        buyNowLoading: {
            type: Boolean,
            default: false
        },
        isSelectAll: {
            type: Boolean,
            default: false
        },
        totalSelectedCount: {
            type: Number,
            default: 0
        },
        totalPrice: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {};
    }
};
</script>
<style lang="less" scoped>
.cart-footer {
    width: 100%;
    height: 60px;
    background: rgba(0, 8, 22, 0.04);
    margin-bottom: 60px;
    margin-top: 30px;
    padding-left: 20px;
    .cart-right {
        .ant-btn {
            width: 190px;
            height: 60px;
            background: #65c3b8;
            border-radius: 0px 0px 0px 0px;
            text-align: center;
            line-height: 60px;
            font-size: 18px;
        }
    }
}
</style>
