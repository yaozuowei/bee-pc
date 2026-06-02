<template>
    <div class="ondown-box">
        <div class="title font-16 text-color-black">
            <span class="font-bold">线下转账信息</span
            ><span class="font-12 text-color-02">（温馨提示：请按照一下信息进行线下转账汇款操作）</span>
        </div>
        <div v-if="remittanceData.length" class="table1 text-color-black mt-16">
            <table :border="1">
                <tr class="top1-td">
                    <td colspan="2">银行信息</td>
                </tr>
                <tr>
                    <td>公司名称</td>
                    <td>{{ remittanceData[0].companyName }}</td>
                </tr>
                <tr>
                    <td>银行账号</td>
                    <td>{{ remittanceData[0].bankNo }}</td>
                </tr>
                <tr>
                    <td>开户银行</td>
                    <td>{{ remittanceData[0].bankName }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            remittanceData: []
        };
    },
    mounted() {
        this.getRemittanceData();
    },
    methods: {
        getRemittanceData() {
            this.$api.common.getBankAccounts().then((data) => {
                this.remittanceData = data;
            });
        }
    }
};
</script>
<style lang="less" scoped>
.ondown-box {
    width: 1008px;
    margin: 0 auto;
    .title {
        margin-top: 30px;
    }
    .table1 {
        td {
            font-size: 14px;
        }
        margin-bottom: 70px;
    }
    .table1 table {
        border: 0;
        width: 100%;
        font-size: 12px;
        font-weight: 400;
    }
    .table1 th,
    td {
        padding: 10px 32px;
    }
    .top1-td {
        width: 100%;
        padding: 10px 32px;
        background: rgba(0, 8, 22, 0.04);
    }
}
</style>
