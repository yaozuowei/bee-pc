<template>
    <div
        :style="{
            width: typeof width === 'number' ? `${width}px` : width,
            height: typeof height === 'number' ? `${height}px` : height,

            borderRadius: typeof radius === 'number' ? `${radius}px` : radius,
            background: background
        }"
        class="img-box"
    >
        <client-only>
            <img
                v-if="lazy"
                v-lazy="src"
                class="img"
                :alt="alt"
                :style="{
                    objectFit: fit
                }"
                :preview="preview"
                :preview-text="previewText"
            />
            <div v-else-if="loadStatus !== 'error'" class="load-box">
                <img
                    class="img"
                    :src="src"
                    :alt="alt"
                    :style="{
                        objectFit: fit,
                        opacity: loadStatus === 'success' ? 1 : 0,
                        maxHeight: typeof height === 'number' ? `${maxHeight}px` : maxHeight
                    }"
                    :preview="preview"
                    :preview-text="previewText"
                    @load="loadSuccess"
                    @error="loadError"
                />
                <img v-if="loadStatus === 'load'" class="load-img" src="@/assets/images/load.gif" />
            </div>
            <div v-else class="error-box flex flex-r-c flex-v-c">
                <img src="@/assets/images/logo/logo.png" />
            </div>
        </client-only>
    </div>
</template>
<script>
export default {
    name: 'BeeImg',
    props: {
        radius: {
            type: [Number, String],
            default: 0
        },
        width: {
            type: [Number, String],
            default: '100%'
        },
        height: {
            type: [Number, String],
            default: '100%'
        },
        maxHeight: {
            type: [Number, String],
            default: '100%'
        },
        background: {
            type: String,
            default: '#efefef'
        },
        src: {
            type: String,
            default: ''
        },
        alt: {
            type: String,
            default: ''
        },
        lazy: {
            type: Boolean,
            default: false
        },
        fit: {
            type: String,
            default: 'fill'
        },
        preview: {
            type: [String, Boolean],
            default: false
        },
        previewText: {
            type: [String, Boolean],
            default: false
        }
    },
    data() {
        return {
            loadStatus: 'load'
        };
    },
    watch: {
        src(val) {
            console.log('watch', val);
            if (val) {
                this.loadStatus = 'load';
            } else {
                this.loadStatus = 'error';
            }
        }
    },
    mounted() {
        if (this.preview) {
            this.$previewRefresh();
        }
    },
    methods: {
        loadSuccess() {
            this.loadStatus = 'success';
        },
        loadError() {
            this.loadStatus = 'error';
        }
    }
};
</script>
<style scoped lang="less">
.img-box {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .img {
        width: 100%;
        height: 100%;
    }
    .load-box {
        width: 100%;
        height: 100%;
        position: relative;
        img {
            width: 100%;
            height: 100%;
        }
        .load-img {
            width: 100%;
            height: 100%;
            position: absolute;
            z-index: 22;
            left: 0;
            top: 0;
        }
    }
    .error-box {
        width: 100%;
        height: 100%;
        img {
            width: 90%;
            height: 90%;
            max-width: 200px;
            max-height: 200px;
        }
    }
}
</style>
