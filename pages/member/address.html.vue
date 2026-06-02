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
                    <a-button type="primary" ghost @click="showAddressModal('')">新增地址</a-button>
                    <address-table ref="AddressTable" class="mt-16" @edit="showAddressModal"></address-table>
                </a-tab-pane>
            </a-tabs>
        </div>
        <bee-mod-service :top="94"></bee-mod-service>
        <address-modal :id="addressId" v-model="addressModalStatus" @success="addressSuccess"></address-modal>
    </bee-page>
</template>

<script>
import { Tabs } from 'ant-design-vue';
import BeeSearch from '@/components/BeeSearch.vue';
import MemberMenu from '@/pageComponents/member/menu.vue';
import AddressTable from '@/pageComponents/member/address-table.vue';
import AddressModal from '@/pageComponents/member/address-modal.vue';
export default {
    name: 'AddressPage',
    components: {
        BeeSearch,
        MemberMenu,
        AddressTable,
        AddressModal,
        ATabs: Tabs,
        ATabPane: Tabs.TabPane
    },
    middleware: 'authenticated',
    data() {
        return {
            addressId: '',
            addressModalStatus: false
        };
    },
    mounted() {
        this.$refs.AddressTable && this.$refs.AddressTable.getAddressList();
    },
    methods: {
        showAddressModal(id = '') {
            this.addressId = id;
            this.addressModalStatus = true;
        },
        // 编辑或创建地址成功
        addressSuccess() {
            this.addressModalStatus = false;
            this.$refs.AddressTable && this.$refs.AddressTable.getAddressList();
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
:deep(.ant-cascader-input) {
    font-size: 14px;
}
</style>
