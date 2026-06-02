export default ($axios) => {
    return {
        /**
         * 获取资讯列表
         * @param {*} data
         * @returns data: any[]
         */
        getNewsList: (params) => $axios.get('/pc/news', { params }),

        /**
         * 获取资讯详情
         * @param {*} id 详情 id
         * @returns data: any[]
         */
        getNewsDetails: (id) => $axios.get(`/pc/news/detail/${id}`),

        /**
         * 资讯收藏
         * @param {*} params { id, status }
         * @returns
         */
        newsCollect: (params) => $axios.get('/private/pc/news/collect', { params }),

        /**
         * 资讯点赞
         * @param {*} params  { id, status }
         * @returns
         */
        newsLike: (params) => $axios.get('/private/pc/news/like', { params }),

        /**
         * 我的首创资讯
         * @param {*} params  { id, status }
         * @returns
         */
        getMyCollectNews: (params) => $axios.get('/private/pc/news/myCollect/list', { params })
    };
};
