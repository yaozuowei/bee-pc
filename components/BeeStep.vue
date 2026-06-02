<template>
    <div class="flex flex-c-v">
        <div v-for="(item, index) in steps" :key="item" class="flex flex-v-c">
            <img v-if="index !== 0" class="ml-24 mr-24 arrow-icon" src="@/assets/images/arrow-right.png" />
            <div
                class="steo-item flex flex-v-c"
                :class="{
                    active: current === index
                }"
            >
                <div class="serial mr-8 font-14 flex flex-v-c flex-r-c">{{ index + 1 }}</div>
                <div :class="current === index ? 'text-color' : 'text-color-02'">{{ item }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BeeStep',
    props: {
        current: {
            type: Number,
            default: 0
        },
        steps: {
            type: Array,
            default() {
                return [];
            }
        }
    }
};
</script>
<style scoped lang="less">
.steo-item {
    &.active .serial {
        background: @main-color;
    }
    .serial {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: rgba(0, 8, 22, 0.24);
        color: #ffffff;
    }
}
.arrow-icon {
    width: 16px;
    height: 16px;
}
</style>
