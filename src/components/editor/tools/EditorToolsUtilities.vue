<template>
    <div class="h-10 w-full flex justify-between items-center bg-white-darkest">
        <div class="h-full flex justify-between items-center">
            <div class="h-full min-w-10 px-2 text-xl flex justify-evenly items-center
                        border-0 border-solid border-r border-white
                        hover:bg-accent hover:text-white hover:cursor-pointer transition-all duration-200"
                 @click="$emit('tool', '')">
                <svg-icon icon="th"/>
                <span class="px-2 capitalize">
                    {{ $tc('utility', 2) }}
                </span>
            </div>
            <div v-for="(item, key) in tools" :key="key"
                 class="h-full w-10 text-xl flex justify-evenly items-center
                        border-0 border-solid border-r border-white
                        hover:bg-accent hover:text-white hover:cursor-pointer transition-all duration-200"
                 :class="tool === item.tool ? 'bg-accent text-white' : 'text-gray'"
                 @click="$emit('tool', item.tool)">
                <svg-icon :icon="item.icon"/>
            </div>
        </div>

        <div class="h-full w-full flex items-center justify-between">
            <div v-if="!$store.state.settings.showAdvanced || !selected"></div>
            <template v-if="selected">
                <template v-if="$store.state.settings.showAdvanced">
                    <div class="w-18 h-full flex items-center">
                        <input-toggle v-model="positionOptions" size="lg" color="gray-lightest">
                            <div slot="size">
                                <expansion-panel :hideWrapper="true" :open="positionOptions.size.toggle">
                                    <input-number v-model="selected.width"
                                                  :min="0"
                                                  :max="9999"
                                                  width="4rem"
                                                  icon-position="left"
                                                  icon="arrows-alt-v"
                                                  symbol="px"
                                                  class="px-1"/>

                                    <input-number v-model="selected.height"
                                                  :min="0"
                                                  :max="9999"
                                                  width="4rem"
                                                  icon-position="left"
                                                  icon="arrows-alt-h"
                                                  symbol="px"
                                                  class="px-1"/>
                                </expansion-panel>
                            </div>
                            <div slot="position">
                                <expansion-panel :hideWrapper="true" :open="positionOptions.position.toggle">
                                    <input-number v-model="selected.left"
                                                  :min="0"
                                                  :max="9999"
                                                  width="3.25rem"
                                                  label-position="left"
                                                  label="X"
                                                  class="px-1"/>

                                    <input-number v-model="selected.top"
                                                  :min="0"
                                                  :max="9999"
                                                  width="3.25rem"
                                                  label-position="left"
                                                  label="Y"
                                                  class="px-1"/>
                                </expansion-panel>
                            </div>
                        </input-toggle>
                    </div>
                </template>
            </template>

            <div class="flex items-center h-full">
                <div class="min-w-32 h-full text-md flex justify-evenly items-center
                            border-0 border-solid border-r border-white text-black-light">
                    <small class="text-gray-lightest capitalize">
                        {{ $t('align') }}
                    </small>
                    <svg-icon icon="align-center" class="hover:cursor-pointer transform hover:scale-105"/>

                    <svg-icon icon="align-left" class="hover:cursor-pointer transform hover:scale-105"/>

                    <svg-icon icon="align-right" class="hover:cursor-pointer transform hover:scale-105"/>
                </div>
                <editor-tools-settings class="self-center px-2" :options="options"/>

                <expansion-panel :reverse="true" icon="search" class="bg-gray-lightest" >
                    <div class="p-2 flex items-center">
                        <input-select v-model="zoomLevel"
                                      :validator="(value) => { return parseFloat(value) }"
                                      icon="search"
                                      width="5rem"
                                      icon-position="in"
                                      :options="[
                                      { value: 'placeholder', label: `${parseInt(zoom * 100)} %`, disabled: true, default: true },
                                      { value: 1.5, label: '150 %' },
                                      { value: 1, label: '100 %' },
                                      { value: 0.75, label: '75 %' },
                                      { value: 0.5, label: '50 %' },
                                      { value: 0.25, label: '25 %' }
                                  ]"/>
                    </div>
                </expansion-panel>
            </div>
        </div>
    </div>
</template>

<script>
    //TODO toggle & expension panel
    import InputSelect from '../../inputs/InputSelect';
    import InputNumber from '../../inputs/InputNumber';
    import InputToggle from '../../inputs/InputToggle'
    import EditorToolsSettings from './EditorToolsSettings';
    import ExpansionPanel from '../../commons/ExpansionPanel';

    export default {

        name: 'EditorToolsUtilities',
        components: {InputNumber, InputSelect, InputToggle, EditorToolsSettings, ExpansionPanel},
        props: {
            selected: null,
            zoom: null,
            options: {
                type: Object,
                default: () => {
                }
            },
            tool: {
                type: String,
                default: ''
            },
        },
        data: () => ({
            zoomLevel: 0.5,
            positionOptions: {
                ruler: { icon: 'ruler'},
                size: { icon: 'expand-arrows-alt'},
                position: { icon: 'crosshairs'}
            }
        }),
        computed: {
            tools() {
                return [
                    {icon: 'font', tool: 'text'},
                    {icon: 'star', tool: 'shape'},
                ];
            }
        },
        mounted() {
            this.$root.$on('manualZoom', () => {
                this.zoomLevel = 'placeholder';
            })
        },
        watch: {
            zoomLevel(to) {
                if (to !== 'placeholder') {
                    this.$emit('zoomChanged', this.zoomLevel);
                }
            }
        }
    };
</script>
