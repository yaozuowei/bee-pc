<template>
    <div class="login-form-content flex flex-v">
        <div class="head-title mb-32 flex flex-v-c">
            <div
                class="title font-18 font-bold"
                :class="pageName === 'user' ? 'text-color' : 'text-color-01'"
                type="link"
                @click="setPageName('user')"
            >
                个人登录
            </div>
            <div class="split-border ml-24 mr-24"></div>
            <div
                class="title font-18 font-bold"
                :class="pageName === 'enterprise' ? 'text-color' : 'text-color-01'"
                type="link"
                @click="setPageName('enterprise')"
            >
                企业登录
            </div>
        </div>
        <a-form-model ref="userLoginForm" :model="loginForm" :rules="loginRules">
            <a-form-model-item prop="phone" has-feedback>
                <a-input
                    v-model="loginForm.phone"
                    class="phone-input"
                    size="large"
                    :max-length="11"
                    placeholder="请输入手机号"
                    :validate-status="''"
                >
                    <div slot="addonBefore">
                        <a-icon type="user" style="color: rgba(0, 8, 22, 0.24); width: 20px" />
                    </div>
                </a-input>
            </a-form-model-item>

            <a-row :gutter="12">
                <a-col :span="14">
                    <a-form-model-item prop="code" style="margin-bottom: 0" has-feedback>
                        <a-input
                            v-model="loginForm.code"
                            class="font-14"
                            size="large"
                            type="text"
                            :max-length="6"
                            placeholder="请输入短信验证码"
                        >
                        </a-input>
                    </a-form-model-item>
                </a-col>
                <a-col :span="10">
                    <a-button
                        class="send-phone-button"
                        :loading="sendPhoneCodeLoadingStatus"
                        type="primary"
                        ghost
                        :disabled="userPhoneStatus"
                        @click="sendPhoneCode"
                        >{{ sendPhoneCodecountDown === -1 ? '获取验证码' : `${sendPhoneCodecountDown}秒后重发` }}</a-button
                    >
                </a-col>
            </a-row>

            <a-form-model-item class="mb-16">
                <a-checkbox v-model="loginForm.remember" class="font-12 text-color-01" @change="rememberChange">记住我</a-checkbox>
            </a-form-model-item>

            <a-form-model-item>
                <a-button
                    class="submit-button font-bold"
                    type="primary"
                    html-type="submit"
                    :disabled="submitButtonStatus"
                    :loading="submitButtonLoginStatus"
                    @click="handleLogin"
                    >登录/注册</a-button
                >
                <template>
                    <!-- <div class="text-color-02 font-12">注：未注册的手机号通过验证后将自动注册</div> -->
                    <div class="flex flex-r-e" style="line-height: 20px">
                        <a-checkbox v-model="agreement" class="agreement-text mt-12 font-12"
                            >我已阅读并同意<span class="text-color" @click.prevent="agreementVisible = true">《小蜜蜂用户服务协议》</span
                            >相关内容，提交即代表你同意并认可协议条款和内容
                        </a-checkbox>
                    </div>

                    <!-- <div class="flex flex-v-c">
                        <div class="font-14 text-color-01">第三方：</div>
                        <img class="wechat" src="@/assets/images/wechat.png" alt="" />
                    </div> -->
                </template>
                <template v-if="pageName === 'enterprise'">
                    <nuxt-link class="flex flex-v-c" to="/login/company-register.html">
                        <a-icon type="user" style="width: 20px" />
                        <div>立即注册</div>
                    </nuxt-link>
                </template>
            </a-form-model-item>
        </a-form-model>
        <a-modal
            title="小蜜蜂用户服务协议"
            :visible="agreementVisible"
            :width="1152"
            ok-text="同意"
            @ok="setAgreementCheckbox"
            @cancel="agreementVisible = false"
        >
            <!-- <file-text></file-text> -->
            <iframe
                frameborder="0"
                style="width: 100%; height: 500px; height: 60vh"
                src="https://www.beeliip.com/agreements/privacy-agreement.html"
            ></iframe>
        </a-modal>
    </div>
</template>

