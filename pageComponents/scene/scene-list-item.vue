<template>
    <div class="story-item text-unselective" @click="toSceneDetailPage">
        <img v-if="info.imageList && info.imageList.length > 0" class="img" :src="info.imageList[0]" :alt="info.title" />
        <div class="title flex flex-v-c flex-r-c font-24">{{ info.title }}</div>
    </div>
</template>

<script>
export default {
    name: 'SceneListItem',
    props: {
        info: {
            type: Object,
            default: () => ({})
        }
    },
    methods: {
        toSceneDetailPage() {
            this.$router.push(`/scene/${this.info.id}/goods-list.html`);
        }
    }
};
</script>
<style scoped lang="less">
.story-item {
    width: 100%;
    height: 290px;
    background: rgba(0, 0, 0, 0.25);
    border-radius: 12px;
    margin-bottom: 10px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.2s linear;
    &:hover {
        box-shadow: 0 15px 30px rgba(0, 0, 0, 10%);
        transform: translate3d(0, -2px, 0);
    }
    .img {
        width: 100%;
        height: 100%;
        // object-fit: cover;
    }
    .title {
        position: absolute;
        color: #fff;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.25);
    }
}
</style>
