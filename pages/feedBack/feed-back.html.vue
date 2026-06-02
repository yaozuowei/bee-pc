<!-- 意见反馈页面 -->
<template>
    <div class="page-container" :head-bar="false" size="small">
        <!-- 顶部bar -->
        <bee-simple-head></bee-simple-head>
        <!-- 内容 -->
        <div class="bee-content-width page-content">
            <div class="title font-20 text-color-black">意见反馈</div>
            <div class="line"></div>
            <div class="form mt-24">
                <a-form-model ref="feedBackForm" layout="horizontal" :model="feedBackForm" :rules="feedBackRules">
                    <a-form-model-item class="form-item flex flex-v-c flex-r-c" label="反馈类型：" prop="feedbackType" has-feedback>
                        <div class="type-box input-item flex flex-r-b">
                            <div
                                v-for="(item, index) in feedbackTypeList"
                                :key="index"
                                :class="['type-item', typeIndex == index ? 'type-item-select' : '']"
                                class="font-12 text-color-black"
                                @click="change(item, index)"
                            >
                                {{ item.text }}
                            </div>
                        </div>
                    </a-form-model-item>
                    <a-form-model-item class="form-item flex flex-r-c" label="问题描述：" prop="issueDescribe" has-feedback>
                        <a-input
                            v-model="feedBackForm.issueDescribe"
                            class="input-item"
                            size="large"
                            :max-length="200"
                            type="textarea"
                            :rows="4"
                            placeholder="请输入你的详细问题，我们将尽快为你解决"
                        >
                        </a-input>
                    </a-form-model-item>
                    <a-form-model-item class="form-item flex flex-r-c" label="联系方式：" prop="phone" has-feedback>
                        <a-input
                            v-model="feedBackForm.phone"
                            class="input-item"
                            size="large"
                            :max-length="20"
                            placeholder="请输入"
                            allow-clear
                        >
                        </a-input>
                    </a-form-model-item>
                    <a-form-model-item class="form-item flex flex-r-c" label="上传图片：" prop="fileList" has-feedback>
                        <div class="input-item">
                            <bee-upload-img
                                v-model="feedBackForm.fileList"
                                flag="COMPANY_OTHER_FILE"
                                width="107px"
                                height="107px"
                                type="multiTmp"
                                :multiple="true"
                                :row="3"
                            ></bee-upload-img>

                            <div class="upload-remind font-12 mt-8 text-color-02 flex">
                                <a-icon class="font-16 mr-4" type="exclamation-circle" />建议图片大小不超过 2M。
                            </div>
                        </div>
                    </a-form-model-item>
                </a-form-model>
            </div>
            <!-- 底部按钮 -->
            <div class="btn flex flex-r-c">
                <a-button class="submit-button font-16" type="primary" @click="submit"> 提交 </a-button>
            </div>
        </div>
        <!-- 底部文字 -->
        <div class="flex flex-r-c">
            <login-footer class="bee-content-width"></login-footer>
        </div>
    </div>
</template>
<script>
import { FormModel, Input } from 'ant-design-vue';
import LoginFooter from '@/pageComponents/login/login-footer';
export default {
    name: 'FeedBack',
    components: {
        AFormModel: FormModel,
        AFormModelItem: FormModel.Item,
        // AIcon: Icon,
        AInput: Input,
        LoginFooter
    },
    data() {
        return {
            typeIndex: 0, // 反馈类型
            feedbackTypeList: [
                { text: '产品建议', value: 'JY' },
                { text: '功能故障', value: 'GZ' },
                { text: '其他问题', value: 'QT' }
            ],
            feedBackForm: {
                feedbackType: 'JY', // 意见建议
                fileList: undefined, // 文件列表
                issueDescribe: '', // 问题描述
                phone: '', // 联系电话
                subTerminal: '3' // 终端
            },
            feedBackRules: {
                issueDescribe: [{ required: true, message: '请输入问题描述', trigger: 'blur' }]
            }
        };
    },
    // 监听用户数据变化
    watch: {
        '$store.state.user.userInfo': {
            handler() {
                this.feedBackForm.phone = this.$store.state.user.userInfo?.phone || '';
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        // 切换选择类型
        change(e, i) {
            this.feedBackForm.feedbackType = e.value;
            this.typeIndex = i;
        },
        // 提交数据
        submit() {
            const that = this;
            this.$refs.feedBackForm.validate(function (valid) {
                if (valid) {
                    const params = JSON.parse(JSON.stringify(that.feedBackForm));
                    if (that.feedBackForm.fileList && that.feedBackForm.fileList.length) {
                        const imgList = that.feedBackForm.fileList.map((r) => {
                            return r.tmpEntityId;
                        });
                        params.fileList = imgList;
                    }
                    that.$api.common
                        .addFeedBack(params)
                        .then(() => {
                            that.$message.success('意见反馈提交成功');
                            setTimeout(() => {
                                that.$router.push('/');
                            }, 200);
                        })
                        .catch(() => {
                            that.$message.success('提交失败');
                            that.$router.p('/');
                        });
                } else {
                    return false;
                }
            });
        }
    }
};
</script>
<style lang="less" scoped>
.page-content {
    margin: 0 auto;
    margin-bottom: 30px;
    .title {
        padding: 27px;
    }
    .line {
        width: 100%;
        height: 1px;
        background: rgba(0, 8, 22, 0.08);
    }
    .from {
        margin: 0 auto;
    }
    .form-item {
        .input-item {
            width: 343px;
        }
    }
    .type-item {
        width: 96px;
        height: 30px;
        border-radius: 4px;
        border: 1px solid rgba(0, 8, 22, 0.12);
        text-align: center;
        line-height: 30px;
        margin-right: 16px;
        cursor: pointer;
        &:last-child {
            margin-right: 0;
        }
    }

    .type-item-select {
        background: rgba(101, 195, 184, 0.1);
        color: #65c3b8;
        font-weight: bold;
        border: 1px solid #65c3b8;
    }
    .upload-remind {
        line-height: 17px;
    }
    .submit-button {
        width: 420px;
        height: 48px;
        &.ant-btn-primary[disabled] {
            background-color: #c1e7e3;
            border-color: #c1e7e3;
            color: #fff;
        }
    }
}
</style>
