<template>
    <div class="info-container">
        <!-- <div class="header text-color">
            <div class="title font-14 text-color">个人信息</div>
        </div> -->
        <div class="content-box flex flex-r-l">
            <a-form-model
                ref="userLoginForm"
                class="form-box"
                layout="horizontal"
                :label-col="{ span: 2 }"
                :wrapper-col="{ span: 12 }"
                :model="userForm"
            >
                <a-form-model-item label="头像：" prop="headimg" has-feedback>
                    <div class="input-item flex flex-v-c flex-r-b">
                        <div class="headimg ml-20">
                            <bee-img :src="userForm.headimg" radius="50%" />
                        </div>
                        <div v-if="edit" class="upload-button">
                            <a-button type="link" :disabled="uploadAvatarStatus" :loading="uploadAvatarStatus"
                                >{{ uploadAvatarStatus ? '上传中' : '上传' }}<a-icon class="font-12" type="right" />
                            </a-button>
                            <input class="upload-input" type="file" accept="image/*" autoComplete="off" @change="uploadAvatar" />
                        </div>
                    </div>
                </a-form-model-item>
                <a-form-model-item label="名称：" prop="phone" has-feedback>
                    <a-input
                        v-if="edit"
                        v-model="userForm.name"
                        class="input-item"
                        size="large"
                        :max-length="16"
                        placeholder="请输入名称"
                        :validate-status="''"
                        allow-clear
                    >
                    </a-input>
                    <div v-else class="ml-20 font-16 text-color-black">{{ userForm.name }}</div>
                </a-form-model-item>
                <a-form-model-item label="手机：" prop="phone" has-feedback>
                    <div class="input-item flex flex-v-c flex-r-b">
                        <div class="ml-20 font-16 text-color-black">{{ userForm.phone }}</div>
                        <!-- <a-button v-if="edit" type="link" @click="showEditPhoneModal"
                            >修改<a-icon class="font-12" type="right" />
                        </a-button> -->
                    </div>
                </a-form-model-item>
                <!-- <a-form-model-item label="微信：" prop="phone" has-feedback>
                    <a-input
                        v-if="edit"
                        v-model="userForm.weChatCode"
                        class="input-item"
                        size="large"
                        :max-length="32"
                        placeholder="请输入微信号"
                        :validate-status="''"
                        allow-clear
                    >
                    </a-input>
                    <div v-else class="ml-20 font-16 text-color-black">{{ userForm.weChatCode ? userForm.weChatCode : '无' }}</div>
                </a-form-model-item> -->

                <div class="flex flex-r-l mt-40 ml-20">
                    <a-button class="save-button font-bold" type="primary" @click="handleButtonClick">
                        {{ edit ? '保存' : '修改' }}
                    </a-button>
                </div>
            </a-form-model>
        </div>
        <!-- <edit-phone-modal ref="editPhoneModalRef"> </edit-phone-modal> -->
    </div>
</template>

<script>
import { FormModel, Input } from 'ant-design-vue';
// import EditPhoneModal from './edit-phone-modal.vue';

export default {
    name: 'InfoEdit',
    components: {
        AFormModel: FormModel,
        AFormModelItem: FormModel.Item,
        AInput: Input
        // EditPhoneModal
    },
    middleware: 'authenticated',
    data() {
        return {
            userForm: {
                id: '',
                headimg: '',
                headimgId: '',
                name: '',
                phone: ''
                // weChatCode: ''
            },
            uploadAvatarStatus: false,
            edit: false
        };
    },
    mounted() {
        const uesrInfo = this.$store.state.user.userInfo;
        if (uesrInfo) {
            this.userForm.id = uesrInfo.memberId;
            this.$set(this.userForm, 'headimg', uesrInfo.headimg);
            this.userForm.name = uesrInfo.nickName;
            this.userForm.phone = uesrInfo.phone;
        }
        this.getUserInfo();
    },
    methods: {
        // 获取用户信息
        getUserInfo() {
            this.$store.dispatch('user/getUserInfo').then((info) => {
                this.userForm.id = info.memberId;
                this.userForm.headimg = info.headimg;
                this.userForm.name = info.nickName;
                this.userForm.phone = info.phone;
            });
        },
        handleButtonClick() {
            if (this.edit) {
                if (!this.userForm.name || !this.userForm.name.trim()) {
                    this.$message.error('用户名称不能为空');
                    return false;
                }
                // 编辑用户信息
                const infoData = {
                    id: this.userForm.id,
                    nickname: this.userForm.name
                };
                if (this.userForm.headimgId) {
                    infoData.imgFileId = this.userForm.headimgId;
                }
                this.$api.user.editUserInfo(infoData).then((res) => {
                    this.edit = false;
                    this.$message.success('修改信息成功');
                    this.getUserInfo();
                });
            } else {
                this.edit = true;
            }
        },
        // 上传图片
        uploadAvatar(e) {
            const file = e.target.files[0];
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                this.$message.error('请选择图片文件上传');
                return false;
            }
            if (file.size > 1024 * 1024) {
                this.$message.error('图片大小不能超过1M');
                return false;
            }
            const data = new FormData();
            data.append('flag', 'WX_HEAD_IMG');
            data.append(`file`, file);
            // if (this.entityId) {
            //     data.append(`entityId`, this.entityId);
            // }
            this.uploadAvatarStatus = true;
            this.$api.common
                .uploadFileSingle(data)
                .then((picInfo) => {
                    this.userForm.headimgId = picInfo.id;
                    this.uploadAvatarStatus = false;
                    this.$set(this.userForm, 'headimg', picInfo.url);
                })
                .catch(() => {
                    this.uploadAvatarStatus = false;
                    this.$message.error('修改头像失败');
                });
        },
        showEditPhoneModal() {
            console.log(this.$refs.editPhoneModalRef);
            this.$refs.editPhoneModalRef.showModal();
        }
    }
};
</script>
<style scoped lang="less">
.info-container {
    width: 100%;
    .header {
        width: 100%;
        height: 42px;
        background: rgba(0, 8, 22, 0.04);
        border-radius: 4px;
        opacity: 1;
        .title {
            padding: 0 38px;
            width: 132px;
            line-height: 40px;
            border-bottom: 2px solid @main-color;
        }
    }
    .content-box {
        width: 100%;
        padding-top: 48px;
        // padding-left: 56px;
        padding-left: 36px;
        .form-box {
            width: 100%;
            :deep(.ant-form-item-label > label) {
                font-size: 16px;
                color: @main-black;
            }
            .upload-button {
                position: relative;
                .upload-input {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    left: 0;
                    top: 0;
                    z-index: 2;
                    opacity: 0;
                }
            }
        }
        .headimg {
            width: 60px;
            height: 60px;
            border-radius: 50%;
        }
        .input-item {
            width: 250px;
        }
    }
}
</style>
