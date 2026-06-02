<template>
    <div ref="invoiceModal">
        <a-modal
            title="发票信息"
            :visible="value"
            :confirm-loading="confirmLoading"
            :get-container="() => $refs.invoiceModal"
            width="700px"
            @ok="handleOk"
            @cancel="handleCancel"
        >
            <div class="head-reminder">
                <a-icon type="exclamation-circle" class="text-color-red" />
                <span class="font-14 ml-4 text-color-red"> 请认真核对以下信息，确认无误后点击“保存”，如有错误，不可重开</span>
            </div>
            <div class="p-24">
                <a-form-model ref="ruleForm" :model="invoiceForm" :rules="rules" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
                    <a-form-model-item class="mb-4" label="发票类型：" prop="type">
                        <a-radio-group v-model="invoiceForm.type">
                            <a-radio-button :value="0" class="mr-12"> 增值税普通发票 </a-radio-button>
                            <a-radio-button :value="1"> 增值税专用发票 </a-radio-button>
                        </a-radio-group>
                        <div class="font-12 text-color">苗木9%税率，其他13%税率</div>
                    </a-form-model-item>
                    <a-form-model-item v-if="invoiceForm.type === 0" label="抬头类型：" prop="titleType">
                        <a-radio-group v-model="invoiceForm.titleType" :default-value="1">
                            <a-radio :value="0">企业</a-radio>
                            <a-radio :value="1">个人</a-radio>
                        </a-radio-group>
                    </a-form-model-item>
                    <a-form-model-item label="发票抬头：" prop="title">
                        <a-input v-model="invoiceForm.title" class="font-14" size="large" placeholder="请输入发票抬头" />
                    </a-form-model-item>
                    <a-form-model-item
                        v-if="!(invoiceForm.type === 0 && invoiceForm.titleType === 1)"
                        label="纳税人识别号："
                        prop="creditCode"
                    >
                        <a-input v-model="invoiceForm.creditCode" class="font-14" size="large" placeholder="请输入纳税人识别号" />
                    </a-form-model-item>
                    <template v-if="invoiceForm.type === 1">
                        <a-form-model-item label="注册地址：" prop="registeredAddress">
                            <a-input v-model="invoiceForm.registeredAddress" class="font-14" size="large" placeholder="请输入注册地址" />
                        </a-form-model-item>
                        <a-form-model-item label="注册电话：" prop="registeredPhone">
                            <a-input v-model="invoiceForm.registeredPhone" class="font-14" size="large" placeholder="请输入注册电话" />
                        </a-form-model-item>
                        <a-form-model-item label="开户银行：" prop="bankName">
                            <a-input v-model="invoiceForm.bankName" class="font-14" size="large" placeholder="请输入开户银行" />
                        </a-form-model-item>
                        <a-form-model-item label="银行卡号：" prop="bankAccount">
                            <a-input v-model="invoiceForm.bankAccount" class="font-14" size="large" placeholder="请输入银行卡号" />
                        </a-form-model-item>
                    </template>
                    <a-form-model-item label="设为默认：" prop="isDefault">
                        <a-switch v-model="invoiceForm.isDefault" default-checked />
                    </a-form-model-item>
                </a-form-model>
            </div>
        </a-modal>
    </div>
</template>
<script>
import { FormModel, Input, Radio, Switch } from 'ant-design-vue';

export default {
    name: 'InvoiceModal',
    components: {
        AFormModel: FormModel,
        AFormModelItem: FormModel.Item,
        AInput: Input,
        ARadioGroup: Radio.Group,
        ARadioButton: Radio.Button,
        ARadio: Radio,
        ASwitch: Switch
    },
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        id: {
            type: [Number, String],
            default: ''
        },
        value: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            confirmLoading: false,
            invoiceForm: {
                type: 0,
                titleType: 0,
                title: '',
                creditCode: '',
                registeredAddress: '',
                registeredPhone: '',
                bankName: '',
                bankAccount: '',
                isDefault: false
            },
            rules: {
                title: [{ required: true, message: '请输入发票抬头', trigger: 'blur' }],
                creditCode: [{ required: true, message: '请输入纳税人识别号', trigger: 'blur' }],
                registeredAddress: [{ required: true, message: '请输入注册地址', trigger: 'blur' }],
                registeredPhone: [{ required: true, message: '请输入注册电话', trigger: 'blur' }],
                bankName: [{ required: true, message: '请输入开户银行', trigger: 'blur' }],
                bankAccount: [{ required: true, message: '请输入银行卡号', trigger: 'blur' }]
            }
        };
    },
    watch: {
        value(val) {
            if (val) {
                this.invoiceForm = {
                    type: 0,
                    titleType: 0,
                    title: '',
                    creditCode: '',
                    registeredAddress: '',
                    registeredPhone: '',
                    bankName: '',
                    bankAccount: '',
                    isDefault: false
                };
                if (this.id) {
                    this.invoiceForm.id = this.id;
                    this.getInvoiceDetail();
                }
            } else {
                this.$refs.ruleForm && this.$refs.ruleForm.resetFields();
            }
        }
    },
    methods: {
        handleOk() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.confirmLoading = true;
                    let api = this.$api.member.postInvoiceCreate;
                    if (this.invoiceForm.id) {
                        api = this.$api.member.editInvoice;
                    }
                    api(this.invoiceForm)
                        .then((data) => {
                            this.$message.success(this.invoiceForm.id ? '修改成功' : '创建成功');
                            this.confirmLoading = false;
                            this.$emit('success', data);
                        })
                        .catch(() => {
                            this.confirmLoading = false;
                        });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        handleCancel() {
            this.$emit('change', false);
        },
        // 获取发票详情
        getInvoiceDetail() {
            this.$api.member.getInvoiceDetail(this.id).then((data) => {
                Object.keys(this.invoiceForm).forEach((key) => {
                    this.invoiceForm[key] = data[key];
                });
            });
        }
    }
};
</script>
<style scoped lang="less">
:deep(.ant-modal-body) {
    padding: 0;
}

.head-reminder {
    line-height: 40px;
    padding: 0 24px;
    background: rgba(254, 74, 74, 0.08);
}
</style>
