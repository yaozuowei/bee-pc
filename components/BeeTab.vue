<!--首页tab切换-->
<template>
    <div class="">
        <div class="tab-box flex flex-r-c">
            <div
                v-for="(item, index) in tabs"
                :key="index"
                class="tab-item font-16 text-color-black"
                :class="[index === current ? 'tab-item-selectd' : '']"
                @click="changeTab(item, index)"
            >
                {{ item.text }}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        current: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            tabs: [
                {
                    text: '首页',
                    url: '/'
                },
                {
                    text: '爆品推荐',
                    url: '/activity/hot/index.html'
                },
                {
                    text: '人气新品',
                    url: '/activity/new/index.html'
                },
                {
                    text: '场景案例',
                    url: '/scene/index.html'
                },
                {
                    text: '品牌故事',
                    url: '/story/index.html'
                },
                {
                    text: '行业资讯',
                    url: '/news/index.html'
                },
                {
                    text: '行情价格',
                    url: '/quotation-price/index.html'
                },
                {
                    text: '合作品牌',
                    url: '/brand/brand.html'
                },
                {
                    text: '企业入驻',
                    url: '/login/company-register.html'
                },
                // {
                //     text: '金融贷',
                //     url: '/financialLoan/financialLoan.html'
                // }
            ],
            serverList: []
        };
    },
    methods: {
        // 切换tab触发
        changeTab(item, index) {
            if ([6, 7].includes(index)) {
                const routeUrl = this.$router.resolve(item.url);
                window.open(routeUrl.href, '_blank');
            } else {
                this.$router.push(item.url);
            }
        }
    }
};
</script>
<style scoped lang="less">
.tab-item {
    margin-left: 24px;
    font-weight: bold;
    cursor: pointer;
}
.tab-item:first-child {
    margin-left: 0;
}
.tab-item-selectd {
    color: @main-color;
}
</style>
