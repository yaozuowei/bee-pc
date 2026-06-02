<!--人气新品-->
<template>
    <div class="Hot-box flex flex-v flex-v-c">
        <bee-page>
            <!-- 搜索组件 -->
            <bee-search>
                <!-- tab切换 -->
                <bee-tab :current="2"></bee-tab>
            </bee-search>
            <div class="line mb-16"></div>
            <div class="bee-content-width" style="margin: 0 auto">
                <!-- banner展示 -->
                <img class="img-ban mb-24" src="@/assets/images/index/new-banner.png" alt="" />
                <!-- 类别 -->
                <client-only>
                    <collapse-fiflter
                        :list="categoryList"
                        class="mb-24"
                        :has-checkbox="false"
                        label-name="分类"
                        @change="change"
                    ></collapse-fiflter>
                </client-only>
                <!-- 商品列表展示 -->
                <div v-if="productList.length" class="flex flex-w">
                    <div
                        v-for="(item, index) in productList"
                        :key="index"
                        class="mb-12"
                        :style="{ marginRight: (index + 1) % 5 === 0 ? '0' : '13px' }"
                    >
                        <bee-product-item :key="index" :item-data="item" flag="spu">
                            <!-- 收藏 我的购物车 -->
                            <div class="btn-groups flex flex-v-c">
                                <div class="font-12 text-color-black font-bold" @click.stop="collectFun(item, index)">
                                    <img v-if="item.isCollect" src="@/assets/images/like-active-icon.png" alt="" />
                                    <img v-else src="@/assets/images/collection-n.png" alt="" />收藏
                                </div>
                                <!-- <div class="font-12 text-color font-bold" @click.stop="toMycart">
                                    <img src="@/assets/images/cart-icon.png" alt="" />我的购物车
                                </div> -->
                            </div>
                        </bee-product-item>
                    </div>
                </div>
                <bee-empty v-else></bee-empty>
            </div>
        </bee-page>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import CollapseFiflter from '../../../pageComponents/product/collapse-fiflter.vue';
import BeeTab from '@/components/BeeTab.vue';
import BeeProductItem from '@/components/BeeProductItem.vue';
import BeeEmpty from '@/components/BeeEmpty.vue';
export default {
    name: 'HotIndex',
    components: {
        BeeTab,
        BeeProductItem,
        CollapseFiflter,
        BeeEmpty
    },
    props: {},
    async asyncData({ $api }) {
        const res = await $api.product.getMallNewProductApi({ page: 1, limit: 40 });
        return {
            productList: res.records
        };
    },
    data() {
        return {
            productList: [],
            cat1Id: ''
        };
    },
    computed: {
        ...mapState({
            categoryList(state) {
                const arr = JSON.parse(JSON.stringify(state.category.categoryList));
                arr.unshift({
                    name: '不限',
                    id: ''
                });
                // const arr = [];
                // state.category.categoryList.forEach((e) => {
                //     e.children.forEach((v) => {
                //         arr.push({
                //             id: v.id,
                //             name: v.name
                //         });
                //     });
                // });

                return arr;
            }
        })
    },
    created() {
        console.log(this.productList, 'productList');
        this.$store.dispatch('category/getCategory');
    },
    methods: {
        // 选择类别后切换
        change(item) {
            this.cat1Id = item.id;
            this.getList();
        },
        // 获取商品
        async getList() {
            const res = await this.$api.product.getMallNewProductApi({ page: 1, limit: 40, cat1Id: this.cat1Id });
            this.productList = res?.records || [];
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
            // this.$message.error('暂未开放');
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
</style>
