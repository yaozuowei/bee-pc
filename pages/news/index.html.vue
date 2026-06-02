<template>
    <bee-page>
        <!-- 顶部bar -->
        <!-- <bee-simple-head /> -->
        <!-- 搜索组件 -->
        <bee-search>
            <!-- tab切换 -->
            <bee-tab :current="5"></bee-tab>
        </bee-search>
        <div class="line mb-16"></div>
        <div class="page-continer flex flex-r-c">
            <div class="bee-content-width">
                <h4 class="font-24 text-color-black">行业资讯</h4>
                <a-row :gutter="10">
                    <a-col v-for="item in lists" :key="item.id" span="8">
                        <story-list-item :data="item" @item-click="toNewsDetailPage(item.id)"></story-list-item>
                    </a-col>
                </a-row>
            </div>
        </div>

        <bee-mod-service></bee-mod-service>
    </bee-page>
</template>

<script>
import StoryListItem from '@/pageComponents/story/story-list-item.vue';
export default {
    name: 'NewsIndex',
    components: {
        StoryListItem
    },
    async asyncData({ $api }) {
        const lists = await $api.news.getNewsList({
            terminalEnum: 'min-app'
        });
        return {
            lists: lists.map((item) => ({
                id: item.id,
                imgs: item.listImages,
                title: item.title,
                describe: item.subTitle,
                date: item.createTime
            }))
        };
    },
    data() {
        return {
            lists: []
        };
    },
    mounted() {},
    methods: {
        toNewsDetailPage(id) {
            const routeUrl = this.$router.resolve(`/news/${id}/detail.html`);
            window.open(routeUrl.href, '_blank');
        }
    }
};
</script>

<style scoped lang="less">
.page-continer {
    padding: 60px 0;
    padding-top: 20px;
}
</style>
