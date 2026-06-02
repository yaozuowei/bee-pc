export const getters = {
    isLogin(state) {
        return !!state.user.accessToken;
    },
    getToken(state) {
        return state.user.accessToken;
    }
};
