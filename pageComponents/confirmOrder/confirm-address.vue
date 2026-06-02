<template>
    <div class="address-box">
        <!-- 标题 -->
        <div class="header flex flex-v-c">
            <div class="font-18 text-color-black font-bold">收货地址</div>
            <div class="font-12 text-color ml-16 pointer" @click="addAddress"><a-icon type="plus" class="mr-4" />新增地址</div>
        </div>
        <!-- 空状态展示 -->
        <BeeEmpty
            v-if="!addressList.length"
            :height="100"
            :img-style="{ width: '80px', height: '80px', fontSize: '12px' }"
            empty-sub-title=""
            empty-title="暂无地址，快去新增吧"
            class="mt-12"
        ></BeeEmpty>
        <!-- 地址列表 -->
        <div v-else class="address-list mt-24">
            <div v-for="(item, index) in addressList" :key="index" class="address-item" @click="changeItem(item, index)">
                <div v-if="index <= (!isDown ? 0 : addressList.length)" class="flex flex-v-c">
                    <div
                        class="address-item-left pointer font-14 text-color-black"
                        :class="[index === 0 ? 'address-item-left-select' : '']"
                    >
                        {{ item.consignee }}-{{ item.provinceName }}
                    </div>
                    <div class="address-item-right flex flex-r-b font-14 text-color-black">
                        <div>
                            {{ item.provinceName }}-{{ item.cityName }}-{{ item.districtName }} {{ item.address }}（{{ item.consignee }}）{{
                                item.tel
                            }}
                        </div>
                        <div class="item-groups">
                            <!-- 是否默认 -->
                            <a-tag v-if="item.defaultAddress" color="#FDAF12">默认</a-tag>
                            <a-button type="link" class="font-12" style="color: #168fff" @click.stop="editAddress(item)"> 编辑 </a-button>
                            <a-popconfirm
                                title="确认删除当前地址吗？"
                                placement="bottom"
                                @cancel.stop="() => {}"
                                @confirm.stop="deleteAddress(item, index)"
                            >
                                <a-button type="link" class="font-12" style="color: #168fff" @click.stop=""> 删除 </a-button>
                            </a-popconfirm>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 展开更多操作 -->
        <div v-if="addressList.length > 1" class="mt-4">
            <a-button type="link" class="font-12 text-color-02" @click="isDown = !isDown">
                {{ !isDown ? '展开更多' : '收起' }}
                <a-icon v-if="!isDown" type="down" />
                <a-icon v-else type="up" />
            </a-button>
        </div>
        <!-- 地址弹窗 -->
        <address-modal :id="addressId" v-model="addressModalStatus" @success="addressSuccess"></address-modal>
    </div>
</template>
<script>
import BeeEmpty from '../../components/BeeEmpty.vue';
import AddressModal from '@/pageComponents/member/address-modal.vue';
export default {
    name: 'ConfirmAddress',
    components: { BeeEmpty, AddressModal },
    data() {
        return {
            addressList: [],
            isDown: false, // 是否点击了展开更多
            addressModalStatus: false, // 地址弹窗
            addressId: '' // 修改id
        };
    },
    created() {
        this.init();
    },
    methods: {
        // 获取地址列表
        async init() {
            const res = await this.$api.member.getAddressList({ limit: 50, page: 1 });
            this.addressList = res.records || [];
            if (this.addressList.length) {
                this.$emit('getParams', { key: 'addressId', value: this.addressList[0].id });
            }
        },
        // 新增地址
        addAddress() {
            this.addressId = null;
            this.addressModalStatus = true;
        },
        // 编辑地址
        editAddress(item) {
            this.addressId = item.id;
            this.addressModalStatus = true;
        },
        // 选择地址
        changeItem(item, i) {
            this.$emit('getParams', { key: 'addressId', value: item.id });
            this.addressList.forEach((item, index) => {
                if (index === i) {
                    return this.addressList.unshift(this.addressList.splice(index, 1)[0]);
                }
            });
            this.isDown = false;
        },
        async deleteAddress(item, index) {
            await this.$api.member.deleteAddress(item.id);
            this.addressList.splice(index, 1);
            this.$message.success('删除成功');
            this.isDown = false;
        },

        // 地址数据
        addressSuccess(item) {
            // 新增地址
            if (!this.addressId) {
                this.init();
            } else {
                // 编辑
                const index = this.addressList.findIndex((r) => r.id === this.addressId);
                // this.addressList[index] = item;
                this.addressList.splice(index, 1, item);
                console.log(item, this.addressList);
            }
            this.addressModalStatus = false;
            this.isDown = false;
        }
    }
};
</script>
<style lang="less" scoped>
.address-box {
    border: 1px solid #e0e1e3;
    padding: 20px;
    .item-info {
        flex: 1;
        width: 0;
    }
    .address-item {
        margin-bottom: 10px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .address-item-left {
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
    .address-item-left-select {
        border: 1px solid #65c3b8;
        color: @main-color;
    }
    .address-item-right {
        flex: 1;
        width: 0;
        height: 30px;
        background: rgba(0, 8, 22, 0.04);
        border-radius: 4px;
        line-height: 30px;
        margin-left: 20px;
        padding: 0 10px;
    }
    :deep(.ant-btn) {
        padding: 0 5px;
    }
}
</style>
