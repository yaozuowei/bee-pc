<!--商品详情-->
<template>
    <div class="flex flex-v flex-v-c">
        <bee-page>
            <!-- 搜索组件 -->
            <bee-search>
                <!-- tab切换 -->
                <bee-tab :current="0"></bee-tab>
            </bee-search>
            <div class="line" style="margin-bottom: 60px"></div>
            <div class="bee-content-width" style="margin: 0 auto">
                <!-- <bee-breadcrumb class="mt-32 mb-8" :items="breadcrumbData" /> -->
                <div class="flex flex-r-b" style="margin-bottom: 48px">
                    <!--左边图片 -->
                    <div class="con-left">
                        <client-only>
                            <product-img
                                :is-collect="detailData.isCollect"
                                :img-list="mainImgList"
                                :spec-img-data="specImgData"
                                @collectFun="collectFun"
                            ></product-img>
                        </client-only>
                    </div>
                    <!-- 右边内容区域 -->
                    <div class="con-right">
                        <!-- 标题 -->
                        <div class="font-18 text-color-black font-bold line-1 mb-24">{{ title || '-' }}</div>
                        <!-- 活动倒计时 -->
                        <div v-if="skuInfo.isActivities" class="activity-box flex flex-r-b flex-v-c">
                            <div class="font-16 font-bold flex flex-v-c">
                                <img src="../../../../assets/images/sveglia-icon.png" class="mr-12" alt="" />
                                限时秒杀
                            </div>
                            <div>
                                <bee-down-time
                                    v-if="skuInfo.isActivities"
                                    :time="isStart.timestamp"
                                    :tag-name="isStart.text"
                                ></bee-down-time>
                            </div>
                        </div>

                        <!-- 价格 -->
                        <div class="mb-16">
                            <detail-price :price-data="priceData"></detail-price>
                        </div>
                        <!-- 商品信息 -->
                        <div class="mb-16">
                            <detail-product-info :sku-info="skuInfo" :unit="detailData.unit"></detail-product-info>
                        </div>
                        <!-- 商品规格 -->
                        <div class="mb-16">
                            <detail-spec :popup-data="popupData" @selectSpec="selectSpec"></detail-spec>
                        </div>
                        <!-- 支付方式or商品服务 -->
                        <div class="mb-16">
                            <detail-pay-info></detail-pay-info>
                        </div>
                        <!-- 底部操作按钮 -->
                        <div>
                            <detail-btn :sku-info="skuInfo" :is-click-btn="isClickBtn"></detail-btn>
                        </div>
                    </div>
                </div>
                <!-- 底部内容 -->
                <div class="flex flex-r-b">
                    <!-- 底部左侧 相似商品 -->
                    <div class="footer-left">
                        <detail-similar-pruduct :list="similaritySkuList"></detail-similar-pruduct>
                    </div>
                    <!-- 底部右侧 -->
                    <div class="footer-right">
                        <!-- 商品介绍 -->
                        <detail-product-desc :detail-data="detailData" style="margin-bottom: 60px"></detail-product-desc>
                        <!-- 为你推荐 -->
                        <detail-recommended :hw-list="hwList"></detail-recommended>
                    </div>
                </div>
            </div>
            <!-- {{ popupData }} -->
            <bee-mod-service :top="74"></bee-mod-service>
            <a-back-top />
        </bee-page>
    </div>
</template>

