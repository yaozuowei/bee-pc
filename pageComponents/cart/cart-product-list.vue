<!-- 商品清单 -->
<template>
    <div class="columm-box">
        <!-- 列名 -->
        <div class="columm-title flex">
            <div style="width: 70px" class="text-r">
                <a-checkbox :checked="isSelectAll" @change="$emit('selectAllEvent')"> 全选 </a-checkbox>
            </div>
            <div v-for="(item, index) in colummList" :key="index">
                <div v-if="index > 0" :style="{ width: item.width }">
                    {{ item.text }}
                </div>
            </div>
        </div>
        <div v-for="(item, index) in list" :key="index" class="box">
            <bee-column-product-item :key="index" :activity-id="activityId" :columm-list="colummList">
                <template #checkout>
                    <div class="checkbox-item flex flex-r-c flex-v-c">
                        <a-checkbox :checked="item.selected === 1" :disabled="item.type" @change="$emit('radioChange', item)"> </a-checkbox>
                    </div>
                </template>
                <template #img>
                    <div class="product-img">
                        <client-only>
                            <!-- <img v-lazy="info.authorAvatar" class="avatar mr-12" /> -->
                            <img v-lazy="item.productImg" alt="商品图片找不到啦~" />
                        </client-only>
                        <!-- 活动商品标签 -->
                        <div v-if="item.activitiesVO" class="activity-tag">{{ item.activitiesVO.tag[0] || '限时秒杀' }}</div>
                        <!-- 限购或者抢光展示 -->
                        <div v-if="item.type" class="mark">
                            {{ item.type === 1 ? '已抢光' : '已限购' }}
                        </div>
                    </div>
                </template>
                <div></div>
                <template #info>
                    <div class="product-info flex flex-v flex-r-b" :class="[item.type ? 'box-mark' : '']">
                        <div class="font-12 text-color-black line-2">{{ item.productName || '-' }}</div>
                        <div class="font-12 text-color-02">商品编号:{{ item.skuId || '-' }}</div>
                    </div>
                </template>
                <template #spec>
                    <div class="font-12 text-color-black" :class="[item.type ? 'box-mark' : '']">
                        {{ item.optValues || '-' }}
                    </div>
                </template>
                <template #unit>
                    <div class="font-12 text-color-black" :class="[item.type ? 'box-mark' : '']">{{ item.unit || '-' }}</div>
                </template>
                <template #price>
                    <div class="font-12 text-color-black" :class="[item.type ? 'box-mark' : '']">
                        ¥{{ new Number(item.price).toFixed(2) || '0.00' }}
                    </div>
                </template>
                <template #number>
                    <div class="font-12 text-color-black" :class="[item.type ? 'box-mark' : '']">
                        <detail-btn
                            v-if="!item.type"
                            :is-cart="true"
                            :sku-info="handleSkuInfo(item)"
                            width="24px"
                            height="24px"
                            @updateList="init"
                        ></detail-btn>
                        <span v-else>{{ item.type === 1 ? '已抢光' : '已限购' }}</span>
                    </div>
                </template>
                <template #edit>
                    <div class="right-box">
                        <a-popconfirm
                            title="确认删除当前购物车商品吗？"
                            placement="bottom"
                            @cancel.stop="() => {}"
                            @confirm.stop="$emit('deleteFun', item)"
                        >
                            <a-button type="link" class="font-12 text-color-black mark-no"> 删除 </a-button>
                        </a-popconfirm>

                        <!-- <a-button type="link" @zz="collectFun" class="font-12 text-color-black"> 收藏 </a-button> -->
                    </div>
                </template>
            </bee-column-product-item>
        </div>
    </div>
</template>
<script>
import BeeColumnProductItem from '@/components/BeeColumnProductItem.vue';
import DetailBtn from '@/pageComponents/productDetail/detail-btn.vue';
export default {
    components: {
        BeeColumnProductItem,
        DetailBtn
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
        },
        // 是否全选
        isSelectAll: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            colummList: [
                { text: '', width: '70px', slot: 'checkout', show: true },
                { text: '', width: '94px', slot: 'img' },
                { text: '商品信息', width: '200px', slot: 'info' },
                { text: '产品规格', width: '200px', slot: 'spec' },
                { text: '单位', width: '154px', slot: 'unit' },
                { text: '含税单价（元）', width: '134px', slot: 'price' },
                { text: '数量', width: '134px', slot: 'number' },
                { text: '操作', width: '84px', slot: 'edit' }
            ]
        };
    },
    computed: {
        handleSkuInfo() {
            return function (item) {
                return {
                    stock: item.productSku.activitiesVO ? item.productSku.activitiesVO.stock : item.productSku.stock,
                    buyMinQuantity: item.productSku.buyMinQuantity || 0,
                    number: item.number,
                    skuId: item.productSku.id,
                    id: item.id,
                    limitAmount: item.productSku.activitiesVO ? item.productSku.activitiesVO.limitAmount : '',
                    isActivities: item.productSku?.isActivities || false,
                    activitiesVO: item.productSku?.activitiesVO || null
                };
            };
        }
    },
    methods: {
        // 刷新页面
        init() {
            this.$emit('updateList');
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
    margin-top: 60px;
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
        .mark {
            width: 82px;
            height: 82px;
            background: rgba(0, 0, 0, 0.5);
            border-radius: 4px;
            opacity: 1;
            position: absolute;
            top: 0;
            font-size: 12px;
            color: white;
            font-weight: bold;
            text-align: center;
            line-height: 82px;
        }
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
    .box-mark {
        opacity: 0.5;
    }
    .box:last-child {
        border-bottom: none;
    }
    .product-info {
        height: 82px;
    }
}
.checkbox-item {
    height: 82px;
}
.right-box {
    .ant-btn {
        padding: 0 5px;
    }
}
</style>
