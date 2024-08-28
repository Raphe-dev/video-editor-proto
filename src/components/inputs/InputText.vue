<template>
    <div class="flex items-center " :class="disabled ? 'text-gray': 'text-base'">
        <div v-if="label && labelPosition === 'left'" class="mr-1">
            {{ label }}
        </div>

        <div class="flex items-center min-w-12" :class="iconPosition === 'top' ? 'flex-col' : ''">
            <div v-if="label && labelPosition === 'top'" class="mb-1">
                {{ label }}
            </div>

            <svg-icon v-if="iconPosition !== 'right'" :icon="icon"
                      :class="[iconPosition === 'top' ? 'mb-1' : 'mr-2', iconPosition === 'in' ? 'absolute right-18' : '']"
                      class="text-base"/>

            <div :style="width ? `width: ${width}` : ''" id="input-text-wrapper">
                <input ref="input"
                       id="input-text"
                       v-model="val"
                       class="rounded-md border border-solid border-gray-dark p-1 pl-2 text-sm focus:border-accent"
                       :class="disabled ? 'bg-white-darker text-gray' : 'bg-white-lightest text-black hover:cursor-not-pointer'"
                       :disabled="disabled"
                       :placeholder="placeholder"
                       type="text"
                       :maxlength="max"
                       @input="emitInput">
            </div>
            <div v-if="label && labelPosition === 'right'" class="ml-1">
                {{ label }}
            </div>
            <svg-icon v-if="iconPosition === 'right'" :icon="icon" class="ml-3 text-black"/>
        </div>
    </div>
</template>

<script>
    export default {

        name: 'InputText',
        props: {
            value: {},
            icon: {
                type: [String, Array],
                default: ''
            },
            iconPosition: {
                type: String,
                validator: (val) => [ 'top', 'left', 'right' ].includes(val),
                default: 'top'
            },
            label: {
                type: String,
                default: ''
            },
            labelPosition: {
                type: String,
                validator: (val) => [ 'top', 'left', 'right' ].includes(val),
                default: 'left'
            },
            placeholder: {
                type: String,
                default: null
            },
            min: {
                type: Number,
                default: 1
            },
            max: {
                type: Number,
                default: 1000
            },
            validator: {},
            width: {
                type: String
            },
            disabled: {
                type: Boolean,
                default: false
            },
        },
        data: function () {
            return {
                val: this.value
            }
        },
        methods: {
            emitInput($event) {
                if($event.target.value.length > this.max) {
                    return;
                }
                if(this.validator) {
                    this.val = this.validator($event.target.value);
                } else {
                    this.val = $event.target.value;
                }
                this.$emit('input', this.val);
            },
        }
    };
</script>
