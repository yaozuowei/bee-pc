<!--商品列表-->
<template>
    <div class="flex flex-v flex-v-c">
        <bee-page>
            <!-- 搜索组件 -->
            <bee-search>
                <!-- tab切换 -->
                <bee-tab :current="0"></bee-tab>
            </bee-search>
            <div class="line mb-16"></div>
            <div class="bee-content-width" style="margin: 0 auto">
                <!-- 筛选区域 -->
                <div class="mb-24">
                    <!-- 产地 -->
                    <client-only>
                        <collapse-fiflter :list="cityList" class="mb-8" label-name="产地" @change="change"></collapse-fiflter>
                    </client-only>
                    <!-- 品牌 -->
                    <!-- <collapse-fiflter class="mb-24" label-name="品牌"></collapse-fiflter> -->
                    <!-- 筛选条件 -->
                    <client-only>
                        <fiflter-more
                            :producr-num="producrNum"
                            @saveShowStatus="isColumm = !isColumm"
                            @changeMore="changeMore"
                        ></fiflter-more>
                    </client-only>
                </div>
                <!-- 商品列表展示 -->
                <div v-if="productList.length && !isColumm" ref="refProductList" class="flex flex-w">
                    <div
                        v-for="(item, index) in productList"
                        :key="index"
                        class="mb-12"
                        :style="{ marginRight: (index + 1) % 5 === 0 ? '0' : '13px' }"
                    >
                        <bee-product-item :key="index" :item-data="item" :activity-id="activityId" flag="spu">
                            <!-- 活动 -->
                            <div v-if="activityId" class="pb-20 flex flex-r-c">
                                <div class="hot-price flex flex-v-c">
                                    <div v-if="item.stock - item.soldStock > 0" class="price-box font-12 mr-12">
                                        库存仅剩{{ item.stock - item.soldStock || '-' }}件
                                    </div>
                                    <div v-else class="price-box font-12 mr-12">已抢光</div>
                                    <div class="font-12 font-bold" style="color: white">抢购</div>
                                </div>
                            </div>

                            <!-- 收藏 我的购物车 -->
                            <div v-else class="btn-groups flex flex-v-c">
                                <div class="font-12 text-color-black font-bold" @click.stop="collectFun(item, index)">
                                    <img v-if="item.isCollect" src="@/assets/images/like-active-icon.png" alt="" />
                                    <img v-else src="@/assets/images/collection-n.png" alt="" />
                                    收藏
                                </div>
                                <!-- <div class="font-12 text-color font-bold" @click.stop="toMycart">
                                    <img src="@/assets/images/cart-icon.png" alt="" />我的购物车
                                </div> -->
                            </div>
                        </bee-product-item>
                    </div>
                </div>
                <!-- 列表形式商品列表展示 -->
                <div v-if="productList.length && isColumm" class="flex flex-w mb-12">
                    <columm-item :list="productList" :activity-id="activityId" flag="spu"></columm-item>
                </div>
                <!-- 分页 -->
                <div v-if="productList.length" class="text-r">
                    <a-pagination
                        show-quick-jumper
                        :current="pageData.current"
                        :page-size="pageData.size"
                        :total="pageData.total"
                        @change="onChange"
                    />
                </div>
                <!-- 空状态 -->
                <bee-empty v-else></bee-empty>
            </div>
            <bee-mod-service :top="64"></bee-mod-service>
        </bee-page>
    </div>
</template>

