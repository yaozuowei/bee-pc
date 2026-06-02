<!-- 确认订单页面 -->
<template>
    <div>
        <bee-page>
            <div class="header">
                <bee-simple-head></bee-simple-head>
            </div>
            <div class="bee-content-width page-con">
                <!-- 收获地址 -->
                <confirm-address class="mt-32" @getParams="getParams"></confirm-address>
                <!-- 发票信息 -->
                <confirm-invoice class="mt-32" @getParams="getParams"></confirm-invoice>
                <!-- 支付方式 -->
                <confirm-payinfo class="mt-32" @getParams="getParams"></confirm-payinfo>
                <div class="font-18 font-bold mt-32 text-color-black">商品清单</div>
                <!-- 商品清单 -->
                <confirm-product-list :list="productList" class="mt-16"></confirm-product-list>
                <!-- 备注信息 -->
                <confirm-remark ref="confirmRemark" :date-time="dateTime" class="mt-32"></confirm-remark>
                <!-- 确认订单底部按钮 -->
                <confirm-footer-btn
                    class="mt-32"
                    :price-sum-v-o="priceSumVO"
                    :is-invoice="isInvoice"
                    :freight-price="freightPrice"
                    @submit="submit"
                ></confirm-footer-btn>
            </div>
        </bee-page>
    </div>
</template>
<script>
import ConfirmAddress from '@/pageComponents/confirmOrder/confirm-address.vue';
import ConfirmInvoice from '@/pageComponents/confirmOrder/confirm-invoice.vue';
import ConfirmPayinfo from '@/pageComponents/confirmOrder/confirm-payinfo.vue';
import ConfirmProductList from '@/pageComponents/confirmOrder/confirm-product-list.vue';
import ConfirmRemark from '@/pageComponents/confirmOrder/confirm-remark.vue';
import confirmFooterBtn from '@/pageComponents/confirmOrder/confirm-footer-btn.vue';
export default {
    components: {
        ConfirmAddress,
        ConfirmInvoice,
        ConfirmPayinfo,
        ConfirmProductList,
        ConfirmRemark,
        confirmFooterBtn
    },
    data() {
        return {
            productList: [],
            dateTime: '', // 期望交期初始化时间
            params: {
                addressId: null, // 地址id
                channelSource: 'web', // 来源
                payState: null, // 支付方式
                positioning: null, // 城市定位名称
                skuList: [], // 商品id
                invoiceId: null, // 发票
                freightTotal: 0
            },
            priceSumVO: null, // 确认订单价格信息
            isInvoice: false, // 是否展示税费
            freightPrice: '待物流核算运费',
            isPayFlag: false // 是否点击了提交订单
        };
    },
    watch: {
        '$store.state.location': {
            handler() {
                this.params.positioning = this.$store.state.location.address.split('-')[0] || '';
            },
            deep: true,
            immediate: true
        },
        // 监听地址 做运费操作
        'params.addressId': {
            handler() {
                if (!this.params.addressId) return;
                this.getOrderFreightFun(this.params.addressId);
            },
            immediate: true
        }
    },
    //
    created() {
        if (process.browser) {
            this.init();
        }
    },

    methods: {
        // 初始化确认订单页面
        init() {
            const storage = window.sessionStorage.getItem('vuex');
            if (!storage || !JSON.parse(storage).confirmOrder) {
                this.$message.error('获取确认订单信息失败');
                setTimeout(() => {
                    window.opener = null;
                    window.open('about:blank', '_self');
                    window.close();
                }, 800);
                return;
            }
            const data = JSON.parse(storage).confirmOrder.confirmOrderData;
            this.productList = data.inventoryList || [];
            if (this.productList.length) {
                this.params.skuList = [];
                this.productList.forEach((e) => {
                    this.params.skuList.push({
                        number: e.number,
                        skuId: e.skuId
                    });
                });
            }
            this.dateTime = data.expectedDeliveryTime;
            this.priceSumVO = data.priceSumVO;
            console.log(data, 'data');
        },
        // 生成确认订单参数
        getParams(data) {
            // 判断是否选择开发票
            if (data.key === 'invoiceId') {
                if (data.value) {
                    this.isInvoice = true;
                } else {
                    this.isInvoice = false;
                }
            }
            this.params[data.key] = data.value;
        },
        // 获取运费
        async getOrderFreightFun(addressId) {
            // 多个商品 不计算运费
            if (this.productList.length > 1) return;
            this.freightPrice = '运费计算中...';
            try {
                const res = await this.$api.order.getOrderFreight({
                    number: this.priceSumVO.productCount,
                    addressId,
                    skuId: this.productList[0].skuId
                });
                this.params.freightTotal = typeof res === 'number' ? res : 0;
                this.freightPrice = typeof res === 'number' ? res : '待物流核算运费';
            } catch (error) {
                this.freightPrice = '待物流核算运费';
            }
        },
        // 确认订单
        async submit() {
            if (this.isPayFlag) return;
            this.params = {
                ...this.params,
                ...this.$refs.confirmRemark.remarkInfo
            };
            this.isPayFlag = true;
            this.$message.loading('订单生成中...', 0);
            try {
                const res = await this.$api.order.createOrder(this.params);
                if (this.freightPrice === '待物流核算运费') {
                    // 创建支付订单
                    this.createBillFun(res);
                }
                this.$message.success('订单创建成功，快去支付吧');
                this.$message.destroy();
                this.isPayFlag = false;
                if (this.freightPrice === '待物流核算运费') {
                    this.$router.replace(`/member/order/${res.orderNo}/detail.html`);
                } else {
                    this.$router.replace(`/confirmOrder/${res.orderNo}/${this.params.payState}/confirm-success.html`);
                }
            } catch (error) {
                this.$message.destroy();
                this.$message.error('订单创建失败，请重新下单');
                this.isPayFlag = false;
            }
        },
        // 创建付款单接口
        async createBillFun(params) {
            const arr = params.orderNo.split('-');
            // 订单类型 M:主订单 E:物流订单 S:服务费订单
            const orderType = arr.length > 1 ? arr[1] : 'M';
            await this.$api.order.createBill({
                orderNo: params.orderNo,
                payState: this.params.payState,
                source: 'web',
                orderType
            });
        }
    }
};
</script>
<style lang="less" scoped>
.header {
    // box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.06);
}
.page-con {
    margin: 0 auto;
}
</style>
