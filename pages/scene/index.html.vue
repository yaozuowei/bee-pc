<template>
    <bee-page>
        <!-- 顶部bar -->
        <!-- <bee-simple-head /> -->
        <!-- 搜索组件 -->
        <bee-search>
            <!-- tab切换 -->
            <bee-tab :current="3"></bee-tab>
        </bee-search>
        <div class="line mb-16"></div>
        <div class="page-continer flex flex-r-c">
            <div class="bee-content-width">
                <h4 class="font-24 text-color-black">场景案例</h4>
                <a-row :gutter="10">
                    <a-col v-for="item in list" :key="item.id" span="8">
                        <scene-list-item :info="item"></scene-list-item>
                    </a-col>
                </a-row>
            </div>
        </div>
        <bee-mod-service></bee-mod-service>
    </bee-page>
</template>

<script>
import SceneListItem from '@/pageComponents/scene/scene-list-item.vue';
export default {
    name: 'SceneIndex',
    components: {
        SceneListItem
    },
    props: {},
    async asyncData({ $api }) {
        const data = await $api.scene.getSceneList({ terminalEnum: 'min-app' });
        return {
            list: data
        };
    },
    data() {
        return {
            list: []
        };
    },
    mounted() {},
    methods: {}
};
</script>

<style scoped lang="less">
.page-continer {
    padding: 60px 0;
    padding-top: 20px;
    .story-item {
        width: 100%;
        height: 290px;
        background: rgba(0, 0, 0, 0.25);
        border-radius: 12px;
        margin-bottom: 10px;
    }
}
</style>
