export default {
    namespaced: true,
    state: () => ({
        address: '', // 用户当前位置
        isLocation: false // 用户是否已经定位过
    }),
    mutations: {
        // 更改定位状态
        SET_LOCATION_STATS(state, value) {
            state.isLocation = value;
        },
        // 更改地理位置
        SET_ADDRESS_STATS(state, value) {
            state.address = value;
        }
    }
};
