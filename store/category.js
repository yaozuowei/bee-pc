export default {
    namespaced: true,
    state: () => ({
        categoryList: [] // 分类数据
    }),
    mutations: {
        // 设置分类数据
        SET_CATEGORY_LIST(state, value) {
            state.categoryList = value;
        }
    },
    actions: {
        // 获取字典输
        getCategory({ state, commit }) {
            return this.$api.common.getCategory().then((data) => {
                commit('SET_CATEGORY_LIST', data);
            });
        }
    }
};
