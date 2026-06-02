export default {
    namespaced: true,
    state: () => ({
        historyList: [] // 搜索历史记录
    }),
    mutations: {
        // 设置搜索记录
        SET_HISTORYLIST(state, payLoad) {
            if (!payLoad) return;
            const arr = JSON.parse(JSON.stringify(state.historyList));
            if (arr.includes(payLoad)) return;
            arr.unshift(payLoad);
            console.log(payLoad, '22');
            state.historyList = arr;
        },
        // 清空搜索记录
        SET_HISTORY_EMPTY(state) {
            state.historyList = [];
        },
        // 删除单个搜索历史记录
        DELETE_HISTORY_ITEM(state, payLoad) {
            state.historyList.splice(payLoad, 1);
        }
    }
};
