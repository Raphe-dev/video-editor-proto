<template>
    <div class="h-20 flex bg-white text-black">
        <div class="min-w-44 pl-4 flex items-center text-base border-0 border-r border-solid border-gray-lighter">
            <svg-icon
                icon="play"
                class="text-3xl mr-2" />
            <span>
                {{ $t('editor.tools.video') }}
            </span>
        </div>
        <div v-if="selected"
             class="flex items-end w-full overflow-x-auto px-3">
            <input-number v-model="selected.style.scale"
                          v-tip="{content: $t('editor.tools.tooltips.scale'), trigger: showTooltips ? 'mouseenter' : ''}"
                          :min="0"
                          :max="900"
                          width="3.75rem"
                          icon="expand-arrows-alt"
                          icon-position="top"
                          symbol="%"
                          class="px-2 mb-5"/>

            <input-number v-model="selected.style.rotate"
                          v-tip="{content: $t('editor.tools.tooltips.rotation'), trigger: showTooltips ? 'mouseenter' : ''}"
                          :min="-360"
                          :max="360"
                          width="3.25rem"
                          icon="redo"
                          icon-position="top"
                          symbol="°"
                          class="px-2 mb-5"/>

            <input-number v-model="selected.style.opacity"
                          v-tip="{content: $t('editor.tools.tooltips.opacity'), trigger: showTooltips ? 'mouseenter' : ''}"
                          :min="0"
                          :max="100"
                          width="3.75rem"
                          icon="opacity"
                          icon-position="top"
                          symbol="%"
                          class="mx-2 mb-5"/>

            <input-number v-model="selected.style.radius"
                          v-tip="{content: $t('editor.tools.tooltips.radius'), trigger: showTooltips ? 'mouseenter' : ''}"
                          :min="0"
                          :max="100"
                          width="3.75rem"
                          icon="border-radius"
                          icon-position="top"
                          symbol="%"
                          class="mx-2 mb-5"/>

            <div class="flex items-center justify-between min-w-24 h-full p-3 border-0 border-r border-solid border-gray-lighter">
                <div v-tip="{content: $t('editor.tools.tooltips.crop'), trigger: showTooltips ? 'mouseenter' : ''}">
                    <svg-icon slot="reference" icon="crop-alt" class="text-2xl text-black-lightest hover:cursor-pointer transform hover:scale-105"/>
                </div>
                <div v-tip="{content: $t('editor.tools.tooltips.expand'), trigger: showTooltips ? 'mouseenter' : ''}">
                    <svg-icon slot="reference" icon="expand-arrows-alt" class="text-2xl text-black-lightest hover:cursor-pointer transform hover:scale-105"/>
                </div>
            </div>
            <div class="flex items-end h-full px-3 border-0 border-r border-solid border-gray-lighter">
                <input-number v-model="selected.style.borderWidth"
                              v-tip="{content: $t('editor.tools.tooltips.borderWidth'), trigger: showTooltips ? 'mouseenter' : ''}"
                              :min="0"
                              :max="100"
                              width="3.75rem"
                              icon="bars"
                              label-position="top"
                              symbol="px"
                              class="mx-2 mb-5"/>

                <input-number v-model="selected.style.padding"
                              v-tip="{content: $t('editor.tools.tooltips.borderPadding'), trigger: showTooltips ? 'mouseenter' : ''}"
                              :min="0"
                              :max="100"
                              width="3.75rem"
                              icon="border-spacing"
                              icon-position="top"
                              symbol="px"
                              class="mx-2 mb-5"/>

                <input-color v-model="selected.style.borderColor"
                             v-tip="{content: $t('editor.tools.tooltips.borderColor'), trigger: showTooltips ? 'mouseenter' : ''}"
                             class="mx-2 mb-5"/>

                <input-select v-model="selected.style.shadow"
                              v-tip="{content: $t('editor.tools.tooltips.shadow'), trigger: showTooltips ? 'mouseenter' : ''}"
                              icon="clone"
                              width="4.75rem"
                              icon-position="top"
                              :options="[
                                  { value: 0, label: `Shadow`, default: true },
                                  { value: 1, label: 'x-small' },
                                  { value: 2, label: 'small' },
                                  { value: 3, label: 'medium' },
                                  { value: 4, label: 'large' },
                                  { value: 5, label: 'x-large' }
                              ]"
                              class="mx-2 mb-5"/>
            </div>
            <div class="flex items-center h-full pl-6">
                <editor-tools-touch/>
            </div>
        </div>
    </div>
</template>

<script>
    //TODO video management functions
    import InputSelect from '../../inputs/InputSelect';
    import InputNumber from '../../inputs/InputNumber';
    import InputColor from '../../inputs/InputColor';
    import EditorToolsTouch from './EditorToolsTouch'

    export default {

        name: 'EditorToolsVideo',
        components: { InputNumber, InputSelect, InputColor, EditorToolsTouch },
        props: {
            selected: null
        },
        computed: {
            showTooltips() {
                return this.$store.getters.getShowTooltips
            }
        },
        methods: {}
    };
</script>
