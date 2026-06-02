<template>
    <div class="content">
        <a-form-model ref="searchFormRef" :model="searchForm" layout="inline" label-align="right">
            <div class="mb-8">
                <a-form-model-item label="标题名称" prop="keyword">
                    <a-input v-model="searchForm.keyword" placeholder="请输入标题名称" />
                </a-form-model-item>
                <a-form-model-item label="商品品类" prop="cateId">
                    <a-select v-model="searchForm.cateId" style="width: 200px" placeholder="请选择" mode="multiple">
                        <a-select-option v-for="(item, index) in cateList" :key="index" :value="item"> {{ item }} </a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="区域" prop="list">
                    <a-select v-model="searchForm.list" style="width: 200px" placeholder="请选择" mode="multiple">
                        <a-select-option v-for="(item, index) in areaList" :key="index" :value="item"> {{ item }} </a-select-option>
                    </a-select>
                </a-form-model-item>
            </div>
            <a-form-model-item label="发布日期" prop="dateValue">
                <a-range-picker v-model="dateValue" @change="onDateChange" />
            </a-form-model-item>
            <a-form-model-item>
                <a-button type="primary" @click="seachFun"> 搜索 </a-button>
                <a-button class="ml-8" @click="resetForm"> 重置 </a-button>
            </a-form-model-item>
        </a-form-model>
        <p></p>
        <a-table
            :columns="columns"
            :data-source="productList"
            row-key="id"
            :pagination="{
                total: total,
                pageSize: 20
            }"
            @change="changeTable"
        >
            <a slot="name" slot-scope="name, record" @click="seeProductDetail(record)">{{ name }}</a>
            <span slot="action" slot-scope="scope">
                <a @click="seeProductDetail(scope)">查看</a>
            </span>
        </a-table>
    </div>
</template>

<script>
import { FormModel, Input, Table, Select } from 'ant-design-vue';
import { mapState } from 'vuex';
export default {
    components: {
        AFormModel: FormModel,
        AFormModelItem: FormModel.Item,
        AInput: Input,
        ATable: Table,
        ASelect: Select,
        ASelectOption: Select.Option
        // ACascader: Cascader
    },
    props: {
        productList: {
            type: Array,
            default: () => []
        },
        areaList: {
            type: Array,
            default: () => []
        },
        cateList: {
            type: Array,
            default: () => []
        },
        total: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            columns: [
                {
                    title: '标题名称',
                    dataIndex: 'title',
                    key: 'title',
                    width: '300px',
                    align: 'left',
                    scopedSlots: { customRender: 'name' }
                },
                {
                    title: '查看人数',
                    dataIndex: 'viewInitCount',
                    width: '90px',
                    align: 'center'
                },
                {
                    title: '城市',
                    dataIndex: 'areaInfo',
                    align: 'center'
                },
                {
                    title: '发布日期',
                    dataIndex: 'releaseTime',
                    align: 'center'
                },
                {
                    title: '操作',
                    key: 'action',
                    scopedSlots: { customRender: 'action' }
                }
            ],
            searchForm: {
                keyword: '',
                list: [], // 城市
                startTime: '', // 发布开始时间
                endTime: '', // 发布结束时间
                timeType: 2,
                page: 1,
                limit: 20,
                cateId: [] // 分类id
            },
            fieldNames: {
                label: 'name',
                value: 'name',
                children: 'children'
            },
            dateValue: [], // 日期
            categoryValue: [] // 分类选择的值
        };
    },
    computed: {
        ...mapState({
            categoryList: (state) => {
                return state.category.categoryList;
            }
        }),
        areaData() {
            if (process.server) return [];
            if (this.$store.state.area.areaData) {
                return this.$store.state.area.areaData;
            } else {
                this.$store.dispatch('area/getArea');
            }
            return [];
        }
    },
    created() {
        this.$store.dispatch('category/getCategory');
    },
    methods: {
        // 根据条件查询列表数据
        seachFun() {
            this.$emit('search', this.searchForm);
        },
        // 重置form表单
        resetForm() {
            this.searchForm.startTime = '';
            this.searchForm.endTime = '';
            this.dateValue = [];
            this.categoryValue = [];
            this.$refs.searchFormRef.resetFields();
            this.$emit('search', this.searchForm);
        },
        // 分类切换
        categoryChange(val) {
            this.searchForm.cateId = val[val.length - 1];
        },
        // 日期选择
        onDateChange(val, dateString) {
            this.searchForm.startTime = dateString[0];
            this.searchForm.endTime = dateString[1];
        },
        // 分页切换
        changeTable(pagination, filters, sorter, { currentDataSource }) {
            this.searchForm.page = pagination.current;
            this.$emit('search', this.searchForm);
        },
        // 跳转商品详情
        seeProductDetail(row) {
            this.$router.push({
                path: `/quotation-price/${row.id}/quotation-price-detail`
            });
        }
    }
};
</script>

<style scoped lang="less"></style>
