<template>
    <div class="flip-container flex flex-v-c flex-r-b">
        <div class="serve-card">
            <div class="flex flex-v-c"><img class="icon" src="@/assets/images/arrow-left-black.png" />上一篇</div>
            <p class="text-color-black mt-24 font-14 line-1">最美新悦城，城市绿化路线，已加入愿望清单已加入愿望清单</p>
        </div>
        <div class="serve-card">
            <div class="flex flex-v-c">下一篇<img class="icon" src="@/assets/images/arrow-right-black.png" /></div>
            <p class="text-color-black mt-24 font-14 line-1">最美新悦城，城市绿化路线，已加入愿望清单已加入愿望清单</p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'StoryDetailFlip'
};
</script>
<style scoped lang="less">
.flip-container {
    margin-top: 60px;
    padding-top: 60px;
    border-top: 1px solid rgba(0, 8, 22, 0.08);
}
.serve-card {
    width: 564px;
    height: 146px;
    padding: 40px;
    background: rgba(0, 8, 22, 0.04);
    border-radius: 8px;
    border: 1px solid rgba(0, 8, 22, 0.08);
    line-height: 1em;
    cursor: pointer;
    .icon {
        width: 20px;
        height: 20px;
    }
}
</style>
