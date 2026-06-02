export default {
    namespaced: true,
    state: () => ({
        confirmOrderData: null // 确认订单信息
    }),
    mutations: {
        // 设置确认订单信息
        SET_CONFIRMDATA(state, payLoad) {
            state.confirmOrderData = payLoad;
        }
    }
};
