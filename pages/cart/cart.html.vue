<!-- 购物车 -->
<template>
    <div>
        <bee-page>
            <div class="header">
                <bee-simple-head></bee-simple-head>
            </div>
            <div class="bee-content-width page-con">
                <!-- 购物车列表 -->
                <cart-product-list
                    v-if="productList.length"
                    :list="productList"
                    :is-select-all="isSelectAll"
                    @radioChange="radioChange"
                    @selectAllEvent="selectAllEvent"
                    @updateList="init"
                    @deleteFun="deleteFun"
                    @collectFun="collectFun"
                ></cart-product-list>
                <bee-empty v-else empty-title="暂无商品，快去选购吧" empty-sub-title=""></bee-empty>
                <!-- 购物车底部按钮 -->
                <cart-footer-btn
                    v-if="productList.length"
                    :buy-now-loading="buyNowLoading"
                    :total-selected-count="totalSelectedCount"
                    :is-select-all="isSelectAll"
                    :total-price="totalPrice"
                    @deleteFun="deleteFun"
                    @submit="submit"
                    @selectAllEvent="selectAllEvent"
                ></cart-footer-btn>
            </div>
        </bee-page>
    </div>
</template>
<script>
import CartProductList from '@/pageComponents/cart/cart-product-list.vue';
import CartFooterBtn from '@/pageComponents/cart/cart-footer-btn.vue';
import BeeEmpty from '@/components/BeeEmpty.vue';
export default {
    name: 'MineCart',
    components: {
        CartProductList,
        CartFooterBtn,
        BeeEmpty
    },
    provide() {
        return {
            getList: () => {
                this.init();
            }
        };
    },
    middleware: 'authenticated',
    // async asyncData({ $api, route }) {
    //     const res = await $api.cart.getCartList({ page: 1, limit: 1000 });
    //     return {
    //         productList: res?.records || []
    //     };
    // },
    data() {
        return {
            productList: [],
            buyNowLoading: false,
            totalSelectedCount: 0
        };
    },

    computed: {
        totalPrice() {
            const computedPriceArr = [];
            const computedPreferential = []; // 优惠价格
            this.productList.forEach((item) => {
                if (item.selected) {
                    // 判断是否是营销活动 计算总优惠的价格
                    if (item.activitiesVO) {
                        console.log('22');
                        computedPriceArr.push(item.activitiesVO.price * 100 * item.number);
                        computedPreferential.push((item.price - item.activitiesVO.price) * 100 * item.number);
                    } else {
                        computedPriceArr.push(item.price * 100 * item.number);
                    }
                }
            });
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.totalSelectedCount = computedPriceArr.length;
            const price = computedPriceArr.reduce((pre, cur) => {
                return (pre += cur);
            }, 0);
            // 总的优惠价格
            const preferential = computedPreferential.reduce((pre, cur) => {
                return (pre += cur);
            }, 0);
            console.log((price / 100).toFixed(2), (preferential / 100).toFixed(2));
            return {
                price: (price / 100).toFixed(2),
                preferential: (preferential / 100).toFixed(2)
            };
        },
        // 是否全选
        isSelectAll() {
            if (!this.productList.length) return;
            return this.productList.every((item) => item.selected);
        }
    },
    created() {
        if (process.browser) {
            this.init();
        }
    },

    methods: {
        async init() {
            const res = await this.$api.cart.getCartList({ page: 1, limit: 1000 });

            if (res.hasSoldList.length) {
                // 售空
                res.hasSoldList.map((r) => (r.type = 1));
            }
            if (res.purchaseList.length) {
                // 限购
                res.purchaseList.map((r) => (r.type = 2));
            }
            this.productList = [...res.page.records, ...res.hasSoldList, ...res.purchaseList];
        },

        /**
         * 全选按钮
         */
        async selectAllEvent() {
            const ids = this.productList.map((item) => item.id);
            await this.$api.cart.changeSelectCartApi({
                ids,
                selected: this.isSelectAll ? 0 : 1
            });
            this.init();
        },
        /**
         * 单选按钮
         * @param {Object}
         */
        async radioChange(item) {
            const selected = item.selected === 0 ? 1 : 0;
            await this.$api.cart.changeSelectCartApi({
                ids: [item.id],
                selected
            });
            this.init();
        },
        // 删除购物车商品
        async deleteFun(params) {
            const arr = [];
            // 删除选择的商品
            if (params === 'selected') {
                this.productList.forEach((item) => {
                    if (item.selected) {
                        arr.push(item.id);
                    }
                });
                if (arr.length === 0) {
                    this.$message.error('请选择需要删除的商品');
                    return;
                }
            } else {
                arr.push(params.id);
            }
            await this.$api.cart.deleteCartProduct({ cartProductIds: arr });
            this.$message.success('删除成功');
            this.init();
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
        // 立即购买
        submit() {
            const arr = [];
            this.productList.forEach((item) => {
                if (item.selected) {
                    arr.push({
                        skuId: item.skuId,
                        number: item.number,
                        source: 'web'
                    });
                }
            });
            if (arr.length === 0) {
                this.$message.error('请选择需要结算的商品');
                return;
            }
            this.buyNowLoading = true;
            this.$api.cart
                .confirmOrder(arr)
                .then((res) => {
                    this.buyNowLoading = false;
                    this.$store.commit('confirmOrder/SET_CONFIRMDATA', res);
                    console.log(this.$store.state.confirmOrder.confirmOrderData, '2323');
                    // 跳转确认订单页面
                    const routeUrl = this.$router.resolve('/confirmOrder/confirm-order.html');
                    window.open(routeUrl.href, '_blank');
                })
                .catch(() => {
                    this.$message.error('购买失败，请稍后再试');
                    this.buyNowLoading = false;
                });
        }
    }
};
</script>
<style lang="less" scoped>
.page-con {
    margin: 0 auto;
}
</style>
