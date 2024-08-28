<template>
    <div class="h-20 flex bg-white text-black">
        <div class="min-w-44 pl-4 flex items-center text-base border-0 border-r border-solid border-gray-lighter">
            <svg-icon icon="star" class="text-3xl mr-2" />
            <span class="capitalize">
                {{ $t('editor.tools.shape') }}
            </span>
        </div>
        <div class="flex items-end w-full overflow-x-auto pl-3">
            <div class="flex items-center h-full py-6 border-0 border-r border-solid border-gray-lighter">
                <div class="mx-2 text-2xl text-black-lightest hover:cursor-pointer transform hover:scale-105"
                     draggable="true"
                     @dragstart="setDragData('star')"
                     @dragend="resetDragData()">
                    <svg-icon icon="star" />
                </div>
                <div class="mx-2 text-2xl text-black-lightest hover:cursor-pointer transform hover:scale-105"
                     draggable="true"
                     @dragstart="setDragData('square')"
                     @dragend="resetDragData()">
                    <svg-icon icon="square" />
                </div>
                <div class="mx-2 text-2xl text-black-lightest hover:cursor-pointer transform hover:scale-105"
                     draggable="true"
                     @dragstart="setDragData('circle')"
                     @dragend="resetDragData()">
                    <svg-icon icon="circle" />
                </div>
                <div class="mr-4 text-lg text-black-lightest hover:cursor-pointer transform rotate-90 hover:scale-105"
                     draggable="true"
                     @dragstart="setDragData('line')"
                     @dragend="resetDragData()">
                    <svg-icon icon="slash" />
                </div>
            </div>

            <template v-if="selected">
                <div class="flex h-full items-end px-3 border-0 border-r border-solid border-gray-lighter">
                    <input-color v-model="selected.style.backgroundColor" class="mx-2 mb-5" />

                    <input-number v-model="selected.style.opacity"
                                  v-tip="{content: $t('editor.tools.tooltips.opacity'), trigger: showTooltips ? 'mouseenter' : ''}"
                                  :min="0"
                                  :max="100"
                                  width="3.75rem"
                                  icon="opacity"
                                  icon-position="top"
                                  symbol="%"
                                  class="mx-2 mb-5" />

                    <input-number v-model="selected.style.rotate"
                                  v-tip="{content: $t('editor.tools.tooltips.rotation'), trigger: showTooltips ? 'mouseenter' : ''}"
                                  :min="-360"
                                  :max="360"
                                  width="3.25rem"
                                  icon="redo"
                                  icon-position="top"
                                  symbol="°"
                                  class="px-2 mb-5" />

                    <input-number v-model="selected.style.radius"
                                  v-tip="{content: $t('editor.tools.tooltips.radius'), trigger: showTooltips ? 'mouseenter' : ''}"
                                  :min="0"
                                  :max="100"
                                  width="3.75rem"
                                  icon="border-radius"
                                  icon-position="top"
                                  symbol="%"
                                  class="mx-2 mb-5" />
                </div>
                <div class="flex h-full items-end px-3 border-0 border-r border-solid border-gray-lighter">
                    <input-number v-model="selected.style.borderWidth"
                                  v-tip="{content: $t('editor.tools.tooltips.borderWidth'), trigger: showTooltips ? 'mouseenter' : ''}"
                                  :min="0"
                                  :max="100"
                                  width="3.75rem"
                                  icon="bars"
                                  label-position="top"
                                  symbol="px"
                                  class="mx-2 mb-5" />

                    <input-number v-model="selected.style.padding"
                                  v-tip="{content: $t('editor.tools.tooltips.borderPadding'), trigger: showTooltips ? 'mouseenter' : ''}"
                                  :min="0"
                                  :max="100"
                                  width="3.75rem"
                                  icon="border-spacing"
                                  label-position="top"
                                  symbol="px"
                                  class="mx-2 mb-5" />

                    <input-color v-model="selected.style.borderColor"
                                 v-tip="{content: $t('editor.tools.tooltips.borderColor'), trigger: showTooltips ? 'mouseenter' : ''}"
                                 class="mx-2 mb-5" size="md" />

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
                                  class="mx-2 mb-5" />
                </div>
                <div class="flex items-center h-full pl-6 pr-3">
                    <editor-tools-touch/>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    //TODO polygon shape

    import InputSelect from '../../inputs/InputSelect';
    import InputNumber from '../../inputs/InputNumber';
    import InputColor from '../../inputs/InputColor';
    import EditorToolsTouch from './EditorToolsTouch'

    export default {
        name: 'EditorToolsShape',
        components: { InputNumber, InputSelect, InputColor, EditorToolsTouch },
        props: {
            selected: null
        },
        computed: {
            showTooltips() {
                return this.$store.getters.getShowTooltips
            }
        },
        methods: {
            setDragData(i) {
                this.$store.dispatch('setDraggedElement', { type: 'shape', value: i });
            },
            resetDragData() {
                this.$nextTick(() => {
                    this.$store.dispatch('setDraggedElement', {});
                });
            }
        }
    };
</script>
