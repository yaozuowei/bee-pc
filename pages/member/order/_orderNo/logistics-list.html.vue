<template>
    <bee-page>
        <!-- 搜索组件 -->
        <bee-search class="bee-search"></bee-search>

        <!-- 轮播图/分类/个人信息 -->
        <div class="bee-content-width">
            <bee-breadcrumb :items="breadcrumbData" />
            <logistics-table class="mt-24" :order-id="orderId"></logistics-table>
        </div>
        <bee-mod-service :top="60"></bee-mod-service>
    </bee-page>
</template>

<script>
import BeeSearch from '@/components/BeeSearch.vue';
import LogisticsTable from '@/pageComponents/member/logistics-table.vue';
export default {
    name: 'LogisticsList',
    components: {
        BeeSearch,
        LogisticsTable
    },
    middleware: 'authenticated',
    data() {
        return {
            orderId: this.$route.params.orderNo,
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
                    name: `订单：${this.$route.params.orderNo}`,
                    path: `/member/order/${this.$route.params.orderNo}/detail.html`
                },
                {
                    name: '物流信息'
                }
            ]
        };
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
</style>
