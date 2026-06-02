<template>
    <div ref="invoiceModal">
        <a-modal
            title="上传凭证"
            :visible="value"
            :confirm-loading="confirmLoading"
            :get-container="() => $refs.invoiceModal"
            :ok-text="info ? '修改' : '提交'"
            width="700px"
            @ok="handleOk"
            @cancel="handleCancel"
        >
            <a-form-model
                ref="ruleForm"
                :model="evidenceForm"
                :rules="rules"
                :label-col="{ flex: '120px' }"
                :wrapper-col="{ flex: 'auto' }"
            >
                <div class="font-14 text-color-black pl-32 mb-20 font-bold">付款信息</div>
                <a-row>
                    <a-col :span="12">
                        <a-form-model-item class="flex" f label="付款方户名：" prop="companyName">
                            <a-input v-model="evidenceForm.companyName" class="font-14" size="large" placeholder="请输入" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item class="flex" label="付款方帐号：" prop="bankNo">
                            <a-input-number v-model="evidenceForm.bankNo" style="width: 100%" size="large" />
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :span="12">
                        <a-form-model-item class="flex" label="转账金额(¥)：" prop="amount">
                            <a-input-number
                                v-model="evidenceForm.amount"
                                style="width: 100%"
                                :min="0"
                                :max="10000000000000000"
                                :step="0.01"
                                placeholder="请输入转账金额"
                                size="large"
                            />
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-divider class="mt-4 mb-24" />
                <div class="font-14 text-color-black pl-32 mb-20 font-bold">收款信息</div>
                <a-row>
                    <a-col :span="12">
                        <a-form-model-item class="flex" label="收款方银行：" prop="receiveBank">
                            <a-select v-model="evidenceForm.receiveBankId" size="large" placeholder="请选择" @change="receiveBankChange">
                                <a-select-option v-for="item in remittanceData" :key="item.id" :value="item.id">
                                    {{ item.bankName }}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item class="flex" label="收款方账号：" prop="receiveNo">
                            <a-input v-model="evidenceForm.receiveNo" class="font-14" disabled size="large" placeholder="" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="18">
                        <a-form-model-item class="flex" label="收款方户名：" prop="receiveCompany">
                            <a-input v-model="evidenceForm.receiveCompany" class="font-14" disabled size="large" placeholder="" />
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-divider class="mt-4 mb-24" />
                <div class="font-14 text-color-black pl-32 mb-20 font-bold">转账信息</div>
                <a-row>
                    <a-col :span="12">
                        <a-form-model-item class="flex" label="转账流水号：" prop="bankFlow">
                            <a-input v-model="evidenceForm.bankFlow" class="font-14" size="large" placeholder="请输入" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item class="flex" label="交易时间：" prop="payTime">
                            <a-date-picker
                                v-model="evidenceForm.payTime"
                                show-time
                                size="large"
                                format="YYYY-MM-DD HH:mm"
                                value-format="YYYY-MM-DD HH:mm"
                                placeholder="请选择"
                            />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-model-item class="flex" label="转账备注：" prop="remark">
                            <a-textarea
                                v-model="evidenceForm.remark"
                                class="font-14"
                                placeholder="请输入留言信息"
                                :auto-size="{ minRows: 3, maxRows: 4 }"
                            />
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-divider class="mt-4 mb-24" />
                <div class="font-14 text-color-black pl-32 mb-20 font-bold">凭证信息</div>
                <a-form-model-item class="flex" label="上传凭证：" prop="fileId">
                    <bee-upload-img v-model="fileList" :max-count="1" flag="BANK_CERTIFICATE_IMG"></bee-upload-img>
                </a-form-model-item>
            </a-form-model>
        </a-modal>
    </div>
</template>
<script>
import { FormModel, Input, InputNumber, Divider, Select } from 'ant-design-vue';

