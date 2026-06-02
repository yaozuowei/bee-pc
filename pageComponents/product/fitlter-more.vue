<!--筛选多个条件-->
<template>
    <div class="more-box flex flex-r-b">
        <div class="flex">
            <div
                v-for="(item, index) in list"
                :key="index"
                :class="[current === index ? 'more-box-item-select' : '']"
                class="more-box-item font-12 text-color-black flex flex-v-c flex-r-c"
                @click="changeLeft(item, index)"
            >
                {{ item.text }}
                <div v-if="index > 0 && index == current" class="flex flex-v flex-r-c ml-4" style="height: 36px">
                    <a-icon type="caret-up" style="position: relative; top: 2px" :style="{ color: item.isSelectd ? 'gray' : 'white' }" />
                    <a-icon
                        type="caret-down"
                        :style="{ color: !item.isSelectd ? 'gray' : 'white' }"
                        style="color: white; position: relative; top: -2px"
                    />
                </div>
            </div>
            <!-- 价格区间 -->
            <div class="price-section flex flex-v-c">
                <a-input-number v-model="minPrice" class="mr-8" :min="1" :max="100000" />-
                <a-input-number v-model="maxPrice" class="ml-8" :min="1" :max="100000" />
                <a-button class="ml-16" @click="confirmPrice()">确认</a-button>
            </div>
        </div>

        <div class="more-right flex flex-v-c">
            <div class="more-right-see flex flex-r-b">
                <div class="flex flex-v-c flex-r-c font-12" :class="[currentSee == 1 ? 'text-color' : '']" @click="changeSee(1)">
                    <a-icon type="appstore" class="mr-4" style="font-size: 16px" />大图
                </div>
                <div class="flex flex-v-c flex-r-c font-12" :class="[currentSee == 2 ? 'text-color' : '']" @click="changeSee(2)">
                    <a-icon type="unordered-list" class="mr-4" style="font-size: 16px" />列表
                </div>
            </div>
            <div class="font-12 font-bold text-color-01 flex-1" style="text-align: center; width: 0">
                <span class="text-color-red">{{ producrNum }} </span>种
            </div>
        </div>
    </div>
</template>
<script>
import { InputNumber } from 'ant-design-vue';
export default {
    components: {
        AInputNumber: InputNumber
    },
    props: {
        producrNum: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            current: 0,
            currentSee: 1, // 大图小图切换
            list: [
                {
                    text: '默认',
                    isSelectd: true
                },
                // {
                //     text: '人气',
                //     isSelectd: true,
                //     key: 'sortOrder'
                // },
                {
                    text: '销量',
                    isSelectd: true,
                    key: 'salesOrder'
                },
                {
                    text: '价格',
                    isSelectd: true,
                    key: 'priceOrder'
                }
            ],
            maxPrice: '', // 最高价格
            minPrice: '' // 最低价格
        };
    },
    methods: {
        // 左边条件切换
        changeLeft(item, index) {
            if (index === this.current) {
                item.isSelectd = !item.isSelectd;
            } else {
                this.list[this.current].isSelectd = true;
            }
            this.current = index;
            this.$emit('changeMore', {
                key: item.key,
                sort: item.isSelectd ? 'ASC' : 'DESC',
                maxPrice: this.maxPrice,
                minPrice: this.minPrice
            });
        },
        // 大图 小图切换
        changeSee(val) {
            this.currentSee = val;
            this.$emit('saveShowStatus');
        },
        // 确认选择价格
        confirmPrice() {
            this.$emit('changeMore', {
                key: this.list[this.current].key,
                sort: this.list[this.current].isSelectd ? 'ASC' : 'DESC',
                maxPrice: this.maxPrice,
                minPrice: this.minPrice
            });
        }
    }
};
</script>
<style lang="less" scoped>
.more-box {
    width: 1152px;
    height: 36px;
    border-radius: 4px;
    background: rgba(0, 8, 22, 0.04);
    border: 1px solid #e0e1e3;
    cursor: pointer;
    .more-box-item {
        width: 70px;
        line-height: 36px;
        border-right: 1px solid #e0e1e3;
        &:last-child {
            // border-right: none;
        }
    }
    .more-box-item-select {
        background-color: @main-color;
        color: white;
    }
    .price-section {
        padding: 0 16px;
        :deep(.ant-input-number, ) {
            width: 60px !important;
            height: 24px !important;
            // line-height: 24px;
        }
        :deep(.ant-input-number-input) {
            height: 24px !important;
            // line-height: 22px !important;
            font-size: 12px;
        }
        .ant-btn {
            width: 48px;
            height: 24px;
            text-align: center;
            line-height: 24px;
            padding: 0;
            font-size: 12px;
        }
    }
    .more-right {
        width: 260px;
        border-left: 1px solid #e0e1e3;
        // border-right: 1px solid #e0e1e3;
        .more-right-see {
            width: 136px;
            height: 36px;
            border-right: 1px solid #e0e1e3;
            div {
                width: 50%;
                img {
                    width: 16px;
                    height: 16px;
                }
            }
        }
    }
    :deep(.ant-input-number-handler-wrap) {
        display: none;
    }
}
</style>
