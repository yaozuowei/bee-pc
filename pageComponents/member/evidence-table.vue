<template>
    <div>
        <a-spin :spinning="loadStatus" style="min-height: 400px">
            <template v-if="loadStatus || (!loadStatus && list.length > 0)">
                <a-row class="table-bar mb-24 font-12 text-color-01">
                    <a-col class="pl-32" :span="8">用户信息</a-col>
                    <a-col class="text-c" :span="4">转账金额</a-col>
                    <a-col :span="4">交易时间</a-col>
                    <a-col :span="4">凭证状态</a-col>
                    <a-col :span="4">操作</a-col>
                </a-row>
                <div v-for="item in list" :key="item.id" class="evidence-box mb-12">
                    <div class="header pl-32 text-color-01 font-12">转账流水号：{{ item.bankFlow }}</div>
                    <a-row class="content-box" type="flex" align="middle">
                        <a-col :span="8">
                            <div class="flex flex-v-c">
                                <bee-img  :src="item.file? item.file.url: ''" :width="84" :height="84" :radius="4" lazy :preview="true" />
                                <div class="ml-32">
                                    <div class="text-color-black font-12">付款用户：{{ item.companyName }}</div>

                                    <div class="mt-16 text-color-02 font-12">付款账号：{{ item.bankNo }}</div>
                                </div>
                            </div>
                        </a-col>
                        <a-col class="text-color-red font-12 text-c" :span="4">¥{{ item.amount }}</a-col>
                        <a-col class="text-color-black font-12" :span="4">{{ item.payTime }}</a-col>
                        <a-col class="pr-20" :span="4">
                            <div class="text-color-black font-12">{{ item.status | statusText }}</div>
                            <div v-if="item.status === -1" class="mt-12 text-color-red font-12">未通过原因：{{ item.checkRemark }}</div>
                        </a-col>
                        <a-col :span="4">
                            <div class="flex flex-v flex-v-c">
                                <a-button type="primary" ghost @click="showEvidenceModal(item, false)">查看详情</a-button>
                                <a-button v-if="item.status === -1" type="link" @click="showEvidenceModal(item, true)">修改</a-button>
                            </div>
                        </a-col>
                    </a-row>
                </div>
            </template>
            <bee-empty v-else :empty-title="''" empty-sub-title="暂无上传凭证"></bee-empty>
        </a-spin>
        <evidence-modal
            v-model="evidenceModalStatus"
            :info="evidenceModalData"
            :trade-no="orderData.tradeNo"
            @success="refreshData"
        ></evidence-modal>
        <evidence-preview-modal v-model="evidencePreviewModal" :info="evidenceModalData"></evidence-preview-modal>
    </div>
</template>
<script>
import { Spin } from 'ant-design-vue';
import EvidenceModal from '@/pageComponents/member/order/evidence-modal.vue';
import EvidencePreviewModal from '@/pageComponents/member/order/evidence-preview-modal.vue';

export default {
    name: 'EvidenceTable',
    components: {
        EvidenceModal,
        EvidencePreviewModal,
        ASpin: Spin
    },
    filters: {
        statusText(val) {
            if (val === 1) {
                return '复核通过';
            } else if (val === -1) {
                return '复核不通过';
            } else {
                return '待复核';
            }
        }
    },
    props: {
        orderId: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            loadStatus: true,
            list: [],
            evidenceModalStatus: false,
            evidenceModalData: undefined,
            evidencePreviewModal: false,
            orderData: {}
        };
    },
    beforeMount() {
        this.getData();
        this.getOrderData();
    },
    methods: {
        getData() {
            this.loadStatus = true;
            this.$api.member
                .getEvidenceDetail(this.orderId)
                .then((data) => {
                    this.list = data;
                    this.loadStatus = false;
                })
                .catch(() => {
                    this.loadStatus = false;
                });
        },
        showEvidenceModal(data, editStatus) {
            this.evidenceModalData = data;
            if (editStatus) {
                this.evidenceModalStatus = true;
            } else {
                this.evidencePreviewModal = true;
            }
        },
        getOrderData() {
            this.$api.member.getOrderDetail(this.orderId).then((data) => {
                this.orderData = data;
            });
        },
        refreshData() {
            this.getData();
            this.evidenceModalStatus = false;
        }
    }
};
</script>
<style scoped lang="less">
.table-bar {
    line-height: 42px;
    background: rgba(0, 8, 22, 0.04);
    border-radius: 4px;
}

.evidence-box {
    border: 1px solid #e0e1e3;
    border-radius: 4px;
    overflow: hidden;
    .content-box {
        padding: 24px 32px;
    }
    .header {
        line-height: 40px;
        background: rgba(0, 8, 22, 0.04);
    }
}
</style>
