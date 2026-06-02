/**
 * 验证是否是链接
 * @param {string} url
 * @returns {Boolean}
 */
export function isURL(url) {
    const reg =
        /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return reg.test(url);
}

/**
 * 验证是否是邮箱
 * @param {string} email
 * @returns {Boolean}
 */
export function isEmail(email) {
    const reg = /^\w+@[\da-z\.-]+\.([a-z]{2,6}|[\u2E80-\u9FFF]{2,3})$/;
    return reg.test(email);
}

/**
 * 验证手机号码
 * @param {string} phone
 * @returns {Boolean}
 */
export function isPhone(phone) {
    const reg = /^1[345789]\d{9}$/;
    return reg.test(phone);
}
