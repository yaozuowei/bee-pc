<template>
    <bee-page>
        <!-- 顶部bar -->
        <bee-simple-head />

        <div class="flex flex-r-c">
            <div class="bee-content-width">
                <bee-breadcrumb class="mt-32" :items="breadcrumbData" />

                <div class="banner mt-24">
                    <img v-if="sceneData.imageFiles && sceneData.imageFiles.length > 0" class="img" :src="sceneData.imageFiles[0]" />
                    <div class="text font-32 font-bold flex flex-r-c flex-v-c">{{ sceneData.title }}</div>
                </div>
                <client-only>
                    <collapse-fiflter
                        :list="categoryList"
                        :has-checkbox="false"
                        class="mt-24"
                        label-name="类别"
                        @change="collapseFiflterChange"
                    ></collapse-fiflter>
                </client-only>

                <div class="flex flex-w">
                    <template v-if="sceneData.skuList && sceneData.skuList.length > 0">
                        <bee-product-item
                            v-for="(item, index) in sceneData.skuList"
                            :key="item.id"
                            :item-data="item"
                            class="mt-12"
                            :style="{ marginRight: (index + 1) % 5 === 0 ? '0' : '13px' }"
                        >
                            <div class="btn-groups flex flex-v-c">
                                <div class="font-12 text-color-black font-bold" @click.stop="collectFun(item)">
                                    <img v-if="item.isCollect" src="@/assets/images/like-active-icon.png" alt="" />
                                    <img v-else src="@/assets/images/collection-n.png" alt="" /> 收藏
                                </div>
                                <!-- <div class="font-12 text-color font-bold" @click.stop="toMycart">
                                    <img src="@/assets/images/cart-icon.png" alt="" />我的购物车
                                </div> -->
                            </div>
                        </bee-product-item>
                    </template>
                    <bee-empty v-else></bee-empty>
                </div>
                <!-- <div class="mt-40 flex flex-r-e">
                    <client-only>
                        <a-pagination v-model="requestArg.page" show-quick-jumper :default-page-size="requestArg.size" :total="824" />
                    </client-only>
                </div> -->
            </div>
        </div>
        <bee-mod-service :top="60"></bee-mod-service>
        <a-back-top />
    </bee-page>
</template>

<script>
// import { Pagination } from 'ant-design-vue';
import { mapState } from 'vuex';
import CollapseFiflter from '@/pageComponents/product/collapse-fiflter.vue';

export default {
    name: 'SceneGoodsList',
    components: {
        CollapseFiflter
        // APagination: Pagination
    },
    async asyncData({ $api, params }) {
        console.log(params);
        const data = await $api.scene.getSceneDetails({
            catId1: '',
            sceneId: params.sceneId
        });
        data.skuList = data.skuList.map((item) => {
            return Object.assign(
                {
                    imageDefault: item.imageFile
                },
                item
            );
        });
        return {
            sceneData: data,
            breadcrumbData: [
                {
                    name: '首页',
                    path: '/'
                },
                {
                    name: '场景案例',
                    path: '/scene/index.html'
                },
                {
                    name: data.title
                }
            ]
        };
    },
    data() {
        return {
            breadcrumbData: [
                {
                    name: '首页',
                    path: '/'
                },
                {
                    name: '场景案例',
                    path: '/scene/index.html'
                },
                {
                    name: ''
                }
            ],
            sceneData: {
                skuList: []
            }
            // requestArg: {
            //     page: +this.$router.currentRoute.query.page || 1,
            //     size: 20
            // }
        };
    },
    computed: {
        ...mapState({
            categoryList(state) {
                if (state.category.categoryList && state.category.categoryList.length > 0) {
                    return [
                        {
                            id: '',
                            name: '不限'
                        },
                        ...state.category.categoryList
                    ];
                } else {
                    if (!process.server) {
                        this.$store.dispatch('category/getCategory');
                    }
                    return [];
                }
            }
        })
    },
    methods: {
        async collapseFiflterChange(area) {
            const data = await this.$api.scene.getSceneDetails({
                catId1: area ? area.id : '',
                sceneId: this.$router.currentRoute.params.sceneId
            });
            data.skuList = data.skuList.map((item) => {
                console.log(item.imageFile);
                return Object.assign(
                    {
                        imageDefault: item.imageFile
                    },
                    item
                );
            });
            this.sceneData = data;
        },

        // 收藏商品
        collectFun(item) {
            this.$verifyLogin(async () => {
                if (!item.isCollect) {
                    await this.$api.product.collectProductApi({ cartProductIds: [item.spuId] });
                } else {
                    await this.$api.product.cancelCollectProductApi({ cartProductIds: [item.spuId] });
                }
                this.sceneData.skuList.forEach((sku, index) => {
                    if (sku.spuId === item.spuId) {
                        this.sceneData.skuList[index].isCollect = !sku.isCollect;
                    }
                });
            });
        },
        // 点击我的购物车
        toMycart() {
            const routeUrl = this.$router.resolve('/cart/cart.html');
            window.open(routeUrl.href, '_blank');
        }
    }
};
</script>

<style scoped lang="less">
.banner {
    width: 100%;
    height: 300px;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    .img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .text {
        background: rgba(0, 0, 0, 0.25);
        position: absolute;
        z-index: 3;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        color: #fff;
    }
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
