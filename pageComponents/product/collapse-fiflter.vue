<!--折叠筛选组件-->
<template>
    <div class="collapse-fiflter flex" :style="{ height: hasMoreData ? '36px' : 'auto' }">
        <div class="label">{{ labelName }}：</div>
        <!-- 内容区域 -->
        <div
            ref="collapseCon"
            class="collapse-con scrollbar-box flex-1 flex flex-w ml-16 font-12 text-color-01"
            :class="[isCheckbox ? 'mb-24' : '']"
            :style="{ height: hasMoreData ? '36px' : 'auto', overflow: hasMoreData ? 'hidden' : 'auto' }"
        >
            <!--单选  -->
            <template v-if="!isCheckbox">
                <div
                    v-for="(item, index) in list"
                    :key="index"
                    class="radio-box"
                    :class="[index === current ? 'radio-box-selectd' : '']"
                    @click="changeFun(item, index)"
                >
                    {{ item.name }}
                </div>
            </template>
            <!-- 多选 -->
            <a-checkbox-group v-if="isCheckbox" v-model="dataValues" @change="onChange">
                <block v-for="(item, index) in list" :key="index" class="checkbox-box">
                    <a-checkbox v-if="item.id" :value="item.id">{{ item.name }} </a-checkbox>
                </block>
            </a-checkbox-group>
        </div>
        <div class="pr-16 right-btns flex flex-v-c">
            <div v-if="!isCheckbox && hasCheckbox" class="flex flex-v-c flex-r-c font-12 text-color-black" @click="saveCheckbox">
                多选 <img src="@/assets/images/add-icon.png" alt="" />
            </div>
            <div v-if="isShowMore" class="flex flex-v-c flex-r-c ml-16 font-12 text-color-black" @click="showMore">
                {{ hasMoreData ? '更多' : '收起' }}<img src="@/assets/images/arrow-bottom.png" alt="" />
            </div>
        </div>
        <div v-if="isCheckbox" class="collapse-fo flex flex-r-c">
            <a-button type="primary" @click="confirmSelect"> 确定 </a-button>
            <a-button class="ml-24" @click="showMore">取消</a-button>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        labelName: {
            type: String,
            default: '产地'
        },
        hasCheckbox: {
            type: Boolean,
            default: true
        },
        list: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            citys: [],
            isShowMore: false, // 是否展示更多按钮
            hasMoreData: false, // 是否有更多数据
            dataValues: [], // 多选选择的数据
            isCheckbox: false, // 是否多选
            current: 0 // 默认选择
        };
    },
    created() {
        this.$nextTick(() => {
            if (!this.$refs.collapseCon) return;
            const h = this.$refs.collapseCon.offsetHeight || 0;
            console.log(h, 'h');
            // 高度大于36代表有更多数据
            if (h > 36) {
                this.hasMoreData = true;
                this.isShowMore = true; // 展示更多按钮
            }
        });
    },

    mounted() {},
    methods: {
        showMore() {
            this.hasMoreData = !this.hasMoreData;
            // 收起关闭多选状态
            if (this.hasMoreData) {
                this.isCheckbox = false;
            }
        },
        // 改为多选
        saveCheckbox() {
            this.hasMoreData = false;
            this.isCheckbox = true;
        },
        // 复选框选择
        onChange(vals) {
            console.log(vals);
        },
        // 确定选择
        confirmSelect() {
            this.current = ''; // 置空单选选中状态
            this.$emit('change', this.dataValues);
            this.showMore();
        },
        // 点击某个条件
        changeFun(item, index) {
            this.current = index;
            this.$emit('change', item);
            this.dataValues = []; // 置空多选选中状态
        }
    }
};
</script>
<style lang="less" scoped>
.collapse-fiflter {
    width: 1152px;
    border-radius: 4px;
    border: 1px solid rgba(0, 8, 22, 0.12);
    cursor: pointer;
    position: relative;
    .collapse-fo {
        width: 100%;
        position: absolute;
        bottom: 5px;
        .ant-btn {
            width: 48px;
            height: 24px;
            text-align: center;
            padding: 0;
            font-size: 12px;
            line-height: 24px;
        }
        // left: 0;
    }
    .label {
        width: 120px;
        background: rgba(0, 8, 22, 0.04);
        padding: 0 24px;
        box-sizing: border-box;
        line-height: 36px;
        min-height: 36px;
    }
    .collapse-con {
        width: 0;
        transition: height 1s;
        max-height: 150px;

        .radio-box,
        .checkbox-box {
            height: 36px;
            line-height: 36px;
            margin-right: 20px;
            &:hover {
                color: @main-color;
            }
        }
    }
    .radio-box-selectd {
        color: @main-color;
    }
    .right-btns {
        height: 36px;
        div {
            width: 60px;
            height: 24px;
            border-radius: 4px;
            border: 1px solid rgba(0, 8, 22, 0.12);
            img {
                width: 16px;
                height: 16px;
                display: block;
            }
        }
    }
}
</style>
