<!-- 订单创建成功 -->
<template>
    <div class="order-box">
        <bee-page>
            <div class="header">
                <bee-simple-head></bee-simple-head>
            </div>
            <div class="bee-content-width page-con">
                <!-- 成功提示 -->
                <confirm-success :order-data="orderData"></confirm-success>
                <!-- 线上or线下 -->
                <confirm-online v-if="payType === '4'" :order-data="orderData" :pc-melon-key="pcMelonKey"></confirm-online>
                <confirm-ondown v-else></confirm-ondown>
            </div>
        </bee-page>
    </div>
</template>
<script>
import ConfirmSuccess from '@/pageComponents/confirmOrder/confirm-success.vue';
import ConfirmOnline from '@/pageComponents/confirmOrder/confirm-online.vue';
import ConfirmOndown from '@/pageComponents/confirmOrder/confirm-ondown.vue';
export default {
    components: {
        ConfirmSuccess,
        ConfirmOnline,
        ConfirmOndown
    },
    asyncData({ env }) {
        return {
            baseUrl: env.baseUrl
        };
    },
    data() {
        return {
            orderData: null,
            orderNo: '', // 订单号
            payType: '', // 支付类型
            pcMelonKey: '', // 生成二维码的关键key 线上支付使用
            baseUrl: ''
        };
    },
    created() {
        if (process.browser) {
            this.init();
        }
    },

    methods: {
        async init() {
            const params = this.$route.params;
            if (params && params.orderNo) {
                this.orderNo = params.orderNo;
                this.payType = params.payType;

                const res = await this.$api.order.getOrderDetail(params.orderNo);
                if (res) {
                    this.orderData = res;
                    if (res.sorderForms) {
                        this.wxBillFun();
                    } else {
                        this.createBillFun();
                    }
                }
                this.connectWebsocket();
            } else {
                this.$message.error('获取确认订单信息失败');
                setTimeout(() => {
                    window.opener = null;
                    window.open('about:blank', '_self');
                    window.close();
                }, 800);
            }
        },
        // 创建付款单接口
        async createBillFun() {
            const arr = this.orderNo.split('-');
            // 订单类型 M:主订单 E:物流订单 S:服务费订单
            const orderType = arr.length > 1 ? arr[1] : 'M';
            const res = await this.$api.order.createBill({
                orderNo: this.orderNo,
                payState: this.payType,
                source: 'web',
                orderType
            });
            this.pcMelonKey = res.pcMelonKey;
        },
        // wx付款单接口
        async wxBillFun() {
            const res = await this.$api.order.wxPayBill({
                orderNo: this.orderNo,
                payState: 1,
                source: 'web',
                orderType: 'S'
            });
            this.pcMelonKey = res.pcMelonKey;
        },
        // 连接websoket
        connectWebsocket() {
            const that = this;
            let websocket;
            if (typeof WebSocket === 'undefined') {
                console.log('您的浏览器不支持WebSocket');
            } else {
                let protocol = 'ws';
                let url = '';
                let orderNo = this.orderNo;
                // 子订单支付需要使用子订单编号
                if (this.orderData.sorderForms) {
                    orderNo = this.orderData.sorderForms.orderNo;
                }
                if (that.baseUrl) {
                    const arr = that.baseUrl.split(':');
                    url = arr[1];
                }
                if (window.location.protocol === 'https:') {
                    protocol = 'wss';
                }
                url = `${protocol}:${url}/socket/${orderNo}`;
                console.log('url', url);
                // 打开一个websocket/
                websocket = new WebSocket(url);
                // 建立连接
                websocket.onopen = () => {
                    // 发送数据
                    websocket.send('发送数据');
                    console.log('websocket发送数据中');
                };
                // 客户端接收服务端返回的数据
                websocket.onmessage = (evt) => {
                    console.log('websocket返回的数据：', evt);
                    that.$message.success('订单支付成功');
                    that.$router.replace(`/member/order/${that.orderNo}/detail.html`);
                };
                // 发生错误时
                websocket.onerror = (evt) => {
                    console.log('websocket错误：', evt);
                };
                // 关闭连接
                websocket.onclose = (evt) => {
                    console.log('websocket关闭：', evt);
                };
            }
        }
    }
};
</script>
<style scoped lang="less">
.page-con {
    margin: 0 auto;
}
</style>
