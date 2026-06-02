<!--热门搜索-->
<template>
    <div class="">
        <div class="hot-search flex text-color-01 font-12">
            <div class="hot-search-lable">热门搜索：</div>
            <div v-for="(item, index) in hotSearchVals" :key="index" class="hot-search-item mr-4" @click="toSearch(item)">{{ item }}</div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            hotSearchVals: ['草坪', 'PC砖', '透水砖', '灯具']
        };
    },
    methods: {
        // 选择热门搜索去搜索
        toSearch(item) {
            window.location.href = `${window.location.origin}/product?keyword=${item}`;
        }
    }
};
</script>
<style lang="less" scoped>
.hot-search {
    flex-wrap: wrap;
}
.hot-search-item {
    cursor: pointer;
    &:hover {
        color: @main-color;
    }
}
</style>
