<template>
    <div class="order-goods">
        <div class="goods-list">
            <a-row class="header font-12 text-color-01">
                <a-col class="pl-32" :span="3">图例</a-col>
                <a-col :span="5">商品信息</a-col>
                <a-col :span="4">产品规格</a-col>
                <a-col :span="2">单位</a-col>
                <a-col :span="4">含税单价（元）</a-col>
                <a-col :span="3">订购数量</a-col>
                <a-col :span="3">含税小计（元）</a-col>
                <!-- <a-col class="pr-32" :span="3">状态</a-col> -->
            </a-row>
            <div v-if="info.inventoryList" class="list-box">
                <div
                    v-for="item in info.inventoryList"
                    :key="item.skuId"
                    class="item-box font-12 text-color-01 mb-12"
                    @click="toPruductDetail(item.skuId)"
                >
                    <a-row type="flex" align="middle">
                        <a-col class="pl-32" :span="3">
                            <div class="pic">
                                <bee-img :src="item.imgUrl" :lazy="true" :radius="4"></bee-img>
                            </div>
                        </a-col>
                        <a-col class="flex flex-v flex-r-c pr-12" :span="5">
                            <div class="font-12 text-color-black line-2">{{ item.title }}</div>
                            <div class="font-12 text-coolor-02 mt-16">SKU：{{ item.skuId }}</div>
                        </a-col>
                        <a-col class="flex flex-v pr-12" :span="4">
                            <div class="font-12 text-color-black line-2">{{ item.specMap | filterSpec }}</div>
                        </a-col>
                        <a-col class="font-12 text-color-black" :span="2">{{ item.unit }}</a-col>
                        <a-col :span="4">
                            <div class="font-12 text-color-black">￥{{ item.price }}</div>
                            <del v-if="item.price !== item.originalPrice" class="font-12 mt-4 text-color-02"
                                >￥{{ item.originalPrice }}</del
                            >
                            <!-- <div class="font-12 mt-4 text-color-02">(未税：566.00)</div> -->
                        </a-col>
                        <a-col class="font-12 text-color-black" :span="3">{{ item.number }}</a-col>
                        <a-col class="font-12 text-color-red" :span="3">¥{{ item.subtotal }}</a-col>
                        <!-- <a-col class="font-12 text-color-black pr-32" :span="3">等待支付</a-col> -->
                    </a-row>
                </div>
            </div>
        </div>

        <div class="price-list flex flex-v flex-v-e">
            <div class="price-row mb-16 font-12 flex flex-r-b flex-v-c">
                <span class="label text-color-01 text-r">商品总件数：</span>
                <span class="text-color-red">{{ info.productCount }}件</span>
            </div>
            <!-- <div class="price-row mb-16 font-12 flex flex-r-b flex-v-c">
                <span class="label text-color-01 text-r">税费：</span>
                <span class="text-color-red">￥78.00</span>
            </div> -->
            <div class="price-row mb-16 font-12 flex flex-r-b flex-v-c">
                <span class="label text-color-01 text-r">商品含税总额：</span>
                <span class="text-color-red">￥{{ info.payAmountTotal }}</span>
            </div>
            <div v-if="info.sorderForms" class="price-row mb-16 font-12 flex flex-r-b flex-v-c">
                <span class="label text-color-01 text-r">服务费：</span>
                <span class="text-color-red">￥{{ info.sorderForms.payAmountTotal }}</span>
            </div>
            <div class="price-row mb-16 font-12 flex flex-r-b flex-v-c">
                <span class="label text-color-01 text-r">运费：</span>
                <span v-if="info.status === 4" class="text-color-red">待运营确认</span>
                <span v-else-if="info.eorderForms" class="text-color-red">￥{{ info.eorderForms.payAmountTotal }}</span>
            </div>
            <div class="price-row font-12 flex flex-r-b flex-v-c">
                <span class="label text-color-01 text-r">优惠：</span>
                <span class="text-color-red">-￥{{ info.pricePreferential }}</span>
            </div>
        </div>
        <div class="footer-bar flex flex-v-c flex-r-e pr-32">
            <div class="flex">
                <div class="text-color-01 label font-14">应付含税总额：</div>
                <div class="text-color-red flex flex-v flex-r-e">
                    <div class="font-18 price">￥{{ info.totalPrice }}</div>
                    <div class="font-12 text-r mt-4">优惠：¥{{ info.pricePreferential }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'OrderGoods',
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
    props: {
        info: {
            type: Object,
            default: () => ({})
        }
    },
    methods: {
        // 跳转到商品详情页
        toPruductDetail(id) {
            this.$router.push(`/product/${id}/1/pruduct-detail.html`);
        }
    }
};
</script>
<style scoped lang="less">
.order-goods {
    .goods-list {
        border-radius: 4px;
        overflow: hidden;
        border: 1px solid #e0e1e3;
        .header {
            background: rgba(0, 8, 22, 0.04);
            line-height: 40px;
            border-bottom: 1px solid #e0e1e3;
        }
        .list-box {
            padding: 24px 0;
            .item-box {
                padding-bottom: 12px;
                border-bottom: 1px solid #eaeaea;
                cursor: pointer;
                &:last-child {
                    padding-bottom: 0;
                    border-bottom: 0;
                }
            }
            .pic {
                width: 82px;
                height: 82px;
            }
        }
    }
    .price-list {
        padding: 32px;
        .price-row {
            width: 220px;
            .label {
                width: 100px;
            }
        }
    }
    .footer-bar {
        height: 60px;
        background: rgba(0, 8, 22, 0.04);
        border-radius: 4px;
        .label,
        .price {
            line-height: 18px;
        }
    }
}
</style>
