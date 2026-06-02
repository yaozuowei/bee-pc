<!--商品详情操作按钮-->
<template>
    <div class="flex flex-v-c">
        <!-- 商品数量增加 -->
        <div class="flex">
            <div class="btn-num" :class="[minusDisable().flag ? 'disabled-btn-num' : '']" :style="{ width, height }" @click="minusSkuNum">
                <a-icon type="minus" />
            </div>
            <div class="num-box" :class="[isCart ? 'num-box-cart' : '']" :style="{ height }">
                <a-input-number v-model="productNum" class="mr-8" :min="1" :max="100000" @blur="blurFun" />
            </div>
            <div class="btn-num" :class="[addDisable().flag ? 'disabled-btn-num' : '']" :style="{ width, height }" @click="addSkuNum">
                <a-icon type="plus" />
            </div>
        </div>
        <!-- 加入购物车 -->
        <div v-if="!isCart" class="ml-16">
            <a-button type="primary" style="width: 154px" :disabled="!isClickBtn" :loading="addLoading" @click="addCartFun">
                加入购物车
            </a-button>
        </div>
        <!-- 立即购买 -->
        <div v-if="!isCart" class="ml-16 buy-box">
            <a-button style="width: 138px" :loading="buyNowLoading" :disabled="!isClickBtn" @click="buyNow"> 立即购买 </a-button>
        </div>
    </div>
