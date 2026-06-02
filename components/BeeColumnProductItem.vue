<!-- 列表形式的商品列表 -->
<template>
    <div class="columm-box-item flex">
        <div v-for="(item, index) in colummList" :key="index" :style="{ width: item.width }">
            <div class="pr-8">
                <slot :name="item.slot"></slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        colummList: {
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
.columm-box-item {
    padding: 28px 32px;

    box-sizing: border-box;
}
</style>
