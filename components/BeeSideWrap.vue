<!-- 侧边栏组件  -->
<template>
    <div class="side-wrap">
        <div
            v-for="(item, index) in sideWrapList"
            :key="index"
            class="side-wrap-item flex flex-v flex-v-c flex-r-c font-12 text-color-01 pointer mb-12"
            @mouseenter="
                (e) => {
                    mouseenterFun(item, index);
                }
            "
            @mouseleave="
                (e) => {
                    mouseleaveFun(item, index);
                }
            "
            @click="toDo(item)"
        >
            <img :src="item.defaultImg" alt="" />
            {{ item.text }}
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            sideWrapList: [
                {
                    text: '我的',
                    defaultImg: require('@/assets/images/sideWrap/mine.png'),
                    img: require('@/assets/images/sideWrap/mine.png'),
                    imgSelect: require('@/assets/images/sideWrap/mine-select.png'),
                    url: '/member/info.html'
                },
                {
                    text: '购物车',
                    defaultImg: require('@/assets/images/sideWrap/cart.png'),
                    img: require('@/assets/images/sideWrap/cart.png'),
                    imgSelect: require('@/assets/images/sideWrap/cart-select.png'),
                    url: '/cart/cart.html'
                },
                {
                    text: '反馈',
                    defaultImg: require('@/assets/images/sideWrap/feed-back.png'),
                    img: require('@/assets/images/sideWrap/feed-back.png'),
                    imgSelect: require('@/assets/images/sideWrap/feed-back-select.png'),
                    url: '/feedBack/feed-back.html'
                }
            ]
        };
    },
    methods: {
        mouseenterFun(item, index) {
            this.sideWrapList[index].defaultImg = item.imgSelect;
        },
        mouseleaveFun(item, index) {
            this.sideWrapList[index].defaultImg = item.img;
        },
        // 跳转
        toDo(item) {
            this.$verifyLogin(() => {
                const routeUrl = this.$router.resolve(item.url);
                window.open(routeUrl.href, '_blank');
            });
        }
    }
};
</script>
<style lang="less" scoped>
.side-wrap {
    position: fixed;
    top: 50%;
    right: 24px;
    z-index: 99;
    .side-wrap-item {
        width: 52px;
        height: 52px;
        background: #ffffff;
        border-radius: 4px;
        box-shadow: 0 0 5px 3px rgba(86, 86, 93, 0.06);
        img {
            width: 20px;
            height: 20px;
            margin-bottom: 2px;
        }
        &:hover {
            background: #65c3b8;
            color: white;
        }
    }
}
</style>
