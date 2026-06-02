<template>
    <div class="story-item" @click="toSceneDetailPage">
        <a-carousel autoplay>
            <div v-for="item in data.imgs" :key="item" class="img">
                <bee-img :src="item" :alt="data.title" lazy />
            </div>
        </a-carousel>

        <div class="mt-12">
            <h4 class="font-16 text-color-black font-bold line-1">{{ data.title }}</h4>
            <p class="font-12 text-color-02 line-1">{{ data.describe }}</p>
            <p class="text-r font-12 text-color-02">{{ data.date }}</p>
        </div>
    </div>
</template>

<script>
import { Carousel } from 'ant-design-vue';
export default {
    name: 'StoryListItem',
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
        }
    }
};
</script>
<style scoped lang="less">
.story-item {
    width: 100%;
    height: 406px;
    border-radius: 12px;
    margin-bottom: 10px;
    overflow: hidden;
    border: 1px solid rgba(0, 8, 22, 0.12);
    cursor: pointer;
    transition: all 0.2s linear;
    &:hover {
        box-shadow: 0 15px 30px rgba(0, 0, 0, 10%);
        transform: translate3d(0, -2px, 0);
    }
    .img {
        width: 100%;
        height: 290px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    h4,
    p {
        padding: 0 16px;
    }
}
</style>
