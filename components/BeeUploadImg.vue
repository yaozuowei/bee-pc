<template>
    <client-only>
        <div class="flex flex-v-t flex-w">
            <template v-if="fileList && fileList.length > 0">
                <div
                    v-for="(item, index) in fileList"
                    :key="item.uid"
                    class="file-item"
                    :class="{
                        error: item.status === 'error'
                    }"
                    :style="`width: ${width};height:${height};${!multiple ? 'margin: 0;' : ''}${
                        row !== 0 && Math.round(index + 1) % row === 0 ? 'margin-right: 0;' : ''
                    }`"
                >
                    <div v-if="item.status === 'uploading'" class="uploading flex flex-v flex-v-c flex-r-c">
                        <div>
                            <a-icon class="icon" type="loading" />
                            <div class="text mt-10 text-c text-color-02 font-12 line-1 pl-10 pr-10">图片上传中</div>
                        </div>
                    </div>
                    <a-tooltip v-else class="options flex flex-r-c flex-v-c">
                        <template v-if="item.status === 'error'" slot="title">上传失败</template>
                        <div v-if="item.url" class="preview-img flex flex-v-c flex-r-c">
                            <a-icon class="icon" type="eye" />
                            <img class="img" :src="item.url" :alt="item.name" :preview="flag" :preview-text="item.name" />
                        </div>
                        <a-icon class="icon" type="delete" @click="removeFile(item.id, index)" />
                    </a-tooltip>

                    <img v-if="item.url" :src="item.url" :alt="item.name" />
                    <div v-else class="text text-c text-color-02 font-12 line-1 pl-10 pr-10">{{ item.name }}</div>
                </div>
            </template>
            <div
                v-if="(!multiple && fileList.length === 0) || (multiple && fileList.length < maxCount)"
                class="upload-button"
                :style="!multiple ? 'margin: 0' : ''"
            >
                <slot name="button">
                    <div
                        class="button flex flex-v-c flex-r-c"
                        :style="{
                            width,
                            height
                        }"
                    >
                        <a-icon class="icon" type="plus" />
                    </div>
                </slot>
                <input ref="uploadInput" type="file" accept="image/*" :multiple="multiple" autoComplete="off" @change="beforeUpload" />
            </div>
        </div>
    </client-only>
</template>
<script>
import { Tooltip } from 'ant-design-vue';
// 获取input file的文件地址
function getObjectURL(file) {
    let url = null;
    if (window.createObjectURL !== undefined) {
        // basic
        url = window.createObjectURL(file);
    } else if (window.URL !== undefined) {
        // mozilla(firefox)兼容火狐
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL !== undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}
export default {
    components: {
        ATooltip: Tooltip
    },
    model: {
        prop: 'modelValue',
        event: 'change'
    },
    props: {
        modelValue: {
            require: true,
            type: Array,
            default: () => []
        },
        entityId: {
            type: Number,
            default: undefined
        },
        flag: {
            type: String,
            required: true
        },
        width: {
            type: String,
            default: '110px'
        },
        height: {
            type: String,
            default: '110px'
        },
        // 图片大小控制
        fileSize: {
            type: Number,
            default: 1024 * 1024 * 2
        },
        // 图片大小超出错误提示
        sizeError: {
            type: String,
            default: '图片文件大小不超过2M'
        },
        // 多选
        multiple: {
            type: Boolean,
            default: false
        },
        maxCount: {
            type: Number,
            default: 9
        },
        row: {
            type: Number,
            default: 0
        },
        // 自动上传
        auto: {
            type: Boolean,
            default: true
        },
        type: {
            type: String,
            default: 'single' // single非临时  multiTmp 临时
        }
    },
    computed: {
        fileList: {
            get() {
                return this.modelValue || [];
            }
        }
    },
    methods: {
        startUploadImg() {
            this.fileList.forEach((item, index) => {
                if (item.status !== '') return;
                const uid = item.uid;
                this.fileList[index].status = 'uploading';
                const data = new FormData();
                data.append('flag', this.flag);

                if (this.entityId) {
                    data.append(`entityId`, this.entityId);
                }
                // 上传临时文件
                if (this.type === 'multiTmp') {
                    data.append(`fileList[${0}]`, item.file);
                    this.$api.common
                        .uploadFileMultiTmp(data)
                        .then((picInfo) => {
                            this.fileList.forEach((item, index) => {
                                if (item.uid === uid) {
                                    this.fileList[index].fileList = picInfo.tmpEntityId;
                                    this.$set(this.fileList[index], 'status', 'done');
                                    this.$set(this.fileList[index], 'url', picInfo.fileList[0].url);
                                }
                            });
                        })
                        .catch(() => {
                            this.fileList.forEach((item, index) => {
                                if (item.uid === uid) {
                                    this.$set(this.fileList[index], 'status', 'error');
                                }
                            });
                        });
                } else {
                    data.append(`file`, item.file);
                    this.$api.common
                        .uploadFileSingle(data)
                        .then((picInfo) => {
                            this.fileList.forEach((item, index) => {
                                if (item.uid === uid) {
                                    this.fileList[index].id = picInfo.id;
                                    this.$set(this.fileList[index], 'status', 'done');
                                    this.$set(this.fileList[index], 'url', picInfo.url);
                                }
                            });
                        })
                        .catch(() => {
                            this.fileList.forEach((item, index) => {
                                if (item.uid === uid) {
                                    this.$set(this.fileList[index], 'status', 'error');
                                }
                            });
                        });
                }
            });
        },
        beforeUpload(e) {
            const files = [...e.target.files];
            files.forEach((item) => {
                if (this.multiple && this.fileList.length >= this.maxCount) {
                    this.$message.error(`最多上传${this.maxCount}张图片`);
                    return false;
                }
                const isJpgOrPng = item.type === 'image/jpeg' || item.type === 'image/png';
                if (!isJpgOrPng) {
                    this.$message.error('请选择图片文件上传');
                    return false;
                }
                if (item.size > this.fileSize) {
                    this.$message.error(this.sizeError);
                    return false;
                }
                const picItem = {
                    uid: this.uid(),
                    name: item.name,
                    file: item,
                    status: '',
                    url: getObjectURL(item)
                };
                if (this.multiple) {
                    this.fileList.push(picItem);
                } else {
                    this.fileList.splice(0, 1, picItem);
                }
                this.$emit('change', this.fileList);
            });
            // 自动上传
            if (this.auto) {
                this.startUploadImg();
            }
            this.$refs.uploadInput.value = '';
        },
        /**
         * 删除图片
         * @param {*} id
         * @param {*} index
         */
        removeFile(id, index) {
            this.fileList.splice(index, 1);
            id && this.$api.common.deleteFile(id);
        },
        // 生成uid
        uid() {
            const s = [];
            const hexDigits = '0123456789abcdef';
            for (let i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
            s[8] = s[13] = s[18] = s[23] = '-';

            return s.join('');
        }
    }
};
</script>
<style scoped lang="less">
.file-item {
    width: 110px;
    height: 110px;
    position: relative;
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 8px;
    overflow: hidden;
    border: 1px dashed @main-text-02;
    box-sizing: border-box;
    &:last-child {
        margin-left: 0;
    }
    &.error {
        border: 1px solid @main-red;
    }
    // &:hover {
    //     border-color: @main-color;
    // }
    .uploading,
    .options {
        position: absolute;
        z-index: 4;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
        .icon {
            font-size: 32px;
            color: #fff;
            margin: 0 8px;
        }
        .preview-img {
            position: relative;
            .img {
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                opacity: 0;
                z-index: 2;
                cursor: pointer;
            }
        }
        .text {
            color: rgba(255, 255, 255, 0.8);
        }
    }
    .options {
        opacity: 0;
        transition: opacity 0.4s;
        .icon {
            font-size: 22px;
            opacity: 0.8;
            cursor: pointer;
        }
    }
    &:hover {
        .options {
            opacity: 1;
        }
    }
    img {
        width: 100%;
        height: 100%;
    }
    .text {
        position: absolute;
        width: 100%;
        bottom: 0px;
        left: 0;
    }
}
.upload-button {
    opacity: 1;
    position: relative;
    margin-bottom: 10px;

    .button {
        width: 110px;
        height: 110px;
        border-radius: 8px;
        border: 2px dashed @main-text-02;
        box-sizing: border-box;
        cursor: pointer;

        .icon {
            color: @main-text-02;
            font-size: 40px;
        }
        // &:hover {
        & {
            border-color: @main-color;
            .icon {
                color: @main-color;
            }
        }
    }
    input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        z-index: 2;
        cursor: pointer;
    }
}
</style>
