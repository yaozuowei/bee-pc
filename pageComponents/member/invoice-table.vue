<template>
    <a-table
        :columns="columns"
        :loading="loading"
        :data-source="list"
        row-key="id"
        :pagination="{
            current: params.page,
            defaultPageSize: params.limit,
            total: listTotal
        }"
        @change="tableChange"
    >
        <div slot="type" slot-scope="record">
            {{ record.type === 1 ? '增值税专用发票' : '增值税普通发票' }}
        </div>
        <div slot="action" slot-scope="record">
            <a-tag v-if="record.isDefault" class="font-12" color="#FDAF12">默认发票</a-tag>
            <a-button v-else class="font-12" type="link" @click="handleSetDefault(record)">设置默认</a-button>
            <a-button class="text-color-black font-12" type="link" @click="$emit('edit', record.id)">修改</a-button>
            <a-popconfirm title="确认删除发票吗？" ok-text="删除" cancel-text="取消" @confirm="handleDelete(record.id)">
                <a-button class="text-color-black font-12" type="link">删除</a-button>
            </a-popconfirm>
        </div>
    </a-table>
</template>
<script>
import { Table, Tag, Popconfirm } from 'ant-design-vue';
const columns = [
    {
        title: '发票抬头',
        dataIndex: 'title',
        key: 'title'
    },
    {
        title: '发票类型',
        key: 'type',
        align: 'center',
        scopedSlots: { customRender: 'type' }
    },
    {
        title: '操作',
        align: 'center',
        key: 'action',
        width: '240px',
        scopedSlots: { customRender: 'action' }
    }
];
export default {
    name: 'InvoiceTable',
    components: {
        ATable: Table,
        ATag: Tag,
        APopconfirm: Popconfirm
    },
    data() {
        return {
            loading: false,
            params: {
                limit: 15,
                page: 1
            },
            list: [],
            listTotal: 0,
            columns,
            paginationData: {}
        };
    },
    methods: {
        handleDelete(id) {
            this.$api.member.deleteInvoice(id).then(() => {
                this.$message.success('删除成功');
                this.getInvoiceList();
            });
        },
        tableChange(pagination) {
            this.params.page = pagination.current;
            this.getInvoiceList();
        },
        // 获取发票列表
        getInvoiceList() {
            this.loading = true;
            this.$api.member.getInvoiceList(this.params).then((data) => {
                this.loading = false;
                this.listTotal = data.total;
                this.list = data.records;
            });
        },
        // 设置默认发票
        handleSetDefault(data) {
            this.$api.member
                .editInvoice({
                    id: data.id,
                    title: data.title,
                    isDefault: true
                })
                .then(() => {
                    this.$message.success('修改成功');
                    this.getInvoiceList();
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
</style>
