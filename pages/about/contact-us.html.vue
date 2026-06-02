<template>
    <div class="bee-page-container">
        <bee-simple-head>
            <div class="flex flex-r-c">
                <nuxt-link to="/about/company-profile.html" class="text-color-black font-14">介绍我们</nuxt-link>
                <nuxt-link to="/about/contact-us.html" class="ml-24 text-color font-14">联系我们</nuxt-link>
            </div>
        </bee-simple-head>

        <div class="content-box flex flex-r-c">
            <div class="bee-content-width">
                <h1 class="text-color-black font-40">联系我们</h1>
                <p class="font-16 font-color-black">如果对我们有问题及建议，您可以通过如下方式联系我们</p>
                <div class="item-box flex flex-v-c">
                    <img class="icon mr-24" src="@/assets/images/contact-e-mail.png" />
                    <div class="font-24 font-color-black">商务合作邮箱：beesc_open@163.com</div>
                </div>
                <div class="item-box flex flex-v-c">
                    <img class="icon mr-24" src="@/assets/images/contact-tel.png" />
                    <div class="font-24 font-color-black">联系电话：4001848678</div>
                </div>
                <div class="item-box flex flex-v-c">
                    <img class="icon mr-24" src="@/assets/images/contact-wechat.png" />
                    <div class="font-24 font-color-black">微信公众号：小蜜蜂网</div>
                </div>
                <div class="item-box flex flex-r-c">
                    <div class="img-box flex flex-v flex-v-c flex-r-c">
                        <img src="@/assets/images/whcbqhn.jpg" class="mb-16" alt="" />
                        <div class="text-color-01 font-12">微信公众号</div>
                    </div>
                    <div class="img-box flex flex-v flex-v-c flex-r-c ml-40">
                        <img src="@/assets/images/applet.png" class="mb-16" alt="" />
                        <div class="text-color-01 font-12">小蜜蜂园林产业互联网平台</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'CompanyProfile'
};
</script>
<style scoped lang="less">
.content-box {
    // padding-top: 80px;
    padding: 40px 0;
    .icon {
        width: 48px;
        height: 48px;
    }
    .item-box {
        margin-top: 48px;
    }
    .img-box {
        width: 148px;
        height: 148px;
        img {
            width: 100%;
            height: 148px;
            display: block;
        }
    }
}
</style>
