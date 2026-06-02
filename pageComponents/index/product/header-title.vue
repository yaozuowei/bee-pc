<!--title-->
<template>
    <div class="title flex flex-r-b">
        <div class="font-24 font-bold text-color-black flex flex-v-c" style="height: 24px">
            <div class="s-line mr-8"></div>
            <div>{{ title }}</div>
        </div>
        <div v-if="isSeeMore" class="flex flex-v-c text-color-02 font-14 see-more" @click="$emit('toMoreFun')">
            查看更多
            <img src="@/assets/images/see-more.png" class="ml-4" alt="" />
        </div>
    </div>
</template>
<script>
export default {
    props: {
        // 是否展示查看更多
        isSeeMore: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: '爆品推荐'
        }
    },
    data() {
        return {};
    }
};
</script>
<style lang="less" scoped>
.title {
    margin-top: 42px;
    margin-bottom: 26px;
    .s-line {
        width: 4px;
        height: 20px;
        background: #66c3b9;
        border-radius: 12px;
    }
    .img {
        width: 20px;
        height: 20px;
        display: block;
    }
    .see-more {
        cursor: pointer;
    }
}
</style>
