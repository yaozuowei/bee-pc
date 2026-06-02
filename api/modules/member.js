export default ($axios) => {
    return {
        /**
         * 获取收藏商品列表
         * @param {*} data
         * @returns data: any[]
         */
        getProductCollect: (params) => $axios.get('/private/pc/collect', { params }),

        /**
         * 创建发票
         * @param {*} data
         * @returns
         */
        postInvoiceCreate: (data) => $axios.post('/private/pc/member-invoice/create', data),

        /**
         * 获取发票列表
         * @param {*} params
         * @returns
         */
        getInvoiceList: (params) => $axios.get('/private/pc/member-invoice/list', { params }),

        /**
         * 获取发票详情
         * @param {*} id
         * @returns
         */
        getInvoiceDetail: (id) => $axios.get(`/private/pc/member-invoice/detail/${id}`),

        /**
         * 编辑发票
         * @param {*} data
         * @returns
         */
        editInvoice: (data) => $axios.put('/private/pc/member-invoice/edit', data),

        /**
         * 删除发票
         * @param {*} id
         * @returns
         */
        deleteInvoice: (id) => $axios.delete(`/private/pc/member-invoice/${id}`),

        /**
         * 创建地址
         * @param {*} data
         * @returns
         */
        postAddressCreate: (data) => $axios.post('/private/pc/member/address', data),

        /**
         * 获取地址列表
         * @param {*} params
         * @returns
         */
        getAddressList: (params) => $axios.get('/private/pc/member/address', { params }),

        /**
         * 获取地址详情
         * @param {*} id
         * @returns
         */
        getAddressDetail: (id) => $axios.get(`/private/pc/member/address/${id}`),

        /**
         * 编辑地址信息
         * @param {*} data
         * @returns
         */
        editAddress: (data) => $axios.put('/private/pc/member/address', data),

        /**
         * 删除发票
         * @param {*} id
         * @returns
         */
        deleteAddress: (id) => $axios.delete(`/private/pc/member/address/${id}`),

        /**
         * 获取订单列表
         * @param {*} params
         * @returns
         */
        getOrderList: (params) => $axios.get('/private/pc/order/list/status', { params }),

        /**
         * 获取订单详情
         * @param {*} params
         * @returns
         */
        getOrderDetail: (orderNo) => $axios.get(`/private/pc/order/detail/${orderNo}`),

        /**
         * 提交凭证
         * @param {*} data
         * @returns
         */
        postCertificate: (data) => $axios.post('/private/pc/pay/transfer/certificate', data),

        /**
         * 获取凭证列表
         * @param {*} orderNo
         * @returns
         */
        getEvidenceDetail: (orderNo) => $axios.get(`/private/pc/pay/bank/list/${orderNo}`),

        /**
         * 再次购买
         * @param {*} orderNo
         * @returns
         */
        anotherOrderByOrderNo: (orderNo) => $axios.get(`/private/pc/order/another/${orderNo}`),

        /**
         * 确认收货
         * @param {*} orderNo
         * @returns
         */
        receivingOrder: (orderNo) => $axios.put(`/private/pc/order/receiving/${orderNo}`),

        /**
         * 删除订单
         * @param {*} orderNo
         * @returns
         */
        deleteOrderNo: (orderNo) => $axios.delete(`/private/pc/order/${orderNo}`),

        /**
         * 金融贷个人申请信息填写
         * @param {*} orderNo
         * @returns
         */
        addDemandData: (data) => $axios.post(`/private/pc/member/loan/demand`, data)
    };
};