</template>
<script>
import { InputNumber } from 'ant-design-vue';
export default {
    components: {
        AInputNumber: InputNumber
    },
    inject: {
        getList: {
            default: () => {}
        }
    },
    props: {
        skuInfo: {
            type: Object,
            default: () => ({})
        },
        // 是否是购物车 此组件与购物车共用
        isCart: {
            type: Boolean,
            default: false
        },

        width: {
            type: String,
            default: '34px'
        },
        height: {
            type: String,
            default: '34px'
        },
        // 是否可以购买 根据选择的规格改变词值的状态
        isClickBtn: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            productNum: 1,
            addLoading: false, // 加入购物车按钮状态
            buyNowLoading: false, // 立即购买按钮状态
            // 添加防抖
            isLoading: false
        };
    },
    computed: {
        // 根据状态判断是否禁用数量减少按钮
        minusDisable() {
            return function (type = 'click') {
                const obj = {
                    flag: false,
                    toast: '' // 错误提示
                };
                if (type === 'input') {
                    // if (!this.skuInfo.isActivities) {
                    if (this.productNum < this.skuInfo.buyMinQuantity) {
                        obj.flag = true;
                        obj.toast = '最低购买不能小于起订量';
                    }
                    // } else if (this.productNum < 1) {
                    //     obj.flag = true;
                    //     obj.toast = '最低购买一件商品';
                    // }
                } else if (type === 'click') {
                    // if (!this.skuInfo.isActivities) {
                    // 商品数量不能少于起购数
                    if (this.productNum <= this.skuInfo.buyMinQuantity) {
                        obj.flag = true;
                        obj.toast = '最低购买不能小于起订量';
                    }
                    // } else if (this.productNum <= 1) {
                    //     obj.flag = true;
                    //     obj.toast = '最低购买一件商品';
                    // }
                }
                return obj;
            };
        },
        // 根据状态判断是否禁用数量增加按钮
        addDisable() {
            return function (type = 'click') {
                const obj = {
                    flag: false,
                    toast: '' // 错误提示
                };
                if (type === 'input') {
                    // 商品数量不能超过当前库存
                    if (this.productNum > this.skuInfo.stock) {
                        obj.flag = true;
                        obj.toast = '库存不足';
                        return obj;
                    }
                    // 判断是否是活动
                    if (this.skuInfo.isActivities) {
                        if (this.skuInfo.limitAmount && this.productNum > this.skuInfo.limitAmount) {
                            obj.flag = true;
                            obj.toast = '购买数量不能超过限购数量';
                        }
                    }
                } else if (type === 'click') {
                    // 商品数量不能超过当前库存
                    if (this.productNum >= this.skuInfo.stock) {
                        obj.flag = true;
                        obj.toast = '库存不足';
                        return obj;
                    }
                    // 判断是否是活动
                    if (this.skuInfo.isActivities) {
                        if (this.skuInfo.limitAmount && this.productNum >= this.skuInfo.limitAmount) {
                            obj.flag = true;
                            obj.toast = '购买数量不能超过限购数量';
                        }
                    }
                }
                return obj;
            };
        }
    },
    watch: {
        skuInfo: {
            handler(val) {
                if (this.isCart) {
                    this.productNum = val.number;
                    return;
                }
                // 判断是否是活动
                // if (this.skuInfo.isActivities) {
                //     this.productNum = val.limitAmount || val.buyMinQuantity; // 活动商品赋值限购数量
                // } else {
                this.productNum = val.buyMinQuantity; // 赋值最小起订量
                // }
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        // 增加商品数量
        addSkuNum() {
            if (this.addDisable().flag) {
                return this.$message.error(this.addDisable().toast);
            }
            if (this.isLoading) return;
            this.productNum++;
            console.log(this.productNum, '2');
            // 购物车需要调接口
            if (this.isCart) {
                this.handlerCart();
            }
        },
        // 减少商品数量
        minusSkuNum() {
            if (this.minusDisable().flag) {
                return this.$message.error(this.minusDisable().toast);
            }
            if (this.isLoading) return;
            this.productNum--;
            // 购物车需要调接口
            if (this.isCart) {
                this.handlerCart();
            }
        },
        // 输入框焦点移出
        blurFun() {
            this.checkFun();
        },
        async handlerCart() {
            this.isLoading = true;
            try {
                await this.$api.cart.saveCartNum({
                    id: this.skuInfo.id,
                    number: this.productNum,
                    skuId: this.skuInfo.skuId
                });
                this.isLoading = false;
                this.getList();
                // this.$emit('updateList');
            } catch (error) {
                this.isLoading = false;
            }
        },
        // 校验函数
        checkFun() {
            let checkFlag = true; // 校验变量
            if (this.addDisable('input').flag) {
                this.$message.error(this.addDisable('input').toast);
                checkFlag = false;
            }
            if (this.minusDisable('input').flag) {
                this.$message.error(this.minusDisable('input').toast);
                checkFlag = false;
            }
            // 判断是否是活动
            if (this.skuInfo.isActivities && !checkFlag) {
                this.productNum = this.skuInfo.buyMinQuantity; // 活动商品赋值限购数量
            } else if (!checkFlag) {
                this.productNum = this.skuInfo.buyMinQuantity; // 赋值最小起订量
            }
            if (this.isLoading) return;
            // 购物车需要调接口
            if (this.isCart) {
                this.handlerCart();
            }
            return checkFlag;
        },
        // 此函数为当前商品为活动的时候调用
        checkActFun() {
            const activitiesVO = this.skuInfo.activitiesVO;
            let checkFlag = true; // 校验变量
            if (this.skuInfo.isActivities) {
                if (!activitiesVO.isActivityStar) {
                    checkFlag = false;
                    this.$message.error('活动未开始');
                }
                if (!activitiesVO.isActivityAreaStar) {
                    checkFlag = false;
                    this.$message.error('该商品在该地区不支持销售，非常抱歉！');
                }
            }
            return checkFlag;
        },
        // 登录校验
        checkLogin() {
            if (!this.$store.getters.isLogin) {
                this.$message.error('请登录后进行操作');
                this.$router.push({
                    path: '/login/index.html',
                    query: {
                        from: this.$route.fullPath
                    }
                });
                return false;
            }
            return true;
        },
        // 加入购物车
        addCartFun() {
            // 登录校验
            if (!this.checkLogin()) return;
            // 校验库存等信息
            const checkFlag = this.checkFun();
            if (!checkFlag) return;
            // 校验活动信息
            const checkActFlag = this.checkActFun();
            if (!checkActFlag) return;
            const params = {
                number: this.productNum,
                skuId: this.skuInfo.skuId
            };
            this.addLoading = true;
            this.$api.cart
                .addCart(params)
                .then((res) => {
                    this.$message.success('加入购物车成功');
                    this.addLoading = false;
                })
                .catch(() => {
                    this.$message.error('加入购物车失败，请稍后再试');
                    this.addLoading = false;
                });
        },
        // 立即购买
        buyNow() {
            // 登录校验
            if (!this.checkLogin()) return;
            // 校验库存等信息
            const checkFlag = this.checkFun();
            if (!checkFlag) return;
            // 校验活动信息
            const checkActFlag = this.checkActFun();
            if (!checkActFlag) return;
            this.buyNowLoading = true;
            this.$api.cart
                .confirmOrder([
                    {
                        number: this.productNum,
                        skuId: this.skuInfo.skuId,
                        source: 'web'
                    }
                ])
                .then((res) => {
                    this.buyNowLoading = false;
                    this.$store.commit('confirmOrder/SET_CONFIRMDATA', res);
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
.btn-num {
    width: 34px;
    height: 34px;
    cursor: pointer;
    border: 1px solid #d9d9d9;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: @main-color;
    box-sizing: border-box;
    &:nth-child(1) {
        border-top-left-radius: 2px;
        border-bottom-left-radius: 2px;
        border-right: none;
    }
    &:last-child {
        border-top-right-radius: 2px;
        border-bottom-right-radius: 2px;
        border-left: none;
    }
    img {
        width: 100%;
        height: 34px;
    }
}
.disabled-btn-num {
    opacity: 0.5;
}
:deep(.num-box .ant-input-number) {
    /* 去除边框样式 */
    border-radius: 0;
    user-select: none;
    // height: 60px;
}

.num-box {
    width: 67px;
    height: 34px;
    text-align: center;
    :deep(.ant-input-number, ) {
        width: 67px !important;
        height: 34px !important;

        // line-height: 24px;
    }
    :deep(.ant-input-number-input) {
        height: 34px !important;
        // line-height: 22px !important;
        font-size: 18px;
        text-align: center;
        color: #000816;
    }
    :deep(.ant-input-number-handler-wrap) {
        display: none;
    }
}
.num-box-cart {
    width: 57px;
    height: 24px;
    text-align: center;
    :deep(.ant-input-number, ) {
        width: 57px !important;
        height: 24px !important;

        // line-height: 24px;
    }
    :deep(.ant-input-number-input) {
        height: 24px !important;
        // line-height: 22px !important;
        font-size: 14px;
    }
}
.ant-btn {
    height: 42px;
}
.buy-box {
    .ant-btn {
        border: solid 1px @main-color;
        color: @main-color;
    }
}
</style>
