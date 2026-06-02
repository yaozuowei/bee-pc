<!--分类组件-->
<template>
    <div class="scrollbar-box category">
        <div v-for="val in treeCat" :key="val.id" class="category-item mb-12">
            <div class="category-item-title flex flex-v-c mb-4 text-color-black font-bold">
                <img :src="val.img" class="mr-4" alt="" />{{ val.name }}
            </div>
            <div class="flex flex-w pl-20">
                <div
                    v-for="(item, index) in val.children"
                    :key="index"
                    class="category-item-child mr-8 mb-4 text-color-01"
                    @click="toProductList(item)"
                >
                    {{ item.name }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        treeCat: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            categoryDatas: [
                {
                    id: 10,
                    title: '苗木',
                    img: require('@/assets/images/index/category/category-01.png'),
                    children: []
                },
                {
                    id: 20,
                    title: '面材',
                    img: require('@/assets/images/index/category/category-02.png'),
                    children: []
                },
                {
                    id: 50,
                    title: '水电安装',
                    img: require('@/assets/images/index/category/category-03.png'),
                    children: []
                },
                {
                    id: 40,
                    title: '金属构件',
                    img: require('@/assets/images/index/category/category-04.png'),
                    children: []
                },
                {
                    id: 30,
                    title: '地材',
                    img: require('@/assets/images/index/category/category-05.png'),
                    children: []
                },
                {
                    id: 60,
                    title: '小品',
                    img: require('@/assets/images/index/category/category-06.png'),
                    children: []
                },
                {
                    id: 70,
                    title: '辅材',
                    img: require('@/assets/images/index/category/category-07.png'),
                    children: []
                },
                {
                    id: 80,
                    title: '劳务机械',
                    img: require('@/assets/images/index/category/category-04.png'),
                    children: []
                }
            ]
        };
    },
    watch: {
        treeCat: {
            handler() {
                console.log(this.treeCat, 'this.treeCat');
                this.treeCat.forEach((e) => {
                    const i = this.categoryDatas.findIndex((r) => r.id === e.id);
                    if (i >= 0) {
                        e.img = this.categoryDatas[i].img;
                    }
                });
            },
            immediate: true,
            deep: true
        }
    },
    // 点击分类跳转商品列表
    methods: {
        toProductList(item) {
            this.$router.push({
                path: '/product',
                query: {
                    cat2Id: item.id
                }
            });
        }
    }
};
</script>
<style lang="less" scoped>
.category {
    width: 240px;
    height: 506px;
    background: #ffffff;
    border-radius: 8px;
    font-size: 12px;
    padding: 16px 0 16px 16px;
    box-sizing: border-box;
    .category-item-title {
        img {
            width: 16px;
            height: 16px;
            display: block;
        }
    }
    .category-item-child:hover {
        color: @main-color;
        cursor: pointer;
    }
}
</style>
