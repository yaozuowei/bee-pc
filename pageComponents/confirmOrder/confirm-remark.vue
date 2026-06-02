<!-- 订单备注信息 -->
<template>
    <div class="remark-box">
        <!-- 标题 -->
        <div class="header flex flex-v-c">
            <div class="font-18 text-color-black font-bold">备注信息</div>
        </div>
        <div class="form mt-24">
            <a-form-model ref="feedBackForm" layout="horizontal" :model="remarkInfo">
                <a-form-model-item class="form-item flex flex-v-c" label="配送方式：" has-feedback>
                    <div class="type-box input-item flex flex-r-b">
                        <div
                            v-for="(item, index) in deliveryTypes"
                            :key="index"
                            :class="['type-item', typeIndex == index ? 'type-item-select' : '']"
                            class="font-12 text-color-black"
                            @click="change(item, index)"
                        >
                            {{ item.text }}
                        </div>
                    </div>
                </a-form-model-item>
                <a-form-model-item class="form-item flex flex-v-c" label="期望交货日期：" prop="expectTime" has-feedback>
                    <a-date-picker :default-value="moment(dateTime)" :disabled-date="disabledDate" @change="onChange" />
                </a-form-model-item>
                <div class="textarea-box">
                    <a-form-model-item class="form-item flex" label="订单备注：" has-feedback>
                        <a-input
                            v-model="remarkInfo.remark"
                            class="input-item"
                            size="large"
                            :max-length="500"
                            type="textarea"
                            :rows="4"
                            placeholder="请输入备注信息"
                        >
                        </a-input>
                    </a-form-model-item>
                </div>
            </a-form-model>
        </div>
    </div>
</template>
<script>
import moment from 'moment';
import { FormModel, Input } from 'ant-design-vue';

export default {
    components: {
        AFormModel: FormModel,
        AFormModelItem: FormModel.Item,
        // AIcon: Icon,
        AInput: Input
    },
    props: {
        dateTime: {
            type: String,
            default: new Date()
        }
    },
    data() {
        return {
            remarkInfo: {
                expectTime: '', // 交货日期
                remark: '', // 备注
                expressType: 1 // 配送方式
            },
            remarkInfoRules: {
                expectTime: [{ required: true, message: '请选择交货日期', trigger: 'change' }]
            },
            deliveryTypes: [
                { text: '物流配送', id: 1 }
                // { text: '自提', id: 2 }
            ],
            typeIndex: 0 // 默认配送方式
        };
    },
    created() {
        this.remarkInfo.expectTime = this.dateTime;
    },
    methods: {
        moment,
        disabledDate(current) {
            // Can not select days before today and today
            return current && current < moment(this.dateTime).startOf('day');
        },

        // 切换选择类型
        change(e, i) {
            // this.feedBackForm.feedbackType = e.value;
            this.typeIndex = i;
        },
        // 选择日期后触发
        onChange(e, i) {
            this.remarkInfo.expectTime = i;
        }
    }
};
</script>
<style lang="less" scoped>
.remark-box {
    border: 1px solid #e0e1e3;
    padding: 20px;
}
.type-item {
    width: 96px;
    height: 30px;
    border-radius: 4px;
    border: 1px solid rgba(0, 8, 22, 0.12);
    text-align: center;
    line-height: 30px;
    margin-right: 16px;
    cursor: pointer;
    &:last-child {
        margin-right: 0;
    }
}

.type-item-select {
    color: #65c3b8;
    border: 1px solid #65c3b8;
}
:deep(.textarea-box .ant-form-item-control-wrapper) {
    width: 100%;
}
</style>
