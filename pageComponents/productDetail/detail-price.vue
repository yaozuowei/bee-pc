<!--商品详情价格展示-->
<template>
    <div class="detail-price">
        <div class="flex flex-v-c font-12 text-color-01">
            商品价格：
            <div class="font-22 font-bold text-color-red">¥{{ priceData.price }}</div>
            <div class="font-12 text-color-02 mt-4 ml-4" style="text-decoration: line-through">¥{{ priceData.marketPrice }}</div>
        </div>
        <!-- <div v-if="priceData.outputPrice" class="font-12 text-color-01 mt-12">
            未税价格：<span class="text-color-02">¥{{ priceData.outputPrice }}</span>
        </div> -->
    </div>
</template>
<script>
export default {
    props: {
        priceData: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            price: 0.0,
            marketPrice: 0.0
        };
    }
    // computed: {
    //     handlerPrice() {
    //         if (!this.detailData) return data;
    //         data.price = (this.detailData.currentSku ? this.detailData.currentSku.price : this.detailData.price) || '0.0';
    //         data.marketPrice = (this.detailData.currentSku ? this.detailData.currentSku.marketPrice : this.detailData.marketPrice) || '0.0';
    //         return;
    //     }
    // }
};
</script>
<style lang="less">
.detail-price {
    width: 778px;
    min-height: 110px;
    background: rgba(0, 8, 22, 0.04);
    border-radius: 4px;
    padding: 0 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>
