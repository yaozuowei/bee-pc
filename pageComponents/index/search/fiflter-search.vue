<!--搜索模糊关联-->
<template>
    <div class="history scrollbar-box">
        <div class="history-header">
            <div
                v-for="(item, index) in fiflterListArr"
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
                <!-- eslint-disable-next-line vue/no-v-html -->
                <div class="line-1 flex-1 text-l" style="width: 0" v-html="item"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        fiflterListArr: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            current: null // 当前选中
        };
    },
    methods: {
        // 鼠标移入事件
        mouseenterFun(index) {
            this.current = index;
        },
        // 选择历史记录去搜索
        toSearch(item) {
            item = item.replace(/<font {2}style='color:red'>/gi, '');
            item = item.replace(/<\/font>/gi, '');
            this.$store.commit('user/SET_HISTORYLIST', item);
            window.location.href = `${window.location.origin}/product?keyword=${item}`;
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
    padding: 8px 0;
    font-size: 12px;
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
