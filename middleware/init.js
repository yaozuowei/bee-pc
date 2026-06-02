export default function ({ route, store, $cookies, redirect }) {
    const storeToken = store.getters.getToken;
    const token = $cookies.get('Author-Token');
    if (!storeToken || token) {
        store.commit('user/SET_ACCESS_TOKEN', token);
    }
    if ((route.path === '/login/index.html' && (storeToken || token)) || !route.matched.length) {
        redirect('/');
    }
}
