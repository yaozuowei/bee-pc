<template>
    <div class="login-form-content flex flex-v-c flex-v">
        <a-form-model
            ref="userLoginForm"
            layout="horizontal"
            :model="registerForm"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            :rules="registerRules"
        >
            <a-form-model-item label="手机号码：" prop="phone" has-feedback>
                <a-input
                    v-model="registerForm.phone"
                    class="input-item"
                    size="large"
                    :max-length="11"
                    placeholder="请输入手机号"
                    :validate-status="''"
                    allow-clear
                >
                </a-input>
            </a-form-model-item>

            <a-form-model-item label="验证码：" prop="code" has-feedback>
                <a-input
                    v-model="registerForm.code"
                    class="phone-code-input input-item"
                    size="large"
                    type="text"
                    :max-length="6"
                    placeholder="请输入短信验证码"
                    allow-clear
                >
                    <a-button
                        slot="suffix"
                        class="send-phone-button font-14"
                        :loading="sendPhoneCodeLoadingStatus"
                        type="link"
                        :disabled="userPhoneStatus"
                        @click="sendPhoneCode"
                        >{{ sendPhoneCodecountDown === -1 ? '获取验证码' : `${sendPhoneCodecountDown}秒后重发` }}</a-button
                    >
                </a-input>
            </a-form-model-item>

            <a-form-model-item label="用户名：" prop="userName" has-feedback>
                <a-input
                    v-model="registerForm.userName"
                    class="input-item"
                    size="large"
                    :max-length="16"
                    placeholder="请输入用户名"
                    :validate-status="''"
                    allow-clear
                >
                </a-input>
            </a-form-model-item>

            <!-- <a-form-model-item label="设置密码：" prop="password" has-feedback>
                <a-input-password
                    v-model="registerForm.password"
                    class="input-item"
                    size="large"
                    :max-length="12"
                    placeholder="请设置密码（8-12位）"
                    :validate-status="''"
                    allow-clear
                    autocomplete
                >
                </a-input-password>
            </a-form-model-item> -->

            <div class="flex flex-r-e mt-40">
                <a-button
                    class="submit-button font-bold"
                    type="primary"
                    :disabled="submitButtonStatus"
                    :loading="submitButtonLoginStatus"
                    @click="handleNext"
                    >下一步</a-button
                >
            </div>
            <div class="flex flex-r-e">
                <a-checkbox v-model="agreement" class="agreement-text mt-12 font-12"
                    >我已阅读并同意<span class="text-color" @click.prevent="agreementVisible = true">《小蜜蜂用户服务协议》</span
                    >相关内容，提交即代表你同意并认可协议条款和内容
                </a-checkbox>
            </div>
        </a-form-model>
        <a-modal
            title="小蜜蜂用户服务协议"
            :visible="agreementVisible"
            :width="1152"
            ok-text="同意"
            @ok="setAgreementCheckbox"
            @cancel="agreementVisible = false"
        >
            <iframe
                frameborder="0"
                style="width: 100%; height: 500px; height: 60vh"
                src="https://www.beeliip.com/agreements/privacy-agreement.html"
            ></iframe>
        </a-modal>
    </div>
</template>

<script>
import { FormModel, Input, Checkbox, Modal } from 'ant-design-vue';
import { isPhone } from '@/utils/validation';

