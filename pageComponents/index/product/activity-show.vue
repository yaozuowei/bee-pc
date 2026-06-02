<!--活动展示组件-->
<template>
    <div class="activity-box flex flex-r-b flex-v-c" @click="toActicityList()">
        <div class="mr-12 img-box">
            <img class="img-activity" :src="itemData.imageFiles[0]" alt="丢失啦~" />
            <div class="flex flex-v-c hot-tag">
                <img src="@/assets/images/index/hot-mall.png" alt="" />{{ itemData.status | handlerStatus }}
            </div>
        </div>
        <div class="flex-1 text-l flex flex-v flex-r-b" style="height: 95px; width: 0">
            <div class="font-16 font-bold text-color-black line-1">{{ itemData.title || '-' }}</div>
            <div class="font-12 text-color-02">时间:{{ itemData.startTime || '-' }}</div>
            <div class="tag">限时限量购</div>
            <div class="font-16 font-bold price">¥{{ itemData.minPrice || '0.00' }}<span class="font-12 ml-4">起</span></div>
        </div>
    </div>
</template>
<script>
export default {
    filters: {
        // 处理活动状态
        handlerStatus(val) {
            if (val === 0) return '未开始';
            if (val === 1) return '活动中';
            if (val === 2) return '已结束';
        }
    },
    props: {
        itemData: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {};
    },

    methods: {
        // 跳转商品列表
        toActicityList() {
            this.$router.push({
                path: '/product',
                query: {
                    activityId: this.itemData.id
                }
            });
        }
    }
};
</script>
<style lang="less" scoped>
.activity-box {
    width: 279px;
    height: 143px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    padding: 24px;
    padding-right: 0px;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.2s linear;
    &:hover {
        box-shadow: 0 15px 30px rgba(0, 0, 0, 10%);
        transform: translate3d(0, -2px, 0);
    }
    .price {
        color: #fe4a4a;
        vertical-align: bottom;
    }
    .img-activity {
        width: 95px;
        height: 95px;
        border-radius: 8px;
        object-fit: cover;
    }
    .tag {
        display: inline-block;
        height: 18px;
        border-radius: 4px;
        border: 1px solid #fe4a4a;
        text-align: center;
        line-height: 18px;
        font-size: 12px;
        color: @main-red;
        padding: 0 5px;
        align-self: baseline;
        box-sizing: border-box;
    }
    .img-box {
        width: 95px;
        position: relative;
    }
    .hot-tag {
        display: flex;
        height: 18px;
        background: rgba(0, 8, 22, 0.48);
        border-radius: 58px;
        font-size: 12px;
        color: white;
        padding: 0 5px;
        position: absolute;
        top: 8px;
        left: 8px;
        img {
            width: 12px;
            height: 12px;
            display: block;
            margin-right: 2px;
        }
    }
}
</style>
