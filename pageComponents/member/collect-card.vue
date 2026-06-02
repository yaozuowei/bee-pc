<template>
    <div class="story-item" @click="toSceneDetailPage">
        <a-carousel autoplay>
            <div v-for="item in data.listImages" :key="item" class="img">
                <bee-img :src="item" :alt="data.title" lazy />
            </div>
        </a-carousel>

        <div class="mt-4 pb-8">
            <h4 class="font-14 text-color-black font-bold line-1">{{ data.title }}</h4>
            <p class="font-12 mt-4 text-color-02 line-1">{{ data.subTitle }}</p>
            <div class="flex mt-4 flex-r-b">
                <p class="text-r font-12 flex flex-v-c text-color-02">{{ data.createTime || '' }}</p>
                <a-button class="font-12 text-color-01" type="link" @click.stop="handleCancelCollection">取消收藏</a-button>
            </div>
        </div>
    </div>
</template>

<script>
import { Carousel } from 'ant-design-vue';
export default {
    name: 'CollectCard',
    components: {
        ACarousel: Carousel
    },
    props: {
        data: {
            type: Object,
            default: () => ({})
        }
    },
    methods: {
        toSceneDetailPage() {
            this.$emit('item-click');
        },
        handleCancelCollection() {
            console.log(22222);
            this.$emit('cancel');
        }
    }
};
</script>
<style scoped lang="less">
.story-item {
    width: 100%;
    border-radius: 12px;
    margin-bottom: 10px;
    overflow: hidden;
    border: 1px solid rgba(0, 8, 22, 0.12);
    cursor: pointer;
    transition: all 0.2s linear;
    &:hover {
        box-shadow: 0 0 30px rgba(0, 0, 0, 10%);
        transform: translate3d(0, -2px, 0);
    }
    .img {
        width: 100%;
        height: 224px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    h4,
    p {
        padding: 0 16px;
        margin-bottom: 0;
    }
}
</style>
