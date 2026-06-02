<!--登录信息展示-->
<template>
    <div class="login-info-box p-16">
        <div class="flex" @click="toInfo">
            <div class="head">
                <bee-img :src="userInfo?.headimg || ''"></bee-img>
                <!-- 企业用户展示标签 -->
                <div v-if="epStatus === 1" class="qiye-tag">企业用户</div>
            </div>
            <div class="info text-l flex flex-v">
                <div class="font-14 text-color font-bold">Hi，欢迎您！</div>
                <div v-if="!isLogin" class="font-12 text-color-01">快去登录开始购买！</div>
                <div v-else class="font-12 text-color-01">{{ userInfo?.phone || '-' }}</div>
            </div>
        </div>
        <!-- 注册/登录 -->
        <div v-if="!isLogin" class="btn-groups" @click="toLogin">
            <a-button type="primary"> 注册 </a-button>
            <a-button> 登录 </a-button>
        </div>
        <!-- 未进行企业注册展示 -->
        <div v-if="epStatus === 2 || epStatus === 3" class="no-reigter flex flex-v-c flex-r-c" @click="toRegister">
            {{ epStatus === 3 ? '正在审核您的企业认证申请' : '还未进行企业认证,去认证'
            }}<img v-if="epStatus === 2" src="@/assets/images/index/mine/arrow-enterprise.png" class="ml-4" alt="" />
        </div>
    </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex';
export default {
    data() {
        return {};
    },
    computed: {
        ...mapGetters({
            isLogin: 'isLogin'
        }),
        ...mapState({
            // 用户信息
            userInfo(state) {
                return state.user.userInfo;
            }
        }),
        // 企业用户注册状态
        epStatus() {
            const userData = this.$store.state.user.userInfo;
            let status = 1;
            if (!userData) return 2;
            if (userData.isAuth) {
                // 审核通过
                status = 1;
            } else if (!userData.companyAuth) {
                // 未填写信息
                status = 2;
            } else if (userData.companyAuth.status === 2) {
                status = 2;
            } else {
                // 审核中
                status = 3;
            }
            return status;
        }
    },
    created() {
        // this.$store.dispatch('user/getUserInfo');
    },
    methods: {
        toInfo() {
            this.$router.push('/member/info.html');
        },
        // 去登陆
        toLogin() {
            this.$router.push('/login/index.html');
        },
        // 去认证
        toRegister() {
            if (this.epStatus === 3) {
                this.$message.error('正在审核中，请耐心等待');
                return;
            }
            this.$router.push('/login/company-register.html');
        }
    }
};
</script>
<style lang="less" scoped>
.login-info-box {
    width: 208px;
    min-height: 83px;
    border-radius: 8px;
    opacity: 1;
    border: 1px solid rgba(0, 8, 22, 0.08);
    cursor: pointer;
    .head {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        margin-right: 12px;
        position: relative;
        overflow: hidden;
        .qiye-tag {
            height: 18px;
            background: #e5bc73;
            border-radius: 4px;
            font-size: 12px;
            color: #ffffff;
            text-align: center;
            line-height: 18px;
            padding: 0 5px;
            position: absolute;
            top: 33px;
            left: -3px;
        }
    }
    .info {
        justify-content: space-around;
    }
    .btn-groups {
        margin-top: 13px;
        .ant-btn {
            width: 66px;
            height: 24px;
            font-size: 12px;
        }
        .ant-btn:nth-child(2) {
            color: @main-color;
            border-color: @main-color;
            margin-left: 8px;
        }
    }
    .no-reigter {
        width: 176rpx;
        height: 27px;
        background: rgba(253, 175, 18, 0.1);
        border-radius: 4px;
        font-size: 12px;
        color: #fdaf12;

        margin-top: 13px;
        &:active {
            opacity: 0.5;
        }
        img {
            width: 15px;
            height: 15px;
            display: block;
            margin-top: -1px;
        }
    }
}
</style>
