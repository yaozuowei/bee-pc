<template>
    <bee-page>
        <!-- 搜索组件 -->
        <bee-search class="bee-search"></bee-search>

        <!-- 轮播图/分类/个人信息 -->
        <div class="bee-content-width flex flex-v-t flex-r-b mt-36">
            <div>
                <member-menu></member-menu>
            </div>
            <a-tabs style="width: 887px" default-active-key="1">
                <a-tab-pane key="1" tab="我的订单">
                    <div class="flex">
                        <!-- <a-select style="width: 120px" class="font-14 text-color-black" :default-value="''">
                            <a-select-option class="font-14" value="">全部日期</a-select-option>
                            <a-select-option class="font-14" value="lucy"> Lucy (101) </a-select-option>
                        </a-select> -->
                        <bee-select
                            v-model="params.status"
                            :select-options="{
                                class: 'font-14 text-color-black'
                            }"
                            :item-options="{
                                class: 'font-14 text-color-black'
                            }"
                            style="width: 120px"
                            size="default"
                            :show-clear="false"
                            code="ORDER_STATUS"
                        ></bee-select>
                        <a-input
                            v-model="params.keyword"
                            style="width: 170px"
                            class="font-14 text-color-black ml-16"
                            placeholder="请输入订单号或商品名"
                            @press-enter="getList"
                        />
                        <a-button class="ml-8" @click="getList">查询</a-button>
                    </div>
                    <a-spin :spinning="loadStatus">
                        <template v-if="loadStatus || listTotal > 0">
                            <order-list :list="list" refresh="getList"></order-list>
                            <a-row class="mt-16" type="flex" justify="end">
                                <a-pagination
                                    v-model="params.page"
                                    show-size-changer
                                    :default-current="params.limit"
                                    :total="listTotal"
                                    @change="getList"
                                />
                            </a-row>
                        </template>

                        <bee-empty v-else :empty-title="''" :empty-sub-title="'没有订单数据'"></bee-empty>
                    </a-spin>
                </a-tab-pane>
            </a-tabs>
        </div>
        <bee-mod-service :top="94"></bee-mod-service>
    </bee-page>
</template>

<script>
import { Tabs, Spin, Pagination } from 'ant-design-vue';
import BeeSearch from '@/components/BeeSearch.vue';
import MemberMenu from '@/pageComponents/member/menu.vue';
import OrderList from '@/pageComponents/member/order/order-list.vue';

export default {
    name: 'MemberOrder',
    components: {
        BeeSearch,
        MemberMenu,
        OrderList,
        ATabs: Tabs,
        ATabPane: Tabs.TabPane,
        ASpin: Spin,
        APagination: Pagination
    },
    middleware: 'authenticated',
    data() {
        return {
            countDownTimer: null,
            params: {
                keyword: '',
                status: '',
                limit: 10,
                page: 1
            },
            list: [],
            listTotal: 0,
            loadStatus: true
        };
    },
    beforeMount() {
        this.getList();
    },
    beforeDestroy() {
        clearInterval(this.countDownTimer);
    },
    methods: {
        getList() {
            this.loadStatus = true;
            this.$scroll();
            this.$api.member
                .getOrderList(
                    Object.assign({}, this.params, {
                        status: this.params.status || 0
                    })
                )
                .then((data) => {
                    this.list = data.records.map((item) => {
                        if (item.status === 4 || item.status === 8) {
                            const countDown = parseInt(new Date(item.paymentDueTime).getTime() - new Date().getTime());
                            if (countDown > 0) {
                                item.countDown = countDown;
                                item.countDownText = this.countDownFormat(countDown);
                            }
                        }
                        return item;
                    });
                    this.listTotal = data.total;
                    this.loadStatus = false;
                    this.startCountDown();
                })
                .catch(() => {
                    this.loadStatus = false;
                });
        },
        startCountDown() {
            clearInterval(this.countDownTimer);

            this.countDownTimer = setInterval(() => {
                this.list.forEach((item, index) => {
                    if (item.countDown) {
                        this.list[index].countDown = parseInt(item.countDown - 1000);
                        if (item.countDown <= 0) {
                            this.list[index].countDown = '';
                            this.list[index].countDownText = '';
                        } else {
                            // console.log(index, this.countDownFormat(this.list[index].countDown));
                            this.$set(this.list[index], 'countDownText', this.countDownFormat(this.list[index].countDown));
                        }
                    }
                });
            }, 1000);
        },
        countDownFormat(cd) {
            const formatNumber = (n) => `0${n}`.slice(-2);
            const days = parseInt(cd / 1000 / 60 / 60 / 24, 10); // 计算剩余的天数
            const hours = formatNumber(parseInt((cd / 1000 / 60 / 60) % 24, 10)); // 计算剩余的小时
            const minutes = formatNumber(parseInt((cd / 1000 / 60) % 60, 10)); // 计算剩余的分钟
            const seconds = formatNumber(parseInt((cd / 1000) % 60, 10)); // 计算剩余的秒数
            return `${days}天${hours}小时${minutes}分${seconds}秒`;
        }
    }
};
</script>

<style lang="less" scoped>
.bee-search {
    border-bottom: 2px solid #65c3b8;
}
.bee-content-width {
    margin: 36px auto;
}
:deep(.ant-tabs-bar) {
    background: rgba(0, 8, 22, 0.04);
    border-bottom: 0;
}
:deep(.ant-tabs-nav .ant-tabs-tab) {
    margin: 0;
    padding: 10px 32px;
}
:deep(.ant-cascader-input) {
    font-size: 14px;
}
</style>
