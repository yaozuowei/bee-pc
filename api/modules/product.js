export default ($axios) => {
    return {
        /**
         * 获取首页数据
         * @param {*} data
         * @returns data: true
         */
        getIndexData: (params) => $axios.get('/pc/main/index', { params }),
        /**
         * 获取商品
         * @param {*} data
         * @returns data: true
         */
        getMallProductApi: (data) => $axios.post('/pc/main/product/list', data),
        /**
         * 获取最新商品
         * @param {*} data
         * @returns data: true
         */
        getMallNewProductApi: (data) => $axios.post('/pc/main/new/product/list', data),
        /**
         * sku商品详情
         * @param {*} skuId
         * @returns
         */
        getProductSkuDetailApi: (skuId) => $axios.get(`/pc/main/skus/${skuId}`),
        /**
         * 活动sku商品详情
         * @param {*} params
         * @returns
         */
        getActProductSkuDetailApi: (params) => $axios.get(`/pc/activities/skus/detail`, { params }),
        /**
         * spu商品详情
         * @param {*} spuId
         * @returns
         */
        getProductSpuDetailApi: (spuId) => $axios.get(`/pc/main/product/${spuId}`),
        /**
         * 搜索关键字模糊
         * @param {*} productName
         * @returns
         */
        getSearchVagueApi: (productName) => $axios.get(`/pc/main/product/name/${productName}`),
        /**
         * 获取精品推荐的商品
         * @param {*} data
         * @returns
         */
        getBoutiqueProductApi: (data) => $axios.post(`/pc/main/skus/ads`, data),
        /**
         * 获取活动商品活动列表
         * @param {*} data
         * @returns
         */
        getActivitiestListApi: (data) => $axios.post(`/pc/activities/skus`, data),
        /**
         * 单个商品添加收藏
         * @param {*} data
         * @returns
         */
        collectProductApi: (data) => $axios.post(`/private/pc/collect`, data),
        /**
         * 单个商品取消收藏
         * @param {*} data
         * @returns
         */
        cancelCollectProductApi: (data) => $axios.delete(`/private/pc/collect/cancel`, { data }),
        /**
         * 为你推荐商品
         * @param {*} data
         * @returns
         */
        recommendProductApi: (data) => $axios.post(`/pc/main/skus/ads/hw`, data)
    };
};
