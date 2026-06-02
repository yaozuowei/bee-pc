<template>
    <div class="menu-box">
        <div class="header font-16 text-color-black text-c">个人中心</div>
        <div class="menu-list flex flex-v flex-r-c flex-v-c pt-24">
            <div v-for="item in menu" :key="item.href" class="mb-24">
                <nuxt-link
                    :class="{
                        'text-color-black': item.href !== path
                    }"
                    :to="item.href"
                    >{{ item.name }}</nuxt-link
                >
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MemberMenu',
    data() {
        return {
            menu: [
                {
                    name: '我的订单',
                    href: '/member/order/index.html'
                },
                // {
                //     name: '我的需求',
                //     href: '/'
                // },
                {
                    name: '我的收藏',
                    href: '/member/collect.html'
                },
                // {
                //     name: '我的询价',
                //     href: '/'
                // },
                {
                    name: '地址管理',
                    href: '/member/address.html'
                },
                {
                    name: '发票管理',
                    href: '/member/invoice.html'
                },
                {
                    name: '个人信息',
                    href: '/member/info.html'
                }
            ],
            path: this.$router.currentRoute.path
        };
    }
};
</script>
<style scoped lang="less">
.menu-box {
    width: 240px;
    border-radius: 4px;
    opacity: 1;
    border: 1px solid rgba(0, 8, 22, 0.12);
    flex-shrink: 0;

    .header {
        height: 40px;
        line-height: 40px;
        background-color: #f0f0f1;
    }
}
</style>
