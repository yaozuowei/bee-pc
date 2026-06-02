<template>
    <bee-page>
        <!-- 搜索组件 -->
        <bee-search class="bee-search"></bee-search>

        <div class="error-box flex flex-v flex-v-c flex-r-c">
            <bee-empty :height="320" :img-url="require('@/assets/images/error.png')">
                <div>
                    <h2 class="font-16 text-color-01">访问出错</h2>
                    <p class="font-12 text-color-02">请检查网络是否已成功连接</p>
                    <!-- <p class="font-12 text-color-02">{{ code }} - {{ message }}</p> -->
                </div>
            </bee-empty>
            <div class="flex">
                <nuxt-link to="/"><a-button class="mr-8" type="primary">返回首页</a-button></nuxt-link>
            </div>
        </div>
    </bee-page>
</template>
<script>
export default {
    name: 'ErrorPage',
    components: {},
    data() {
        return {
            code: this.$route.query.code,
            message: this.$route.query.message
        };
    }
};
</script>
<style scoped lang="less">
.bee-search {
    border-bottom: 2px solid #65c3b8;
}
.error-box {
    min-height: 600px;
}
</style>
