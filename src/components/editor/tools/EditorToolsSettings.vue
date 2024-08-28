<template>
    <popper trigger="click" boundaries-selector="body" :options="{ placement: 'bottom'}">
        <div class="popper">
            <div>
                <input-checkbox v-for="(option, key) in options"
                                :key="key"
                                size="sm"
                                v-model="option.value"
                                :label="option.label" />
            </div>
        </div>
        <div slot="reference">
            <svg-icon icon="cog" class="text-lg transform hover:scale-105 hover:cursor-pointer" />
        </div>
    </popper>
</template>

<script>
    import InputCheckbox from '@/components/inputs/InputCheckbox';

    export default {

        name: 'EditorToolsOptions',
        components: { InputCheckbox },
        props: {
            options: {}
        },
        data: () => ({
            one: false
        }),
        watch: {},

        mounted() {
        },
        methods: {}
    };
</script>
