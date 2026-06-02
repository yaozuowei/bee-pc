<template>
    <div class="Hot-box flex flex-v flex-v-c">
        <bee-page>
            <!-- 搜索组件 -->
            <bee-search>
                <!-- tab切换 -->
                <bee-tab :current="9"></bee-tab>
            </bee-search>
            <div class="line mb-16"></div>
            <div class="bee-content-width" style="margin: 0 auto; margin-bottom: 48px">
                <!-- banner展示 -->
                <div class="header-banner">
                    <div class="header-title">小蜜蜂金融贷</div>
                    <div class="header-desc">联合四家银行放心贷款</div>
                </div>
                <div class="tabs flex">
                    <div v-for="(item, index) in tabList" :key="index" class="tab-item" @click="changeTab(index)">
                        <img class="img" :src="item.img" alt="" />
                        <div v-show="changeIndex === index" class="tab-line"></div>
                    </div>
                </div>
                <div class="mt-4">
                    <!-- <img
                        v-if="changeIndex == 1"
                        style="width: 100%; height: 482px"
                        src="https://dev-public-bee-mall.oss-cn-shanghai.aliyuncs.com/activities_img/d639cab24f29640334e4aafec72b0b4b0e957027.png"
                        mode=""
                    /> -->
                    <CardInfo :change-index="changeIndex" />
                </div>
                <div style="margin-top: 42px">
                    <ApplyForm :change-index="changeIndex" />
                </div>
            </div>
        </bee-page>
    </div>
</template>
<script>
import CardInfo from '../../pageComponents/financialLoan/card-info.vue';
import ApplyForm from '../../pageComponents/financialLoan/apply-form.vue';
export default {
    name: 'FinancialLoan',
    components: {
        CardInfo,
        ApplyForm
    },
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
            cateList: [],
            changeIndex: 0,
            tabList: [
                {
                    img: require('@/assets/bank/b-1.png'),
                    num: 'x3'
                },
                {
                    img: require('@/assets/bank/b-2.png'),
                    num: 'x6'
                },
                {
                    img: require('@/assets/bank/b-3.png'),
                    num: 'x1'
                },
                {
                    img: require('@/assets/bank/b-4.png'),
                    num: 'x4'
                },
                {
                    img: require('@/assets/bank/b-5.png'),
                    num: 'x2'
                }
            ]
        };
    },
    mounted() {
        // eslint-disable-next-line no-var
    },
    methods: {
        async getList(params) {
            const res = await this.$api.quotationPrice.getQuoPriceList(params);
            this.total = res.page?.total || 0;
            this.productList = res.page?.records || [];
        },

        changeTab(index) {
            this.changeIndex = index;
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
.header-banner {
    width: 100%;
    height: 150px;
    background-image: url('https://dev-public-bee-mall.oss-cn-shanghai.aliyuncs.com/activities_img/a321dd484acce2e4ea1a68dfd5cc34bd07a88fe8.png');
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .header-title {
        font-size: 28px;
        color: #ffffff;
    }
    .header-desc {
        font-size: 16px;
        color: #ffffff;
    }
}
.tabs {
    padding: 0 80px;
    box-sizing: border-box;
    justify-content: space-between;
    margin-top: 20px;
    .tab-item {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        position: relative;
        .img {
            width: 186px;
            height: 80px;
        }
        .tab-line {
            width: 120px;
            height: 4px;
            background: #fd5901;
            border-radius: 2px;
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
        }
    }
}
</style>
