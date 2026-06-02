<template>
    <div ref="EditPhoneModal">
        <a-modal
            :z-index="20"
            width="700px"
            :get-container="() => $refs.EditPhoneModal"
            title="修改手机号"
            :visible="visible"
            :confirm-loading="confirmLoading"
            ok-text="下一步"
            @ok="handleOk"
            @cancel="handleCancel"
        >
            <div class="flex flex-v flex-v-c flex-r-c">
                <bee-step :current="stepCurrent" :steps="steps"></bee-step>
                <transition name="page" mode="out-in">
                    <a-form-model
                        v-if="stepCurrent === 0"
                        ref="userLoginForm"
                        class="mt-40"
                        layout="horizontal"
                        :model="originForm"
                        :rules="originRules"
                        :label-col="{ span: 6 }"
                        :wrapper-col="{ span: 16 }"
                    >
                        <a-form-model-item label="手机号码：" prop="phone" has-feedback>
                            <div class="input-item text-color-black font-14">{{ originForm.phone }}</div>
                        </a-form-model-item>

                        <a-form-model-item label="验证码：" prop="code" has-feedback>
                            <a-input
                                v-model="originForm.code"
                                class="phone-code-input input-item font-14"
                                size="large"
                                type="text"
                                :max-length="6"
                                placeholder="请输入短信验证码"
                                allow-clear
                            >
                                <a-button
                                    slot="suffix"
                                    class="send-phone-button font-14"
                                    :loading="originForm.sendPhoneCodeLoadingStatus"
                                    type="link"
                                    :disabled="oldPhoneStatus"
                                    @click="sendPhoneCode('originForm')"
                                    >{{
                                        originForm.sendPhoneCodecountDown === -1
                                            ? '获取验证码'
                                            : `${originForm.sendPhoneCodecountDown}秒后重发`
                                    }}</a-button
                                >
                            </a-input>
                        </a-form-model-item>
                    </a-form-model>
                    <a-form-model
                        v-else
                        ref="userLoginForm"
                        class="mt-40"
                        layout="horizontal"
                        :model="newForm"
                        :rules="newRules"
                        :label-col="{ span: 6 }"
                        :wrapper-col="{ span: 16 }"
                    >
                        <a-form-model-item label="新手机号码：" prop="phone" has-feedback>
                            <a-input
                                v-model="newForm.phone"
                                class="input-item"
                                size="large"
                                :max-length="11"
                                placeholder="请输入手机号"
                                :validate-status="''"
                                allow-clear
                            >
                            </a-input>
                        </a-form-model-item>

                        <a-form-model-item label="短信验证码：" prop="code" has-feedback>
                            <a-input
                                v-model="newForm.code"
                                class="phone-code-input input-item font-14"
                                size="large"
                                type="text"
                                :max-length="6"
                                placeholder="请输入短信验证码"
                                allow-clear
                            >
                                <a-button
                                    slot="suffix"
                                    class="send-phone-button font-14"
                                    :loading="newForm.sendPhoneCodeLoadingStatus"
                                    type="link"
                                    :disabled="newPhoneStatus"
                                    @click="sendPhoneCode('newForm')"
                                    >{{
                                        newForm.sendPhoneCodecountDown === -1 ? '获取验证码' : `${newForm.sendPhoneCodecountDown}秒后重发`
                                    }}</a-button
                                >
                            </a-input>
                        </a-form-model-item>
                    </a-form-model>
                </transition>
            </div>
        </a-modal>
    </div>
</template>

<script>
import { FormModel, Input } from 'ant-design-vue';
import { isPhone } from '@/utils/validation';

export default {
    name: 'EditPhoneModal',
    components: {
        AFormModel: FormModel,
        AFormModelItem: FormModel.Item,
        AInput: Input
    },
    data() {
        return {
            visible: false,
            confirmLoading: false,
            // 步骤条
            stepCurrent: 0,
            steps: ['短信验证', '更换手机号', '完成'],
            // 原手机号
            originForm: {
                phone: '18270856422',
                code: '',
                // 发送验证码时间
                maxSendTime: 60,
                // 倒计时
                sendPhoneCodecountDown: -1,
                // 倒计时计时器
                countDownTimer: null,
                // 发送验证码请求状态
                sendPhoneCodeLoadingStatus: false
            },
            originRules: {
                code: [
                    { required: true, min: 6, message: '请输入验证码', trigger: 'blur' },
                    { min: 6, message: '验证码格式不正确', trigger: 'blur' }
                ]
            },
            // 新手机号
            newForm: {
                phone: '',
                code: '',
                // 发送验证码时间
                maxSendTime: 60,
                // 倒计时
                sendPhoneCodecountDown: -1,
                // 倒计时计时器
                countDownTimer: null,
                // 发送验证码请求状态
                sendPhoneCodeLoadingStatus: false
            },
            newRules: {
                phone: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { validator: (rule, value) => isPhone(value), message: '手机号码格式不正确', trigger: 'blur' }
                ],
                code: [
                    { required: true, min: 6, message: '请输入验证码', trigger: 'blur' },
                    { min: 6, message: '验证码格式不正确', trigger: 'blur' }
                ]
            }
        };
    },
    computed: {
        // 用户手机号状态
        oldPhoneStatus() {
            return this.originForm.sendPhoneCodecountDown > 0;
        },
        // 用户手机号状态
        newPhoneStatus() {
            return !isPhone(this.newForm.phone) || this.newForm.sendPhoneCodecountDown > 0;
        }
    },
    destroyed() {
        this.originForm.countDownTimer && clearInterval(this.originForm.countDownTimer);
    },
    methods: {
        hideModal() {
            this.visible = false;
        },
        showModal() {
            this.visible = true;
        },
        handleOk() {
            if (this.stepCurrent === 0) {
                this.stepCurrent++;
            } else {
                this.stepCurrent = 0;
            }
        },
        handleCancel() {
            this.hideModal();
        },
        // 发送验证码
        async sendPhoneCode(formName) {
            this[formName].sendPhoneCodeLoadingStatus = true;
            const status = await this.$store.dispatch('sendPhoneCode/sendPhoneCode', {
                phone: this[formName].phone
            });
            this[formName].sendPhoneCodeLoadingStatus = false;
            if (!status) return false;
            this.$message.success('发送验证码成功');
            this[formName].sendPhoneCodecountDown = this[formName].maxSendTime;
            this.startCountDown(formName);
        },
        // 开始倒计时
        startCountDown(formName) {
            this[formName].countDownTimer = setInterval(() => {
                if (this[formName].sendPhoneCodecountDown === 1) {
                    this[formName].sendPhoneCodecountDown = -1;
                    clearInterval(this[formName].countDownTimer);
                    return false;
                }
                this[formName].sendPhoneCodecountDown--;
            }, 1000);
        }
    }
};
</script>
<style scoped lang="less">
.step-box {
    width: 100%;
}
.input-item {
    width: 250px;
    :deep(input) {
        color: @main-black;
        font-size: 14px;
    }
}
</style>
