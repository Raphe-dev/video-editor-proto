<template>
    <popper ref="popper"
            trigger="clickToOpen"
            :options="{placement: 'bottom'}"
            :disabled="disabled"
            class="h-6"
            boundaries-selector="body">
        <div class="popper -full">
            <sketch-picker v-model="colors"
                           :preset-colors="presetColors"
                           disable-alpha />
        </div>

        <div slot="reference"
             class="flex items-center justify-around h-6 bg-white rounded-md border border-solid border-gray-dark text-center"
             :class="[size === 'bg' ? 'w-32' : size === 'md' ? 'w-20' : 'w-10',disabled ? '' : 'hover:cursor-pointer']"
             :style="`background-color: ${disabled ? '#E3E3E3' : colors.hex};`">
            <svg-icon icon="palette" :inverse="inverted" :class="{'text-gray-lighter': disabled}" />

            <span v-if="size !== 'sm'" class="uppercase tracking-wider text-sm"
                  :class="[inverted ? disabled ? 'text-gray' : 'text-white-lightest' : 'text-black', size === 'bg' ? 'w-14' : 'w-4 mr-3']">
                {{ size === 'bg' ? colors.hex : colors.hex.substr(0,4) }}
            </span>

            <svg-icon v-if="size !== 'sm'"
                      icon="eye-dropper"
                      :inverse="inverted"
                      :class="{'text-gray-lighter': disabled}"
                      @click="saveColor" />
        </div>
    </popper>
</template>

<script>
    import { Sketch } from 'vue-color';
    import { mapGetters } from 'vuex';

    export default {
        name: 'InputColor',
        components: { 'sketch-picker': Sketch },
        props: {
            width: {
                type: String
            },
            value: {
                type: String,
                default: '#194d33'
            },
            size: {
                type: String,
                validator: val => [ 'bg', 'md', 'sm' ].includes(val),
                default: 'bg'
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data: function () {
            return {
                colors: {
                    hex: this.value
                }
            }
        },
        computed: {
            ...mapGetters({
                presetColors: 'getPresetColors'
            }),
            inverted() {
                let hexVal = this.colors.hex.slice(1, this.colors.hex.length);
                return parseInt(`0x${hexVal}`) < 13500000;
            }
        },
        watch: {
            value: {
                immediate: true,
                handler: function() {
                    if(this.value) this.colors.hex = this.value;
                }
            },
            'colors.hex'() {
                this.$emit('input', this.colors.hex);
            }
        },
        methods: {
            saveColor() {
                if(!this.disabled) this.presetColors.push(this.colors.hex);
            }
        }
    };
</script>
