<template>
    <a-cascader v-model="value" v-bind="cascaderOptions" :options="areaData" :field-names="fieldNames" />
</template>

<script>
import { Cascader } from 'ant-design-vue';

export default {
    name: 'BeeAreaSelect',
    components: {
        ACascader: Cascader
    },
    model: {
        prop: 'modelValue',
        event: 'change'
    },
    props: {
        modelValue: {
            require: true,
            type: [Array],
            default: undefined
        },
        cascaderOptions: {
            type: Object,
            default: () => ({
                placeholder: '请选择'
            })
        }
    },
    data() {
        return {
            fieldNames: {
                label: 'name',
                value: 'id',
                children: 'children'
            }
        };
    },
    computed: {
        value: {
            get() {
                return this.modelValue;
            },
            set(val) {
                this.$emit('change', val);
            }
        },
        areaData() {
            if (process.server) return [];
            if (this.$store.state.area.areaData) {
                return this.$store.state.area.areaData;
            } else {
                this.$store.dispatch('area/getArea');
            }
            return [];
        }
    }
};
</script>
<style scoped lang="less"></style>
