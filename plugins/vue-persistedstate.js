import createPersistedState from 'vuex-persistedstate';

export default ({ store }) => {
    createPersistedState({
        paths: ['sendPhoneCode', 'historyList'],
        storage: localStorage
    })(store);

    createPersistedState({
        paths: ['dict', 'area', 'category', 'confirmOrder'],
        storage: sessionStorage
    })(store);
};
