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
        <div slot="address" slot-scope="record">
            {{ record.provinceName }}{{ record.cityName }}{{ record.districtName }}{{ record.address }}
        </div>
        <div slot="action" slot-scope="record">
            <a-tag v-if="record.defaultAddress" class="font-12" color="#FDAF12">默认地址</a-tag>
            <a-button v-else class="font-12" type="link" @click="handleSetDefault(record.id)">设置默认</a-button>
            <a-button class="text-color-black font-12" type="link" @click="$emit('edit', record.id)">修改</a-button>
            <a-popconfirm title="确认删除地址吗？" ok-text="删除" cancel-text="取消" @confirm="handleDelete(record.id)">
                <a-button class="text-color-black font-12" type="link">删除</a-button>
            </a-popconfirm>
        </div>
    </a-table>
</template>
<script>
import { Table, Tag, Popconfirm } from 'ant-design-vue';
const columns = [
    {
        title: '收件人',
        dataIndex: 'consignee',
        key: 'consignee'
    },
    {
        title: '电话',
        key: 'tel',
        dataIndex: 'tel',
        align: 'center'
    },
    {
        title: '地址',
        key: 'address',
        align: 'center',
        scopedSlots: { customRender: 'address' }
    },
    {
        title: '标签',
        key: 'remark',
        align: 'center',
        scopedSlots: { customRender: 'remark' }
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
    name: 'AddressTable',
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
            tagsList: [
                {
                    id: 1,
                    text: '家'
                },
                {
                    id: 2,
                    text: '公司'
                }
                // {
                // 	id: 3,
                // 	text: '学校'
                // },
            ]
        };
    },
    methods: {
        handleDelete(id) {
            this.$api.member.deleteAddress(id).then(() => {
                this.$message.success('删除成功');
                this.getAddressList();
            });
        },
        tableChange(pagination) {
            this.params.page = pagination.current;
            this.getAddressList();
        },
        // 获取发票列表
        getAddressList() {
            this.loading = true;
            this.$api.member.getAddressList(this.params).then((data) => {
                this.loading = false;
                this.listTotal = data.total;
                this.list = data.records;
            });
        },
        // 设置默认发票
        handleSetDefault(id) {
            this.$api.member
                .editAddress({
                    id,
                    defaultAddress: true
                })
                .then(() => {
                    this.$message.success('修改成功');
                    this.getAddressList();
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
