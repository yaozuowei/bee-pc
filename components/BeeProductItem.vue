<!--公用商品列表item-->
<template>
    <div class="product-box" @click="toDetail">
        <div class="pt-24 pl-24 pr-24">
            <div class="img-box">
                <div class="product-img mb-32">
                    <client-only>
                        <!-- <img v-lazy="info.authorAvatar" class="avatar mr-12" /> -->
                        <img v-lazy="imgUrl" alt="商品图片找不到啦~" />
                    </client-only>
                    <!-- <img v-if="itemData.imageDefault && itemData.imageDefault.url" :src="itemData.imageDefault.url" alt="图片找不到啦~" /> -->
                </div>
                <!-- 活动商品标签 -->
                <div v-if="activityId" class="activity-tag">{{ itemData.tag[0] || '限时秒杀' }}</div>
            </div>
            <!-- 切换图片 -->
            <div class="tab-img flex mb-8">
                <div
                    v-for="(item, index) in imgList"
                    :key="index"
                    :class="[current === index ? 'tab-img-selectd' : '']"
                    @click.stop="changeTab(item, index)"
                >
                    <img :src="item.url" alt="" />
                </div>
            </div>
            <!-- 价格 -->
            <div class="flex flex-v-e mb-4">
                <div class="font-20 font-bold text-color-red">¥{{ new Number(itemData.price).toFixed(2) || '0.00' }}</div>
                <div class="font-12 text-color-02 mb-4 ml-4" style="text-decoration: line-through">
                    ¥{{ new Number(itemData.marketPrice).toFixed(2) || '0.00' }}
                </div>
            </div>
            <!-- 标题 -->
            <div class="font-14 font-bold text-color-black line-2 mb-8" style="height: 42px">{{ itemData.title || '-' }}</div>
            <!-- sku -->
            <!-- <div class="font-12 text-color-02 mb-4">SKU：{{ goodsData.id }}</div> -->
            <div class="font-12 text-color-02 mb-4 line-1">{{ itemData.producingArea || '-' }}</div>
            <!-- 发货日 -->
            <div v-if="!activityId" class="font-12 text-color-02 mb-4">发货周期：{{ itemData.deliveryCycle || '-' }}天</div>
            <!-- 活动商品进度 -->
            <div v-if="activityId" class="activity flex">
                <div class="flex-1 mr-4" style="width: 0">
                    <a-progress
                        :percent="percent(itemData).num"
                        :stroke-color="{ from: '#EA5732', to: '#EF895E', direction: '133deg' }"
                        size="small"
                        :show-info="false"
                    />
                </div>
                已抢{{ percent(itemData).text || 0 }}%
            </div>
        </div>
        <!-- 自定义底部内容 -->
        <div class="mt-16">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { Progress } from 'ant-design-vue';

export default {
    components: {
        AProgress: Progress
    },

    props: {
        goodsData: {
            type: Object,
            default: () => ({})
        },
        activityId: {
            type: [Number, String],
            default: null
        },
        itemData: {
            type: Object,
            default: () => ({})
        },
        // 跳转页面传参表示 sku 取skuid spu 取spuid all 根据判断取skuid或spuid
        flag: {
            type: String,
            default: 'sku'
        }
    },
    data() {
        return {
            current: null,
            imgUrl: '' // 图片url
        };
    },

    computed: {
        percent() {
            return function (val) {
                if (val.stock === 0 || val.soldStock === 0) return 0;
                const value = ((val.soldStock / val.stock) * 100 > 100 ? 100 : (val.soldStock / val.stock) * 100).toFixed(1);
                return {
                    num: Math.max(1, value),
                    text: value
                };
            };
        },
        imgList() {
            if (!this.itemData.mainImgList) return [];
            let arr = JSON.parse(JSON.stringify(this.itemData.mainImgList));
            if (arr.length) {
                arr = arr.splice(0, 2);
                return arr;
            }
            return [];
        }
    },
    watch: {
        itemData: {
            handler() {
                if (!this.itemData || !this.itemData.imageDefault) return '';
                this.imgUrl = this.itemData.imageDefault.url;
            },
            deep: true
        }
    },
    created() {
        if (process.browser) {
            if (!this.itemData || !this.itemData.imageDefault) return '';
            this.imgUrl = this.itemData?.imageDefault.url || '';
        }
    },
    methods: {
        // 切换选择图片
        changeTab(item, index) {
            this.current = index;
            this.imgUrl = item.url;
        },
        // 商品跳转详情
        toDetail() {
            let type = this.activityId ? 3 : this.flag === 'sku' ? 1 : 2;
            let id = this.activityId ? this.itemData.skuId : this.itemData.id;
            if (this.flag === 'all') {
                // 好货榜单判断
                type = this.itemData.id ? 1 : 2;
                id = this.itemData.id || this.itemData.spuId;
            }
            let routeUrl;
            // 活动商品跳转详情需要增加活动id
            if (this.activityId) {
                routeUrl = this.$router.resolve({
                    // 1 skuid 2 spuid 3 活动商品
                    path: `/product/${id}/${type}/pruduct-detail.html`,
                    query: {
                        activityId: this.activityId
                    }
                });
            } else {
                routeUrl = this.$router.resolve({
                    // 1 skuid 2 spuid 3 活动商品
                    path: `/product/${id}/${type}/pruduct-detail.html`
                });
            }
            // console.log(routeUrl);
            window.open(routeUrl.href, '_blank');
        }
    }
};
</script>
<style lang="less" scoped>
.product-box {
    width: 220px;
    background: #ffffff;
    border-radius: 8px;
    border: 1px solid rgba(0, 8, 22, 0.08);
    // padding: 24px 24px 20px;
    cursor: pointer;
    transition: all 0.2s linear;
    &:hover {
        box-shadow: 0 15px 30px rgba(0, 0, 0, 10%);
        transform: translate3d(0, -2px, 0);
    }
    .product-img {
        width: 172px;
        height: 148px;
        border-radius: 8px;
        img {
            width: 100%;
            height: 100%;
            border-radius: 8px;
            object-fit: cover;
        }
    }
    .tab-img {
        div {
            width: 32px;
            height: 32px;
            border-radius: 2px;
            opacity: 1;
            box-sizing: border-box;
            margin-right: 8px;
            overflow: hidden;
            cursor: pointer;
        }
        .tab-img-selectd {
            border: 1px solid #65c3b8;
        }
        img {
            width: 100%;
            height: 32px;
            object-fit: cover;
        }
    }
    .activity {
        :deep(.ant-progress-inner) {
            background: rgba(254, 74, 74, 0.12);
        }
        font-size: 12px;
        color: #fe4a4a;
    }
    .img-box {
        position: relative;
        .activity-tag {
            width: 60px;
            height: 20px;
            background-image: url('@/assets/images/index/activity-tag-bg.png');
            background-size: 100% 100%;
            position: absolute;
            top: 0;
            left: 0px;
            font-size: 12px;
            color: white;
            text-align: center;
            line-height: 20px;
        }
    }
}
</style>
