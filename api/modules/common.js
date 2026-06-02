export default ($axios) => {
    return {
        // 获取字典
        getDict: () => $axios.get('/common/sys_config/all'),
        // 获取地区
        getArea: () => $axios.get('/common/area'),
        // 获取分类
        getCategory: () => $axios.get('/common/category'),
        // 删除文件
        deleteFile: (fileId) => $axios.delete(`/private/pc/file/${fileId}`),
        // 上传单个文件
        uploadFileSingle: (data) =>
            $axios.post('/private/pc/file/single', data, {
                'Content-type': 'multipart/form-data',
                showError: false
            }),
        // 上传非临时文件
        uploadFileMultiReal: (data) => $axios.post('/private/pc/file/multi-real', data),
        // 上传临时文件
        uploadFileMultiTmp: (data) => $axios.post('/private/pc/file/multi-tmp', data),
        // 获取品牌列表
        getBrandList: () => $axios.get('/common/brand/list'),
        // 提交意见反馈
        addFeedBack: (data) => $axios.post('/private/pc/feedback', data),
        // 查询公司对公账号
        getBankAccounts: () => $axios.get('/common/bank_accounts'),
        // 获取打开小程序链接
        getAppletUrlLink: (params) => $axios.get('/pc/main/getUrlLink', params)
    };
};
