<template>
    <div class="Hot-box flex flex-v flex-v-c">
        <bee-page>
            <!-- 搜索组件 -->
            <bee-search>
                <!-- tab切换 -->
                <bee-tab :current="6"></bee-tab>
            </bee-search>
            <div class="line mb-16"></div>
            <div class="bee-content-width" style="margin: 0 auto; margin-bottom: 48px">
                <!-- banner展示 -->
                <img class="img-ban mb-24" src="@/assets/images/index/new-banner.png" alt="" />
                <div class="flex">
                    <div style="width: 280px; margin-right: 20px">
                        <qp-hot-city :hot-data="hotData" @search="getList"></qp-hot-city>
                    </div>
                    <div>
                        <qp-product-table
                            :product-list="productList"
                            :area-list="areaList"
                            :cate-list="cateList"
                            :total="total"
                            @search="getList"
                        ></qp-product-table>
                    </div>
                    <!-- <div style="width: 280px; margin-left: 20px">
                        <qp-hot-city></qp-hot-city>
                    </div> -->
                </div>
            </div>
        </bee-page>
    </div>
</template>
<script>
import QpProductTable from '../../pageComponents/quotationPrice/qp-product-table.vue';
import QpHotCity from '../../pageComponents/quotationPrice/qp-hot-city.vue';
export default {
    name: 'QuotationPrice',
    components: { QpProductTable, QpHotCity },
    async asyncData({ $api }) {
        const res = await $api.quotationPrice.getQuoPriceList({
            page: 1,
            limit: 20
        });
        return {
            productList: res.page?.records || [],
            total: res.page?.total || 0, // 总数据条数
            hotData: {
                topOfTheTownList: res.topOfTheTownList || [], // 热门城市
                newsList: res.newsList || [], // 资讯
                brandList: res.brandList || [] // 品牌
            },
            areaList: res.areaList || [],
            cateList: res.cateList || []
        };
    },
    data() {
        return {
            productList: [],
            hotData: null,
            total: 0,
            areaList: [],
            cateList: []
        };
    },
    mounted() {},
    methods: {
        async getList(params) {
            const res = await this.$api.quotationPrice.getQuoPriceList(params);
            this.total = res.page?.total || 0;
            this.productList = res.page?.records || [];
        }
    }
};
</script>
<style lang="less" scoped>
.line {
    width: 100%;
    height: 2px;
    background: #65c3b8;
}
</style>
