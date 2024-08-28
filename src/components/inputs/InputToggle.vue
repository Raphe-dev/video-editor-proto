<template>
    <div class="flex justify-between items-center w-full h-full"
         :class="vertical ? 'flex-col' : 'flex-row'">
        <div v-for="(option, key) in val"
             :key="key"
             :id="`toggle-${key}`"
             :class="[disabled ? 'text-gray' : `text-${color}`, `text-${size}`]"
             class="flex flex-1 items-center">
            <svg-icon :icon="option.icon"
                      class="p-1"
                      :class="{'text-accent': option.toggle, 'hover:cursor-pointer': !disabled}"
                      @click="setVal(key)"/>
            <slot :name="key"></slot>

        </div>
    </div>
</template>

<script>
    /**
     * Options: {
     *     Key : {
     *         *icon: String
     *         toggle: Bool
     *     }
     * }
     **/
    export default {
        name: 'InputToggle',
        props: {
            value: {
                type: Object,
            },
            color: {
                type: String,
                default: 'black'
            },
            options: {
                type: Object,
            },
            size: {
                type: String,
                validator: val => [ 'xs', 'sm', 'base', 'md', 'lg' ].includes(val),
                default: 'base'
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
            },
            max: {
                type: Number
            }
        },
        data: function() {
            return {
                val: this.options || this.value
            };
        },
        beforeMount(){
            Object.values(this.val).forEach(option => {
                if(!option['toggle']) {
                    this.$set(option, 'toggle', false)
                }
            })
        },
        computed:{
            count(){
                return Object.values(this.val).filter(val => val.toggle).length;
            }
        },
        watch: {
            val() {
                this.emitInput();
            },
        },
        methods: {
            setVal(option) {
                if(!this.disabled){
                    if(this.required) {
                        if(this.val[option].toggle) {
                            if(this.count > 1) {
                                this.val[option].toggle = false;
                            }
                        } else {
                            this.val[option].toggle = true;
                        }
                    } else if(this.max) {
                        if(this.count < this.max || this.val[option].toggle){
                            this.val[option].toggle = !this.val[option].toggle;
                        } else {
                            if(this.max === 1){
                                Object.values(this.val).map(val => {
                                    if(val !== this.val[option]){
                                        val.toggle = false
                                    } else {
                                        val.toggle = !val.toggle
                                    }
                                })
                            }
                        }
                    } else {
                        this.val[option].toggle = !this.val[option].toggle;
                    }
                    this.emitInput();
                }
            },
            emitInput() {
                this.$emit('input', this.val);
            }
        }
    };
</script>
