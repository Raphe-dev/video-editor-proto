<template>
    <div class="flex items-center justify-between py-1"
         :class="{'text-gray': disabled,'flex-col justify-center': labelPosition === 'top'}">
        <div v-if="(label && labelPosition === 'left') || labelPosition === 'top'"
             :class="[labelPosition === 'left' ? 'mr-1' : 'mb-1', `text-${size}`]"
             @click="setVal"
             id="checkbox-label">
            {{ label }}
        </div>

        <div class="px-1 self-center" :class="`text-${size}`" id="checkbox" @click="setVal">
            <svg-icon v-if="val" :icon="['far', 'check-square']" :class="disabled ? '' : 'hover:cursor-pointer'"/>
            <svg-icon v-else :icon="['far', 'square']" :class="disabled ? '' : 'hover:cursor-pointer'"/>
        </div>

        <div v-if="label && labelPosition === 'right'" class="ml-1" @click="val = !val">
            {{ label }}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'InputCheckbox',
        props: {
            value: {
                type: Boolean,
                default: false
            },
            label: {
                type: String,
                default: ''
            },
            labelPosition: {
                type: String,
                validator: val => [ 'top', 'left', 'right' ].includes(val),
                default: 'left'
            },
            size: {
                type: String,
                validator: val => [ 'xs', 'sm', 'base', 'md', 'lg' ].includes(val),
                default: 'sm'
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
            val() {
                this.emitInput();
            }
        },
        methods: {
            setVal() {
                if(!this.disabled) this.val = !this.val;
            },
            emitInput() {
                this.$emit('input', this.val);
            }
        }
    };
</script>
