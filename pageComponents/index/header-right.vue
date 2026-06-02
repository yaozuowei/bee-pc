<!--顶部组件右侧-->
<template>
    <div class="container flex flex-v-c">
        <!-- <div> -->
        <!-- <a-popover placement="bottom">
            <template #content>
                <p>Content</p>
                <p>Content</p>
            </template> -->
        <!-- <div class="nav-box flex flex-v-c">我的小蜜蜂 <img class="ml-4" src="@/assets/images/arrow-bottom.png" alt="" /></div> -->
        <!-- </a-popover> -->
        <!-- <a-popover placement="bottom">
            <template #content>
                <p>Content</p>
                <p>Content</p>
            </template> -->
        <!-- <div class="nav-box flex flex-v-c ml-8">商家服务 <img class="ml-4" src="@/assets/images/arrow-bottom.png" alt="" /></div> -->
        <!-- </a-popover> -->
        <!-- <a-popover placement="bottom">
            <template #content>
                <p>Content</p>
                <p>Content</p>
            </template> -->
        <!-- <div class="nav-box flex flex-v-c ml-8">消息中心 <img class="ml-4" src="@/assets/images/arrow-bottom.png" alt="" /></div> -->
        <!-- </a-popover> -->
        <!-- <a-popover placement="bottom">
            <template #content>
                <p>Content</p>
                <p>Content</p>
            </template> -->
        <!-- <div class="nav-box flex flex-v-c ml-8">帮助中心 <img class="ml-4" src="@/assets/images/arrow-bottom.png" alt="" /></div> -->
        <!-- </a-popover> -->
        <!-- <a-popover placement="bottom">
            <template #content>
                <p>Content</p>
                <p>Content</p>
            </template> -->
        <!-- <div class="nav-box flex flex-v-c ml-8">网站导航 <img class="ml-4" src="@/assets/images/arrow-bottom.png" alt="" /></div> -->
        <!-- </a-popover> -->
        <!-- <div class="nav-box flex flex-v-c ml-8"><img class="mr-4" src="@/assets/images/index/phone-icon.png" alt="" />手机小蜜蜂</div> -->
        <div class="nav-box flex flex-v-c ml-8">客服电话：4001848678</div>
        <!-- </div> -->
    </div>
</template>
<style scoped lang="less">
.nav-box {
    font-size: 12px;
    color: @main-black;
    height: 14px;
    border-right: solid 1px rgba(0, 8, 22, 0.12);
    padding-right: 8px;
    box-sizing: border-box;
    img {
        width: 16px;
        height: 16px;
        vertical-align: middle;
    }
    cursor: pointer;
    &:hover {
        color: @main-color;
    }
}
.nav-box:last-child {
    border-right: none;
    color: @main-color;
    cursor: pointer;
}
</style>
