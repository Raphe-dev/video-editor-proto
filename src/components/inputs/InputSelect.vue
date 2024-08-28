<template>
    <div class="flex items-end" :class="{'text-gray': disabled}">
        <span v-if="label" class="pr-2 text-sm">
            {{ label }}
        </span>
        <div class="relative flex items-center text-base" :class="iconPosition === 'top' ? 'flex-col' : ''">
            <svg-icon v-if="iconPosition !== 'right'" :icon="icon"
                      :class="[iconPosition === 'top' ? 'mb-1' : 'mr-2', iconPosition === 'in' ? 'absolute top-1 left-1 text-base' : '']"/>

            <select v-model="val"
                    id="input-select"
                    class="flex justify-center h-6 p-1/2 w-auto min-w-8 rounded-md border border-solid border-gray-dark text-sm"
                    :class="[iconPosition === 'in' ? 'pl-5' : '', disabled ? 'bg-white-darker text-gray' : 'bg-white-lightest text-black hover:cursor-not-pointer']"
                    :style="width ? `width: ${width}` : ''"
                    :disabled="disabled"
                    @input="emitInput">
                <option v-for="option in options"
                        :key="option.value"
                        :value="option.value"
                        :disabled="option.disabled"
                        :default="option.default">
                    {{ option.label }}
                </option>
            </select>
            <svg-icon v-if="iconPosition === 'right'" :icon="icon" class="ml-3"/>
        </div>
    </div>
</template>

<script>
    export default {

        name: 'InputSelect',
        props: {
            value: {},
            icon: {
                type: [String, Array],
                default: ''
            },
            iconPosition: {
                type: String,
                validator: (val) => [ 'top', 'left', 'right', 'in' ].includes(val),
                default: 'top'
            },
            label: {
                type: String,
                default: ''
            },
            options: {
                type: Array,
                default: () => []
            },
            validator: {},
            width: {
                type: String
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data: function () {
            return {
                val: this.value
            }
        },
        watch: {
            value(to){
                this.val = to;
            }
        },
        beforeMount() {
            if(!this.val) {
                this.options.forEach( i => {
                    if(i.default){
                        this.val = i.value
                    }
                })
            }
        },
        methods: {
            emitInput() {
                this.$nextTick(() => {
                    if(this.validator) {
                        this.$emit('input', this.validator(this.val));
                    } else {
                        this.$emit('input', this.val);
                    }
                })
            }
        }
    };
</script>
