export default {
    namespaced: true,
    state: () => ({
        // 地区数据
        areaData: null,
        // 加载中状态，防止重复加载
        loadStatus: false
    }),
    mutations: {
        // 设置字典数据
        SET_AREA_DATA(state, value) {
            state.areaData = value;
        },
        // 设置加载状态
        SET_LOAD_STATUS(state, value) {
            state.loadStatus = value;
        }
    },
    actions: {
        // 获取字典输
        getArea({ state, commit }) {
            if (state.loadStatus) return false;
            commit('SET_LOAD_STATUS', true);
            // 判断是否存在数据，如果存在，则直接返回不请求接口
            return this.$api.common
                .getArea()
                .then((data) => {
                    commit('SET_AREA_DATA', data);
                    commit('SET_LOAD_STATUS', false);
                    return data;
                })
                .catch(() => {
                    commit('SET_LOAD_STATUS', false);
                });
        }
    }
};
