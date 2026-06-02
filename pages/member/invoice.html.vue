<template>
    <bee-page>
        <!-- 搜索组件 -->
        <bee-search class="bee-search"></bee-search>

        <!-- 轮播图/分类/个人信息 -->
        <div class="bee-content-width flex flex-v-t flex-r-b mt-36">
            <div>
                <member-menu></member-menu>
            </div>
            <a-tabs style="width: 887px" default-active-key="1">
                <a-tab-pane key="1" tab="发票信息">
                    <a-button type="primary" ghost @click="showInvoiceModal('')">新增发票抬头</a-button>
                    <invoice-table ref="InvoiceTable" class="mt-16" @edit="showInvoiceModal"></invoice-table>
                </a-tab-pane>
            </a-tabs>
        </div>
        <bee-mod-service :top="94"></bee-mod-service>
        <invoice-modal :id="invoiceId" v-model="invoiceModalStatus" @success="invoiceSuccess"></invoice-modal>
    </bee-page>
</template>

<script>
import { Tabs } from 'ant-design-vue';
import BeeSearch from '@/components/BeeSearch.vue';
import MemberMenu from '@/pageComponents/member/menu.vue';
import InvoiceTable from '@/pageComponents/member/invoice-table.vue';
import InvoiceModal from '@/pageComponents/member/invoice-modal.vue';
export default {
    name: 'InvoicePage',
    components: {
        BeeSearch,
        MemberMenu,
        InvoiceTable,
        InvoiceModal,
        ATabs: Tabs,
        ATabPane: Tabs.TabPane
    },
    middleware: 'authenticated',
    data() {
        return {
            invoiceId: '',
            invoiceModalStatus: false
        };
    },
    mounted() {
        this.$refs.InvoiceTable && this.$refs.InvoiceTable.getInvoiceList();
    },
    methods: {
        showInvoiceModal(id = '') {
            this.invoiceId = id;
            this.invoiceModalStatus = true;
        },
        // 编辑或创建发票成功
        invoiceSuccess() {
            this.invoiceModalStatus = false;
            this.$refs.InvoiceTable && this.$refs.InvoiceTable.getInvoiceList();
        }
    }
};
</script>

<style lang="less" scoped>
.bee-search {
    border-bottom: 2px solid #65c3b8;
}
.bee-content-width {
    margin: 36px auto;
}
:deep(.ant-tabs-bar) {
    background: rgba(0, 8, 22, 0.04);
    border-bottom: 0;
}
:deep(.ant-tabs-nav .ant-tabs-tab) {
    margin: 0;
    padding: 10px 32px;
}
</style>
