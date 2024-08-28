<template>
    <div class="flex justify-between" :class="[vertical ? 'flex-col' : 'flex-row', disabled ? 'text-gray' : 'text-black', `text-${size}`]">
        <div v-for="option in options"
             :id="`radio-${option}`"
             :key="option.label"
             class="flex justify-between items-center"
             :class="[(labelPosition === 'top' || labelPosition === 'bottom') ? 'flex-col' : 'flex-row', vertical ? 'py-1' : 'px-1']"
             @click="setVal(option)">
            <span v-if="labelPosition === 'top' || labelPosition === 'left'" :class="labelPosition === 'left' ? 'px-1' : 'py-1'">
                {{ option }}
            </span>
            <div class="self-center">
                <svg-icon v-if="val !== option"
                          :class="disabled ? '' : 'hover:cursor-pointer'"
                          :icon="['far', 'circle']"/>

                <svg-icon v-else
                          :class="disabled ? '' : 'hover:cursor-pointer'"
                          :icon="['far', 'dot-circle']"/>
            </div>
            <span v-if="labelPosition === 'bottom' || labelPosition === 'right'" :class="labelPosition === 'right' ? 'px-1' : 'py-1'">
                {{ option }}
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'InputRadio',
        props: {
            value: {},
            options: {
                type: Array,
                default: () => []
            },
            label: {
                type: String,
                default: ''
            },
            labelPosition: {
                type: String,
                validator: val => [ 'top', 'bottom', 'left', 'right' ].includes(val),
                default: 'top'
            },
            size: {
                type: String,
                validator: val => [ 'xs', 'sm', 'base', 'md', 'lg' ].includes(val),
                default: 'sm'
            },
            vertical: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            required: {
                type: Boolean,
                default: false
            }
        },
        data: function() {
            return {
                val: this.value
            };
        },
        watch: {
            val() {
                this.emitInput();
            }
        },
        methods: {
            setVal(option) {
                if(!this.disabled){
                    this.required ?
                        this.val = option :
                        (this.val === option ? this.val = null : this.val = option);
                    this.emitInput();
                }
            },
            emitInput() {
                this.$emit('input', this.val);
            }
        }
    };
</script>
