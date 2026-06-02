import { message } from 'ant-design-vue';
import indexApi from '@/api/index';

const options = {
    showError: true
};

export default function ({ $axios, store, route, redirect, $winstonLog }, inject) {
    $axios.setHeader('Content-Type', 'application/json;charset=UTF-8');
    $axios.onRequest((config, request) => {
        options.showError = config.showError !== false;
        const token = store.getters.getToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    $axios.onResponse((result, response) => {
        if ($winstonLog) {
            $winstonLog.info(`[${result.status}] ${result.request.path}`);
        }
        const { status, data } = result;
        if (status === 200) {
            if (data.code !== 1) {
                if (options.showError && !process.server) {
                    message.error(data.msg || '请求失败');
                }
                return Promise.reject(result);
            } else {
                return data.data;
            }
        } else {
            return Promise.reject(result);
        }
    });

    $axios.onError((error) => {
        try {
            const { status } = error.response ? error.response : error;
            if ($winstonLog) {
                if (error.response) {
                    $winstonLog.error('接口错误：');
                    $winstonLog.error(`[${status}] | url[${error.response.request.method}]: ${error.response.request.res.responseUrl}`);
                    $winstonLog.error(`errorData:${JSON.stringify(error.response.data)}`);
                    $winstonLog.error('data' + error.response.config.data);
                    // $winstonLog.error('headers：' + JSON.stringify(error.response.config.headers));
                } else {
                    // $winstonLog.error('请求接口提示错误');
                    // $winstonLog.error(`[${status}] | url[${error.config.method}]: ${error.config.url}`);
                    // $winstonLog.error(`errorData:${JSON.stringify(error.data)}`);
                    // $winstonLog.error('data' + error.config.data);
                }
            }

            if (status !== 200) {
                // console.log('showError', options.showError);
                // 401 登录控制
                if (status === 401) {
                    // TODO 跳转登录页面 redirect('/login')
                    // console.log(redirect);
                    store.commit('user/CLEAR_USER_IFNO');
                    if (route.path !== '/login/index.html') {
                        redirect(`/login/index.html?from=${route.path}`);

                        return false;
                    }
                    // message.warn(error.response.data.msg || '请先登录');
                } else if (options.showError && !process.server) {
                    message.error(error.response.data.msg || '请求失败');
                }
            }
            if (process.server) {
                // console.log('showError', options.showError);
                let message = '服务器错误';
                if (status === 200) {
                    message = error.data.msg;
                } else if (error.response.data && error.response.data.msg) {
                    message = error.response.data.msg;
                }
                redirect(`/error?code=${status}&message=${message}`);
                return false;
            }
        } catch {
            if (options.showError && !process.server) {
                message.error('请求失败');
            }
        }
        return Promise.reject(error.response || error.data);
    });

    inject('api', indexApi($axios));
}
