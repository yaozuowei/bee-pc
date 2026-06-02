const sendPhoneCode = () => {
    return {
        namespaced: true,
        state: () => ({
            prevSendTime: -1,
            prevPhone: ''
        }),
        mutations: {
            // 设置上一次发送的时间戳
            SET_PREV_SEND_TIME(state, value) {
                state.prevSendTime = value;
            },
            // 设置上一次手机号码
            SET_PREV_PHONE(state, value) {
                state.prevPhone = value;
            }
        },
        actions: {
            // 发送手机验证码
            async sendPhoneCode({ state, commit }, data) {
                const status = await this.$api.user.sendPhoneCode(data);
                if (status) {
                    const currentTime = new Date().getTime();
                    // sessionStorage.setItem('sendPhoneCodeTime', currentTime);
                    commit('SET_PREV_SEND_TIME', currentTime);
                }
                return status;
            }
        },
        getters: {
            // 获取上一次发送时间的计秒
            getCountDown: (state) => () => {
                return state.prevSendTime === -1 ? -1 : Math.round((new Date().getTime() - state.prevSendTime) / 1000);
            }
        }
    };
};
export default sendPhoneCode();
