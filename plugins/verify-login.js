import { Modal } from 'ant-design-vue';

// Modal.confirm
export default function ({ redirect, store, route }, inject) {
    const fn = (callback, options = {}) => {
        if (store.getters.isLogin) {
            callback();
        } else {
            Modal.confirm({
                title: options.title || '温馨提示',
                content: options.content || '请先登录后操作',
                okText: '去登录',
                onOk() {
                    console.log(route);
                    let url = '/login/index.html';
                    const path = route && route.path ? route.path : '';
                    if (path) {
                        url += `?from=${path}`;
                    }
                    redirect(url);
                },
                onCancel() {}
            });
        }
    };
    inject('verifyLogin', fn);
}
