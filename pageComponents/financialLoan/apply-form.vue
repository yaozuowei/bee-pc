<template>
    <div class="form-box flex">
        <div class="form-left">
            <div class="text-1">请留下您的联系方式</div>
            <div class="text-2">工作人员将会与您联系并提供服务</div>
        </div>
        <div class="form-right">
            <a-form-model ref="ruleForm" :model="appleForm" layout="vertical" :rules="companyRules">
                <a-row :gutter="12">
                    <a-col :span="8">
                        <a-form-model-item label="类型">
                            <div class="form-tab flex flex-r-b">
                                <div
                                    :class="['form-tab-item', appleForm.role == 0 ? 'form-tab-item-select' : '']"
                                    @click.stop="appleForm.role = 0"
                                >
                                    我是供应商
                                </div>
                                <div
                                    :class="['form-tab-item', appleForm.role == 1 ? 'form-tab-item-select' : '']"
                                    @click.stop="appleForm.role = 1"
                                >
                                    我是采购方
                                </div>
                            </div>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-model-item label="姓名" prop="contacts">
                            <a-input v-model="appleForm.contacts" placeholder="请输入您的姓名" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-model-item label="手机号码" prop="contactsTel">
                            <a-input v-model="appleForm.contactsTel" placeholder="请输入您的手机号码" type="number" />
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row :gutter="12">
                    <a-col :span="8">
                        <a-form-model-item label="您的公司名称">
                            <a-input v-model="appleForm.companyName" placeholder="请输入您的公司名称" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-model-item label="您公司的行业">
                            <a-input v-model="appleForm.industry" placeholder="请输入您公司的行业" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="8">
                        <a-form-model-item label="您的职位">
                            <a-select v-model="appleForm.contactsJob" style="width: 100%" placeholder="请选择">
                                <a-select-option v-for="item in getOptions" :key="item.code" :value="item.code">
                                    {{ item.name }}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row :gutter="12">
                    <a-col :span="5">
                        <a-form-model-item>
                            <bee-upload-img v-model="appleForm.imgFileId" flag="COMPANY_MEMBER_AUTH" width="148px" height="82px" :row="3">
                                <template slot="button">
                                    <div v-if="appleForm.imgFileId.length == 0" class="img-item">
                                        <img class="img" src="@/assets/bank/upload-img.png" mode="" />
                                        <div class="">请上传公司证照</div>
                                    </div>
                                </template>
                            </bee-upload-img>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="5" class="ml-4">
                        <a-form-model-item>
                            <bee-upload-img v-model="appleForm.otherFiles" flag="COMPANY_OTHER_FILE" width="148px" height="82px" :row="3">
                                <template slot="button">
                                    <div v-if="appleForm.otherFiles.length == 0" class="img-item">
                                        <img class="img" src="@/assets/bank/upload-img.png" mode="" />
                                        <div class="">请上传门头照片</div>
                                    </div>
                                </template>
                            </bee-upload-img>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="13">
                        <div class="flex flex-v-c flex-r-c" style="height: 82px; width: 100%">
                            <div class="sub-img" @click="submit">提交信息</div>
                        </div>
                    </a-col>
                </a-row>
            </a-form-model>
        </div>
    </div>
</template>
<script>
import { FormModel, Input, Select } from 'ant-design-vue';
import { isPhone } from '@/utils/validation';
export default {
    components: {
        AInput: Input,
        AFormModel: FormModel,
        AFormModelItem: FormModel.Item,
        ASelect: Select,
        ASelectOption: Select.Option
    },
    props: {
        changeIndex: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            bankList: ['中国银行', '泰隆银行', '招商银行', '平安银行'],
            appleForm: {
                companyName: '',
                contacts: '',
                contactsJob: undefined,
                contactsTel: '',
                imgFileId: [],
                industry: '',
                loanId: 0,
                loanName: '',
                otherFiles: [],
                role: 0
            },
            companyRules: {
                contacts: [{ required: true, message: '请输入您的姓名', trigger: 'blur' }],
                contactsTel: [
                    { required: true, message: '请输入您的手机号', trigger: 'blur' },
                    { validator: (rule, value) => isPhone(value), message: '手机号码格式不正确', trigger: 'blur' }
                ]
            }
        };
    },
    computed: {
        getOptions() {
            if (process.server) return [];
            const dictData = this.$store.getters['dict/getDictItem']('COMPANY_AUTH_JOB');
            if (!dictData) {
                this.$store.dispatch('dict/getDict');
            } else {
                return dictData;
            }

            return [];
        }
    },
    methods: {
        submit() {
            this.$refs.ruleForm.validate(async (valid) => {
                if (valid) {
                    this.appleForm.loanName = this.bankList[this.changeIndex];
                    const params = JSON.parse(JSON.stringify(this.appleForm));
                    if (params.imgFileId.length) {
                        params.imgFileId = params.imgFileId[0].id;
                    }
                    if (params.otherFiles.length) {
                        params.otherFiles = params.otherFiles.map((r) => r.id);
                    }
                    try {
                        await this.$api.member.addDemandData(params);
                        this.$message.success('提交成功，工作人员会尽快与您联系');
                        this.$refs.ruleForm.resetFields();
                    } catch (error) {}
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
};
</script>
<style lang="scss" scoped>
.form-left {
    width: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .text-1 {
        font-size: 24px;
        font-weight: bold;
        color: #fd5901;
    }

    .text-2 {
        font-size: 14px;
        color: #fd5901;
    }
}
.ant-form-item {
    // margin-bottom: 10px;
}
.form-right {
    width: 800px;
    height: 330px;
    background: #ffe7da;
    border-radius: 6px;
    border: 1px solid #fb937c;
    padding: 27px 40px;
    box-sizing: border-box;
}

.img-item {
    width: 148px;
    height: 82px;
    background: #ffffff;
    border-radius: 6px;
    font-size: 12px;
    color: #666666;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .img {
        width: 33px;
        height: 33px;
        display: block;
    }
}
.sub-img {
    width: 309px;
    height: 45px;
    background: linear-gradient(90deg, #c53313bd 0%, #e17364 100%);
    box-shadow: 0px 1px 6px 0px rgba(82, 21, 8, 0.27);
    border-radius: 25px;
    line-height: 45px;
    font-size: 18px;
    font-weight: bold;
    color: #ffffff;
    text-align: center;
    cursor: pointer;
}
.form-tab-item {
    width: 104px;
    height: 35px;
    background: #ffffff;
    border-radius: 21px;
    border: 1px solid #c3c7ce;
    box-sizing: border-box;
    text-align: center;
    font-size: 12px;
    color: #999999;
    line-height: 35px;
    cursor: pointer;
}

.form-tab-item-select {
    border: 1px solid #fd5901;
    font-weight: bold;
    color: #fd5901;
}
</style>
