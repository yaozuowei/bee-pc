export const debounce = function (fn, delay) {
    // 默认300毫秒
    let timer;
    let flag = true;
    return function () {
        const that = this;
        const args = arguments;
        if (flag) {
            fn.apply(that, args);
            flag = false;
        } else {
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn.apply(that, args);
                flag = true;
            }, delay);
        }
    };
};
// 倒计时组件
export const countDownTimeMore = (expiryDate, countDownEnd) => {
    const expDate = expiryDate;
    const nowDate = new Date().getTime();
    const cdDate = new Date(expDate - nowDate);
    if (expDate - nowDate > 0) {
        let days = parseInt(cdDate / 1000 / 60 / 60 / 24, 10); // 计算剩余的天数
        let hours = parseInt((cdDate / 1000 / 60 / 60) % 24, 10); // 计算剩余的小时
        let minutes = parseInt((cdDate / 1000 / 60) % 60, 10); // 计算剩余的分钟
        let seconds = parseInt((cdDate / 1000) % 60, 10); // 计算剩余的秒数
        days = checkTime(days);
        hours = checkTime(hours);
        minutes = checkTime(minutes);
        seconds = checkTime(seconds);
        countDownEnd(days + ':' + hours + ':' + minutes + ':' + seconds);
    } else {
        countDownEnd('00:00:00:00');
    }
};
const checkTime = (i) => {
    if (i < 10) {
        i = '0' + i;
    }
    return i.toString();
};
