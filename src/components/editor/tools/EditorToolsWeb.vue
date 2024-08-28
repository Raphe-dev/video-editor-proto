<template>
    <div class="h-20 flex bg-white text-black">
        <div class="min-w-48 px-4 flex items-center text-base border-0 border-r border-solid border-gray-lighter">
            <svg-icon icon="globe" class="text-3xl mr-2" />
            <span class="capitalize">
                {{ $t('editor.tools.app') }}
            </span>
        </div>
        <div
            class="flex w-full overflow-x-auto ">
            <div class="flex justify-between items-end h-full px-3">
                <input-text v-model="link"
                            icon="globe"
                            width="15rem"
                            icon-position="top"
                            placeholder="ex: http://mywebsite.com"
                            class="mx-2 mb-5"/>

                <input-text v-model="name"
                            icon="pen"
                            width="8rem"
                            icon-position="top"
                            placeholder="ex: My website"
                            class="mx-2 mb-5"/>
            </div>
        </div>
    </div>
</template>

<script>
    //TODO functions, create iframe zone
    import InputText from '../../inputs/InputText';

    export default {
        name: 'EditorToolsWeb',
        components: { InputText },
        data: () => ({
            link: null,
            name: null
        })
    };
</script>
