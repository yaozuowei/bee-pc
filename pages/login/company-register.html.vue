<template>
    <div class="page-container" :head-bar="false" size="small">
        <!-- 顶部bar -->
        <bee-simple-head :scene="statusStr"></bee-simple-head>

        <!-- 登录内容 -->
        <div class="bee-content-width page-content flex flex-v flex-v-c">
            <bee-step :current="stepCurrent" :steps="steps"></bee-step>

            <div class="form-conent flex flex-r-c">
                <transition v-if="stepCurrent >= 0 && stepCurrent <= 3" name="page" mode="out-in">
                    <component :is="getComponentName" :info="companyInfo" @prev="handlePrev" @next="handleNext"></component>
                </transition>
            </div>
        </div>

        <!-- 底部文字 -->
        <div class="flex flex-r-c">
            <login-footer class="bee-content-width"></login-footer>
        </div>
    </div>
</template>

<script type="ts">
import RegisterForm from "@/pageComponents/login/register-form";
import CompanyRegisterForm from "@/pageComponents/login/company-register-form";
import RegisterStatus from "@/pageComponents/login/register-status.vue";
import LoginFooter from "@/pageComponents/login/login-footer";

export default {
    name: 'CompanyRegister',
    ssr: false,
    components: {
        RegisterForm,
        LoginFooter,
        CompanyRegisterForm,
        RegisterStatus
    },
    async asyncData({store}) {
        let stepCurrent = 0;
        let companyInfo = {};
        if(store.getters.isLogin) {
            stepCurrent = 1;
            const info = await store.dispatch('user/getUserInfo');
            if (info && info.companyAuth) {
                companyInfo = JSON.parse(JSON.stringify(info.companyAuth));
                stepCurrent = info.companyAuth ? 2 : 1;
            }
        }

        return {
            companyInfo,
            stepCurrent
        }
    },
    data() {
        return {
            companyInfo: {},
            statusStr: 'register',
            // 步骤条
            stepCurrent: -1,
            steps: [
                '验证手机号',
                '填写企业信息',
                '提交审核'
            ],
            serverList: []
        };
    },
    computed: {
        getComponentName() {
            if (this.stepCurrent === 1) {
                return 'CompanyRegisterForm'
            } else if (this.stepCurrent === 2 ) {
                return 'RegisterStatus'
            }
            return 'RegisterForm'
        }
    },
    methods: {
        handleNext() {
            const companyInfo = this.$store.getters['user/getCompanyAuthInfo'];
            if (this.stepCurrent === 0 && companyInfo) {
                this.companyInfo = companyInfo;
                this.stepCurrent = 2;
                return false;
            }
            if (this.stepCurrent === 1) {
                this.companyInfo.status = 0;
            }
            this.stepCurrent++;
        },
        handlePrev() {
            this.stepCurrent--;
        }
    }
};
</script>
<style scoped lang="less">
.page-container {
    padding-bottom: 30px;
    .page-content {
        margin: 60px auto 0;
    }
    .bee-mod-service {
        width: 100%;
        margin: 48px auto 0;
    }
}

.form-conent {
    padding: 60px 0;
    width: 100%;
    min-height: 300px;
}
</style>
