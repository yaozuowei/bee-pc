<!--推荐商品-->
<template>
    <div class="recommended-box">
        <div class="title mb-24">
            <div class="title-text font-14 font-bold text-color">为你推荐</div>
        </div>
        <div class="flex flex-r-s flex-w">
            <div
                v-for="(item, index) in hwList"
                :key="index"
                :style="{ marginBottom: '12px', marginRight: (index + 1) % 4 === 0 ? '0' : '12px' }"
            >
                <product-item-s
                    :key="index"
                    flag="all"
                    :is-border="true"
                    :item-data="item"
                    :is-activity="false"
                    item-width="214px"
                ></product-item-s>
            </div>
        </div>
    </div>
</template>
<script>
import productItemS from '@/pageComponents/index/product/product-item-s.vue';
export default {
    components: {
        productItemS
    },
    props: {
        hwList: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {};
    }
};
</script>
<style lang="less" scoped>
.recommended-box {
    .title {
        width: 894px;
        height: 42px;
        background: rgba(0, 8, 22, 0.04);
        border-radius: 4px;
        .title-text {
            width: 132px;
            height: 42px;
            padding-left: 38px;
            line-height: 42px;
            border-bottom: solid 2px @main-color;
        }
    }
}
</style>
