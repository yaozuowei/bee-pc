<template>
    <bee-page>
        <!-- 搜索组件 -->
        <bee-search class="bee-search"></bee-search>

        <!-- 轮播图/分类/个人信息 -->
        <div class="bee-content-width">
            <bee-breadcrumb :items="breadcrumbData" />
            <order-status :order-id="orderId" :info="orderData" class="mt-32" @refresh="getData"></order-status>
            <nuxt-link
                v-if="[32, 2, 32, -1].includes(orderData.status)"
                :to="`/member/order/${orderId}/logistics-list.html`"
                class="mt-32 card-box flex flex-v-c flex-r-b"
            >
                <div class="flex flex-v-c">
                    <img class="icon" src="@/assets/images/store-icon.png" />
                    <div class="ml-20">
                        <div class="font-14 text-color-black">查看物流信息</div>
                        <!-- <div class="font-14 text-color-01 mt-4">订单已拆成多个快递发货</div> -->
                    </div>
                </div>
                <img class="arrow-icon" src="@/assets/images/arrow-right.png" />
            </nuxt-link>
            <order-address :info="orderData" class="mt-32"></order-address>
            <order-invoice v-if="orderData.memberInvoiceVO" :info="orderData.memberInvoiceVO" class="mt-32"></order-invoice>
            <order-goods :info="orderData" class="mt-32"></order-goods>
        </div>
        <bee-mod-service :top="60"></bee-mod-service>
    </bee-page>
</template>

<script>
import BeeSearch from '@/components/BeeSearch.vue';
import OrderStatus from '@/pageComponents/member/order/order-status.vue';
import OrderAddress from '@/pageComponents/member/order/order-address.vue';
import OrderInvoice from '@/pageComponents/member/order/order-invoice.vue';
import OrderGoods from '@/pageComponents/member/order/order-goods.vue';
export default {
    name: 'MemberOrderDetail',
    components: {
        BeeSearch,
        OrderStatus,
        OrderAddress,
        OrderInvoice,
        OrderGoods
    },
    middleware: 'authenticated',
    data() {
        return {
            orderId: this.$route.params.orderNo,
            params: {
                keyword: '',
                status: '',
                limit: 15,
                page: 1
            },
            breadcrumbData: [
                {
                    name: '首页',
                    path: '/'
                },
                {
                    name: '我的订单',
                    path: '/member/order/index.html'
                },
                {
                    name: `订单：${this.$route.params.orderNo}`
                }
            ],
            list: [],
            // 订单状态信息
            orderData: {}
        };
    },
    beforeMount() {
        this.getData();
    },
    methods: {
        getData() {
            this.$api.member.getOrderDetail(this.orderId).then((data) => {
                this.orderData = data;
            });
        }
    }
};
</script>

<style lang="less" scoped>
.bee-search {
    border-bottom: 2px solid #65c3b8;
}
.bee-content-width {
    margin: 24px auto;
}
.card-box {
    border: 1px solid #e0e1e3;
    border-radius: 4px;
    padding: 0 28px;
    // height: 94px;
    height: 70px;
    cursor: pointer;
    .icon {
        width: 26px;
        height: 26px;
    }
    .arrow-icon {
        width: 16px;
        height: 16px;
    }
}
</style>
