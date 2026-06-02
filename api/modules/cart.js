export default ($axios) => {
    return {
        /**
         * 添加购物车接口
         * @returns
         */
        addCart: (data) => $axios.post('/private/pc/cart', data),
        /**
         * 确认订单接口
         * @param {*} data
         * @returns
         */
        confirmOrder: (data) => $axios.post('/private/pc/order/confirm', data),
        /**
         * 购物车列表
         * @param {*} data
         * @returns
         */
        getCartList: (params) => $axios.get('/private/pc/cart', { params }),
        /**
         * 修改购物车列表是否选中
         * @param {*} data
         * @returns
         */
        changeSelectCartApi: (data) => $axios.put('/private/pc/cart/selected', data),

        /**
         * 修改购物车商品数量
         * @param {*} data
         * @returns
         */
        saveCartNum: (data) => $axios.put('/private/pc/cart', data),
        /**
         * 删除购物车商品
         * @param {*} data
         * @returns
         */
        deleteCartProduct: (data) => $axios.delete('/private/pc/cart', { data })
    };
};
