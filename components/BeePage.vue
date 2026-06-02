<template>
    <div class="page-container">
        <div class="header-conatiner">
            <div class="bee-conatiner bee-content-width flex flex-r-b flex-v-c" style="margin: 0 auto">
                <div class="flex flex-v-c pointer" style="width: 40%" @click="toMineInfo">
                    <!-- 地理位置 -->
                    <div class="loaction flex flex-v-c ml-40 font-12">
                        <img class="mr-8" src="@/assets/images/index/loaction-icon.png" alt="" />
                        <div>{{ address || '-' }}</div>
                    </div>
                </div>
                <div style="width: 60%" class="flex flex-r-e">
                    <div class="flex mr-20">
                        <!-- 未登录 -->
                        <div v-if="!isLogin" class="flex login-box font-12" @click="tologin">
                            <div style="text-align: left">登录</div>
                            <div style="text-align: right">注册</div>
                        </div>
                        <!-- 已登录 -->
                        <div v-else class="flex font-12 login-box-y">
                            <div>您好！</div>
                            <div class="ml-12">{{ userInfo?.phone || '-' }}</div>
                            <a-popconfirm title="确认退出登录吗？" placement="bottom" @cancel.stop="() => {}" @confirm.stop="exitLogin">
                                <div class="ml-12" @click.stop="">退出</div></a-popconfirm
                            >
                        </div>
                    </div>
                    <header-right></header-right>
                </div>
            </div>
        </div>
        <slot />
        <!-- 底部 -->
        <bee-page-footer></bee-page-footer>
        <!-- 侧边 -->
        <bee-side-wrap></bee-side-wrap>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import HeaderRight from '@/pageComponents/index/header-right.vue';
import BeePageFooter from '@/components/BeePageFooter.vue';
import BeeSideWrap from '@/components/BeeSideWrap.vue';
export default {
    components: { HeaderRight, BeePageFooter, BeeSideWrap },
    props: {
        headBar: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {};
    },
    computed: {
        ...mapGetters({
            isLogin: 'isLogin'
        }),
        ...mapState({
            // 用户当前的地理位置
            address(state) {
                return state.location.address;
            },
            // 用户信息
            userInfo(state) {
                return state.user.userInfo;
            }
        })
    },
    mounted() {
        if (!this.$store.state.location.isLocation) {
            this.getLocation();
        }
    },
    methods: {
        // 获取用户当前地理位置
        getLocation() {
            const that = this;
            // eslint-disable-next-line no-undef
            const geolocation = new BMapGL.Geolocation();
            // 创建地理编码实例
            // eslint-disable-next-line no-undef
            const myGeo = new BMapGL.Geocoder();
            // 根据坐标得到地址描述
            // eslint-disable-next-line no-undef
            geolocation.getCurrentPosition(function (r) {
                // eslint-disable-next-line no-undef
                myGeo.getLocation(new BMapGL.Point(r.point.lng, r.point.lat), function (result) {
                    if (result) {
                        const res = result.addressComponents;
                        that.$store.commit('location/SET_ADDRESS_STATS', res.city + '-' + res.district);
                        that.$store.commit('location/SET_LOCATION_STATS', true);
                    }
                });
            });
        },
        // 跳转登陆页面
        tologin() {
            this.$router.push('/login/index.html');
        },
        // 退出登陆
        exitLogin() {
            this.$store.commit('user/CLEAR_USER_IFNO');
        },
        // 跳转个人中心
        toMineInfo() {
            this.$router.push('/member/info.html');
        }
    }
};
</script>
<style scoped lang="less">
.page-container {
    width: 100%;
    min-height: 100%;
}

.header-conatiner {
    width: 100%;

    background: #ffffff;
    .bee-conatiner {
        height: 40px;
        .login-box {
            div {
                width: 40px;
                height: 14px;
                color: @main-black;
                line-height: 14px;
                cursor: pointer;
                &:hover {
                    color: @main-color;
                }
            }
            div:nth-child(1) {
                border-right: solid 1px rgba(0, 8, 22, 0.12);
            }
        }
        .login-box-y {
            color: @main-black;
            div:nth-child(3) {
                cursor: pointer;
            }
            div:nth-child(3):hover {
                color: @main-color;
            }
        }
        .loaction {
            img {
                width: 16px;
                height: 16px;
                display: block;
                vertical-align: middle;
            }
            color: @main-black;
        }
    }
}
</style>
