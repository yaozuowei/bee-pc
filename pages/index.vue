<template>
    <bee-page ref="box">
        <div class="bee-page-container flex flex-v flex-v-c">
            <!-- 搜索组件 -->
            <bee-search>
                <bee-tab :current="0"></bee-tab>
            </bee-search>

            <!-- 轮播图/分类/个人信息 -->
            <div class="bee-content-width flex flex-r-b mt-16">
                <!-- 分类 -->
                <div><category-product :tree-cat="homeData.treeCat"></category-product></div>
                <!-- 轮播图 -->
                <div class="swiper">
                    <a-carousel autoplay>
                        <img
                            v-for="(item, index) in homeData.ads"
                            :key="index"
                            :src="item.attachment?.url"
                            alt=""
                            @click="toDoView(item)"
                        />
                    </a-carousel>
                </div>
                <!-- 个人信息 -->
                <div><mine-info></mine-info></div>
            </div>
            <!-- 商品展示 -->
            <div class="bee-content-width" style="margin-bottom: 140px">
                <product-show :product-data="homeData"></product-show>
            </div>
            <!-- 正品 -->
            <div style="margin-bottom: 48px">
                <bee-mod-service :has-background="false"></bee-mod-service>
            </div>
        </div>
        <a-back-top />
        <!-- 顶部搜索组件展示 -->
        <div v-if="isTopSearch" class="top-search">
            <bee-scroll-search></bee-scroll-search>
        </div>
    </bee-page>
</template>

<script>
import { Carousel } from 'ant-design-vue';
import BeeSearch from '../components/BeeSearch.vue';
import BeeModService from '../components/BeeModService.vue';
import BeeTab from '../components/BeeTab.vue';
import CategoryProduct from '../pageComponents/index/category-product.vue';
import MineInfo from '../pageComponents/index/mine-info.vue';
import ProductShow from '../pageComponents/index/product-show.vue';
import BeeScrollSearch from '../components/BeeScrollSearch.vue';
import { debounce } from '@/utils';
export default {
    name: 'IndexPage',
    components: {
        BeeSearch,
        CategoryProduct,
        MineInfo,
        ACarousel: Carousel,
        ProductShow,
        BeeModService,
        BeeTab,
        BeeScrollSearch
    },
    async asyncData({ $axios, $api }) {
        const content = await $api.product.getIndexData({
            page: 1,
            limit: 20
        });

        return {
            homeData: content
        };
    },
    data() {
        return {
            homeData: null, // 首页接口数据
            isTopSearch: false // 是否展示顶部搜索
        };
    },
    mounted() {
        console.log(this.homeData, '232');
        const that = this;
        window.onscroll = debounce(function () {
            //  变量scrollTop是滚动条滚动时，距离顶部的距离
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            // 滚动条到底部的条件
            if (scrollTop > 200) {
                that.isTopSearch = true;
            } else {
                that.isTopSearch = false;
            }
        }, 300);
    },
    methods: {
        toDoView(item) {
            if (item && item.linkUrl) {
                this.$router.push(item.linkUrl);
            }
        }
    }
};
</script>

<style lang="less" scoped>
.bee-page-container {
    width: 100%;
    color: @main-color;
    background-color: @main-gray;
    overflow: hidden;
}
.swiper {
    width: 648px;
    height: 506px;
    overflow: hidden;
    border-radius: 8px;
    img {
        width: 100%;
        height: 506px;
        object-fit: cover;
        border-radius: 8px;
    }
}
.top-search {
    width: 100%;
    position: fixed;
    top: 0;
    animation: searchTop 0.5s ease-in-out;
    z-index: 99;
}
@keyframes searchTop {
    0% {
        top: -50px;
    }
    100% {
        top: 0;
    }
}
</style>
