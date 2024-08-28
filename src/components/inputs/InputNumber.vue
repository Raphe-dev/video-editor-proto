<template>
    <div class="flex items-center" :class="{'text-gray': disabled}">
        <div v-if="label && labelPosition === 'left'" class="mr-1 text-sm">
            {{ label }}
        </div>

        <div class="flex items-center min-w-12" :class="iconPosition === 'top' ? 'flex-col' : ''">
            <div v-if="label && labelPosition === 'top'" class="mb-1 text-sm">
                {{ label }}
            </div>

            <svg-icon v-if="iconPosition !== 'right'" :icon="icon"
                      :class="[iconPosition === 'top' ? 'mb-1' : 'mr-2', iconPosition === 'in' ? 'absolute right-18' : '']"/>

            <div class="relative" :style="width ? `width: ${width}` : ''"
                 @mouseleave="stopIncrement">
                <div v-if="symbol"
                     class="absolute text-gray-darker text-sm"
                     :style="`top: 6px; left: ${ (val >= 0 ? 12 : 10) + val.toString().length * 6}px`"
                     @click="$refs.input.focus()">
                    {{ symbol }}
                </div>

                <svg-icon icon="caret-right"
                          id="button-plus"
                          class="absolute right-1 text-gray hover:text-black text-base"
                          :class="{'hover:cursor-pointer': !disabled}"
                          style="bottom: 10px"
                          rotate="270"
                          @click="increment(true)"
                          @mousedown="startIncrement(true)"
                          @mouseup="stopIncrement" />
                <svg-icon icon="caret-right"
                          id="button-minus"
                          class="absolute right-1 text-gray hover:text-black text-base"
                          :class="disabled ? '' : 'hover:cursor-pointer'"
                          style="top: 10px"
                          rotate="90"
                          @click="increment(false)"
                          @mousedown="startIncrement(false)"
                          @mouseup="stopIncrement" />
                <input ref="input"
                       id="input-number"
                       type="number"
                       v-model="val"
                       class="rounded-md border border-solid border-gray-dark p-1 pl-2 text-sm focus:border-accent"
                       :class="disabled ? 'bg-white-darker text-gray' : 'bg-white-lightest text-black hover:cursor-not-pointer'"
                       :disabled="disabled"
                       :min="min"
                       :max="max"
                       @input="emitInput"/>
            </div>
            <div v-if="label && labelPosition === 'right'" class="ml-1">
                {{ label }}
            </div>
            <svg-icon v-if="iconPosition === 'right'" :icon="icon" class="ml-3" />
        </div>
    </div>
</template>

<script>
    export default {

        name: 'InputNumber',
        props: {
            value: {
                type: [String, Number],
                default: ''
            },
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
            min: {
                type: Number,
                default: -100000
            },
            max: {
                type: Number,
                default: 100000
            },
            symbol: {
                type: String,
                default: ''
            },
            validator: {
                type: Function,
                default : (v) => parseInt(v)
            },
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
                interval: false,
                intervalDelay: 200,
                val: this.value
            }
        },
        watch: {
            value(to){
                this.val = to;
            }
        },
        methods: {
            emitInput($event) {
                if($event.target.value > this.max) {
                    $event.target.value = this.max;
                }
                if($event.target.value < this.min) {
                    $event.target.value = this.min;
                }
                if(this.validator) {
                    this.val = this.validator($event.target.value);
                } else {
                    this.val = $event.target.value;
                }
                this.$emit('input', this.val);

            },
            increment(dir) {
                if(!this.disabled) {
                    if(dir) {
                        if(this.value + 1 > this.max) return;
                        this.val++;
                    } else {
                        if(this.value - 1 < this.min) return;
                        this.val--;
                    }
                    this.$emit('input', this.val);
                }

            },
            startIncrement(dir) {
                if(!this.disabled) {
                    if(!this.interval) {
                        this.interval = setInterval(() => {
                            this.increment(dir);
                        }, this.intervalDelay);
                    } else {
                        this.intervalDelay = 150;
                    }
                }
            },
            stopIncrement() {
                clearInterval(this.interval);
                this.interval = false;
            }
        }
    };
</script>

<style lang="scss">
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
        display: none;
        -webkit-appearance: none;
    }

    input[type=number] {
        -moz-appearance: textfield;
    }

</style>
