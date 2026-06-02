<template>
    <bee-page>
        <!-- 搜索组件 -->
        <bee-search class="bee-search"></bee-search>

        <!-- 轮播图/分类/个人信息 -->
        <div class="bee-content-width flex flex-v-t flex-r-b mt-36">
            <div>
                <member-menu></member-menu>
            </div>
            <a-tabs v-model="pageName" style="width: 887px" @change="tabChange">
                <a-tab-pane key="goods" tab="商品内容">
                    <collect-goods ref="collectGoodsRef"></collect-goods>
                </a-tab-pane>
                <a-tab-pane key="news" tab="资讯内容">
                    <a-row v-if="newsLists && newsLists.length > 0" :gutter="10">
                        <a-col v-for="(item, index) in newsLists" :key="item.id" span="8">
                            <collect-card
                                :data="item"
                                @item-click="toNewsDetailPage(item.id)"
                                @cancel="handleCancelCollection(item, index)"
                            ></collect-card>
                        </a-col>
                    </a-row>
                    <bee-empty v-else></bee-empty>
                </a-tab-pane>
                <a-tab-pane key="story" tab="品牌故事">
                    <a-row v-if="storyLists && storyLists.length > 0" :gutter="10">
                        <a-col v-for="(item, index) in storyLists" :key="item.id" span="8">
                            <collect-card
                                :data="item"
                                @item-click="toStoryDetailPage(item.id)"
                                @cancel="handleCancelCollection(item, index)"
                            ></collect-card>
                        </a-col>
                    </a-row>
                    <bee-empty v-else></bee-empty>
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
import CollectGoods from '@/pageComponents/member/collect-goods.vue';
import CollectCard from '@/pageComponents/member/collect-card.vue';
export default {
    name: 'MemberCollect',
    components: {
        BeeSearch,
        MemberMenu,
        ATabs: Tabs,
        ATabPane: Tabs.TabPane,
        CollectGoods,
        CollectCard
    },
    middleware: 'authenticated',
    props: {},
    data() {
        return {
            pageName: 'goods',
            newsLists: [],
            storyLists: []
        };
    },
    beforeMount() {
        this.getTabItemData(this.pageName);
    },
    methods: {
        tabChange(name) {
            this.getTabItemData(name);
        },
        // 获取tab数据
        getTabItemData(name) {
            if (name === 'goods') {
                this.$refs.collectGoodsRef && this.$refs.collectGoodsRef.refreshData();
                return false;
            }
            let api = null;
            if (name === 'news') {
                api = this.$api.news.getMyCollectNews;
            } else if (name === 'story') {
                api = this.$api.story.getMyCollectStory;
            }
            api({}).then((data) => {
                if (name === 'news') {
                    this.newsLists = data;
                } else if (name === 'story') {
                    this.storyLists = data;
                }
            });
        },
        toNewsDetailPage(id) {
            const routeUrl = this.$router.resolve(`/news/${id}/detail.html`);
            window.open(routeUrl.href, '_blank');
        },
        toStoryDetailPage(id) {
            const routeUrl = this.$router.resolve(`/story/${id}/detail.html`);
            window.open(routeUrl.href, '_blank');
        },
        // 取消收藏
        handleCancelCollection(data, index) {
            this.$confirm({
                title: '提示',
                content: '确认要取消收藏该内容吗？',
                onOk: () => {
                    let api = null;
                    if (this.pageName === 'news') {
                        api = this.$api.story.newsCollect;
                        this.newsLists.splice(index, 1);
                    } else if (this.pageName === 'story') {
                        api = this.$api.story.storyCollect;
                        this.storyLists.splice(index, 1);
                    }

                    api({
                        id: data.id,
                        status: false
                    })
                        .then(() => {
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
