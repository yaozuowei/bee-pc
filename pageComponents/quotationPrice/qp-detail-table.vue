<template>
    <div class="content">
        <a-form-model ref="searchFormRef" :model="searchForm" layout="inline" label-align="right">
            <a-form-model-item label="商品名称" prop="keyword">
                <a-input v-model="searchForm.keyword" placeholder="请输入商品名称" />
            </a-form-model-item>
            <a-form-model-item label="商品规格" prop="specMapList">
                <a-input-group compact>
                    <a-select v-model="specMap.specName" style="width: 100px" placeholder="请选择">
                        <a-select-option v-for="(item, index) in detailData.specName" :key="index" :value="item">
                            {{ item }}
                        </a-select-option>
                    </a-select>
                    <a-input v-model="specMap.start" style="width: 100px; text-align: center" type="number" placeholder="请输入" />
                    <a-input style="width: 30px; border-left: 0; pointer-events: none; background-color: #fff" placeholder="~" disabled />
                    <a-input
                        v-model="specMap.end"
                        style="width: 100px; text-align: center; border-left: 0"
                        type="number"
                        placeholder="请输入"
                    />
                </a-input-group>
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
            bordered
            size="middle"
            @change="changeTable"
        >
            <span slot="customTitle"><a-icon type="smile-o" /> 标题</span>
            <span slot="action">
                <a @click="seeProductDetail">查看</a>
            </span>
        </a-table>
    </div>
</template>

<script>
import { FormModel, Input, Select, Table } from 'ant-design-vue';
import { mapState } from 'vuex';
export default {
    components: {
        AFormModel: FormModel,
        AFormModelItem: FormModel.Item,
        AInput: Input,
        AInputGroup: Input.Group,
        ATable: Table,
        ASelect: Select,
        ASelectOption: Select.Option
    },
    props: {
        productList: {
            type: Array,
            default: () => []
        },
        detailData: {
            type: Object,
            default: () => ({})
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
                    title: this.detailData.title || '-',
                    align: 'center',
                    children: [
                        {
                            title: '商品名称',
                            dataIndex: 'name',
                            key: 'name',
                            width: '200px',
                            align: 'center'
                        },
                        {
                            title: '规格',
                            align: 'center',
                            children: []
                        },
                        {
                            title: '价格',
                            children: []
                        }
                    ]
                }
            ],
            searchForm: {
                page: 1,
                limit: 20,
                specMapList: [],
                keyword: ''
            },
            specMap: {
                start: null,
                end: null,
                specName: undefined
            }
        };
    },
    computed: {
        ...mapState({
            categoryList: (state) => {
                return state.category.categoryList;
            }
        })
    },
    watch: {
        detailData: {
            handler() {
                if (process.server) return;
                if (!this.detailData) return;
                if (this.detailData?.specName && this.detailData?.specName.length) {
                    this.columns[0].children[1].children = this.detailData.specName.map((r, i) => {
                        return { title: r, dataIndex: `specMap[${i}].value`, align: 'center' };
                    });
                }
                if (this.detailData?.areaName && this.detailData?.areaName.length) {
                    this.columns[0].children[2].children = this.detailData.areaName.map((r, i) => {
                        return { title: r + '市场价格', dataIndex: `priceList[${i}].viewPrice`, align: 'center' };
                    });
                }
            },
            deep: true,
            immediate: true
        }
    },
    created() {
        this.$store.dispatch('category/getCategory');
    },
    methods: {
        onChange() {},
        // 根据条件查询列表数据
        seachFun() {
            if (!this.specMap.specName) {
                this.searchForm.specMapList = [];
            } else {
                this.searchForm.specMapList = [this.specMap];
            }
            console.log(this.searchForm, 'getQuoPriceDetails');
            this.$emit('search', this.searchForm);
        },
        // 重置form表单
        resetForm() {
            this.$refs.searchFormRef.resetFields();
            Object.keys(this.specMap).forEach((r) => {
                this.specMap[r] = null;
            });
            this.specMap.specName = undefined;
            this.$emit('search', this.searchForm);
        },
        // 分页切换
        changeTable(pagination, filters, sorter, { currentDataSource }) {
            this.searchForm.page = pagination.current;
            this.$emit('search', this.searchForm);
        },
        // 跳转商品详情
        seeProductDetail() {
            this.$router.push({
                path: '/quotation-price/1/quotation-price-detail'
            });
        }
    }
};
</script>

<style scoped lang="less"></style>
