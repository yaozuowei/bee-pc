<!--个人信息功能组件-->
<template>
    <div class="grid-box flex flex-r-b flex-w">
        <div v-for="(item, index) in minsGrids" :key="index" class="grid-item" @click="toDo(item)">
            <img :src="item.img" alt="" />
            <div>{{ item.text }}</div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            minsGrids: [
                {
                    text: '我的订单',
                    url: '/member/order/index.html', // 跳转地址
                    img: require('@/assets/images/index/mine/mine_grid_01.png')
                },
                {
                    text: '我的需求',
                    url: '', // 跳转地址
                    img: require('@/assets/images/index/mine/mine_grid_02.png')
                },
                {
                    text: '我的收藏',
                    url: '/member/collect.html', // 跳转地址
                    img: require('@/assets/images/index/mine/mine_grid_03.png')
                },
                {
                    text: '地址管理',
                    url: '/member/address.html', // 跳转地址
                    img: require('@/assets/images/index/mine/mine_grid_04.png')
                },
                {
                    text: '发票管理',
                    url: '/member/invoice.html', // 跳转地址
                    img: require('@/assets/images/index/mine/mine_grid_05.png')
                },
                {
                    text: '我的询价单',
                    url: '', // 跳转地址
                    img: require('@/assets/images/index/mine/mine_grid_06.png')
                }
            ]
        };
    },
    methods: {
        toDo(item) {
            if (!item.url) {
                this.$message.error('暂未开放');
                return;
            }
            if (this.$store.getters.isLogin) {
                this.$router.push(item.url);
            } else {
                this.$router.push('/login/index.html');
            }
        }
    }
};
</script>
<style lang="less" scoped>
.grid-item {
    font-size: 12px;
    color: #5c6471;
    text-align: center;
    width: 60px;
    margin-bottom: 12px;
    cursor: pointer;
    &:hover {
        color: @main-color;
    }
    img {
        width: 20px;
        height: 20px;
        margin-bottom: 4px;
    }
}
</style>