<script>
import { Pagination } from 'ant-design-vue';
import CollapseFiflter from '../../pageComponents/product/collapse-fiflter.vue';
import FiflterMore from '../../pageComponents/product/fitlter-more.vue';
import ColummItem from '../../pageComponents/product/columm-item.vue';
import BeeTab from '@/components/BeeTab.vue';
import BeeProductItem from '@/components/BeeProductItem.vue';
import BeeEmpty from '@/components/BeeEmpty.vue';
export default {
    name: 'ProductIndex',
    components: {
        CollapseFiflter,
        BeeTab,
        BeeProductItem,
        FiflterMore,
        APagination: Pagination,
        BeeEmpty,
        ColummItem
    },
    props: {},
    async asyncData({ $api, route }) {
        const activityId = route.query.activityId;
        const cat2Id = route.query.cat2Id || '';
        const keyword = route.query.keyword || '';

        let res;
        debugger
        if (activityId) {
            // 活动商品列表
            res = await $api.product.getActivitiestListApi({ activityId, page: 1, limit: 40 });
        } else {
            // 普通商品列表
            res = await $api.product.getMallProductApi({ page: 1, limit: 40, cat2Id, keyword });
        }
        return {
            activityId,
            productList: res?.records || [],
            cat2Id,
            producrNum: res.total,
            keyword
        };
    },
    data() {
        return {
            activityId: null, // 活动id
            cityList: [], // 产地列表
            brandList: [], // 品牌列表
            cat2Id: '', // 二级分类id
            params: {
                sortOrder: '', // 人气排序
                salesOrder: '', // 销量排序
                priceOrder: '', // 价格排序
                maxPrice: '', // 最高价格
                minPrice: '' // 最低价格
            },
            productList: [],
            producrNum: 0, // 累计商品数量
            areaIds: null, // 城市id
            pageData: {
                current: 1, // 当前页
                total: this.producrNum, // 数据总数
                size: 40
            },
            keyword: '', // 关键字搜索
            isColumm: false // 是否为列表模式展示
        };
    },

    created() {
        this.handlerCity();
        this.pageData.total = this.producrNum;
    },
    mounted() {
        console.log(this.productList, '进来了');
    },
    methods: {
        // 获取商品数据
        async getList() {
            const params = {
                page: this.pageData.current,
                limit: this.pageData.size,
                cat2Id: this.cat2Id,
                areaIds: this.areaIds,
                keyword: this.keyword,
                ...this.params
            };
            let res;
            debugger
            if (this.activityId) {
                res = await this.$api.product.getActivitiestListApi({ activityId: this.activityId, ...params });
            } else {
                res = await this.$api.product.getMallProductApi(params);
            }
            this.productList = res?.records || [];
            this.pageData.total = res.total;
            this.producrNum = res.total;
            this.pageData.size = res.size;
        },
        // 条件筛选
        changeMore(params) {
            // eslint-disable-next-line array-callback-return
            Object.keys(this.params).map((r) => {
                console.log(r);
                if (r === 'maxPrice') {
                    this.params[r] = params.maxPrice || '';
                } else if (r === 'minPrice') {
                    this.params[r] = params.minPrice || '';
                } else if (r === params.key) {
                    this.params[r] = params.sort;
                } else {
                    this.params[r] = '';
                }
            });
            this.getList();
        },
        // 产地选择
        change(params) {
            if (params instanceof Array) {
                this.areaIds = params.length ? params : null;
            } else if (params.id) {
                this.areaIds = [params.id];
            } else {
                this.areaIds = null;
            }
            this.getList();
        },
        // 分页切换
        onChange(page, pageSize) {
            this.pageData.current = page;
            this.getList();
            this.$scroll(this.$refs.refProductList);
        },
        // 收藏商品
        collectFun(item, index) {
            this.$verifyLogin(async () => {
                if (!item.isCollect) {
                    await this.$api.product.collectProductApi({ cartProductIds: [item.id] });
                } else {
                    await this.$api.product.cancelCollectProductApi({ cartProductIds: [item.id] });
                }
                this.productList[index].isCollect = !item.isCollect;
            });
        },
        // 点击我的购物车
        toMycart() {
            const routeUrl = this.$router.resolve('/cart/cart.html');
            window.open(routeUrl.href, '_blank');
        },
        // 处理城市数据
        handlerCity() {
            this.cityList = [];
            if (this.productList.length) {
                this.productList.forEach((e) => {
                    const row = this.cityList.find((v) => v.id === e.provinceId); // 防止重复添加城市
                    if (e.provinceId && !row) {
                        this.cityList.push({
                            id: e.provinceId,
                            name: e.producingArea.split('-')[0]
                        });
                    }
                });
            }
            this.cityList.unshift({
                name: '不限',
                id: ''
            });
        }
    }
};
</script>
<style lang="less" scoped>
.img-ban {
    width: 100%;
    height: 240px;
}
.line {
    width: 100%;
    height: 2px;
    background: #65c3b8;
}
.category-box {
    margin: 24px 0;
}
.btn-groups {
    div {
        height: 38px;
        border-top: 1px solid #e0e1e3;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        img {
            width: 16px;
            height: 16px;
            display: block;
            margin-right: 2px;
        }
    }
    // div:nth-child(1) {
    //     width: 68px;
    //     border-right: none;
    //     border-top-left-radius: 2px;
    //     border-bottom-left-radius: 2px;
    // }
    // div:nth-child(2) {
    //     width: 105px;
    //     border-top-right-radius: 2px;
    //     border-bottom-right-radius: 2px;
    // }
}
.hot-price {
    width: 172px;
    height: 26px;
    background: #fe4a4a;
    border-radius: 4px;
    padding: 2px;
    color: #5c6471;
    .price-box {
        width: 122px;
        height: 22px;
        background: #ffffff;
        -webkit-clip-path: polygon(0 0, 93% 0, 100% 100%, 0% 100%);
        clip-path: polygon(0 0, 93% 0, 100% 100%, 0% 100%);
        border-radius: 2px;
        line-height: 22px;
        padding: 0 8px;
        text-align: left;
    }
}
</style>
