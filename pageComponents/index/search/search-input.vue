<!--搜索组件-->
<template>
    <div v-click-outside="handleClose">
        <div class="search-box flex">
            <input
                ref="getFocus"
                v-model="keyword"
                type="text"
                placeholder="请输入产品名称 品牌 型号 订货编号"
                @keyup.enter="keyup()"
                @input="inputFun"
                @click="openHistory()"
            />
            <div class="input-btn flex flex-v-c flex-r-c" @click.stop="search">
                <img src="@/assets/images/index/search-icon.png" class="mr-4" alt="" /> 搜索
            </div>
            <!-- 搜索历史 -->
            <div v-if="isHistoryShow" class="history-box">
                <history-search @clsoeHistory="clsoeHistory"></history-search>
            </div>
            <!-- 用户输入 -->
            <div v-if="fiflterShow" class="history-box">
                <fiflter-search :fiflter-list-arr="fiflterListArr"></fiflter-search>
            </div>
        </div>
    </div>
</template>

<script>
import clickOutside from '../common/index';
import HistorySearch from './history-search.vue';
import FiflterSearch from './fiflter-search.vue';
import { debounce } from '@/utils';
export default {
    components: {
        HistorySearch,
        FiflterSearch
    },
    directives: {
        clickOutside
    },
    data() {
        return {
            isHistoryShow: false,
            fiflterShow: false,
            keyword: '', // 搜索关键字
            fiflterListArr: [] // 模糊关联列表
        };
    },
  mounted() {
    this.keyword = this.$route.query.keyword;
  },
    methods: {
        onSearch(e) {
            console.log(e);
        },
        // 输入事件
        inputFun(val) {
            if (!this.keyword) {
                this.fiflterShow = false; // 打开过滤弹窗
                this.isHistoryShow = true; // 关闭搜索历史
                this.fiflterListArr = [];
                return;
            }
            this.vagueSeach();
        },
        // 输入键盘事件
        keyup() {
            this.$store.commit('user/SET_HISTORYLIST', this.keyword);
            window.location.href = `${window.location.origin}/product?keyword=${this.keyword}`;
        },
        // 根据关键字模糊查询
        vagueSeach: debounce(async function () {
            if (!this.keyword) return;
            const res = await this.$api.product.getSearchVagueApi(this.keyword);
            if (res.length) {
                this.handleText(res);
            } else {
                this.fiflterListArr = [];
            }
        }, 500),
        // 关键字更换颜色
        handleText(arr) {
            const searchList = [];
            // 遍历所有对话文本内容
            for (let i = 0; i < arr.length; i++) {
                let item = arr[i];
                // 当对话内容中有包含搜索框中的字符串时
                if (item.includes(this.keyword)) {
                    item = item.replaceAll(this.keyword, "<font  style='color:red'>" + this.keyword + '</font>'); // 替换所有搜索找到的关键字 更换颜色
                    searchList.push(item);
                }
            }
            this.fiflterListArr = searchList;
            if (this.fiflterListArr.length) {
                this.fiflterShow = true; // 打开过滤弹窗
                this.isHistoryShow = false; // 关闭搜索历史
            }
        },
        // 搜索方法
        search() {
            this.$store.commit('historyList/SET_HISTORYLIST', this.keyword);
            window.location.href = `${window.location.origin}/product?keyword=${this.keyword}`;
        },
        // 获取焦点
        openHistory() {
            if (this.isHistoryShow) return;
            this.isHistoryShow = true;
        },
        // 关闭搜索历史弹框
        clsoeHistory() {
            this.isHistoryShow = false;
        },
        // 自定义指令关闭
        handleClose() {
            this.isHistoryShow = false;
            this.fiflterShow = false;
        }
    }
};
</script>
<style lang="less" scoped>
.search-box {
    input {
        width: 452px;
        height: 40px;
        border: 2px solid #65c3b8;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        outline: none; // 去除选中状态边框
        outline-color: #65c3b8; //设置点击后边框为蓝色
        color: @main-black;
        font-size: 14px;
        padding: 0 16px;
        box-sizing: border-box;
    }
    input:focus {
        border-top-left-radius: 5px !important;
        border-bottom-left-radius: 5px !important;
    }
    input::input-placeholder {
        color: rgba(0, 8, 22, 0.24);
    }
    .input-btn {
        width: 100px;
        height: 40px;
        background: #65c3b8;
        text-align: center;
        line-height: 40px;
        color: white;
        font-size: 16px;
        font-weight: bold;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        cursor: pointer;
        img {
            display: block;
        }
        &:active {
            opacity: 0.9;
        }
    }
    position: relative;
    .history-box {
        position: absolute;
        top: 40px;
        left: 0;
        z-index: 10;
    }
}
</style>
