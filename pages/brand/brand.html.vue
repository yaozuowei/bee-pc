<template>
    <div class="flex flex-v flex-v-c">
        <bee-page>
            <!-- 搜索组件 -->
            <bee-search>
                <!-- tab切换 -->
                <bee-tab :current="7"></bee-tab>
            </bee-search>
            <div class="line mb-16"></div>
            <div class="bee-content-width pt-20" style="margin: 0 auto">
                <h4 class="font-24 text-color-black">合作品牌</h4>
                <div class="brand-box flex flex-w">
                    <div v-for="(item, index) in brandList" :key="index">
                        <div v-if="item.fileVO" class="brand-item flex flex-v-c flex-v">
                            <div style="height: 128px; overflow: hidden" class="flex flex-v-c">
                                <bee-img width="152px" height="auto" max-height="128px" :src="item.fileVO.url"></bee-img>
                            </div>

                            <span class="text-color-black mt-4">{{ item.brandName }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </bee-page>
    </div>
</template>
<script>
export default {
    name: 'BrandCenter',
    async asyncData({ $api }) {
        const res = await $api.common.getBrandList();
        return {
            brandList: res
        };
    },
    data() {
        return {
            brandList: []
        };
    },
    created() {
        console.log(this.brandList, '22');
    }
};
</script>
<style lang="less" scoped>
.line {
    width: 100%;
    height: 2px;
    background: #65c3b8;
}
.brand-item {
    width: 230px;
    padding: 0 23px;
    margin-bottom: 40px;

    // background-color: antiquewhite;
    img {
        width: 172px;
        height: 148px;
        display: block;
    }
    font-size: 14px;
}
</style>
