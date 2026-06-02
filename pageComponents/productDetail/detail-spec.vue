<!--商品规格组件-->
<template>
    <div class="spec-box">
        <div v-for="(item, index) in mySpecifications" :key="index" class="mb-8">
            <div class="font-12 text-color-01 mb-8">{{ item.skuName }}</div>
            <div class="item-box flex flex-w">
                <div
                    v-for="(spec, val) in item.skuList"
                    :key="val"
                    class="mr-8 mb-8"
                    @click="val !== item.sidx ? selectSku(index, val, item.skuName, spec.title, spec.able) : ''"
                >
                    <div :class="[val === item.sidx ? 'spec-item-selectd' : '', spec.able ? '' : 'spec-item-disabled']" class="spec-item">
                        {{ spec.title }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        popupData: {
            type: Object,
            default: () => ({})
        }
    },

    data() {
        return {
            current: 0,
            mySpecifications: [],
            selectedIndex: 0, // 当前选择的skuindex
            selectSpec: {}
        };
    },
    watch: {
        'popupData.specifications': {
            handler() {
                if (JSON.stringify(this.popupData) !== '{}') {
                    this.initData();
                }
            },
            immediate: true
        }
    },
    methods: {
        initData() {
            const popupData = this.popupData;
            // console.log(popupData, 'popupData');
            if (!popupData?.specifications.length) return;
            // 商品sku集合
            this.mySpecifications = JSON.parse(JSON.stringify(popupData.specifications));
            // 初始化选择数据的对象
            this.mySpecifications.forEach((item) => {
                this.$set(this.selectSpec, item.skuName, '');
            });
            const selects = popupData.combinations[popupData.selectedIndex].skuValue.split(',');
            // let flag = true;
            this.mySpecifications = this.mySpecifications.map((item, idx) => {
                const sidx = item.skuList.indexOf(selects[idx]);
                // 赋值默认选中的规格
                this.selectSpec[item.skuName] = item.skuList[sidx];
                return {
                    skuName: item.skuName,
                    sidx,
                    skuList: item.skuList.map((r) => {
                        return {
                            title: r,
                            able: item.skuList.length < 2 ? true : this.isAble(item.title, r)
                        };
                    })
                };
            });
            this.mySpecifications.forEach((item) => {
                item.skuList.forEach((its) => {
                    its.able = this.isAble(item.skuName, its.title);
                });
            });
        },
        // 判断规格是否可以被选择  核心函数 key当前的规格的title   value规格值
        isAble(key, value) {
            // 深拷贝 避免被影响
            const copySelectSpec = JSON.parse(JSON.stringify(this.selectSpec));
            // 用对象的好处就在这了 直接赋值当前验证项
            copySelectSpec[key] = value;
            // 用数组的 some 方法 效率高 符合条件直接退出循环
            const flag = this.popupData.combinations.some((item) => {
                // 条件判断 核心逻辑判断
                // console.log(item);
                const specs = item.skuValue.split(',');
                let i = 0;
                // 这个for in 循环的逻辑就对底子不深的人来说就看不懂了 原理就是循环已经选中的 和 正在当前对比的数据 和 所有的sku对比 只有当前验证的所有项满足sku中的规格或者其他规格为空时 即满足条件 稍微有点复杂 把注释的调试代码打开就调试下就可以看懂了
                for (const k in copySelectSpec) {
                    //  console.log(copySelectSpec[k])  // 注释的调试看逻辑代码
                    if (copySelectSpec[k] !== '' && specs.includes(copySelectSpec[k])) {
                        i++;
                    } else if (copySelectSpec[k] === '') {
                        i++;
                    }
                }
                // 符合下面条件就退出了 不符合会一直循环知道循环结束没有符合的条件就 return false 了
                // console.log(i) // 注释的调试看逻辑代码
                return i === this.mySpecifications.length;
            });
            // console.log(flag);
            return flag;
        },
        // 选择sku后的操作
        selectSku(sIndex, index, key, value, able) {
            if (!able) return;
            this.mySpecifications[sIndex].sidx = index; // 改变选中样式
            // 初始化选择数据的对象
            this.mySpecifications.forEach((item) => {
                this.$set(this.selectSpec, item.skuName, '');
            });
            this.selectSpec[key] = value; // 赋值当前选中的规格
            this.mySpecifications.forEach((item) => {
                item.skuList.forEach((its) => {
                    its.able = this.isAble(item.skuName, its.title);
                });
            });
            // 获取当前选择sku的规则
            const selectInfo = this.mySpecifications.reduce((prev, cur) => {
                if (prev) {
                    return prev + ',' + cur.skuList[cur.sidx]?.title;
                } else {
                    return cur.skuList[cur.sidx]?.title;
                }
            }, '');
            // 找到当前选择sku的下标
            this.selectedIndex = this.popupData.combinations.findIndex((item) => item.skuValue === selectInfo);
            if (this.selectedIndex > -1) {
                this.$emit('selectSpec', { skuData: this.popupData.combinations[this.selectedIndex] });
            } else {
                this.$emit('selectSpec', false);
            }
        }
    }
};
</script>
<style lang="less">
.spec-box {
    padding-bottom: 8px;
    border-bottom: solid 1px rgba(0, 8, 22, 0.08);
}
.spec-item {
    height: 32px;
    border-radius: 4px;
    border: 1px solid rgba(0, 8, 22, 0.12);
    text-align: center;
    line-height: 32px;
    padding: 0 16px;
    cursor: pointer;
    &:hover {
        background: rgba(101, 195, 184, 0.04);
        border: 1px solid #65c3b8;
        color: @main-color;
    }
}
.spec-item-disabled {
    color: #c0c4cc;
    cursor: not-allowed;
    background-image: none;
    background-color: #fff;
    border-color: #c0c4cc;
}
.spec-item-selectd {
    background: rgba(101, 195, 184, 0.04);
    border: 1px solid #65c3b8;
    color: @main-color;
}
</style>
