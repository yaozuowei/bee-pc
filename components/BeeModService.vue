<template>
    <div
        class="flex flex-r-c flex-v-c text-unselective"
        :class="{
            'conetnt-bg': hasBackground
        }"
        :style="{
            marginTop: `${top}px`,
            marginBottom: `${bottom}px`
        }"
    >
        <div class="bee-content-width flex flex-r-c">
            <a-space :size="62">
                <div v-for="item in lists" :key="item.url" class="mod-item flex flex-v-c">
                    <img class="mr-16" :src="item.url" :alt="item.name" />
                    <div class="font-18 font-bold text-color-black">{{ item.name }}</div>
                </div>
            </a-space>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BeeModService',
    props: {
        hasBackground: {
            type: Boolean,
            default: true
        },
        top: {
            type: Number,
            default: 0
        },
        bottom: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            lists: [
                {
                    name: '正品保证',
                    url: require('@/assets/images/mod-service/mod-01.png')
                },
                {
                    name: '期货保证',
                    url: require('@/assets/images/mod-service/mod-02.png')
                },
                {
                    name: '专属客服',
                    url: require('@/assets/images/mod-service/mod-03.png')
                },
                {
                    name: '阳光采购',
                    url: require('@/assets/images/mod-service/mod-04.png')
                },
                {
                    name: '诚信服务',
                    url: require('@/assets/images/mod-service/mod-05.png')
                }
            ]
        };
    }
};
</script>
<style scoped lang="less">
.conetnt-bg {
    height: 140px;
    background: rgba(0, 8, 22, 0.04);
}
.mod-item {
    img {
        width: 44px;
        height: 44px;
    }
}
</style>
