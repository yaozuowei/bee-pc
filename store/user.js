// console.log(Cookies.get('Admin-Token'));
// $cookies.get('Author-Token')
export default {
    namespaced: true,
    state: () => ({
        accessToken: '',
        userInfo: null,
        historyList: [] // 搜索历史记录
    }),
    mutations: {
        // 设置token
        SET_ACCESS_TOKEN(state, value) {
            this.$cookies.set('Author-Token', value);
            state.accessToken = value;
        },
        // 设置用户信息
        SET_USER_INFO(state, userInfo) {
            state.userInfo = userInfo;
        },
        // 清空登录信息
        CLEAR_USER_IFNO(state) {
            state.accessToken = '';
            state.userInfo = null;
            this.$cookies.remove('Author-Token');
        },
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
    },
    actions: {
        getUserInfo({ state, commit }) {
            if (!state.accessToken) return false;
            return this.$api.user.getUserInfo().then((info) => {
                commit('SET_ACCESS_TOKEN', info.accessToken);
                commit('SET_USER_INFO', info);
                console.log('SET_USER_INFO', info);
                return Promise.resolve(info);
            });
        }
    },
    getters: {
        // 获取企业审核信息
        getCompanyAuthInfo(state) {
            if (state.userInfo && state.userInfo.companyAuth) {
                return JSON.parse(JSON.stringify(state.userInfo.companyAuth));
            } else {
                return false;
            }
        }
    }
};
