<!--好货榜单TAB组件-->
<template>
    <div class="goods-tab">
        <div
            v-for="(item, index) in referrerSku"
            :key="index"
            class="tab-item line-1"
            :class="[current === index ? 'tab-item-selectd' : '']"
            @mouseenter="
                (e) => {
                    mouseenterFun(item, index);
                }
            "
        >
            {{ item.name }}
        </div>
    </div>
</template>
<script>
export default {
    props: {
        referrerSku: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            current: 0
        };
    },
    methods: {
        // 鼠标滑过当前分类事件
        mouseenterFun(item, index) {
            this.current = index;
            this.$emit('changeTab', item.plist);
        }
    }
};
</script>
<style lang="less" scoped>
.goods-tab {
    width: 216px;
    height: 600px;
    background-image: url('@/assets/images/index/goods-tab-bg.png');
    background-size: 100% 100%;
    padding: 44px 40px;
    box-sizing: border-box;
    .tab-item {
        height: 46px;
        border-bottom: solid 1px rgba(255, 255, 255, 0.12);
        line-height: 46px;
        color: #ffffff;
        font-size: 14px;
        cursor: pointer;
        &:last-child {
            border-bottom: none;
        }
    }
    .tab-item-selectd {
        font-weight: bold;
        font-size: 20px;
    }
}
</style>
