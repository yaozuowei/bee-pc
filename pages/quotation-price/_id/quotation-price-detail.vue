<template>
    <div>
        <div class="Hot-box flex flex-v flex-v-c">
            <bee-page>
                <!-- 顶部bar -->
                <bee-simple-head />
                <div class="flex flex-r-c">
                    <div class="bee-content-width">
                        <bee-breadcrumb class="mt-32" :items="breadcrumbData" />
                        <story-detail-head
                            class="mt-32 mb-32"
                            :info="pageData"
                            @collect="handleCollect"
                            @like="handleLike"
                        ></story-detail-head>
                        <div>
                            <qp-detail-table
                                :product-list="productList"
                                :detail-data="detailData"
                                :total="total"
                                @search="getList"
                            ></qp-detail-table>
                            <!-- <story-detail-content :style="goods && goods.length > 0 ? 'width: 886px' : ''" :info="pageData" />
                            <template v-if="goods && goods.length > 0">
                                <story-detail-goods :list="goods" />
                            </template> -->
                        </div>

                        <!-- <story-detail-flip></story-detail-flip> -->
                    </div>
                </div>
            </bee-page>
        </div>
    </div>
</template>
<script>
import StoryDetailHead from '@/pageComponents/story/detail-head.vue';
import QpDetailTable from '@/pageComponents/quotationPrice/qp-detail-table.vue';
export default {
    components: {
        StoryDetailHead,
        QpDetailTable
    },
    async asyncData({ $api, route }) {
        const id = route.params.id;
        const res = await $api.quotationPrice.getQuoPriceDetails({
            page: 1,
            limit: 20,
            id,
            keyword: '',
            specMapList: []
        });
        return {
            productList: res.page?.records || [],
            detailData: res,
            pageData: {
                authorAvatar: res.authorAvatar || '',
                author: res.author || '',
                releaseTime: res.releaseTime || '',
                viewInitCount: res.viewInitCount || 0,
                collectInitCount: res.collectInitCount || 0,
                likeInitCount: res.likeInitCount || 0,
                title: res.title || '-',
                isCollect: res.isCollect || false,
                isLike: res.isLike || false
            },
            total: res.page?.total || 0,
            breadcrumbData: [
                {
                    name: '首页',
                    path: '/'
                },
                {
                    name: '行情价格',
                    path: '/quotation-price/index.html'
                },
                {
                    name: res.title
                }
            ]
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
                    name: '行情价格',
                    path: '/quotation-price/index.html'
                },
                {
                    name: '土球'
                }
            ],
            productList: [],
            detailData: null,
            pageData: null,
            total: 0
        };
    },
    mounted() {
        console.log(this.productList);
    },
    methods: {
        async getList(params) {
            const res = await this.$api.quotationPrice.getQuoPriceDetails({ id: this.detailData.id, ...params });
            this.total = res.page?.total || 0;
            this.productList = res.page?.records || [];
        },
        // 收藏事件
        handleCollect() {
            this.$verifyLogin(() => {
                this.pageData.isCollect = !this.pageData.isCollect;
                if (this.pageData.isCollect) {
                    this.pageData.collectInitCount++;
                } else {
                    this.pageData.collectInitCount--;
                }
                this.$api.quotationPrice.quoPriceCollect({
                    id: this.detailData.id,
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
                this.$api.quotationPrice.quoPriceLike({
                    id: this.detailData.id,
                    status: this.pageData.isLike
                });
            });
        }
    }
};
</script>
<style lang="less" scoped></style>
