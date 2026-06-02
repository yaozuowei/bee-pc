<template>
    <div class="invoice-box">
        <!-- 标题 -->
        <div class="header flex flex-v-c">
            <div class="font-18 text-color-black font-bold">发票信息</div>
            <div class="font-12 text-color ml-16 pointer" @click="addInvoice"><a-icon type="plus" class="mr-4" />新增发票</div>
        </div>
        <!-- 发票tab -->
        <div class="invoice-tab flex mt-24">
            <div
                v-for="(item, index) in tabList"
                :key="index"
                class="tab-item pointer mr-12"
                :class="[changeValue === index ? 'tab-item-select' : '']"
                @click="changeTab(item, index)"
            >
                {{ item.text }}
            </div>
        </div>
        <div v-if="changeValue > 0">
            <!-- 空状态展示 -->
            <BeeEmpty
                v-if="!invoiceList.length"
                :height="100"
                :img-style="{ width: '80px', height: '80px', fontSize: '12px' }"
                empty-sub-title=""
                empty-title="暂无发票，快去新增吧"
                class="mt-12"
            ></BeeEmpty>
            <!-- 发票list -->
            <div v-else class="invoice-list mt-24">
                <div v-for="(item, index) in invoiceList" :key="index" @click="changeItem(item, index)">
                    <div
                        v-if="index <= (!isDown ? 0 : invoiceList.length)"
                        class="invoice-item font-12 text-color-black flex flex-r-b pointer"
                        :class="[index === 0 ? 'invoice-item-select' : '']"
                    >
                        <div>发票抬头：{{ item.title }}</div>
                        <div>
                            <a-tag v-if="item.isDefault" color="#FDAF12">默认</a-tag>
                            <a-button type="link" class="font-12" style="color: #168fff" @click.stop="editInvoice(item)"> 编辑 </a-button>
                            <a-popconfirm
                                title="确认删除当前发票吗？"
                                placement="bottom"
                                @cancel.stop="() => {}"
                                @confirm.stop="deleteAddress"
                            >
                                <!-- <a-button type="link" class="font-12" style="color: #168fff"> 删除 </a-button> -->
                            </a-popconfirm>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 展开更多操作 -->
            <div v-if="invoiceList.length > 1" class="mt-4">
                <a-button type="link" class="font-12 text-color-02" @click="isDown = !isDown">
                    {{ !isDown ? '展开更多' : '收起' }}
                    <a-icon v-if="!isDown" type="down" />
                    <a-icon v-else type="up" />
                </a-button>
            </div>
        </div>
        <!-- 发票弹框 -->
        <invoice-modal :id="invoiceId" v-model="invoiceModalStatus" @success="invoiceSuccess"></invoice-modal>
    </div>
</template>
<script>
import InvoiceModal from '@/pageComponents/member/invoice-modal.vue';
export default {
    name: 'ConfirmInvoice',
    components: {
        InvoiceModal
    },
    data() {
        return {
            invoiceList: [],
            tabList: [
                {
                    id: '',
                    text: '不选择发票'
                },
                {
                    id: '',
                    text: '增值税专用发票'
                },
                {
                    id: '',
                    text: '增值税普通发票'
                }
            ],
            changeValue: 0, // 当前tab选择的值
            isDown: false, // 是否点击了展开更多
            invoiceId: '', // 发票id
            invoiceModalStatus: false,
            invoiceListP: [], // 普票
            invoiceListZ: [] // 专票
        };
    },
    created() {
        this.init();
    },
    methods: {
        // 获取发票列表
        async init() {
            const res = await this.$api.member.getInvoiceList({ limit: 50, page: 1 });
            this.invoiceList = res.records || [];
            if (this.invoiceList.length) {
                this.invoiceListP = [];
                this.invoiceListZ = [];
                this.invoiceList.forEach((e) => {
                    if (e.type === 0) {
                        this.invoiceListP.push(e);
                    } else {
                        this.invoiceListZ.push(e);
                    }
                });
            }
            if (this.changeValue === 1) {
                this.invoiceList = this.invoiceListZ;
            } else if (this.changeValue === 2) {
                this.invoiceList = this.invoiceListP;
            } else {
                this.invoiceList = [];
            }
        },
        // tab 切换
        changeTab(item, index) {
            this.changeValue = index;
            if (this.changeValue === 1) {
                this.invoiceList = this.invoiceListZ;
                if (!this.invoiceList.length) return;
                this.$emit('getParams', { key: 'invoiceId', value: this.invoiceList[0].id });
            } else if (this.changeValue === 2) {
                this.invoiceList = this.invoiceListP;
                if (!this.invoiceList.length) return;
                this.$emit('getParams', { key: 'invoiceId', value: this.invoiceList[0].id });
            } else {
                this.$emit('getParams', { key: 'invoiceId', value: '' });
                this.invoiceList = [];
            }
            this.isDown = false;
        },
        // 新增发票
        addInvoice() {
            this.invoiceId = null;
            this.invoiceModalStatus = true;
        },
        // 编辑发票
        editInvoice(item) {
            this.invoiceId = item.id;
            this.invoiceModalStatus = true;
        },
        // 选择发票
        changeItem(item, i) {
            this.$emit('getParams', { key: 'invoiceId', value: item.id });
            if (i === 0) return;
            if (this.changeValue === 1) {
                this.invoiceListZ.forEach((item, index) => {
                    if (index === i) {
                        return this.invoiceListZ.unshift(this.invoiceListZ.splice(index, 1)[0]);
                    }
                });
            } else if (this.changeValue === 2) {
                this.invoiceListP.forEach((item, index) => {
                    if (index === i) {
                        return this.invoiceListP.unshift(this.invoiceListP.splice(index, 1)[0]);
                    }
                });
            }
            this.isDown = false;
        },
        // 编辑或者新增完成触发
        invoiceSuccess(item) {
            // 新增地址
            if (!this.invoiceId) {
                this.init();
            } else if (this.changeValue === 1) {
                // 编辑
                const index = this.invoiceListZ.findIndex((r) => r.id === this.invoiceId);
                this.invoiceListZ.splice(index, 1, item);
            } else if (this.changeValue === 2) {
                const index = this.invoiceListP.findIndex((r) => r.id === this.invoiceId);
                this.invoiceListP.splice(index, 1, item);
            }
            this.invoiceModalStatus = false;
            this.isDown = false;
        }
    }
};
</script>
<style lang="less" scoped>
.invoice-box {
    border: 1px solid #e0e1e3;
    padding: 20px;
    .tab-item {
        height: 30px;
        border-radius: 4px 4px 4px 4px;
        border: 1px solid rgba(0, 8, 22, 0.12);
        line-height: 30px;
        padding: 0 40px;

        &:hover {
            border: 1px solid #65c3b8;
            color: @main-color;
        }
    }
    .tab-item-select {
        border: 1px solid #65c3b8;
        color: @main-color;
    }
    .invoice-item {
        height: 30px;
        background: rgba(0, 8, 22, 0.04);
        border-radius: 4px 4px 4px 4px;
        line-height: 30px;
        padding: 0 20px;
        margin-bottom: 12px;
    }
    .invoice-item-select {
        border: 1px solid #65c3b8;
        color: @main-color;
        background: none;
    }
    :deep(.ant-btn) {
        padding: 0 5px;
    }
}
</style>
