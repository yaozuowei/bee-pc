<template>
    <a-select v-model="value" class="input-item" placeholder="请选择" :size="size" v-bind="selectOptions" :allow-clear="showClear">
        <a-select-option v-for="item in getOptions" :key="item.code" :value="item.code" v-bind="itemOptions">{{
            item.name
        }}</a-select-option>
    </a-select>
</template>

<script>
import { Select } from 'ant-design-vue';

export default {
    name: 'BeeSelect',
    components: {
        ASelect: Select,
        ASelectOption: Select.Option
    },
    model: {
        prop: 'modelValue',
        event: 'change'
    },
    props: {
        modelValue: {
            require: true,
            type: [Number, String, Array],
            default: undefined
        },
        code: {
            type: String,
            default: ''
        },
        lists: {
            type: Array,
            default: () => []
        },
        selectOptions: {
            type: Object,
            default: () => ({})
        },
        itemOptions: {
            type: Object,
            default: () => ({})
        },
        size: {
            type: String,
            default: 'large'
        },
        showClear: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            dictData: {}
        };
    },
    computed: {
        value: {
            get() {
                if (Array.isArray(this.modelValue)) {
                    return this.modelValue.map((item) => `${item}`);
                }
                return this.modelValue === undefined ? undefined : `${this.modelValue}`;
            },
            set(val) {
                this.$emit('change', val);
            }
        },
        getOptions() {
            if (process.server) return [];
            if (this.code) {
                const dictData = this.$store.getters['dict/getDictItem'](this.code);
                if (!dictData) {
                    this.$store.dispatch('dict/getDict');
                } else {
                    return dictData;
                }
            } else if (this.lists && this.lists > 0) {
                return this.lists;
            }
            return [];
        }
    }
};
</script>
<style scoped lang="less"></style>
