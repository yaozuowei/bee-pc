import Vue from 'vue';
import VueLazyload from 'vue-lazyload';
// or with options
const loadimage = require('@/assets/images/load.gif');
const errorimage = require('@/assets/images/logo/logo.png');

Vue.use(VueLazyload, {
    preLoad: 1.33,
    error: errorimage,
    loading: loadimage,
    // lazyComponent: true,
    throttleWait: 500,
    attempt: 1
});
