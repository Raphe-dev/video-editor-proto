<template>
    <popper trigger="click"
            class="w-full h-full"
            boundaries-selector="body"
            :options="{ placement: 'bottom'}">
        <div class="popper -full h-20 min-w-80 flex items-center text-black">
            <div class="px-5 h-full flex items-center border-0 border-solid border-r border-gray-lighter">
                <input-select v-model="active"
                              icon="touch"
                              icon-position="top"
                              :options="[
                                  { value: true, label: 'ON' },
                                  { value: false, label: 'OFF' }
                              ]"/>
            </div>
            <div class="px-5 h-full flex items-center border-0 border-solid border-r border-gray-lighter">
                <input-select v-model="slide"
                              icon="link"
                              icon-position="top"
                              :disabled="!active"
                              :options="[
                                  { value: false, label: 'Link to a slide', disabled: true, default: true },
                                  { value: 1, label: 'Slide' }
                              ]"/>
            </div>
            <div class="px-5 h-full flex items-center">
                <input-text v-model="link"
                            width="15rem"
                            icon="globe"
                            icon-position="top"
                            placeholder="ex: www.mywebsite.com"
                            :disabled="!active"/>
            </div>
        </div>
        <div slot="reference" class="flex items-center text-2xl text-base pr-5" title="Add an interaction on touch">
            <svg-icon icon="touch" class="transform hover:scale-105 hover:cursor-pointer"/>
        </div>
    </popper>
</template>

<script>
    //TODO implement functions
    import InputSelect from '../../inputs/InputSelect';
    import InputText from '../../inputs/InputText';

    export default {
        name: 'editor-tools-touch',
        components: { InputSelect, InputText },
        data: () => ({
            active: false,
            slide: false,
            link: null
        })
    };
</script>
