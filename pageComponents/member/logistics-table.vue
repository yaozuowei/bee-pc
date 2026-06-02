<template>
    <div>
        <a-spin :spinning="loadStatus" style="min-height: 400px">
            <template v-if="loadStatus || (!loadStatus && list.length > 0)">
                <div class="logistics-table">
                    <a-row class="table-bar font-12 text-color-01">
                        <a-col class="pl-32" :span="3">图例</a-col>
                        <a-col :span="6">商品信息</a-col>
                        <a-col :span="5">产品规格</a-col>
                        <a-col :span="3">含税单价</a-col>
                        <a-col :span="3">商品数</a-col>
                        <a-col :span="4">物流信息</a-col>
                    </a-row>
                    <div>
                        <div v-for="item in list" :key="item.id" class="logistics-box mb-12" @click="toPruductDetail(item.skuId)">
                            <a-row class="font-12 text-color-black" type="flex" align="middle">
                                <a-col class="pl-32" :span="3">
                                    <bee-img :src="item.imgUrl" :lazy="true" :width="82" :height="82" :radius="4"></bee-img>
                                </a-col>
                                <a-col :span="6">
                                    <div class="line-2">{{ item.title }}</div>
                                    <div class="line-2 mt-16 text-color-02">SKU：{{ item.skuId }}</div>
                                </a-col>
                                <a-col :span="5">{{ item.specMap | filterSpec }}</a-col>
                                <a-col class="text-color-red" :span="3">{{ item.price }}</a-col>
                                <a-col :span="3">{{ item.number }}</a-col>
                                <a-col :span="4">
                                    <div v-if="item.expressName">物流公司：{{ item.expressName }}</div>
                                    <div v-if="item.expressNo">单号：{{ item.expressNo }}</div>
                                    <div v-if="item.plateNo">车牌号：{{ item.plateNo }}</div>
                                    <div v-if="item.driver">司机：{{ item.driver }}</div>
                                    <div v-if="item.linkNo">手机号：{{ item.linkNo }}</div>
                                </a-col>
                            </a-row>
                        </div>
                    </div>
                </div>
            </template>
            <bee-empty v-else :empty-title="''" empty-sub-title="暂无物流信息"></bee-empty>
        </a-spin>
    </div>
</template>
<script>
import { Spin } from 'ant-design-vue';

export default {
    name: 'LogisticsTable',
    components: {
        ASpin: Spin
    },
    filters: {
        filterSpec(input) {
            let str = '';
            if (input && input.length > 0) {
                input.forEach((item) => {
                    str += item.label + ':' + item.value + '；';
                });
            }

            return str;
        }
    },
    props: {
        orderId: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            loadStatus: true,
            list: []
        };
    },
    beforeMount() {
        this.getData();
    },
    methods: {
        getData() {
            this.loadStatus = true;
            this.$api.member
                .getOrderDetail(this.orderId)
                .then((data) => {
                    this.list = data.inventoryList;
                    this.loadStatus = false;
                })
                .catch(() => {
                    this.loadStatus = false;
                });
        },
        // 跳转到商品详情页
        toPruductDetail(id) {
            this.$router.push(`/product/${id}/1/pruduct-detail.html`);
        }
    }
};
</script>
<style scoped lang="less">
.logistics-table {
    border: 1px solid #e0e1e3;
    .logistics-box {
        padding: 28px 0;
        border-top: 1px solid #e0e1e3;
        cursor: pointer;
    }
}
.table-bar {
    line-height: 42px;
    background: rgba(0, 8, 22, 0.04);
    border-radius: 4px;
}
</style>
