<template>
    <bee-page>
        <!-- 搜索组件 -->
        <bee-search class="bee-search"></bee-search>

        <!-- 轮播图/分类/个人信息 -->
        <div class="bee-content-width flex flex-v-t flex-r-b mt-36">
            <div>
                <member-menu></member-menu>
            </div>
            <a-tabs style="width: 887px">
                <a-tab-pane tab="个人信息">
                    <info-edit></info-edit>
                </a-tab-pane>
            </a-tabs>
        </div>
        <bee-mod-service :top="94"></bee-mod-service>
    </bee-page>
</template>

<script>
import { Tabs } from 'ant-design-vue';
import BeeSearch from '@/components/BeeSearch.vue';
import MemberMenu from '@/pageComponents/member/menu.vue';
import InfoEdit from '@/pageComponents/member/info-edit.vue';
export default {
    name: 'MemberIndex',
    components: {
        BeeSearch,
        MemberMenu,
        InfoEdit,
        ATabs: Tabs,
        ATabPane: Tabs.TabPane
    },
    middleware: 'authenticated'
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
