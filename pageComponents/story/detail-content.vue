<template>
    <div class="content-box mt-32">
        <div class="head-title text-c">
            <div class="font-18 text-color-black">01</div>
            <div class="mt-16 text-color-black">项目介绍</div>
        </div>

        <div class="project-info mt-32">
            <client-only>
                <img
                    v-if="info.projectInfoImages && info.projectInfoImages.length > 0"
                    v-lazy="info.projectInfoImages[0]"
                    :alt="info.projectTitle"
                />
            </client-only>
            <h4 class="mt-24 text-color-black font-16">{{ info.projectTitle }}</h4>
            <p class="font-16 mt-12 text-color-02">
                {{ info.projectInfo }}
            </p>
        </div>

        <div class="head-title text-c">
            <div class="font-18 text-color-black">02</div>
            <div class="mt-16 text-color-black">案例详情</div>
        </div>

        <div class="article-content-html project-content mt-32">
            <template v-if="info.infoImages && info.infoImages.length > 0">
                <client-only>
                    <img v-for="item in info.infoImages" :key="item" v-lazy="item" />
                </client-only>
            </template>
            <template v-if="info.contentImages && info.contentImages.length > 0">
                <client-only>
                    <img v-for="item in info.contentImages" :key="item" v-lazy="item" />
                </client-only>
            </template>
            <div v-if="info.infoHtml" v-html="info.infoHtml"></div>
            <div v-if="info.contentHtml" v-html="info.contentHtml"></div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'StoryDetailContent',
    props: {
        info: {
            type: Object,
            default: () => ({})
        }
    }
};
</script>
<style scoped lang="less">
.content-box {
    width: 100%;
    .head-title {
        line-height: 1em;
    }
}
.project-info,
.project-content {
    img {
        width: 608px;
        border-radius: 8px;
        display: block;
        margin: 0 auto;
    }
}
</style>
