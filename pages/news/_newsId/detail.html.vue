<template>
    <bee-page>
        <!-- 顶部bar -->
        <bee-simple-head />

        <div class="flex flex-r-c">
            <div class="bee-content-width">
                <bee-breadcrumb class="mt-32" :items="breadcrumbData" />
                <story-detail-head class="mt-32" :info="pageData" @collect="handleCollect" @like="handleLike"></story-detail-head>
                <div class="flex flex-r-b flex">
                    <story-detail-content :style="goods && goods.length > 0 ? 'width: 886px' : ''" :info="pageData" />
                    <template v-if="goods && goods.length > 0">
                        <story-detail-goods :list="goods" />
                    </template>
                </div>

                <!-- <story-detail-flip></story-detail-flip> -->
            </div>
        </div>

        <bee-mod-service :top="82"></bee-mod-service>
        <a-back-top />
    </bee-page>
</template>

<script>
import StoryDetailHead from '@/pageComponents/story/detail-head.vue';
import StoryDetailGoods from '@/pageComponents/story/detail-goods.vue';
import StoryDetailContent from '@/pageComponents/story/detail-content.vue';
// import StoryDetailFlip from '@/pageComponents/story/detail-flip.vue';
export default {
    name: 'NewsDetail',
    components: {
        StoryDetailHead,
        StoryDetailGoods,
        StoryDetailContent
        // StoryDetailFlip
    },
    props: {},
    async asyncData({ params, $api }) {
        const data = await $api.news.getNewsDetails(params.newsId);
        console.log(data);
        return {
            pageData: data,
            breadcrumbData: [
                {
                    name: '首页',
                    path: '/'
                },
                {
                    name: '行业资讯',
                    path: '/news/index.html'
                },
                {
                    name: data.title
                }
            ],
            goods: data.skuList
        };
    },
    data() {
        return {
            breadcrumbData: [
                {
                    name: '首页',
                    path: '/'
                },
                {
                    name: '行业资讯',
                    path: '/news/index.html'
                },
                {
                    name: ''
                }
            ],
            pageData: {},
            goods: []
        };
    },
    head() {
        return {
            title: this.pageData.title
        };
    },
    mounted() {},
    methods: {
        // 收藏事件
        handleCollect() {
            this.$verifyLogin(() => {
                this.pageData.isCollect = !this.pageData.isCollect;
                if (this.pageData.isCollect) {
                    this.pageData.collectInitCount++;
                } else {
                    this.pageData.collectInitCount--;
                }
                this.$api.news.newsCollect({
                    id: this.pageData.id,
                    status: this.pageData.isCollect
                });
            });
        },
        // 点赞事件
        handleLike() {
            this.$verifyLogin(() => {
                this.pageData.isLike = !this.pageData.isLike;
                if (this.pageData.isLike) {
                    this.pageData.likeInitCount++;
                } else {
                    this.pageData.likeInitCount--;
                }
                this.$api.news.newsLike({
                    id: this.pageData.id,
                    status: this.pageData.isLike
                });
            });
        }
    }
};
</script>
