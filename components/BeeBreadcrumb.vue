<template>
    <div class="flex felx-v-c">
        <div v-for="(item, index) in items" :key="item.name" class="flex felx-v-c">
            <img v-if="index !== 0" class="icon ml-8 mr-8" src="@/assets/images/arrow-right.png" alt="" />
            <nuxt-link v-if="item.path" :to="item.path" class="text text-color-black font-12">{{ item.name }}</nuxt-link>
            <div v-else class="text line-1 text-color-black font-12">{{ item.name }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BeeBreadcrumb',
    props: {
        items: {
            type: Array,
            default: () => []
        }
    }
};
</script>
<style scoped lang="less">
.icon {
    width: 16px;
    height: 16px;
}
.text {
    line-height: 16px;
    max-width: 200px;
}
</style>
