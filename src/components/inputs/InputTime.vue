<template>
    <div class="flex items-end" :class="{'text-gray': disabled}">
        <div class="relative flex items-center text-base" :class="iconPosition === 'top' ? 'flex-col' : ''">
            <span v-if="label" class="pr-2  text-sm">
                {{ label }}
            </span>
            <svg-icon v-if="iconPosition !== 'right'" :icon="icon"
                      :class="[iconPosition === 'top' ? 'mb-1' : 'mr-2', iconPosition === 'in' ? 'absolute top-1 left-1 text-base' : '']"/>
            <div class="w-16 rounded-md border border-solid p-1 text-sm flex items-center"
                 :class="[disabled ? 'bg-white-darker': 'bg-white-lightest', focus ? 'border-accent' : 'border-gray-dark']">
                <input type="text"
                       id="hh"
                       maxlength="2"
                       class="text-center "
                       v-model="val.hh"
                       :class="{'text-gray': disabled}"
                       :disabled="disabled"
                       @focus="focus = true"
                       @focusout="focus = false"
                       @change="handleInput($event, 'hh')"
                       @keypress="handleKeyPress">
                <span>:</span>
                <input type="text"
                       id="mm"
                       maxlength="2"
                       class="text-center"
                       v-model="val.mm"
                       :class="{'text-gray': disabled}"
                       :disabled="disabled"
                       @focus="focus = true"
                       @focusout="focus = false"
                       @change="handleInput($event, 'mm')"
                       @keypress="handleKeyPress">
                <span>:</span>
                <input type="text"
                       id="ss"
                       maxlength="2"
                       class="text-center"
                       v-model="val.ss"
                       :class="{'text-gray': disabled}"
                       :disabled="disabled"
                       @focus="focus = true"
                       @focusout="focus = false"
                       @change="handleInput($event, 'ss')"
                       @keypress="handleKeyPress">
            </div>
            <svg-icon v-if="iconPosition === 'right'" class="ml-3" :icon="icon"/>
        </div>
    </div>
</template>

<script>
    export default {

        name: 'InputTime',
        props: {
            value: {},
            icon: {
                type: [ String, Array ],
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
            validator: {},
            width: {
                type: String
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data: () => ({
            val: {
                hh: '00',
                mm: '00',
                ss: '00'
            },
            focus: false
        }),
        beforeMount() {
            if(this.value) this.val = this.value;
        },
        methods: {
            emitInput() {
                if(this.validator) {
                    this.$emit('input', this.validator(this.val));
                } else {
                    this.$emit('input', this.val);
                }
            },

            handleInput($event, key) {
                let parsedValue = parseInt($event.target.value);
                if (!parsedValue) {
                    this.val[key] = '00';
                } else if(parsedValue < 10 && $event.target.value !== '00') {
                    if(this.val[key][0] !== '0'){
                        this.val[key] = '0' + $event.target.value;
                    }
                } else if(key !== 'hh' && parsedValue > 60) {
                    this.val[key] = '60';
                }
                this.emitInput();
            },

            handleKeyPress($event) {
                if(!$event.key.match(/[0-9]/g)) {
                    $event.preventDefault();
                    return false;
                }
            }
        }
    };
</script>
