<!--商品详情基本信息展示-->
<template>
    <div class="detail-product-info">
        <div v-for="(item, index) in list" :key="index" class="item flex font-12 text-color-01 mb-16">
            <div class="label font-12 text-color-01">{{ item.name }}:</div>
            <div class="font-12 text-color-black line-2">
                {{ item.value }}<span v-if="unit && (index == 1 || index == 3)"> {{ unit }}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        unit: {
            type: String,
            default: '-'
        },
        skuInfo: {
            type: Object,
            default: () => ({})
        }
    },

    data() {
        return {
            list: [
                {
                    name: '品牌名称',
                    value: null,
                    key: 'brandName'
                },
                {
                    name: '起订量',
                    value: null,
                    key: 'buyMinQuantity'
                },
                {
                    name: '发货地',
                    value: null,
                    key: 'producingArea'
                },
                {
                    name: '库存',
                    value: null,
                    key: 'stock'
                },
                {
                    name: '订货编码',
                    value: null,
                    key: 'skuId'
                },
                {
                    name: '发货周期',
                    value: null,
                    key: 'deliveryCycle'
                }
            ]
        };
    },
    watch: {
        skuInfo: {
            handler() {
                this.list.forEach((e) => {
                    if (e.key === 'deliveryCycle') {
                        e.value = (this.skuInfo[e.key] || '-') + '天';
                    } else {
                        e.value = this.skuInfo[e.key];
                    }
                });
            },
            immediate: true,
            deep: true
        }
    }
};
</script>
<style lang="less">
.detail-product-info {
    width: 778px;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    border-bottom: solid 1px rgba(0, 8, 22, 0.08);
    .item {
        width: 25%;
        .label {
            width: 60px;
        }
    }
}
</style>
