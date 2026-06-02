<template>
    <div class="columm-box">
        <!-- 列名 -->
        <div class="columm-title flex">
            <div v-for="(item, index) in colummList" :key="index" :style="{ width: item.width }">
                {{ item.text }}
            </div>
        </div>
        <div v-for="(item, index) in list" :key="index" class="box" @click="toDetail(item)">
            <bee-column-product-item :key="index" :activity-id="activityId" :columm-list="colummList">
                <template #img>
                    <div class="product-img">
                        <client-only>
                            <!-- <img v-lazy="info.authorAvatar" class="avatar mr-12" /> -->
                            <img v-lazy="item.imageDefault.url" alt="商品图片找不到啦~" />
                        </client-only>
                        <!-- 活动商品标签 -->
                        <div v-if="activityId" class="activity-tag">{{ item.tag[0] || '限时秒杀' }}</div>
                    </div>
                </template>
                <template #info>
                    <div class="product-info flex flex-v flex-r-b">
                        <div class="font-12 text-color-black line-2">{{ item.title || '-' }}</div>
                        <div class="font-12 text-color-02">商品编号:{{ activityId ? item.skuId : item.id }}</div>
                    </div>
                </template>
                <template #brandName>
                    <div class="font-12 text-color-black">
                        {{ item.brandName || '小蜜蜂' }}
                    </div>
                </template>
                <template #unit>
                    <div class="font-12 text-color-black">{{ item.unit || '-' }}</div>
                </template>
                <template #deliveryCycle>
                    <div class="font-12 text-color-black">{{ item.deliveryCycle || '-' }}天</div>
                </template>
                <template #location>
                    <div class="font-12 text-color-black">{{ item.producingArea || '-' }}</div>
                </template>
                <template #price>
                    <div class="font-20 font-bold text-color-red">¥{{ new Number(item.price).toFixed(2) || '0.00' }}</div>
                </template>
            </bee-column-product-item>
        </div>
    </div>
</template>
<script>
import BeeColumnProductItem from '@/components/BeeColumnProductItem.vue';
export default {
    components: {
        BeeColumnProductItem
    },
    props: {
        list: {
            type: Array,
            default: () => []
        },
        // 跳转页面传参表示 sku 取skuid spu 取spuid all 根据判断取skuid或spuid
        flag: {
            type: String,
            default: 'sku'
        },
        activityId: {
            type: [String, Number],
            default: ''
        }
    },
    data() {
        return {
            colummList: [
                { text: '图例', width: '114px', slot: 'img' },
                { text: '商品信息', width: '200px', slot: 'info' },
                { text: '品牌', width: '200px', slot: 'brandName' },
                { text: '单位', width: '154px', slot: 'unit' },
                { text: '发货周期', width: '134px', slot: 'deliveryCycle' },
                { text: '发货地', width: '154px', slot: 'location' },
                { text: '价格', width: '114px', slot: 'price' }
            ]
        };
    },
    methods: {
        // 商品跳转详情
        toDetail(item) {
            let type = this.activityId ? 3 : this.flag === 'sku' ? 1 : 2;
            let id = this.activityId ? item.skuId : item.id;
            if (this.flag === 'all') {
                // 好货榜单判断
                type = item.id ? 1 : 2;
                id = item.id || item.spuId;
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
.columm-box {
    width: 1152px;
    height: auto;
    border: 1px solid #e0e1e3;
    cursor: pointer;
    .columm-title {
        width: 100%;
        height: 40px;
        background: rgba(0, 8, 22, 0.04);
        line-height: 40px;
        padding: 0 32px;
    }
    .product-img {
        img {
            width: 82px;
            height: 82px;
            border-radius: 8px;
        }
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
    .box {
        border-bottom: solid 1px rgba(0, 8, 22, 0.12);
    }
    .box:last-child {
        border-bottom: none;
    }
    .product-info {
        height: 82px;
    }
}
</style>
