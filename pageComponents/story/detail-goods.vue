<template>
    <div class="goods-container">
        <div class="content-box">
            <div class="header text-c text-color-black font-14">提及到的商品</div>
            <div class="goods-list flex flex-v">
                <div v-for="item in list" :key="item.id" class="goods-item flex flex-v-c" @click="toProductDetailPage(item.id)">
                    <div v-if="item.imageFile" class="img mr-16">
                        <bee-img :src="item.imageFile.url" lazy />
                    </div>
                    <div class="flex flex-v">
                        <div class="title font-12 line-2">{{ item.title }}</div>
                        <div class="mt-12 text-color-red font-12">¥{{ item.price }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'StoryDetailGoods',
    props: {
        list: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        toProductDetailPage(id) {
            const routeUrl = this.$router.resolve(`/product/${id}/1/pruduct-detail.html`);
            window.open(routeUrl.href, '_blank');
        }
    }
};
</script>
<style scoped lang="less">
.goods-container {
    margin-top: 108px;
    width: 234px;
    .content-box {
        width: 100%;
        border: 1px solid rgba(0, 8, 22, 0.12);
        border-radius: 4px;
        .header {
            width: 100%;
            height: 40px;
            line-height: 40px;
            background: #f0f0f1;
            border-radius: 3px 3px;
            opacity: 1;
        }
        .goods-list {
            padding: 0 16px;
            .goods-item {
                border-bottom: 1px solid rgba(0, 8, 22, 0.04);
                padding: 16px 0;
                cursor: pointer;
                .img {
                    width: 70px;
                    height: 70px;
                    border-radius: 4px;
                    flex-shrink: 0;
                    overflow: hidden;
                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }
            }
        }
    }
}
</style>
