<template>
    <div class="panel">
        <panel-header :searchLabel="$tc('playlist')" id="header">
        </panel-header>

        <div>
        </div>
    </div>
</template>

<script>
    //TODO everything
    import panelHeader from '../library/PanelHeader2';

    export default {
        name: 'PanelPlaylist',
        components: {panelHeader},
        props: {
            detailLevel: {
                type: Number,
                default: 3
            }
        },
        data: () => ({}),
        computed: {},
        beforeMount() {},
        methods: {}
    };
</script>
