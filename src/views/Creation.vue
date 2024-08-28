<template>
    <div ref="creation" class="flex flex-1 h-full transition-all duration-200" :style="`width: calc(100% - ${$store.getters.getSideNavSize});`">
        <Split :gutter-size="2">
            <SplitArea :size="17">
                <media-library-panel class="w-full"/>
            </SplitArea>

            <SplitArea :size="66" class="flex flex-col">
                <editor-tools :zoom="zoom" @zoomChanged="handleZoomChange" @resolutionChanged="handleResolutionChange" />
                <editor ref="editorWrap" :zoom="zoom" :resolution="resolution" />
            </SplitArea>

            <SplitArea :size="17">
                <panel-playlist/>
            </SplitArea>
        </Split>
    </div>
</template>

<script>
    import mediaLibraryPanel from '@/components/library/MediaLibraryPanel.vue';
    import panelPlaylist from '@/components/playlist/PlaylistPanel.vue';
    import editor from '@/components/editor/Editor.vue';
    import editorTools from '@/components/editor/tools/EditorTools.vue';

    export default {
        name: 'Creation',
        components: {
            mediaLibraryPanel,
            editor,
            editorTools,
            panelPlaylist
        },
        data: () => ({
            zoom: 0.5,
            resolution: {
                width: 1920,
                height: 1080
            }
        }),
        mounted() {
            this.$refs['editorWrap'].editorWrap.addEventListener('mousewheel', (e) => {
                if(this.$keys.CTRL) {
                    e.preventDefault();
                    this.handleScroll(e);
                }
            });
        },
        methods: {
            handleScroll(e) {
                if(e.wheelDeltaY > 0 && this.zoom < 3) {
                    this.zoom += 0.05;
                } else if(e.wheelDeltaY < 0 && this.zoom > 0.1) {
                    this.zoom -= 0.05;
                }
                this.zoom = parseFloat(this.zoom.toFixed(2));
                this.$root.$emit('manualZoom');
            },
            handleZoomChange(value) {
                this.zoom = value;
            },
            handleResolutionChange(value) {
                this.resolution.width = value.width;
                this.resolution.height = value.height;
            }
        }
    };
</script>
