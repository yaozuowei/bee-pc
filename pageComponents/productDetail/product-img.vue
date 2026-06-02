<!--商品详情图片展示-->
<template>
    <div class="pruduct-img">
        <div class="big-img-box mb-16">
            <!-- <img class="pic-zoom" :url="previewImg" :scale="3"></img> -->
            <pic-zoom v-if="previewImg.type === 'image'" class="pic-zoom" :url="previewImg.url" :scale="3"></pic-zoom>
            <video v-else width="350" height="350" controls style="object-fit: cover">
                <source :src="previewImg.url" type="video/mp4" />
                您的浏览器不支持 video 标签。
            </video>
        </div>
        <div class="scroll-img-box mb-24">
            <div class="left-btn" @click="prev">
                <a-icon type="left" />
            </div>
            <a-carousel ref="carousel" :dots="false">
                <div v-for="(val, cur) in handleList" :key="cur" class="center-img" style="display: flex">
                    <img
                        v-for="(item, index) in val"
                        :key="item.id"
                        :src="
                            item.type === 'image'
                                ? item.url
                                : item.url + '?spm=qipa250&x-oss-process=video/snapshot,t_7000,f_jpg,w_800,h_600,m_fast'
                        "
                        :class="[currentImg == item.id ? 'img-selectd' : '']"
                        alt=""
                        @mouseenter="
                            (e) => {
                                mouseenterFun(item, index);
                            }
                        "
                    />
                </div>
            </a-carousel>
            <div class="right-btn" @click="next">
                <a-icon type="right" />
            </div>
        </div>
        <!-- 收藏商品 -->
        <div class="flex">
            <div class="flex flex-v-c collection-box font-12 text-color-black" @click="$emit('collectFun')">
                <img v-if="isCollect" src="@/assets/images/like-active-icon.png" alt="" />
                <img v-else src="@/assets/images/collection-n.png" alt="" />收藏商品
            </div>
        </div>
    </div>
</template>
<script>
import { Carousel } from 'ant-design-vue';
const PicZoom = () => import('vue-piczoom');
export default {
    components: {
        ACarousel: Carousel,
        PicZoom
    },
    props: {
        imgList: {
            type: Array,
            default: () => []
        },
        specImgData: {
            type: Object,
            default: () => ({})
        },
        isCollect: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            previewImg: {
                type: 'image',
                url: ''
            }, // 预览图地址
            currentImg: 0
        };
    },
    computed: {
        // 图片处理
        handleList() {
            if (!this.imgList || !this.imgList.length) return [];
            const arr = [];
            for (let i = 0; i < this.imgList.length; i += 4) {
                arr.push(this.imgList.slice(i, i + 4));
            }
            return arr;
        }
    },
    watch: {
        imgList: {
            handler(val) {
                if (!this.imgList || !this.imgList.length) return;
                this.previewImg = {
                    type: this.imgList[0].type,
                    url: this.imgList[0].url
                };
                this.currentImg = this.imgList[0].id;
            },
            immediate: true
        },
        // 选择规格后更换选择的图片
        specImgData: {
            handler() {
                this.previewImg = {
                    type: this.specImgData.type,
                    url: this.specImgData.url
                };
                this.currentImg = this.specImgData.id;
            },
            deep: true
        }
    },
    methods: {
        next() {
            this.$refs.carousel.next();
        },
        prev() {
            this.$refs.carousel.prev();
        },
        mouseenterFun(item, index) {
            this.previewImg = {
                type: item.type,
                url: item.url
            };
            this.currentImg = item.id;
        }
    }
};
</script>
<style lang="less" scoped>
.big-img-box {
    width: 350px;
    height: 350px;
    overflow: hidden;
    border: solid 1px rgba(0, 8, 22, 0.04);
    border-radius: 8px;
}
.pic-zoom {
    &:deep(img) {
        // width: 350px !important;
        height: 350px;
        // border-radius: 8px;
        object-fit: cover;
    }
}

.scroll-img-box {
    width: 350px;
    height: 66px;
    position: relative;
    padding: 0 32px;
    overflow: hidden;
    img {
        object-fit: cover;
    }
    .left-btn,
    .right-btn {
        font-size: 20px;
        width: 32px;
        height: 32px;
        color: gray;
        cursor: pointer;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
    }
    .left-btn {
        left: 0;
    }
    .right-btn {
        right: 0;
    }
    .center-img {
        width: 276px !important;
        height: 66px;
        display: flex !important;
        img {
            width: 66px;
            height: 66px;
            margin-right: 4px;
            border-radius: 4px;
            &:last-child {
                margin-right: 0;
            }
        }
        .img-selectd {
            border: solid 1px @main-color;
        }
    }
}
.collection-box {
    cursor: pointer;
    img {
        width: 16px;
        height: 16px;
    }
}
</style>
