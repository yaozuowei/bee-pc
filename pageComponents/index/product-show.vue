<!--首页商品展示组件-->
<template>
    <div class="product-box">
        <!-- 爆品推荐 -->
        <header-title :is-see-more="true" @toMoreFun="toMoreBP"></header-title>
        <a-carousel autoplay :dots="false" :autoplay-speed="5000" style="height: 310px; overflow: hidden">
            <div v-for="(item, index) in explosiveSku" :key="index">
                <div class="flex">
                    <div v-for="(val, y) in item" :key="y" class="block-hot">
                        <product-item-s :key="y" :item-data="val" item-height="310px" :is-activity="true"></product-item-s>
                    </div>
                </div>
            </div>
        </a-carousel>
        <!-- 限时活动 -->
        <div v-if="productData.activitiesList && productData.activitiesList.length">
            <header-title title="限时活动"></header-title>
            <a-carousel autoplay :dots="false" :autoplay-speed="5000" style="height: 143px; overflow: hidden">
                <div v-for="(item, index) in activitiesList" :key="index">
                    <div class="flex">
                        <div v-for="(val, y) in productData.activitiesList" :key="y" class="block-hot">
                            <activity-show :key="y" :item-data="val"></activity-show>
                        </div>
                    </div>
                </div>
            </a-carousel>
        </div>
        <!-- 好货榜单 -->
        <header-title title="好货榜单" :is-see-more="true" @toMoreFun="toMoreHW"></header-title>
        <div class="flex flex-r-b bee-content-width">
            <div class="mr-16">
                <goods-product-tab :referrer-sku="productData.referrerSku.dadList" @changeTab="changeTab"></goods-product-tab>
            </div>
            <div class="goods-hot">
                <div
                    v-for="(item, index) in goodsProduct"
                    :key="index"
                    :style="{ marginBottom: index > 4 ? '0' : '12px', marginRight: (index + 1) % 4 === 0 ? '0' : '13px' }"
                >
                    <product-item-s :item-data="item" flag="all" :is-activity="false"></product-item-s>
                </div>
            </div>
        </div>
        <!-- 品牌货源 -->
        <header-title title="品牌货源"></header-title>
        <div ref="brandGoodsList" class="flex flex-r-s flex-w">
            <div
                v-for="(item, index) in productList"
                :key="index"
                class="block-hot"
                :style="{ marginRight: (index + 1) % 5 === 0 ? '0' : '13px' }"
            >
                <product-item-s :key="item.id" flag="spu" :item-data="item"></product-item-s>
            </div>
        </div>
        <div class="text-r mt-12">
            <a-pagination
                show-quick-jumper
                :current="pageData.current"
                :page-size="pageData.size"
                :total="pageData.total"
                @change="onChange"
            />
        </div>
    </div>
</template>
<script>
import { Carousel, Pagination } from 'ant-design-vue';
import HeaderTitle from './product/header-title.vue';
import productItemS from './product/product-item-s.vue';
import ActivityShow from './product/activity-show.vue';
import goodsProductTab from './product/goods-product-tab.vue';
export default {
    components: {
        HeaderTitle,
        productItemS,
        ActivityShow,
        goodsProductTab,
        ACarousel: Carousel,
        APagination: Pagination
    },
    props: {
        productData: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            goodsProduct: [], // 好货榜单对应的商品
            productList: [], // 品牌货源商品数据
            pageData: {
                current: 1, // 当前页
                total: 0, // 数据总数
                size: 20
            }
        };
    },
    computed: {
        // 爆款商品数据处理
        explosiveSku() {
            if (!this.productData && !this.productData.explosiveSku && !this.productData.explosiveSku.length) return [];
            const arr = [];
            for (let i = 0; i < this.productData.explosiveSku.length; i += 5) {
                arr.push(this.productData.explosiveSku.slice(i, i + 5));
            }
            return arr;
        },
        // 活动数据处理
        activitiesList() {
            if (!this.productData && !this.productData.activitiesList && !this.productData.activitiesList.length) return [];
            const arr = [];
            for (let i = 0; i < this.productData.activitiesList.length; i += 4) {
                arr.push(this.productData.activitiesList.slice(i, i + 44));
            }
            return arr;
        }
    },
    watch: {
        productData: {
            handler() {
                this.productList = this.productData.productList.records;
                this.goodsProduct = this.productData.referrerSku.dadList[0].plist.slice(0, 8);
                // 设置分页数据
                this.pageData.total = this.productData.productList.total;
                this.pageData.size = this.productData.productList.size;
            },
            immediate: true,
            deep: true
        }
    },
    methods: {
        // 修改好货榜单数据
        changeTab(arr) {
            this.goodsProduct = arr.slice(0, 8);
        },
        // 获取商品列表数据
        async getList() {
            const res = await this.$api.product.getMallProductApi({
                page: this.pageData.current,
                limit: this.pageData.size
            });
            this.pageData.total = res.total;
            this.pageData.size = res.size;
            this.productList = res.records;
        },
        // 分页切换
        onChange(page, pageSize) {
            this.pageData.current = page;
            this.getList();
            this.$scroll(this.$refs.brandGoodsList);
        },
        // 好货榜单查看更多
        toMoreHW() {
            this.$router.push('/activity/goods/index.html');
        },
        // 爆品推荐查看更多查看更多
        toMoreBP() {
            this.$router.push('/activity/hot/index.html');
        }
    }
};
</script>
<style lang="less" scoped>
.goods-hot {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    width: 0;
}
.block-hot {
    margin-right: 13px;
    margin-bottom: 12px;
}
.block-hot:last-child {
    margin-right: 0;
}
</style>
