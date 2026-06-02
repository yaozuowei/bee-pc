<template>
    <div class="detail-head pb-32">
        <h4 class="title text-color-black">{{ info.title }}</h4>
        <div class="label-list mt-12 flex">
            <div v-for="item in info.tags" :key="item" class="label mr-8">{{ item }}</div>
        </div>
        <div class="mt-24 flex flex-v-c flex-r-b">
            <div class="flex flex-v-c">
                <div class="avatar mr-12">
                    <bee-img :src="info.authorAvatar" radius="50%" />
                </div>
                <div class="flex flex-v">
                    <div class="text-color-black font-12">{{ info.author }}</div>
                    <div class="text-color-02 font-12 mt-4">{{ info.releaseTime }}</div>
                </div>
            </div>
            <div class="right-box flex flex-v-c">
                <div class="text-color-02 font-12">{{ info.viewInitCount }}次阅读量</div>
                <div class="split-border ml-36 mr-36 text-unselective"></div>
                <div class="item text-color-black flex flex-v-c" @click="$emit('collect')">
                    <img v-if="info.isCollect" class="icon mr-8" src="@/assets/images/like-active-icon.png" />
                    <img v-else class="icon mr-8" src="@/assets/images/like-icon.png" />{{ info.collectInitCount }}
                </div>
                <div class="item text-color-black ml-40 flex flex-v-c text-unselective" @click="$emit('like')">
                    <img v-if="info.isLike" class="icon mr-8" src="@/assets/images/praise-active-icon.png" />
                    <img v-else class="icon mr-8" src="@/assets/images/praise-icon.png" />{{ info.likeInitCount }}
                </div>
                <!-- <div class="item text-color-black ml-40 flex flex-v-c text-unselective">
                    <img class="icon mr-8" src="@/assets/images/share-icon.png" />分享
                </div> -->
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'StoryDetailHead',
    props: {
        info: {
            type: Object,
            default: () => ({})
        }
    }
};
</script>
<style scoped lang="less">
.detail-head {
    border-bottom: 1px solid rgba(0, 8, 22, 0.08);
}
.label-list {
    .label {
        padding: 0 12px;
        height: 28px;
        line-height: 28px;
        background: rgba(0, 8, 22, 0.04);
        border-radius: 4px;
    }
}

.avatar {
    width: 32px;
    height: 32px;
    display: block;
}
.split-border {
    width: 1px;
    height: 12px;
    background: rgba(0, 8, 22, 0.24);
}
.right-box {
    .icon {
        width: 20px;
        height: 20px;
    }
    .item {
        cursor: pointer;
    }
}
</style>
