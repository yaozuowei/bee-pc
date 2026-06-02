<template>
    <div class="Hot-box flex flex-v flex-v-c f">
        <bee-page>
            <!-- 搜索组件 -->
            <bee-search>
                <!-- tab切换 -->
                <bee-tab :current="0"></bee-tab>
            </bee-search>
            <div class="line mb-16"></div>
            <div class="bee-content-width" style="margin: 0 auto">
                <!-- banner展示 -->
                <img class="img-ban mb-24" src="@/assets/images/hot/goods_banner.png" alt="" />
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
                <div v-if="HWList.length" class="flex flex-w">
                    <div
                        v-for="(item, index) in HWList"
                        :key="index"
                        class="mb-12"
                        :style="{ marginRight: (index + 1) % 5 === 0 ? '0' : '13px' }"
                    >
                        <bee-product-item :key="index" :item-data="item" flag="all">
                            <div class="pb-20 flex flex-r-c">
                                <div class="hot-price flex flex-v-c">
                                    <div class="price-box font-12 mr-12">库存仅剩{{ item.stock || '-' }}件</div>
                                    <div class="font-12 font-bold" style="color: white">抢购</div>
                                </div>
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
        const res = await $api.product.recommendProductApi({ type: 'HW' });
        return {
            HWList: res.hwList
        };
    },

    data() {
        return {
            HWList: [],
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
        this.$store.dispatch('category/getCategory');
        console.log(this.HWList, 'www');
    },
    mounted() {},
    methods: {
        // 选择类别后切换
        change(item) {
            this.cat1Id = item.id;
            this.getList();
        },
        // 获取商品
        async getList() {
            const res = await this.$api.product.recommendProductApi({ type: 'HW', cat1Id: this.cat1Id });
            this.HWList = res?.hwList || [];
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
