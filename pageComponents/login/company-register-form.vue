<template>
    <div class="company-form-content flex flex-v">
        <a-form-model ref="userLoginForm" layout="horizontal" :model="companyForm" :rules="companyRules">
            <a-form-model-item class="form-item flex flex-v-t flex-r-e" label="注册类型 ：" prop="type" has-feedback>
                <bee-select v-model="companyForm.type" code="COMPANY_AUTH_REGISTRATION_TYPE" />
            </a-form-model-item>

            <a-form-model-item class="form-item flex flex-v-t flex-r-e" label="公司名称 ：" prop="companyName" has-feedback>
                <a-input
                    v-model="companyForm.companyName"
                    class="input-item"
                    size="large"
                    :max-length="18"
                    placeholder="请输入"
                    :validate-status="''"
                    allow-clear
                >
                </a-input>
            </a-form-model-item>

            <!-- <a-form-model-item
                class="form-item flex flex-v-t flex-r-e"
                label="统一社会信用代码/纳税识别码："
                prop="companyCode"
                has-feedback
            >
                <a-input
                    v-model="companyForm.companyCode"
                    class="input-item"
                    size="large"
                    :max-length="18"
                    placeholder="请输入"
                    :validate-status="''"
                    allow-clear
                >
                </a-input>
            </a-form-model-item> -->

            <a-form-model-item class="form-item flex flex-v-t flex-r-e" label="公司所在地：" prop="companyRegion" has-feedback>
                <bee-area-select
                    v-model="companyForm.companyRegion"
                    class="input-item"
                    :cascader-options="{
                        size: 'large'
                    }"
                ></bee-area-select>
            </a-form-model-item>

            <a-form-model-item class="form-item flex flex-v-t flex-r-e" label="企业联系人：" prop="contacts" has-feedback>
                <a-input
                    v-model="companyForm.contacts"
                    class="input-item"
                    size="large"
                    :max-length="18"
                    placeholder="请输入"
                    :validate-status="''"
                    allow-clear
                >
                </a-input>
            </a-form-model-item>

            <a-form-model-item class="form-item flex flex-v-t flex-r-e" label="企业联系人手机号：" prop="contactsTel" has-feedback>
                <a-input
                    v-model="companyForm.contactsTel"
                    class="input-item"
                    size="large"
                    :max-length="11"
                    placeholder="请输入"
                    :validate-status="''"
                    allow-clear
                >
                </a-input>
            </a-form-model-item>

            <a-form-model-item class="form-item flex flex-v-t flex-r-e" label="企业联系人职位：" prop="contactsJob" has-feedback>
                <bee-select v-model="companyForm.contactsJob" code="COMPANY_AUTH_JOB" />
            </a-form-model-item>

            <!-- <a-form-model-item class="form-item flex flex-v-t flex-r-e" label="法人代表身份证：" prop="identityCardFront" has-feedback>
                <div class="input-item">
                    <div class="flex flex-r-b">
                        <div class="flex flex-v flex-r-c flex-v-c">
                            <bee-upload-img
                                v-model="companyForm.identityCardFront"
                                width="160px"
                                height="106px"
                                flag="BANK_CERTIFICATE_IMG"
                            >
                                <img style="width: 160px; height: 106px" src="@/assets/images/login/identity-card-front.png" alt="" />
                            </bee-upload-img>
                            <div class="font-12 text-color-01 mt-16 text-height">上传身份证正面</div>
                        </div>
                        <div class="flex flex-v flex-r-c flex-v-c">
                            <bee-upload-img v-model="companyForm.identityCardRear" width="160px" height="106px" flag="BANK_CERTIFICATE_IMG">
                                <img style="width: 160px; height: 106px" src="@/assets/images/login/identity-card-rear.png" alt="" />
                            </bee-upload-img>
                            <div class="font-12 text-color-01 mt-16 text-height">上传身份证背面</div>
                        </div>
                    </div>

                    <div class="upload-remind font-12 text-color-02 flex mt-16">
                        <a-icon
                            class="font-16 mr-4"
                            type="exclamation-circle"
                        />身份证上传时需清晰可辨认，可上传原件照片或彩色扫面件，格式为JPG、JPEG、PNG，大小不超过10MB
                    </div>
                </div>
            </a-form-model-item> -->
            <a-form-model-item class="form-item flex flex-v-t flex-r-e" label="上传门头照片/企业名片：" prop="otherFiles" has-feedback>
                <div class="input-item">
                    <bee-upload-img
                        v-model="companyForm.otherFiles"
                        flag="COMPANY_OTHER_FILE"
                        width="107px"
                        height="107px"
                        :multiple="true"
                        :row="3"
                    ></bee-upload-img>

                    <div class="upload-remind font-12 mt-8 text-color-02 flex">
                        <a-icon
                            class="font-16 mr-4"
                            type="exclamation-circle"
                        />建议拍照上传清晰的公司门头照片或者企业名片，更容易审核通过，图片大小不超过 2M。
                    </div>
                </div>
            </a-form-model-item>
            <a-form-model-item class="form-item flex flex-v-t flex-r-e" label="上传营业执照：" prop="imgFileId" has-feedback>
                <div class="input-item">
                    <bee-upload-img
                        v-model="companyForm.imgFileId"
                        flag="COMPANY_MEMBER_AUTH"
                        width="107px"
                        height="107px"
                        :row="3"
                    ></bee-upload-img>

                    <div class="upload-remind font-12 mt-8 text-color-02 flex">
                        <a-icon class="font-16 mr-4" type="exclamation-circle" />由此上传营业执照、组织机构代码等，大小不超过 2 M
                    </div>
                </div>
            </a-form-model-item>
            <a-form-model-item class="form-item flex flex-v-t flex-r-e">
                <!-- <a-button class="submit-button font-bold mt-8" type="primary" :disabled="true" :loading="true" @click="handleNext"
                    >提交</a-button
                > -->
                <a-button
                    class="submit-button font-bold mt-8"
                    type="primary"
                    :disabled="submitButtonStatus"
                    :loading="submitButtonLoginStatus"
                    @click="handleNext"
                    >{{ info.id ? '重新' : '' }}提交</a-button
                >
            </a-form-model-item>
        </a-form-model>
    </div>
