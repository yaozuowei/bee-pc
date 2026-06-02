<!--商品介绍-->
<template>
    <div class="desc-box">
        <div class="title mb-24">
            <div class="title-text font-14 font-bold text-color">商品介绍</div>
        </div>
        <div class="desc-box flex flex-w mb-24">
            <div v-for="(item, index) in list" :key="index" class="desc-item font-12 text-color-01 mr-40">
                {{ item.name }}：<span class="text-color-black">{{ item.value }}</span>
            </div>
        </div>
        <!-- 视频展示 -->
        <div v-if="detailData.detailVideoList.length" class="mb-24">
            <video v-for="(item, index) in detailData.detailVideoList" :key="index" width="100%" height="300" controls>
                <source :src="item.url" type="video/mp4" />
                您的浏览器不支持 video 标签。
            </video>
        </div>
        <!-- 图片展示 -->
        <div class="mb-24">
            <div v-for="(item, index) in detailData.detailImgList" :key="index" class="product-img">
                <img :src="item.url" alt="图片找不到啦" />
            </div>
        </div>
        <!-- 文字描述 -->
        <div v-if="detailData.detail.detailMobile" class="product-text font-16 text-color-02">{{ detailData.detail.detailMobile }}</div>
        <div class="line"></div>
        <!-- 提示 -->
        <div class="product-tip flex flex-v-c">
            <div class="product-tip-left">温馨提示</div>
            <div class="product-tip-con ml-12">
                <div>尊敬的客户：</div>
                <div>如果您需要的产品不在上架的商品中，请拨打客服电话！我们会尽最大的努力帮您完成采购!</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        detailData: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            list: [
                {
                    name: '单位',
                    value: '-'
                },
                {
                    name: '是否标品',
                    value: '-'
                },
                {
                    name: '分类',
                    value: '-'
                },
                {
                    name: '账期',
                    value: '-'
                }
            ]
        };
    },
    watch: {
        detailData: {
            handler() {
                this.list[0].value = this.detailData.unit || '无';
                this.list[1].value = this.detailData.isStandard ? '是' : '否';
                this.list[2].value = (this.detailData.catName1 || '-') + '/' + (this.detailData.catName2 || '-');
                this.list[3].value = this.detailData.isUsedCycle ? '是' : '否';
                // 增加商品属性展示
                if (this.detailData.currentSku?.attributeList && this.detailData.currentSku.attributeList.length) {
                    const arr = this.detailData.currentSku.attributeList;
                    arr.forEach((e) => {
                        this.list.push({
                            name: e.attributeName || '-',
                            value: e.attributeValue || '-'
                        });
                    });
                }
            },
            immediate: true,
            deep: true
        }
    }
};
</script>
<style lang="less" scoped>
.line {
    width: 894px;
    height: 1px;
    background: rgba(0, 8, 22, 0.08);
    margin: 32px 0;
}
.title {
    width: 894px;
    height: 42px;
    background: rgba(0, 8, 22, 0.04);
    border-radius: 4px;
    .title-text {
        width: 132px;
        height: 42px;
        padding-left: 38px;
        line-height: 42px;
        border-bottom: solid 2px @main-color;
    }
}
.desc-item:nth-child(1) {
    margin-left: 0 !important;
}
.product-img {
    width: 894px;
    border-radius: 8px;
    img {
        width: 100%;
    }
}
.product-tip {
    width: 894px;
    height: 81px;
    background: rgba(250, 172, 51, 0.1);
    border-radius: 8px;
    padding: 0 24px;
    .product-tip-left {
        width: 52px;
        height: 52px;
        border: 1px solid #faac33;
        text-align: center;
        border-radius: 50%;
        font-size: 12px;
        font-weight: bold;
        color: #faac33;
        padding: 0 8px;
        display: flex;
        align-items: center;
    }
    .product-tip-con {
        font-size: 12px;
        color: #faac33;
    }
}
</style>
