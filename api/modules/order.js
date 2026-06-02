export default ($axios) => {
    return {
        /**
         * 获取运费
         * @param {*} data
         * @returns data: any[]
         */
        getOrderFreight: (params) => $axios.get('/private/pc/order/freight', { params }),
        /**
         * 生成订单
         * @param {*} data
         * @returns data: any
         */
        createOrder: (data) => $axios.post('/private/pc/order/create', data),
        /**
         * 获取订单详情
         * @param {*} orderNo
         * @returns data: any
         */
        getOrderDetail: (orderNo) => $axios.get(`/private/pc/order/detail/${orderNo}`),
        /**
         * 生成订单二维码
         * @param {*} orderNo
         * @returns data: any
         */
        generateCode: (orderNo) => $axios.get(`/private/pc/order/generate/${orderNo}`),
        /**
         * 创建付款单
         * @param {*} data
         * @returns data: any
         */
        createBill: (data) => $axios.post(`/private/pc/pay/bill`, data),
        /**
         * 微信支付子订单
         * @param {*} data
         * @returns data: any
         */
        wxPayBill: (data) => $axios.post(`/private/pc/pay/sub/bill`, data)
    };
};
