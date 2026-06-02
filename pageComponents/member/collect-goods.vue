<template>
    <a-table :columns="columns" :loading="loading" :data-source="data" :pagination="paginationData" @change="pageChange">
        <div slot="cover" slot-scope="record">
            <bee-img :src="record.imageUrl" :alt="record.title" :width="84" :height="84" :radius="4" lazy />
        </div>
        <div slot="info" slot-scope="record">
            <nuxt-link :to="`/product/${record.spuId}/2/pruduct-detail.html`" class="font-12 text-color-black line-2">{{
                record.title
            }}</nuxt-link>
            <p class="font-12 text-color-02 line-1">SUP：{{ record.spuId }}</p>
        </div>
        <div slot="spec">
            <h4 class="font-12 text-color-black">规格数据</h4>
        </div>
        <div slot="price" slot-scope="record">
            <div class="font-12 text-color-red">¥{{ record.price }}</div>
        </div>
        <span slot="action" slot-scope="test, record, index">
            <a-button type="link" @click="handleCancel(record.spuId, index)">取消收藏</a-button>
        </span>
    </a-table>
</template>
<script>
import { Table } from 'ant-design-vue';
const columns = [
    {
        title: '图例',
        key: 'cover',
        width: '130px',
        scopedSlots: { customRender: 'cover' }
    },
    {
        title: '商品信息',
        key: 'info',
        width: '240px',
        scopedSlots: { customRender: 'info' }
    },
    {
        title: '规格',
        key: 'spec',
        scopedSlots: { customRender: 'spec' }
    },
    // {
    //     title: '单价',
    //     key: 'spec',
    //     scopedSlots: { customRender: 'spec' }
    // },
    {
        title: '含税单价',
        key: 'price',
        align: 'center',
        width: '200px',
        scopedSlots: { customRender: 'price' }
    },
    {
        title: '操作',
        align: 'center',
        key: 'action',
        scopedSlots: { customRender: 'action' }
    }
];
export default {
    name: 'CollectGoods',
    components: {
        ATable: Table
    },
    scrollToTop: true,
    data: () => ({
        columns,
        data: [],
        loading: false,
        paginationData: {
            current: 1,
            hideOnSinglePage: true,
            defaultPageSize: 10,
            total: 0
        }
    }),
    mounted() {
        this.refreshData();
    },
    methods: {
        refreshData() {
            this.paginationData.current = 1;
            this.getGoodsList();
        },
        pageChange(pagination) {
            this.paginationData.current = pagination.current;
            this.getGoodsList();
        },
        async getGoodsList() {
            this.loading = true;
            await this.$api.member
                .getProductCollect({
                    limit: this.paginationData.defaultPageSize,
                    page: this.paginationData.current
                })
                .then((data) => {
                    this.loading = false;
                    this.paginationData.total = data.total;
                    this.data = data.records.map((item) => {
                        item.key = item.id;
                        return item;
                    });
                })
                .catch(() => {
                    this.loading = false;
                });
        },
        handleCancel(id, index) {
            this.$confirm({
                title: '提示',
                content: '确认要取消收藏该商品吗？',
                onOk: () => {
                    this.data.splice(index, 1);
                    this.$api.product
                        .cancelCollectProductApi({ cartProductIds: [id] })
                        .then(() => {
                            if (this.data.length === 0) {
                                this.paginationData.current = 1;
                                this.getGoodsList();
                            }
                            this.$message.success('取消收藏成功');
                        })
                        .catch(() => {
                            this.$message.error('取消收藏失败');
                            this.getTabItemData(this.pageName);
                        });
                },
                onCancel() {}
            });
        }
    }
};
</script>
<style scoped lang="less">
:deep(.ant-table-body) {
    border: 1px solid #e0e1e3;
    border-bottom: 0;
    border-radius: 4px;
}

// .img {
//     width: 82px;
//     height: 82px;
//     border-radius: 4px;
// }
</style>
