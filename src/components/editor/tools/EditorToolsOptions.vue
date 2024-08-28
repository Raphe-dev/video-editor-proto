<template>
    <popper trigger="click" boundaries-selector="body" :options="{ placement: 'bottom'}">
        <div class="popper -full">
            <div class="flex flex-col items-center justify-evenly h-full w-24">
                <div class="flex items-center justify-between w-full hover:bg-white-dark hover:cursor-pointer py-2 px-2" @click="$emit('trash')">
                    <svg-icon icon="trash" class="mx-1"></svg-icon>
                    <span>
                        {{ $t('delete') }}
                    </span>
                </div>
                <div class="flex items-center justify-between w-full hover:bg-white-dark hover:cursor-pointer py-2 px-2" @click="$emit('save')">
                    <svg-icon icon="save" class="mx-1"></svg-icon>

                    <span>
                        {{ $t('save') }}
                    </span>
                </div>

                <div class="flex items-center justify-between w-full hover:bg-white-dark hover:cursor-pointer py-2 px-2" @click="$emit('clone')">
                    <svg-icon icon="clone" class="mx-1"></svg-icon>
                    <span>
                        {{ $t('clone') }}
                    </span>
                </div>

                <slot></slot>
            </div>
        </div>
        <div slot="reference">
            <svg-icon icon="ellipsis-v" class="text-lg text-gray transform hover:scale-105 hover:cursor-pointer hover:text-black" />
        </div>
    </popper>
</template>

<script>
    //TODO implementation of functions

    export default {
        name: 'EditorToolsOptions',
    };
</script>
