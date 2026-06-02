import path from 'path';
import { format, transports } from 'winston';
const IsConsole = [];
const scripts = [
    // 百度定位
    // {
    //     type: 'text/javascript',
    //     src: 'https://api.map.baidu.com/api?v=1.0&&type=webgl&ak=qBy8PolN6pIaq6lukp3eivEwH4ScDh2e'
    // }
];
if (process.env.NODE_ENV === 'production') {
    IsConsole.push('transform-remove-console');
}
// 百度推广
if (process.env.BASE_API_URL === 'https://pc-api.beeliip.com') {
    // scripts.push({
    //     type: 'text/javascript',
    //     src: 'https://hm.baidu.com/hm.js?15f6a92d3b784bc5798548c99d841963'
    // });
}
// 日志存放路径
const infoLogPath = path.resolve(process.cwd(), './logs', `info.log`);
const errorLogPath = path.resolve(process.cwd(), './logs', `error.log`);

export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: '小蜜蜂园林产业互联网平台',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            {
                name: 'keywords',
                content:
                    '苗木求购信息,苗木价格,绿化苗木供应,苗木信息,苗木网-园林行业网站,苗木,苗木价格,苗木报价,园林网,园林信息化,绿化苗木,求购苗木,园林苗木,苗木供应,绿化苗木价格,苗木求购信息,苗木基地,苗木市场,工程招投标,园林网,苗木供应信息,苗木求购信息,苗木图片,苗木报价,植物库,苗木品种,园艺,家庭养花,花卉栽培,园林景观,苗木供应信息,苗木求购信息,苗木图片,苗木报价,植物库,苗木品种,园艺,家庭养花,花卉栽培,园林景观'
            },
            {
                name: 'description',
                content:
                    '小蜜蜂园林是国内园林行业网站,提供苗木价格,求购苗木,苗木报价,苗木求购信息,园林信息化,苗木,苗木求购信息,获取更多信息请上小蜜蜂园林网'
            },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
        script: scripts
    },

    router: {
        base: '/',
        middleware: 'init'
    },

    styleResources: {
        less: './assets/style/theme.less'
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ['@/assets/style/main.less'],
    // css: ['ant-design-vue/dist/antd.css'],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '@/plugins/request',
        '@/plugins/antd-ui',
        // '@/plugins/img-preview.js',
        { src: '@/plugins/vue-persistedstate.js', ssr: false },
        { src: '@/plugins/img-preview.js', ssr: false },
        { src: '@/plugins/vue-lazyload.js', ssr: false },
        { src: '@/plugins/scroll.js', ssr: false },
        { src: '@/plugins/verify-login.js', ssr: false }
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        '@nuxtjs/style-resources',
        'cookie-universal-nuxt',
        // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module'
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        'nuxt-winston-log'
    ],

    winstonLog: {
        loggerOptions: {
            transports: [
                new transports.File({
                    // format: combine(timestamp()),
                    format: format.combine(
                        format.timestamp({
                            format: 'YYYY-MM-DD HH:mm:ss'
                        }),
                        format.errors({ stack: true }),
                        format.splat(),
                        format.json()
                    ),
                    level: 'info',
                    filename: infoLogPath,
                    maxsize: 5 * 1024 * 1024 // 这个是限制日志文件的大小
                }),
                new transports.File({
                    // format: combine(timestamp()),
                    format: format.combine(
                        format.timestamp({
                            format: 'YYYY-MM-DD HH:mm:ss'
                        }),
                        format.errors({ stack: true }),
                        format.splat(),
                        format.json()
                    ),
                    level: 'error',
                    filename: errorLogPath,
                    maxsize: 5 * 1024 * 1024
                })
            ]
        }
    },

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
        baseURL: process.env.BASE_API_URL,
        proxy: process.env.NODE_ENV === 'development',
        prefix: process.env.NODE_ENV === 'development' ? '/api/' : ''
    },

    proxy: {
        '/api/': {
            target: process.env.BASE_API_URL,
            pathRewrite: {
                '^/api/': ''
            }
        }
    },
    env: {
        baseUrl: process.env.BASE_API_URL
    },
    server: {
        // port: 3000, // default: 3000
        host: '0.0.0.0' // default: localhost,
        // timing: false
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        loaders: {
            less: {
                // ant-design-vue 主题颜色设置 https://1x.antdv.com/docs/vue/customize-theme-cn/
                modifyVars: {
                    'primary-color': '#F58549'
                },
                javascriptEnabled: true
            }
        },
        postcss: {
            plugins: {
                // 通过传递 false 来禁用插件
                'postcss-url': false,
                'postcss-nested': {},
                'postcss-responsive-type': {},
                'postcss-hexrgba': {}
            },
            preset: {
                // 更改postcss-preset-env 设置
                autoprefixer: {
                    grid: true,
                    overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 9']
                }
            }
        },
        transpile: [/ant-design-vue/],
        babel: {
            plugins: [
                [
                    'import',
                    {
                        libraryName: 'ant-design-vue',
                        libraryDirectory: 'es',
                        style: true
                    }
                ],
                ...IsConsole
            ]
        },
        // 单独分离 css
        extractCSS: true,
        // ant-design icon 打包太大优化
        extend(config, ctx) {
            config.resolve.alias['@ant-design/icons/lib/dist$'] = path.resolve(__dirname, './assets/icon/antd-icon.js');
        }
    }
};
