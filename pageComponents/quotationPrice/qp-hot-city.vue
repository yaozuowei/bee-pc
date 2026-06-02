<!--热门城市-->
<template>
    <div class="similar-box">
        <!-- <div class="title font-14 font-bold text-color-black">热门</div> -->
        <div class="similar-product scrollbar-box">
            <h3 class="font-bold">热门城市</h3>
            <div v-if="hotData.topOfTheTownList.length" class="pointer">
                <a-tag v-for="item in hotData.topOfTheTownList" :key="item" color="orange" class="mb-8" @click="changeCity(item)">
                    {{ item }}
                </a-tag>
            </div>
            <h3 class="mt-24 font-bold">热门资讯</h3>
            <div v-if="hotData.newsList.length" class="pointer">
                <div
                    v-for="(item, index) in hotData.newsList"
                    :key="index"
                    style="color: rgba(0, 0, 0, 0.65)"
                    class="link-item font-14 line-1 mb-8"
                    @click="changeNew(item)"
                >
                    <a-tag v-if="index <= 2" :color="tagColor[index]" class="mb-8 link-tag" :class="[]"> {{ index + 1 }} </a-tag>
                    <a-tag v-else :color="tagColor[index]" class="mb-8 link-tag text-color-black" :class="[]"> {{ index + 1 }} </a-tag>
                    {{ item.title }}
                </div>
            </div>
            <h3 class="mt-24 font-bold">热门品牌</h3>
            <div v-if="hotData.brandList.length" class="pointer">
                <div
                    v-for="(item, index) in hotData.brandList"
                    :key="index"
                    class="link-item font-14 text-color-black line-1 mb-8"
                    style="color: rgba(0, 0, 0, 0.65)"
                    @click="changeBrand(item)"
                >
                    <a-tag v-if="index <= 2" :color="tagColor[index]" class="mb-8 link-tag" :class="[]"> {{ index + 1 }} </a-tag>
                    <a-tag v-else :color="tagColor[index]" class="mb-8 link-tag text-color-black" :class="[]"> {{ index + 1 }} </a-tag>
                    {{ item.title }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        hotData: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            tagColor: ['#f50', '#f60', '#faa904', '#f0f1f4']
        };
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
        },
        // 切换城市
        changeCity(name) {
            this.$emit('search', {
                page: 1,
                limit: 20,
                list: [name]
            });
        },
        // 切换热门资讯
        changeNew(item) {
            const routeUrl = this.$router.resolve({
                path: `/news/${item.id}/detail.html`
            });
            window.open(routeUrl.href, '_blank');
        },
        // 切换热门品牌
        changeBrand(item) {
            const routeUrl = this.$router.resolve({
                path: `/story/${item.id}/detail.html`
            });
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
    .link-tag {
        width: 18px;
        height: 18px;
        line-height: 18px;
        text-align: center;
        padding: 0;
        margin-right: 4px;
    }
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
.link-item {
    &:hover {
        color: @main-color !important;
    }
}
</style>
