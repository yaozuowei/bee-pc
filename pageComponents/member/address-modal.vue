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
            <a-form-model ref="ruleForm" :model="addressForm" :rules="rules" :label-col="{ flex: '80px' }" :wrapper-col="{ flex: 'auto' }">
                <a-row :gutter="20">
                    <a-col :span="12">
                        <a-form-model-item class="flex" label="收货人：" prop="consignee">
                            <a-input v-model="addressForm.consignee" class="font-14" size="large" placeholder="请输入姓名" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item class="flex" label="联系方式：" prop="tel">
                            <a-input v-model="addressForm.tel" class="font-14" size="large" placeholder="请输入联系方式" />
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-form-model-item class="flex" label="收货地址：" prop="areaData">
                    <bee-area-select
                        v-model="addressForm.areaData"
                        :cascader-options="{
                            size: 'large',
                            placeholder: '请选择收货地址',
                            class: 'font-14'
                        }"
                    ></bee-area-select>
                </a-form-model-item>
                <a-form-model-item class="flex" label="收货地址：" prop="address">
                    <a-textarea
                        v-model="addressForm.address"
                        class="font-14"
                        size="large"
                        :auto-size="{ minRows: 3, maxRows: 5 }"
                        placeholder="请输入详细地址"
                    />
                </a-form-model-item>
                <a-form-model-item class="flex" label="选择标签：" prop="remark">
                    <div class="label-box flex flex-v-c">
                        <div class="label font-12" :class="{ active: addressForm.remark === '家' }" @click="addressForm.remark = '家'">
                            家
                        </div>
                        <div
                            class="label ml-12 font-12"
                            :class="{ active: addressForm.remark === '公司' }"
                            @click="addressForm.remark = '公司'"
                        >
                            公司
                        </div>
                    </div>
                </a-form-model-item>
                <a-form-model-item class="flex" label="设为默认：" prop="defaultAddress">
                    <a-switch v-model="addressForm.defaultAddress" default-checked />
                </a-form-model-item>
            </a-form-model>
        </a-modal>
    </div>
</template>
<script>
import { FormModel, Input, Switch } from 'ant-design-vue';
// import { FormModel, Input, Radio, Switch } from 'ant-design-vue';
export default {
    name: 'AddressModal',
    components: {
        AFormModel: FormModel,
        AFormModelItem: FormModel.Item,
        AInput: Input,
        // ARadioGroup: Radio.Group,
        // ARadioButton: Radio.Button,
        // ARadio: Radio,
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
            addressForm: {
                consignee: '',
                tel: '',
                areaData: [],
                address: '',
                remark: '',
                defaultAddress: false
            },
            rules: {
                consignee: [{ required: true, message: '请输入收货人姓名', trigger: 'blur' }],
                tel: [{ required: true, message: '请输入收货人手机号', trigger: 'blur' }],
                areaData: [{ required: true, message: '请选择收货地址', trigger: 'blur' }],
                address: [{ required: true, message: '请输入收货详细地址', trigger: 'blur' }]
            }
        };
    },
    watch: {
        value(val) {
            if (val) {
                this.addressForm = {
                    consignee: '',
                    tel: '',
                    areaData: [],
                    address: '',
                    remark: '',
                    defaultAddress: false
                };
                if (this.id) {
                    this.addressForm.id = this.id;
                    this.getAddressDetail();
                }
            } else {
                this.$refs.ruleForm && this.$refs.ruleForm.resetFields();
            }
        }
    },
    methods: {
        handleOk() {
            if (!this.$refs.ruleForm) return false;
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.confirmLoading = true;
                    let api = this.$api.member.postAddressCreate;
                    if (this.addressForm.id) {
                        api = this.$api.member.editAddress;
                    }
                    if (this.addressForm.areaData && this.addressForm.areaData.length > 0) {
                        this.addressForm.provinceId = this.addressForm.areaData[0];
                        this.addressForm.cityId = this.addressForm.areaData[1];
                        this.addressForm.districtId = this.addressForm.areaData[2];
                    }
                    api(this.addressForm)
                        .then((data) => {
                            this.$message.success(this.addressForm.id ? '修改成功' : '创建成功');
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
        getAddressDetail() {
            this.$api.member.getAddressDetail(this.id).then((data) => {
                Object.keys(this.addressForm).forEach((key) => {
                    this.addressForm[key] = data[key];
                });
                this.addressForm.areaData = [data.provinceId, data.cityId, data.districtId];
            });
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

.label-box {
    height: 40px;
    .label {
        line-height: 28px;
        padding: 0 12px;
        border-radius: 4px;
        background: rgba(0, 8, 22, 0.04);
        cursor: pointer;
        &.active {
            color: @main-color;
            background: rgba(101, 195, 184, 0.1);
        }
    }
}
</style>
