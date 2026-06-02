export default ($axios) => {
    return {
        /**
         * 发送验证码
         * @param {*} data phone: 手机号
         * @returns data: true
         */
        sendPhoneCode: (data) => $axios.post('/common/code', data),

        /**
         * 手机登录
         * @param {*} data phone: 手机号 code: 验证码 referrerId: 推荐id
         * @returns
         */
        postPhoneLogin: (data) => $axios.post('/mall/auth/login/phone', data),

        /**
         * 获取用户信息
         * @returns
         */
        getUserInfo: () => $axios.get('/private/mall/auth/info'),

        /**
         * 编辑用户信息
         * @param {*} data
         * @returns
         */
        editUserInfo: (data) => $axios.put('/private/pc/member/edit/user', data),

        /**
         * 企业认证
         * @returns
         */
        postCertification: (data) => $axios.post('/private/pc/member/enterprise/certification', data)
    };
};