</template>

<script>
import { FormModel, Input, Icon } from 'ant-design-vue';
import { isPhone } from '@/utils/validation';

export default {
    name: 'CompanyRegisterForm',
    components: {
        AFormModel: FormModel,
        AFormModelItem: FormModel.Item,
        AIcon: Icon,
        AInput: Input
    },
    props: {
        info: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            companyForm: {
                type: this.info.type || undefined,
                companyName: this.info.companyName,
                // companyCode: '',
                companyRegion:
                    this.info.provinceId && this.info.cityId && this.info.districtId
                        ? [this.info.provinceId, this.info.cityId, this.info.districtId]
                        : undefined,
                contacts: this.info.contacts,
                contactsTel: this.info.contactsTel,
                contactsJob: this.info.contactsJob,
                // 身份证正反面
                // identityCardFront: undefined,
                // identityCardRear: undefined,
                // 门头照片
                otherFiles:
                    this.info.otherFileVO && this.info.otherFileVO.length > 0
                        ? this.info.otherFileVO.map((item) => ({
                              id: item.id,
                              name: item.fileName,
                              url: item.url
                          }))
                        : undefined,
                // 企业营业执照
                imgFileId: this.info.fileVO
                    ? [
                          {
                              id: this.info.fileVO.id,
                              name: this.info.fileVO.fileName,
                              url: this.info.fileVO.url
                          }
                      ]
                    : undefined
            },
            companyRules: {
                type: [
                    { required: true, validator: (rule, value) => value && value.length > 0, message: '请选择注册类型', trigger: 'blur' }
                ],
                companyName: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
                // companyCode: [{ required: true, message: '请输入统一社会信用代码/纳税识别码', trigger: 'blur' }],
                companyRegion: [
                    { required: true, validator: (rule, value) => value && value.length > 0, message: '请选择公司所在地', trigger: 'blur' }
                ],
                contacts: [{ required: true, message: '请输入企业联系人', trigger: 'blur' }],
                contactsTel: [
                    { required: true, message: '请输入企业联系人手机号', trigger: 'blur' },
                    { validator: (rule, value) => isPhone(value), message: '手机号码格式不正确', trigger: 'blur' }
                ],
                contactsJob: [
                    {
                        required: true,
                        validator: (rule, value) => value && value.length > 0,
                        message: '请输入企业联系人职位',
                        trigger: 'blur'
                    }
                ],
                otherFiles: [
                    {
                        required: true,
                        validator: (rule, value) => value && value.length > 0,
                        message: '请上传门头照片/企业名片',
                        trigger: 'blur'
                    }
                ]
            },
            imageUrl: null,
            // 登录按钮状态
            submitButtonLoginStatus: false
        };
    },
    computed: {
        // 按钮禁用状态
        submitButtonStatus() {
            return (
                !this.companyForm.type ||
                !this.companyForm.companyName ||
                !this.companyForm.companyRegion ||
                !this.companyForm.contacts ||
                !isPhone(this.companyForm.contactsTel) ||
                !this.companyForm.contactsJob ||
                !this.companyForm.otherFiles ||
                (this.companyForm.otherFiles && this.companyForm.otherFiles.length === 0)
            );
        }
    },
    methods: {
        handleNext() {
            this.$api.user
                .postCertification({
                    id: this.info.id || '',
                    type: this.companyForm.type,
                    companyName: this.companyForm.companyName,
                    provinceId:
                        this.companyForm.companyRegion && this.companyForm.companyRegion.length > 0
                            ? this.companyForm.companyRegion[0]
                            : '',
                    cityId:
                        this.companyForm.companyRegion && this.companyForm.companyRegion.length > 1
                            ? this.companyForm.companyRegion[1]
                            : '',
                    districtId:
                        this.companyForm.companyRegion && this.companyForm.companyRegion.length > 2
                            ? this.companyForm.companyRegion[2]
                            : '',
                    contacts: this.companyForm.contacts,
                    contactsTel: this.companyForm.contactsTel,
                    contactsJob: this.companyForm.contactsJob,
                    otherFiles: this.companyForm.otherFiles.filter((item) => item.id).map((item) => item.id),
                    imgFileId:
                        this.companyForm.otherFiles && this.companyForm.otherFiles.length > 0 && this.companyForm.otherFiles[0].id
                            ? this.companyForm.otherFiles[0].id
                            : ''
                })
                .then((res) => {
                    if (res) {
                        this.$message.success('企业注册已提交审核');
                        this.$emit('next');
                    }
                });
        }
    }
};
</script>
<style scoped lang="less">
.company-form-content {
    // margin-left: -110px;
    margin-left: -120px;
    .form-item {
        .input-item {
            width: 343px;
        }
    }
    .upload-remind {
        line-height: 17px;
    }

    .submit-button {
        width: 420px;
        height: 48px;
        &.ant-btn-primary[disabled] {
            background-color: #c1e7e3;
            border-color: #c1e7e3;
            color: #fff;
        }
    }
}
</style>
