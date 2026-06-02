<template>
    <div class="address-box">
        <div class="text-color-black pl-24 font-14">发票信息</div>
        <a-row class="text-color-01 font-14">
            <a-col class="flex flex-v pl-24 pr-24 mt-24" :span="7">发票抬头：{{ info.title }} </a-col>
            <a-col class="flex flex-v pl-24 pr-24 mt-24" :span="7"
                >发票类型：{{ info.type === 1 ? '增值税专用发票' : '增值税普通发票' }}
            </a-col>
            <a-col v-if="info.type !== 1" class="flex flex-v pl-24 pr-24 mt-24" :span="7"
                >抬头类型：{{ info.titleType === 1 ? '个人' : '企业' }}
            </a-col>
            <a-col v-if="!(info.type === 1 || (info.type === 0 && info.titleType === 1))" class="flex flex-v pl-24 pr-24 mt-24" :span="7"
                >纳税人识别号：{{ info.creditCode }}</a-col
            >
            <template v-if="info.type === 1">
                <a-col class="flex flex-v pl-24 pr-24 mt-24" :span="7">注册电话：{{ info.registeredPhone }}</a-col>
                <a-col class="flex flex-v pl-24 pr-24 mt-24" :span="7">企业邮箱：{{ info.registeredPhone }} </a-col>
                <a-col class="flex flex-v pl-24 pr-24 mt-24" :span="7">开户银行：{{ info.bankName }}</a-col>
                <a-col class="flex flex-v pl-24 pr-24 mt-24" :span="7">注册地址：{{ info.registeredAddress }}</a-col>
                <a-col class="flex flex-v pl-24 pr-24 mt-24" :span="7">银行账号：{{ info.bankAccount }}</a-col>
            </template>
        </a-row>
    </div>
</template>
<script>
export default {
    name: 'OrderInvoice',
    props: {
        info: {
            type: Object,
            default: () => ({})
        }
    }
};
</script>
<style scoped lang="less">
.address-box {
    border: 1px solid #e0e1e3;
    border-radius: 4px;
    padding: 28px 0;
}
</style>