<script>
import { FormModel, Icon, Input, Checkbox, Modal } from 'ant-design-vue';

import { isPhone } from '@/utils/validation';
export default {
    name: 'LoginForm',
    components: {
        AFormModel: FormModel,
        AFormModelItem: FormModel.Item,
        AIcon: Icon,
        AInput: Input,
        ACheckbox: Checkbox,
        AModal: Modal
    },
    data() {
        return {
            // 界面名称 用户：user 企业：enterprise
            pageName: 'user',
            // 登录数据
            loginForm: {
                phone: this.$store.state.sendPhoneCode.prevPhone,
                code: '',
                remember: !!this.$store.state.sendPhoneCode.prevPhone
            },
            // 用户登录验证规则
            loginRules: {
                phone: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { validator: (rule, value) => isPhone(value), message: '手机号码格式不正确', trigger: 'blur' }
                ],
                code: [{ required: true, min: 6, message: '', trigger: 'blur' }]
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
            agreementVisible: false,
            agreement: false
        };
    },
    computed: {
        // 用户手机号状态
        userPhoneStatus() {
            return !isPhone(this.loginForm.phone) || this.sendPhoneCodecountDown > 0;
        },
        // 按钮禁用状态
        submitButtonStatus() {
            return !isPhone(this.loginForm.phone) || !/\d{6}/.test(this.loginForm.code);
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
        /**
         * 切换企业登录与个人登录
         * @param {*} name 用户：user 企业：enterprise
         */
        setPageName(name) {
            this.$refs.userLoginForm.resetFields();
            this.pageName = name;
        },
        // 发送验证码
        async sendPhoneCode() {
            this.sendPhoneCodeLoadingStatus = true;
            const status = await this.$store.dispatch('sendPhoneCode/sendPhoneCode', {
                phone: this.loginForm.phone
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
        rememberChange() {
            this.$store.commit('sendPhoneCode/SET_PREV_PHONE', this.loginForm.remember ? this.loginForm.phone : '');
        },
        // 手机登录
        handleLogin() {
            if (!this.agreement) {
                this.$message.error('请先同意同意用户协议');
                return false;
            }
            this.submitButtonLoginStatus = true;
            this.$api.user
                .postPhoneLogin({
                    phone: this.loginForm.phone,
                    code: this.loginForm.code
                })
                .then(async (info) => {
                    this.submitButtonLoginStatus = false;

                    if (info) {
                        this.$message.success('登录成功,跳转中...');
                        this.$store.commit('user/SET_ACCESS_TOKEN', info.accessToken);
                        await this.$store.dispatch('user/getUserInfo');
                        this.$router.push({
                            path: this.$router.currentRoute.query.from ? this.$router.currentRoute.query.from : '/'
                        });
                    }
                })
                .catch(() => {
                    this.submitButtonLoginStatus = false;
                });
        }
    }
};
</script>
<style scoped lang="less">
.login-form-content {
    background: #ffffff;
    width: 384px;
    // min-height: 400px;
    min-height: 370px;
    border-radius: 4px;
    padding: 32px 32px 0;
    .head-title {
        margin: 0 auto;
        line-height: 1em;

        .split-border {
            width: 1px;
            height: 16px;
            background: rgba(0, 8, 22, 0.12);
            opacity: 1;
        }
        .title {
            cursor: pointer;
        }
    }

    .phone-input {
        :deep(input) {
            font-size: 14px;
        }
        :deep(.ant-input-group-addon) {
            background-color: rgba(0, 8, 22, 0.04);
        }
    }

    .send-phone-button {
        height: 40px;
        width: 100%;
        // color: #fff;
        &:disabled {
            color: @main-text-01;
            background: rgba(0, 8, 22, 0.04);
            border: 1px solid rgba(0, 8, 22, 0.12);
        }
    }

    .submit-button {
        width: 100%;
        height: 48px;
        &.ant-btn-primary[disabled] {
            background-color: #c1e7e3;
            border-color: #c1e7e3;
            color: #fff;
        }
    }

    .wechat {
        width: 32px;
        height: 32px;
        cursor: pointer;
    }
}
</style>
