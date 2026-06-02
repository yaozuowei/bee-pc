<!-- 商品清单 -->
<template>
    <div class="columm-box">
        <!-- 列名 -->
        <div class="columm-title flex">
            <div v-for="(item, index) in colummList" :key="index" :style="{ width: item.width }">
                {{ item.text }}
            </div>
        </div>
        <div v-for="(item, index) in list" :key="index" class="box">
            <bee-column-product-item :key="index" :activity-id="activityId" :columm-list="colummList">
                <template #img>
                    <div class="product-img">
                        <client-only>
                            <!-- <img v-lazy="info.authorAvatar" class="avatar mr-12" /> -->
                            <img v-lazy="item.imgUrl" alt="商品图片找不到啦~" />
                        </client-only>
                        <!-- 活动商品标签 -->
                        <div v-if="activityId" class="activity-tag">{{ item.tag[0] || '限时秒杀' }}</div>
                    </div>
                </template>
                <template #info>
                    <div class="product-info flex flex-v flex-r-b">
                        <div class="font-12 text-color-black line-2">{{ item.title || '-' }}</div>
                        <div class="font-12 text-color-02">商品编号:{{ item.skuId || '-' }}</div>
                    </div>
                </template>
                <template #spec>
                    <div class="font-12 text-color-black">
                        {{ item.specMap | filterSpec }}
                    </div>
                </template>
                <template #unit>
                    <div class="font-12 text-color-black">{{ item.unit || '-' }}</div>
                </template>
                <template #frontSubtotal>
                    <div class="font-12 text-color-black">{{ new Number(item.price).toFixed(2) || '0.00' }}</div>
                </template>
                <template #number>
                    <div class="font-12 text-color-black">{{ item.number || '-' }}</div>
                </template>
                <template #price>
                    <div class="font-12 text-color-red">¥{{ new Number(item.frontSubtotal).toFixed(2) || '0.00' }}</div>
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
    filters: {
        filterSpec(input) {
            let str = '';
            input.map((item) => (str += item.label + ':' + item.value + '；'));
            return str;
        }
    },
    props: {
        list: {
            type: Array,
            default: () => [{}, {}]
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
                { text: '产品规格', width: '200px', slot: 'spec' },
                { text: '单位', width: '154px', slot: 'unit' },
                { text: '含税单价（元）', width: '134px', slot: 'frontSubtotal' },
                { text: '订购数量', width: '154px', slot: 'number' },
                { text: '含税小计（元）', width: '114px', slot: 'price' }
            ]
        };
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
