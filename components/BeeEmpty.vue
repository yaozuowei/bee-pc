<template>
    <div class="empty-container flex flex-v-c flex-r-c" :style="{ height: `${height}px` }">
        <a-empty :image="imgUrl" :image-style="imgStyle">
            <template slot="description">
                <slot>
                    <h4 class="font-16 text-color-black" :style="{ fontSize: imgStyle.fontSize }">{{ emptyTitle }}</h4>
                    <p class="font-14 text-color-02">{{ emptySubTitle }}</p>
                </slot>
            </template>
        </a-empty>
    </div>
</template>

<script>
export default {
    name: 'BeeEmpty',
    props: {
        height: {
            type: Number,
            default: 520
        },
        imgUrl: {
            type: String,
            default: require('@/assets/images/empty.png')
        },
        imgStyle: {
            type: Object,
            default: () => ({
                height: '226px',
                width: '226px',
                fontSize: '16px'
            })
        },
        emptyTitle: {
            type: String,
            default: '没有找到匹配的结果'
        },
        emptySubTitle: {
            type: String,
            default: '还有更多好的商品，换个词试试吧'
        }
    }
};
</script>

<style lang="less" scoped>
.empty-container {
    width: 100%;
    :deep(.ant-empty-image) {
        margin: 0 auto;
    }
}
</style>
