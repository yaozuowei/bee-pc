<!--相似商品-->
<template>
    <div class="similar-box">
        <div class="title font-14 font-bold text-color-black">相似商品</div>
        <div class="similar-product scrollbar-box">
            <div v-for="(item, index) in list" :key="index" class="product-item flex mb-16" @click="toProductDetail(item)">
                <div class="mr-8">
                    <img :src="item.imageDefault.url" alt="" />
                </div>
                <div class="pt-4 pb-4 flex flex-v flex-r-b">
                    <div class="font-12 text-color-black line-2">
                        {{ item.title || '-' }}
                    </div>
                    <div class="font-12 text-color-red font-bold">¥{{ item.price }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        list: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        // 跳转商品详情页面
        toProductDetail(item) {
            const routeUrl = this.$router.resolve({
                // 1 skuid 2 spuid 3 活动商品
                path: `/product/${item.id}/${1}/pruduct-detail.html`
            });
            // console.log(routeUrl);
            window.open(routeUrl.href, '_blank');
        }
    }
};
</script>
<style lang="less">
.similar-box {
    width: 234px;
    height: 657px;
    border-radius: 4px;
    border: 1px solid rgba(0, 8, 22, 0.12);
    position: relative;
    .title {
        width: 232px;
        height: 39px;
        background: #f0f0f1;
        text-align: center;
        line-height: 39px;
        position: sticky;
        top: 0;
        user-select: none;
    }
    .similar-product {
        padding: 16px;
        height: 600px;
        overflow-x: hidden;
    }
    .product-item {
        border-bottom: solid 1px rgba(0, 8, 22, 0.04);
        padding-bottom: 16px;
        cursor: pointer;

        img {
            width: 70px;
            height: 70px;
            border-radius: 4px;
            display: block;
        }
    }
}
</style>