export default {
    name: 'LoginForm',
    components: {
        AFormModel: FormModel,
        AFormModelItem: FormModel.Item,
        // AIcon: Icon,
        AInput: Input,
        // AInputPassword: Input.Password,
        ACheckbox: Checkbox,
        AModal: Modal
    },
    props: {
        info: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            formItemLayout: {
                labelCol: { span: 5 },
                wrapperCol: { span: 19 }
            },

            agreement: false,
            // 登录数据
            registerForm: {
                phone: this.$store.state.sendPhoneCode.prevPhone,
                code: '',
                userName: ''
                // password: ''
            },
            // 用户登录验证规则
            registerRules: {
                phone: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { validator: (rule, value) => isPhone(value), message: '手机号码格式不正确', trigger: 'blur' }
                ],
                code: [
                    { required: true, min: 6, message: '请输入验证码', trigger: 'blur' },
                    { min: 6, message: '验证码格式不正确', trigger: 'blur' }
                ],
                userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
                // password: [
                //     { required: true, message: '请输入密码', trigger: 'blur' },
                //     { min: 8, max: 12, message: '密码为（8-12位）', trigger: 'blur' }
                // ]
            },
            // 登录按钮状态
            submitButtonLoginStatus: false,
            // 发送验证码时间
            maxSendTime: 60,
            // 倒计时
            sendPhoneCodecountDown: -1,
            // 倒计时计时器
            countDownTimer: null,
            // 发送验证码请求状态
            sendPhoneCodeLoadingStatus: false,
            // 协议显示状态
            agreementVisible: false
        };
    },
    computed: {
        // 用户手机号状态
        userPhoneStatus() {
            return !isPhone(this.registerForm.phone) || this.sendPhoneCodecountDown > 0;
        },
        // 按钮禁用状态
        submitButtonStatus() {
            return (
                !isPhone(this.registerForm.phone) ||
                !/\d{6}/.test(this.registerForm.code) ||
                !this.registerForm.userName ||
                !/^.{8,12}$/.test(this.registerForm.password)
            );
        }
    },
    created() {
        if (this.$store.getters['sendPhoneCode/getCountDown']()) {
            this.sendPhoneCodecountDown = this.$store.getters['sendPhoneCode/getCountDown']();
            if (this.sendPhoneCodecountDown > this.maxSendTime) {
                this.sendPhoneCodecountDown = -1;
            }
            if (this.sendPhoneCodecountDown !== -1) {
                this.sendPhoneCodecountDown = this.maxSendTime - this.sendPhoneCodecountDown;
            }
            if (this.sendPhoneCodecountDown > 0) {
                this.startCountDown();
            }
        }
    },
    mounted() {
        this.$refs.userLoginForm.resetFields();
    },
    destroyed() {
        this.countDownTimer && clearInterval(this.countDownTimer);
    },
    methods: {
        // 发送验证码
        async sendPhoneCode() {
            this.sendPhoneCodeLoadingStatus = true;
            const status = await this.$store.dispatch('sendPhoneCode/sendPhoneCode', {
                phone: this.registerForm.phone
            });
            this.sendPhoneCodeLoadingStatus = false;
            if (!status) return false;
            this.$message.success('发送验证码成功');
            this.sendPhoneCodecountDown = this.maxSendTime;
            this.startCountDown();
        },
        // 开始倒计时
        startCountDown() {
            this.countDownTimer = setInterval(() => {
                if (this.sendPhoneCodecountDown === 1) {
                    this.sendPhoneCodecountDown = -1;
                    clearInterval(this.countDownTimer);
                    return false;
                }
                this.sendPhoneCodecountDown--;
            }, 1000);
        },
        // 同意用户协议
        setAgreementCheckbox() {
            this.agreement = true;
            this.agreementVisible = false;
        },
        // 下一步
        async handleNext() {
            if (!this.agreement) {
                this.$message.error('请先同意同意用户协议');
                return false;
            }
            this.submitButtonLoginStatus = true;
            const info = await this.$api.user.postPhoneLogin({
                phone: this.registerForm.phone,
                code: this.registerForm.code
            });
            this.submitButtonLoginStatus = false;

            if (info) {
                this.$store.commit('user/SET_ACCESS_TOKEN', info.accessToken);
                await this.$store.dispatch('user/getUserInfo');
            }
            this.$emit('next', this.registerForm);
        }
    }
};
</script>
<style scoped lang="less">
.login-form-content {
    // width: 343px;
    margin-left: -40px;
    .input-item {
        width: 343px;
        :deep(input) {
            color: @main-black;
            font-size: 14px;
        }
    }
    .phone-code-input {
        :deep(.ant-input-suffix) {
            right: 0;
        }
    }

    .send-phone-button[disabled] {
        color: @main-text-02;
    }
    .wechat {
        width: 32px;
        height: 32px;
        cursor: pointer;
    }

    .submit-button {
        width: 420px;
        margin-left: 16px;
        height: 48px;
        &.ant-btn-primary[disabled] {
            background-color: #c1e7e3;
            border-color: #c1e7e3;
            color: #fff;
        }
    }

    .agreement-text {
        width: 420px;
        line-height: 17px;
        :deep(span) {
            color: @main-text-02;
        }
        .text-color {
            color: @main-color;
        }
    }
}
</style>
