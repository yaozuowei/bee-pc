<!-- 活动倒计时组件 -->
<template>
    <div>
        <div class="content flex">
            <span v-if="tagName" class="mr-16"> {{ tagName }}:</span>
            <div class="content-item">
                {{ timeList[0] }}
            </div>
            <div class="content-space">天</div>
            <div class="content-item">
                {{ timeList[1] }}
            </div>
            <div class="content-space">:</div>
            <div class="content-item">
                {{ timeList[2] }}
            </div>
            <div class="content-space">:</div>
            <div class="content-item">
                {{ timeList[3] }}
            </div>
        </div>
    </div>
</template>
<script>
import { countDownTimeMore } from '@/utils';
let timer;
export default {
    props: {
        time: {
            type: [Number, String],
            default: 0
        },
        tagName: {
            type: [String],
            default: ''
        }
    },
    data() {
        return {
            timeList: ['00', '00', '00', '00'],
            btImg: this.$imageUrl + 'time-bg.png',
            timer: null
        };
    },
    created() {
        this.init();
    },
    // 离开页面后清除定时器
    destroyed() {
        clearInterval(timer);
        timer = null;
    },
    methods: {
        init() {
            timer = setInterval(() => {
                countDownTimeMore(this.time, this.getTimeNumber);
            }, 1000);
        },
        getTimeNumber(val) {
            const str = val.split(':');
            this.timeList = str;
            const flag = str.every((r) => r === '00');
            if (flag) {
                this.$emit('timeEndFun');
                clearInterval(timer);
            }
        }
    }
};
</script>
<style lang="less" scoped>
.content-item {
    width: 20px;
    height: 20px;
    background: #ffffff;
    border-radius: 4px;
    text-align: center;
    line-height: 20px;
    font-size: 12px;
    box-sizing: border-box;
    color: #fe4a4a;
}

.content-space {
    margin: 0 5px;
}
</style>