export default {
    name: 'EvidenceModal',
    components: {
        AFormModel: FormModel,
        AFormModelItem: FormModel.Item,
        AInput: Input,
        AInputNumber: InputNumber,
        ADivider: Divider,
        ASelect: Select,
        ASelectOption: Select.Option
    },
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        info: {
            type: Object,
            default: undefined
        },
        tradeNo: {
            type: [Number, String],
            default: ''
        },
        value: {
            type: Boolean,
            default: false
        },
        order: {
            type: Object,
            default: undefined
        },
        remittance: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            confirmLoading: false,
            evidenceForm: {
                companyName: '',
                bankNo: '',
                amount: '',
                receiveBankId: 0,
                receiveBank: undefined,
                receiveNo: '',
                receiveCompany: '',
                bankFlow: '',
                payTime: '',
                remark: '',
                fileId: ''
            },
            fileList: [],
            rules: {
                companyName: [{ required: true, message: '请输入付款方户名', trigger: 'blur' }],
                bankNo: [{ required: true, message: '请输入付款方帐号', trigger: 'blur' }],
                amount: [{ required: true, message: '请输入转账金额', trigger: 'blur' }],
                receiveBank: [{ required: true, message: '请输入收款方银行', trigger: 'blur' }],
                receiveNo: [{ required: true, message: '请输入收款方账号', trigger: 'blur' }],
                receiveCompany: [{ required: true, message: '请输入收款方户名', trigger: 'blur' }],
                bankFlow: [{ required: true, message: '请输入转账流水号', trigger: 'blur' }],
                fileId: [{ required: true, message: '请上传凭证', trigger: 'blur' }]
            },
            remittanceData: {}
        };
    },
    watch: {
        value(val) {
            if (val) {
                if (this.info) {
                    this.evidenceForm = {
                        companyName: this.info.companyName,
                        bankNo: this.info.bankNo,
                        amount: this.info.amount,
                        receiveBank: this.info.receiveBank,
                        receiveNo: this.info.receiveNo,
                        receiveCompany: this.info.receiveCompany,
                        bankFlow: this.info.bankFlow,
                        payTime: this.info.payTime,
                        remark: this.info.remark,
                        fileId: this.info.file?  this.info.file.id: 0
                    };
                    this.fileList = [];
                    if(this.info.file){
                      this.fileList.push(this.info.file);
                    }
                } else {
                    this.evidenceForm = {
                        companyName: '',
                        bankNo: '',
                        amount: '',
                        receiveBank: undefined,
                        receiveNo: '',
                        receiveCompany: '',
                        bankFlow: '',
                        payTime: '',
                        remark: '',
                        fileId: ''
                    };
                }
                if (JSON.stringify(this.remittanceData) === '{}') {
                    this.getRemittanceData();
                }else{
                  this.initBank();
                }
            } else {
                this.$refs.ruleForm && this.$refs.ruleForm.resetFields();
            }
        }
    },
    methods: {
        handleOk() {
            this.$refs.ruleForm && this.$refs.ruleForm.clearValidate('fileId');
            if (this.fileList && this.fileList.length > 0) {
                this.evidenceForm.fileId = this.fileList[0].id;
            }
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.confirmLoading = true;
                    const other = {
                        source: 'web'
                    };

                    if (this.info) {
                        other.id = this.info.id;
                    }

                    if (this.tradeNo) {
                        other.tradeNo = this.tradeNo;
                    }

                    this.$api.member
                        .postCertificate(Object.assign({}, this.evidenceForm, other))
                        .then((data) => {
                            this.$message.success(this.info ? '修改凭证成功' : '上传凭证成功');
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
        // 选择银行
        receiveBankChange(val) {
            console.log(this.remittanceData);
            this.remittanceData.forEach((item) => {
                if (item.id === val) {
                  this.evidenceForm.receiveBank = item.bankName;
                    this.evidenceForm.receiveNo = item.bankNo;
                    this.evidenceForm.receiveCompany = item.companyName;
                }
            });
        },
       initBank() {
          if(this.evidenceForm.receiveNo && this.evidenceForm.receiveNo.length>0){
            this.remittanceData.forEach((item) => {
              if (item.bankNo === this.evidenceForm.receiveNo) {
                this.evidenceForm.receiveBankId = item.id
              }
            });
          }
       },
        getRemittanceData() {
          if (this.remittance && this.remittance.length > 0) {
            this.remittanceData = this.remittance;
            this.initBank();
          } else {
            this.$api.common.getBankAccounts().then((data) => {
              this.remittanceData = data;
              this.initBank();
            });
          }

        }
    }
};
</script>
<style scoped lang="less">
.head-reminder {
    line-height: 40px;
    padding: 0 24px;
    background: rgba(254, 74, 74, 0.08);
}
:deep(.ant-input-number-handler-wrap) {
    display: none;
}
</style>
