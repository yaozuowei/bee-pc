// 页面需要登录时 设置 middleware: 'authenticated'
export default function ({ store, redirect, route }) {
    if (!store.getters.isLogin) {
        let url = '/login/index.html';
        const path = route && route.path ? route.path : '';
        if (path) {
            url += `?from=${path}`;
        }
        redirect(url);
    }
}
