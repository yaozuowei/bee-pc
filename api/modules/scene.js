export default ($axios) => {
    return {
        /**
         * 获取场景列表
         * @param {*} data { terminalEnum: 终端 小程序:min-app pc:web app:wap }
         * @returns data: any[]
         */
        getSceneList: (params) => $axios.get('/pc/scene', { params }),

        /**
         * 获取场景详情
         * @param {*} params 详情 params { catId1: 一级分类id, sceneId: 场景id }
         * @returns data: any[]
         */
        getSceneDetails: (params) => $axios.get(`/pc/scene/detail`, { params })
    };
};
