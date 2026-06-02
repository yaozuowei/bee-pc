<template>
    <div ref="invoiceModal">
        <a-modal
            title="上传凭证"
            :visible="value"
            :get-container="() => $refs.invoiceModal"
            :ok-text="info ? '修改' : '提交'"
            width="700px"
            @cancel="handleCancel"
        >
            <div class="font-14 text-color-black mb-20 font-bold">付款信息</div>
            <a-row class="font-14 text-color-black mb-20">
                <a-col :span="12"> 付款方户名：{{ info.companyName }} </a-col>
                <a-col :span="12"> 付款方帐号：{{ info.bankNo }} </a-col>
            </a-row>
            <a-row class="font-14 text-color-black mb-32">
                <a-col :span="12"> 供货单价(¥)：{{ info.amount }} </a-col>
            </a-row>
            <a-divider class="mt-4 mb-32" />

            <div class="font-14 text-color-black mb-20 font-bold">收款信息</div>
            <a-row class="font-14 text-color-black mb-20">
                <a-col :span="12"> 收款方银行：{{ info.receiveBank }} </a-col>
                <a-col :span="12"> 收款方账号：{{ info.receiveNo }} </a-col>
            </a-row>
            <a-row class="font-14 text-color-black mb-32">
                <a-col :span="18"> 收款方户名：{{ info.receiveCompany }} </a-col>
            </a-row>
            <a-divider class="mt-4 mb-32" />

            <div class="font-14 text-color-black mb-20 font-bold">转账信息</div>
            <a-row class="font-14 text-color-black mb-20">
                <a-col :span="12"> 转账流水号：{{ info.bankFlow }} </a-col>
                <a-col :span="12"> 交易时间：{{ info.payTime }} </a-col>
            </a-row>
            <a-row class="font-14 text-color-black mb-32">
                <a-col :span="24"> 转账备注：{{ info.remark }} </a-col>
            </a-row>

            <a-divider class="mt-4 mb-24" />
            <div class="font-14 text-color-black mb-20 font-bold">转账凭证</div>
            <div>
                <bee-img
                    v-if="info.file && info.file.url"
                    style="cursor: pointer"
                    :src="info.file.url"
                    :width="110"
                    :height="110"
                    :radius="4"
                    :preview="true"
                ></bee-img>
            </div>
            <template slot="footer">
                <a-button key="submit" type="primary" @click="handleCancel">确认</a-button>
            </template>
        </a-modal>
    </div>
</template>
<script>
import { Divider } from 'ant-design-vue';
export default {
    name: 'EvidencePreviewModal',
    components: {
        ADivider: Divider
    },
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        info: {
            type: Object,
            default: () => ({})
        },
        value: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        handleCancel() {
            this.$emit('change', false);
        }
    }
};
</script>
<style scoped lang="less"></style>
