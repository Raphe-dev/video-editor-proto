<template>
    <div>
        <editor-tools-utilities :selected="selected" :zoom="zoom" :tool="tool" :options="options"
                                @zoomChanged="$emit('zoomChanged', $event)"
                                @tool="changeTool"/>
        <div v-if="!selected && tool === ''" class="w-full h-20 flex bg-white text-black">
            <div class="h-full min-w-44 pl-4 flex items-center text-base
                        border-0 border-r border-solid border-gray-lighter">
                <svg-icon icon="tools" class="text-3xl mr-2"/>
                <span class="capitalize">
                    {{ $t('editor.tools.general') }}
                </span>
            </div>

            <div v-if="!selected" class="flex flex-col items-center pt-2">
                <span class="capitalize">
                    {{ $t('resolution') }}
                </span>
                <div class="flex justify-around items-center min-w-48">
                    <input-number v-model="resolution.width"
                                  :min="0"
                                  :max="9999"
                                  width="4rem"
                                  icon="arrows-alt-h"
                                  icon-position="top"
                                  symbol="px"/>
                    <input-number v-model="resolution.height"
                                  :min="0"
                                  :max="9999"
                                  width="4rem"
                                  icon="arrows-alt-v"
                                  icon-position="top"
                                  symbol="px"/>
                </div>
            </div>
        </div>
        <component v-if="tool" :is="getTool()" :selected="selected" class="transition transition-all duration-300 text-black-lightest"/>
    </div>
</template>

<script>
    import InputNumber from '../../inputs/InputNumber';
    import EditorToolsImage from './EditorToolsImage';
    import EditorToolsVideo from './EditorToolsVideo';
    import EditorToolsShape from './EditorToolsShape';
    import EditorToolsText from './EditorToolsText';
    import EditorToolsApps from './EditorToolsApps';
    import EditorToolsWeb from './EditorToolsWeb';
    import EditorToolsYoutube from './EditorToolsYoutube';
    import EditorToolsWeather from './EditorToolsWeather';
    import EditorToolsUtilities from './EditorToolsUtilities';

    export default {

        name: 'EditorTools',
        components: {
            InputNumber,
            EditorToolsImage,
            EditorToolsVideo,
            EditorToolsShape,
            EditorToolsText,
            EditorToolsUtilities,
            EditorToolsApps,
            EditorToolsWeb,
            EditorToolsYoutube,
            EditorToolsWeather
        },
        props: {
            zoom: null
        },
        data: function(){
            return {
                tool: '',
                options: {
                    showAdvanced: {label: this.$t('editor.tools.settings.advanced'), value: false},
                    showTooltips: {label: this.$t('editor.tools.settings.tips'), value: true}
                },
                selected: null,
                resolution: {
                    width: 1920,
                    height: 1080
                }
            }
        },
        watch: {
            resolution: {
                deep: true,
                handler() {
                    this.$emit('resolutionChanged', this.resolution);
                }
            },
            options: {
                deep: true,
                handler(to) {
                    let newSettings = {}
                    Object.entries(to).forEach(entry => {
                        this.$set(newSettings, entry[0], entry[1].value);
                    })
                    this.$store.dispatch('setSettings', newSettings)
                }
            },
        },

        beforeMount() {
            this.$root.$on('editorSelectChanged', this.changeSelected);
        },
        mounted() {
        },
        methods: {
            getTool() {
                return `editor-tools-${this.tool}`;
            },
            changeSelected(i) {
                this.$set(this, 'selected', i);
                this.tool = i ? i.type : '';
            },
            changeTool(i) {
                this.$root.$emit('editorToolChanged');
                this.$nextTick(() => {
                    this.tool = i;
                });
            }
        }
    };
</script>
