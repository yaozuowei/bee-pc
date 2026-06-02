<!--搜索历史-->
<template>
    <div v-if="historyList.length" class="history">
        <div class="history-header scrollbar-box">
            <div
                v-for="(item, index) in historyList"
                :key="index"
                class="history-item flex flex-r-b flex-v-c"
                :class="[current === index ? 'history-item-selectd' : '']"
                @mouseenter="
                    (e) => {
                        mouseenterFun(index);
                    }
                "
                @click.stop="toSearch(item)"
            >
                <div class="line-1 flex-1 text-l" style="width: 0">{{ item }}</div>
                <div v-if="!(current === index)">搜索历史</div>
                <div v-else style="color: #fe4a4a" @click.stop="deleteHistory(index)">删除</div>
            </div>
        </div>

        <div class="history-footer text-r">
            <a-popconfirm title="确认全部删除吗？" placement="bottom" @cancel.stop="() => {}" @confirm.stop="deleteAll">
                <span>全部删除</span></a-popconfirm
            >
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    data() {
        return {
            current: null // 当前选中
        };
    },
    computed: {
        ...mapState({
            historyList(state) {
                return state.historyList.historyList;
            }
        })
    },
    methods: {
        // 鼠标移入事件
        mouseenterFun(index) {
            this.current = index;
        },
        // 选择历史记录去搜索
        toSearch(item) {
            window.location.href = `${window.location.origin}/product?keyword=${item}`;
        },
        // 删除记录
        deleteHistory(index) {
            this.$store.commit('historyList/DELETE_HISTORY_ITEM', index);
            // this.$emit('clsoeHistory');
        },
        // 删除全部历史记录
        deleteAll() {
            this.$store.commit('historyList/SET_HISTORY_EMPTY');
            // this.$emit('clsoeHistory');
        },
        mouseleaveFun() {
            this.$emit('clsoeHistory');
        }
    }
};
</script>
<style lang="less" scoped>
.history {
    width: 552px;
    height: 213px;
    background: #ffffff;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    color: #8a929f;
    padding-top: 8px;
    font-size: 12px;
    .history-footer {
        font-size: 12px;
        color: #8a929f;
        height: 36px;
        padding: 0 16px;
        box-sizing: border-box;
        line-height: 36px;
        span {
            cursor: pointer;
        }
    }
    .history-header {
        height: 170px;

        overflow-y: auto;
        border-bottom: solid 1px rgba(0, 8, 22, 0.12);
    }
    .history-item {
        height: 28px;
        padding: 0 16px;
        box-sizing: border-box;
        cursor: pointer;
    }
    .history-item-selectd {
        background: rgba(101, 195, 184, 0.1);
        color: @main-color;
    }
}
</style>
