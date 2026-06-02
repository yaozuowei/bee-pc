<!--布局竖向商品展示组件-->
<template>
    <div
        class="product-item-box"
        :class="[isBorder ? 'box-border' : '']"
        :style="{ height: itemHeight, width: itemWidth }"
        @click="toProductDetail"
    >
        <div style="height: 148px" class="mb-24">
            <client-only>
                <!-- <img v-lazy="info.authorAvatar" class="avatar mr-12" /> -->
                <img v-lazy="itemData.imageDefault?.url" alt="商品图片找不到啦~" />
            </client-only>
        </div>

        <!-- 标题 -->
        <div class="line-2 font-14 text-color-black font-bold mb-12" style="height: 45px">
            <a-tag v-if="isActivity" color="#FE4A4A">秒杀折扣</a-tag>{{ itemData.title || '-' }}
        </div>
        <!-- 爆品价格展示 -->
        <div v-if="isActivity" class="hot-price flex flex-v-c">
            <div class="price-box font-12 font-bold mr-12">¥{{ itemData.price }}</div>
            <div class="font-12 font-bold" style="color: white">抢购</div>
        </div>
        <!-- 普通商品价格展示 -->
        <div v-if="!isActivity" class="price text-l font-16 font-bold">¥{{ new Number(itemData.price).toFixed(2) }}</div>
        <!-- 好货榜单排名展示 -->
        <img v-if="index" class="rank-box" :src="rankImg" alt="" />
    </div>
</template>
<script>
import { Tag } from 'ant-design-vue';
export default {
    components: {
        ATag: Tag
    },
    props: {
        index: {
            type: Number,
            default: null
        },
        isActivity: {
            type: Boolean,
            default: false
        },
        itemHeight: {
            type: String,
            default: '294px'
        },
        itemWidth: {
            type: String,
            default: '220px'
        },
        itemData: {
            type: Object,
            default: () => ({})
        },
        // 跳转页面传参表示 sku 取skuid spu 取spuid all 根据判断取skuid或spuid
        flag: {
            type: String,
            default: 'sku'
        },
        // 是否显示边框
        isBorder: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {};
    },
    computed: {
        rankImg() {
            let imgUrl = require('@/assets/images/index/rank_01.png');
            switch (this.index) {
                case 1:
                    imgUrl = require('@/assets/images/index/rank_01.png');
                    break;
                case 2:
                    imgUrl = require('@/assets/images/index/rank_02.png');
                    break;
                case 3:
                    imgUrl = require('@/assets/images/index/rank_03.png');
                    break;
                case 4:
                    imgUrl = require('@/assets/images/index/rank_04.png');
                    break;
            }
            return imgUrl;
        }
    },
    methods: {
        toProductDetail() {
            let type = 1;
            let id = '';
            if (this.flag === 'sku') {
                type = 1;
                id = this.itemData.id;
            } else if (this.flag === 'spu') {
                type = 2;
                id = this.itemData.id;
            } else if (this.flag === 'all') {
                // 好货榜单判断
                type = this.itemData.id ? 1 : 2;
                id = this.itemData.id || this.itemData.spuId;
            }
            const routeUrl = this.$router.resolve({
                // 1 skuid 2 spuid 3 活动商品
                path: `/product/${id}/${type}/pruduct-detail.html`
            });
            window.open(routeUrl.href, '_blank');
        }
    }
};
</script>
<style lang="less" scoped>
.product-item-box {
    width: 220px;
    background: #ffffff;
    border-radius: 8px;
    padding: 24px;
    box-sizing: border-box;
    cursor: pointer;
    position: relative;
    transition: all 0.2s linear;
    &:hover {
        box-shadow: 0 15px 30px rgba(0, 0, 0, 10%);
        transform: translate3d(0, -2px, 0);
    }
    img {
        width: 100%;
        height: 148px;
        object-fit: cover;
        display: block;
        border-radius: 8px;
    }
    .price {
        color: @main-red;
    }
    .hot-price {
        width: 172px;
        height: 26px;
        background: #fe4a4a;
        border-radius: 4px;
        padding: 2px;
        color: @main-red;
        .price-box {
            width: 122px;
            height: 22px;
            background: #ffffff;
            -webkit-clip-path: polygon(0 0, 93% 0, 100% 100%, 0% 100%);
            clip-path: polygon(0 0, 93% 0, 100% 100%, 0% 100%);
            border-radius: 2px;
            line-height: 22px;
            padding: 0 8px;
            text-align: left;
        }
    }
    .rank-box {
        width: 30px;
        height: 30px;
        position: absolute;
        top: 0px;
        left: 16px;
    }
}
.box-border {
    border: 1px solid rgba(0, 8, 22, 0.08);
}
</style>
