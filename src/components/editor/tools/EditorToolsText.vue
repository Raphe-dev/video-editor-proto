<template>
    <div class="h-20 flex bg-white text-black">
        <div class="min-w-40 pl-4 flex items-center text-base border-0 border-r border-solid border-gray-lighter">
            <svg-icon icon="font" class="text-3xl mr-2 text-base"/>
            <span class="capitalize">
                {{ $t('editor.tools.text') }}
            </span>
        </div>
        <div class="flex justify-between w-full overflow-x-auto">
            <div class="flex h-full items-end px-3">
                <input-select value="Arial"
                              icon="font"
                              width="7rem"
                              icon-position="top"
                              :options="getFontOptions()"
                              class="px-2 mb-5" />

                <input-select :value="400"
                              icon="font-weight"
                              width="5rem"
                              icon-position="top"
                              :options="[
                                  { value: 400, label: 'Regular', default: true },
                                  { value: 200, label: 'Light', default: true },
                                  { value: 500, label: 'Medium', default: true },
                                  { value: 600, label: 'Semi-bold', default: true },
                                  { value: 700, label: 'Bold', default: true },
                                  { value: 800, label: 'Extra-bold', default: true }
                              ]"
                              class="px-2 mb-5" />

                <input-number :value="16"
                              :validator="(value) => { return parseInt(value) }"
                              :min="6"
                              :max="999"
                              width="3.75rem"
                              icon="text-height"
                              icon-position="top"
                              symbol="px"
                              class="mx-2 mb-5" />

                <div class="flex justify-between w-24 mx-3 mb-6">
                    <svg-icon icon="bold" />
                    <svg-icon icon="italic" />
                    <svg-icon icon="underline" />
                    <svg-icon icon="superscript" />
                </div>

                <input-color class="mx-2 mb-5" value="#000000" />

                <div class="flex flex-col ">
                    <div class="flex justify-between w-24 mx-3 py-1 border-0 border-solid border-b border-gray-lighter">
                        <svg-icon icon="align-justify" />
                        <svg-icon icon="align-center" />
                        <svg-icon icon="align-left" />
                        <svg-icon icon="align-right" />
                    </div>
                    <div class="flex justify-evenly mx-2 py-1 h-8">
                        <svg-icon icon="text-top" class="self-start" />
                        <svg-icon icon="text-center" />
                        <svg-icon icon="text-bottom" class="self-end "/>
                    </div>
                </div>

                <input-number :value="0"
                              :min="-360"
                              :max="360"
                              width="3.75rem"
                              label="spacing"
                              label-position="top"
                              symbol="pts"
                              class="px-2 mb-5" />

                <input-number :value="0"
                              :min="-360"
                              :max="360"
                              width="3.75rem"
                              label="line"
                              label-position="top"
                              symbol="pts"
                              class="px-2 mb-5" />

                <input-number :value="0"
                              :min="-360"
                              :max="360"
                              width="3.25rem"
                              icon="redo"
                              icon-position="top"
                              symbol="°"
                              class="px-2 mb-5" />

                <input-number :value="0"
                              :min="0"
                              :max="100"
                              width="3.75rem"
                              icon="opacity"
                              icon-position="top"
                              symbol="%"
                              class="mx-2 mb-5" />
            </div>
        </div>
        <editor-tools-options class="self-center px-4"
                              :options="[
                                  {label: 'Shadow', value: false},
                                  {label: 'Blur', value: false},
                                  {label: 'Something', value: false},
                                  {label: 'SomethingElse', value: false}
                              ]" />
    </div>
</template>

<script>
    //TODO implement functions ( froala api )
    import InputSelect from '../../inputs/InputSelect';
    import InputNumber from '../../inputs/InputNumber';
    import InputColor from '../../inputs/InputColor';
    import EditorToolsOptions from './EditorToolsSettings';

    export default {

        name: 'EditorToolsText',
        components: { InputNumber, InputSelect, InputColor, EditorToolsOptions },
        props: {
            selected: null
        },
        methods: {
            getFontOptions() {
                let fonts = [
                    'Arial Narrow',
                    'Brush Script MT',
                    'Calibri',
                    'Cambria',
                    'Candara',
                    'Comic Sans',
                    'Copperplate',
                    'Courier New',
                    'Courier',
                    'Didot',
                    'Garamond',
                    'Geneva',
                    'Helvetica',
                    'Lucida Bright',
                    'Monaco',
                    'Optima',
                    'Perpetua',
                    'Times New Roman',
                    'Times',
                    'Verdana'
                ];

                let result = [
                    { value: 'Arial', label: 'Arial', default: true }
                ];

                fonts.forEach(font => {
                    result.push({ value: font, label: font });
                });

                return result;
            }

        }
    };
</script>
