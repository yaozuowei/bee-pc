export default ($axios) => {
    return {
        /**
         * 获取品牌故事列表
         * @param {*} data
         * @returns data: any[]
         */
        getStoryList: (params) => $axios.get('/pc/case', { params }),

        /**
         * 获取品牌故事详情
         * @param {*} id 详情 id
         * @returns data: any[]
         */
        getStoryDetails: (id) => $axios.get(`/pc/case/detail/${id}`),

        /**
         * 故事收藏
         * @param {*} params { id, status }
         * @returns
         */
        storyCollect: (params) => $axios.get('/private/pc/case/collect', { params }),

        /**
         * 故事点赞
         * @param {*} params  { id, status }
         * @returns
         */
        storyLike: (params) => $axios.get('/private/pc/case/like', { params }),

        /**
         * 我的收藏品牌故事
         * @param {*} params
         * @returns
         */
        getMyCollectStory: (params) => $axios.get('/private/pc/case/myCollect/list', { params })
    };
};
