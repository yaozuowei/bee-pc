export default ($axios) => {
    return {
        /**
         * 获取行情价格列表
         * @param {*} data
         * @returns data: any[]
         */
        getQuoPriceList: (data) => $axios.post('/pc/price-batch', data),

        /**
         * 获取行情价格详情
         * @param {*} data
         * @returns data: any[]
         */
        getQuoPriceDetails: (data) => $axios.post(`/pc/price-batch/detail`, data),

        /**
         * 行情价格收藏
         * @param {*} params { id, status }
         * @returns
         */
        quoPriceCollect: (params) => $axios.get('/private/pc/price-batch/collect', { params }),

        /**
         * 行情价格点赞
         * @param {*} params  { id, status }
         * @returns
         */
        quoPriceLike: (params) => $axios.get('/private/pc/price-batch/like', { params })
    };
};
