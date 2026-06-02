<!--footer-->
<template>
    <div class="container">
        <div class="footer bee-content-width">
            <div class="footer-top flex flex-r-b">
                <div class="footer-top-left flex">
                    <div v-for="(item, index) in linkList" :key="index" class="link-box" style="margin-left: 60px">
                        <div v-for="(child, y) in item.list" :key="y" class="link-item" @click="toPage(child)">
                            {{ child.text ? child.text : child }}
                        </div>
                    </div>
                </div>
                <div class="footer-top-center">
                    <div class="footer-logo flex flex-r-b mb-16">
                        <img class="mr-16" src="@/assets/images/logo/logo.png" />
                        <div class="font-14">小蜜蜂数字科技</div>
                    </div>
                    <div class="footer-desc font-12 mb-12">数字化的园林用品服务平台</div>
                    <div class="text-color-01 font-12 mb-16">工作时间：周一到周五 8:30-17:30</div>
                    <div class="font-20 text-color-black">
                        <img src="@/assets/images/index/tell-icon.png" class="mr-8" style="widht: 20px; height: 20px" />
                        4001848678
                    </div>
                </div>
                <div class="flex">
                    <div class="footer-img">
                        <img src="@/assets/images/ios.png" class="mb-16" alt="" />
                        <div class="text-color-01 font-12">iOS 下载</div>
                    </div>
                  <div class="footer-img ml-40">
                    <img src="@/assets/images/andriod.png" class="mb-16" alt="" />
                    <div class="text-color-01 font-12">Android 下载</div>
                  </div>
                  <div class="footer-img ml-40">
                    <img src="@/assets/images/whcbqhn.jpg" class="mb-16" alt="" />
                    <div class="text-color-01 font-12">微信公众号</div>
                  </div>
                    <div class="footer-img ml-40">
                        <img src="@/assets/images/applet.png" class="mb-16" alt="" />
                        <div class="text-color-01 font-12">小程序</div>
                    </div>
                </div>
            </div>
            <div class="footer-bottom text-color-01 font-12">
                <!-- <div>
                    危险化学品经营许可证 丨食品经营许可证丨非制药易制毒化学品经营备案证明丨医疗器械许可证丨互联网药品信息服务资格证书
                    丨网站地图
                </div> -->
                <!-- <div class="mt-20">Copyright©zkh. Com1998-2022 Corporation All Rights Reserved 沪 ICP 备 沪ICP备19040871号-2</div> -->
                <!-- <div class="mt-20"> -->
                <div>
                    上海市普陀区武威路88号中鑫企业广场7号楼 |
                    <a class="text-color-01" href="https://beian.miit.gov.cn/" target="_blank">沪 ICP 备 沪ICP备19040871号-2</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            linkList: [
                {
                    list: [
                        '内容中心',
                        {
                            link: '/news/index.html',
                            text: '内容资讯'
                        },
                        {
                            link: '/story/index.html',
                            text: '品牌故事'
                        }
                    ]
                },
                {
                    list: [
                        '友情合作',
                        {
                            link: '/login/company-register.html',
                            text: '企业入驻'
                        },
                        {
                            link: '/brand/brand.html',
                            text: '合作品牌'
                        }
                        // '友情链接'
                    ]
                },

                // {
                //     list: ['内容中心', '小蜜蜂大事件', '客户之声', '知识社区']
                // },
                {
                    list: [
                        '关于我们',
                        {
                            link: '/about/company-profile.html',
                            text: '公司介绍'
                        },
                        {
                            link: '/about/contact-us.html',
                            text: '联系我们'
                        }
                        // '发展历程'
                    ]
                },
                {
                    list: [
                        '意见反馈',
                        {
                            link: '/feedBack/feed-back.html',
                            text: '意见反馈'
                        }
                    ]
                }
            ]
        };
    },
    methods: {
        toPage(data) {
            if (!data.link) return;
            // 意见反馈需要做登录校验
            if (data.text === '意见反馈') {
                this.$verifyLogin(() => {
                    const routeUrl = this.$router.resolve(data.link);
                    window.open(routeUrl.href, '_blank');
                });
            } else {
                const routeUrl = this.$router.resolve(data.link);
                window.open(routeUrl.href, '_blank');
            }
        }
    }
};
</script>
<style scoped lang="less">
.container {
    height: 356px;
    background: #e2e3e5;
    .footer {
        height: 356px;
        margin: 0 auto;
        text-align: center;
        padding-top: 55px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .link-box:nth-child(1) {
            margin-left: 0 !important;
        }
        .link-item {
            color: #5c6471;
            font-size: 12px;
            text-align: left;
            margin-bottom: 12px;
        }
        .link-item:nth-child(1) {
            font-size: 16px;
            font-weight: bold;
            color: @main-black;
        }
        .link-item:not(:first-child):hover {
            color: @main-color;
            cursor: pointer;
        }
        .link-item:last-child {
            margin-bottom: 0;
        }
        .footer-top-center {
            .footer-logo {
                width: 165px;
                img {
                    width: 48px;
                    height: 48px;
                }
                div {
                    width: 0;
                    flex: 1;
                    height: 48px;
                    color: @main-black;
                    font-weight: bold;
                }
            }
            .footer-desc {
                width: 185px;
                padding-bottom: 13px;
                box-sizing: border-box;
                text-align: center;
                border-bottom: solid 1px rgba(0, 8, 22, 0.04);
                color: @main-black;
            }
        }
        .footer-img {
            width: 92px;
            height: 92px;
            img {
                width: 100%;
                height: 92px;
                display: block;
            }
        }
        .footer-bottom {
            border-top: solid 1px rgba(0, 8, 22, 0.04);
            // padding: 24px 0 38px 0;
            padding: 24px 0;
            box-sizing: border-box;
        }
    }
}
</style>