<script>
import moment from 'moment';
import productImg from '@/pageComponents/productDetail/product-img.vue';
import detailPrice from '@/pageComponents/productDetail/detail-price.vue';
import detailProductInfo from '@/pageComponents/productDetail/detail-product-info.vue';
import detailSpec from '@/pageComponents/productDetail/detail-spec.vue';
import detailPayInfo from '@/pageComponents/productDetail/detail-pay-info.vue';
import detailBtn from '@/pageComponents/productDetail/detail-btn.vue';
import detailSimilarPruduct from '@/pageComponents/productDetail/detail-similar-pruduct.vue';
import detailProductDesc from '@/pageComponents/productDetail/detail-product-desc.vue';
import detailRecommended from '@/pageComponents/productDetail/detail-recommended.vue';
import BeeDownTime from '@/components/BeeDownTime.vue';
export default {
    name: 'ProductDetail',
    components: {
        productImg,
        detailPrice,
        detailProductInfo,
        detailSpec,
        detailPayInfo,
        detailBtn,
        detailSimilarPruduct,
        detailProductDesc,
        detailRecommended,
        BeeDownTime
    },
    props: {},
    async asyncData({ $axios, isDev, $api, route, store, env, params, query, req, res, redirect, error }) {
        // 获取sku商品详情
        let content;
        const paramsData = params;
        const cityName = store.state.location.address.split('-') || '';
        if (paramsData) {
            // 获取sku详情
            if (paramsData.type === '1') {
                content = await $api.product.getProductSkuDetailApi(paramsData.id);
            } else if (paramsData.type === '2') {
                // 获取spu详情
                content = await $api.product.getProductSpuDetailApi(paramsData.id);
            } else if (paramsData.type === '3') {
                // 获取 活动商品sku详情
                const res = await $api.product.getActProductSkuDetailApi({
                    activityId: query.activityId,
                    skuId: paramsData.id,
                    positioning: cityName
                });
                content = res.productDetailVO;
            }
        }
        // 获取为你推荐商品
        const { hwList } = await $api.product.recommendProductApi({ type: 'HW' });
        return {
            detailData: content,
            priceData: {
                price: (content.currentSku ? content.currentSku.price : content.price) || '0.0',
                marketPrice: (content.currentSku ? content.currentSku.marketPrice : content.marketPrice) || '0.0',
                outputPrice: content.currentSku?.outputPrice || 0
            },
            title: (content.currentSku ? content.currentSku.title : content.title) || '-',
            skuInfo: {
                stock: (content.currentSku ? content.currentSku.stock : 0) || 0,
                buyMinQuantity: (content.currentSku ? content.currentSku.buyMinQuantity : content.buyMinQuantity) || 0,
                skuId: content.currentSku ? content.currentSku.id : content.id,
                brandName: content.brandName || '-',
                producingArea: content.producingArea || '-',
                deliveryCycle: content.deliveryCycle,
                limitAmount: (content.currentSku ? content.currentSku.limitAmount : content.limitAmount) || null,
                isActivities: content.currentSku?.isActivities || false,
                activitiesVO: content.currentSku?.activitiesVO || null
            },
            hwList: hwList || [],
            activityId: query.activityId,
            similaritySkuList: content.similaritySkuList || [] // 相似商品
        };
    },
    data() {
        return {
            detailData: null, // 商品详情数据
            specImgData: null, // 选择规格后的imgid,
            priceData: {
                price: 0.0,
                marketPrice: 0.0
            }, // 商品价格
            title: '-', // 商品名称
            skuInfo: {
                stock: 0, // 库存
                buyMinQuantity: 0, // 起订量
                skuId: null, // skuId
                brandName: '-', // 品牌名称
                producingArea: '-', // 发货地
                deliveryCycle: '-', // 发货周期
                limitAmount: null, // 限购数量
                isActivities: false, // 是否是活动商品
                activitiesVO: null // 商品活动信息
            },
            hwList: [], // 为你推荐商品
            activityId: '',
            breadcrumbData: [
                {
                    name: '首页',
                    path: '/'
                },
                {
                    name: '场景故事',
                    path: '/scene/index.html'
                },
                {
                    name: 's'
                }
            ],
            similaritySkuList: [],
            isClickBtn: true
        };
    },
    computed: {
        // 主图or视频合并
        mainImgList() {
            if (!this.detailData || !this.detailData?.mainImgList || !this.detailData?.mainVideoList) return [];
            return [...this.detailData.mainVideoList, ...this.detailData.mainImgList];
        },
        // 活动倒计时相关
        isStart() {
            if (!this.skuInfo.isActivities && !this.skuInfo.activitiesVO)
                return {
                    text: '',
                    timestamp: ''
                };
            // 活动相关的信息
            const data = this.skuInfo.activitiesVO;
            const nowDate = moment().format('YYYY-MM-DD HH:mm:ss');
            const startTime = data.startTime;
            const endTime = data.endTime;
            if (nowDate > startTime) {
                return {
                    text: '距结束还剩',
                    timestamp: moment(endTime).format('x')
                };
            } else {
                return {
                    text: '距开始还剩',
                    timestamp: moment(startTime).format('x')
                };
            }
        },
        popupData() {
            const specifications = this.detailData.specList.map((item) => {
                const skuList = item.options.map((v) => {
                    return v.value;
                });
                return {
                    skuName: item.label,
                    id: item.id,
                    skuList
                };
            });
            const combinations = this.detailData.skuList.map((item, index) => {
                const skuArr = item.specMap.map((v2) => {
                    return v2.value;
                });
                const skuImage = item.imageDefault;
                const skuPrice = item.price;
                const skuStock = item.stock;
                return {
                    skuId: item.id,
                    skuValue: skuArr.join(),
                    skuImage,
                    // skuImage,
                    skuPrice,
                    skuStock,
                    title: item.title,
                    buyMinQuantity: item.buyMinQuantity,
                    marketPrice: item.marketPrice,
                    costPrice: item.costPrice,
                    outputPrice: item?.outputPrice || 0, // 不含税价格
                    isActivities: item.isActivities, // 是否是活动商品
                    markeingData: this.markeingData,
                    limitAmount: item.limitAmount, // 限购数量
                    activitiesVO: item.activitiesVO // 活动信息
                };
            });
            // 设置默认的选项
            const selectedIndex = combinations.findIndex((item) => item.skuId === this.detailData.currentSku.id);
            return {
                specifications,
                combinations,
                selectedIndex
            };
        }
    },
    created() {
        console.log(this.detailData, 'detailData');
    },
    methods: {
        // 选择规格后的一些操作
        selectSpec({ skuData }) {
            if (!skuData) {
                this.isClickBtn = false;
                return;
            }
            this.isClickBtn = true;
            // 选择规格后显示对应的sku图片
            this.specImgData = skuData.skuImage;
            // 选择规格后的价格
            this.priceData.price = skuData.skuPrice || 0.0;
            this.priceData.marketPrice = skuData.marketPrice || 0.0;
            // 选择规格后一些sku数据
            this.title = skuData.title || '-';
            this.skuInfo.stock = skuData.skuStock || 0;
            this.skuInfo.buyMinQuantity = skuData.buyMinQuantity || 0;
            this.skuInfo.skuId = skuData.skuId;
            this.skuInfo.limitAmount = skuData.limitAmount || null;
            this.skuInfo.isActivities = skuData.isActivities;
            this.skuInfo.activitiesVO = skuData.activitiesVO;
        },
        // 收藏商品
        collectFun() {
            this.$verifyLogin(async () => {
                if (!this.detailData.isCollect) {
                    await this.$api.product.collectProductApi({ cartProductIds: [this.detailData.id] });
                } else {
                    await this.$api.product.cancelCollectProductApi({ cartProductIds: [this.detailData.id] });
                }
                this.detailData.isCollect = !this.detailData.isCollect;
            });
        }
    }
};
</script>
<style lang="less">
.line {
    width: 100%;
    height: 2px;
    background: #65c3b8;
}
.con-left {
    width: 350px;
}
.con-right {
    width: 778px;
}
.footer-left {
    width: 234px;
}
.footer-right {
    width: 894px;
}
.activity-box {
    color: white;
    width: 778px;
    height: 48px;
    background: linear-gradient(302deg, #ea5732 0%, #ef895e 100%);
    padding: 0 24px;
    box-sizing: border-box;
    img {
        width: 20px;
        height: 20px;
        display: block;
    }
}
</style>
