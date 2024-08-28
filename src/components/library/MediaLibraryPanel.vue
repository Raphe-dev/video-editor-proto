<template>
    <div class="panel">
        <panel-header :selectedFiles="selectedFiles.length"
                      :label="$tc('media', 2)"
                      id="header"
                      @folderPlus="handleFolderPlus()"
                      @trash="handleTrash()"
                      @listOrder="handleListOrder()">
            <svg-icon icon="trash"
                      :count="selectedFiles.length"
                      @click="handleTrash()"/>

            <svg-icon icon="folder-plus"
                      @click="handleFolderPlus()"/>

            <svg-icon v-if="detailLevel !== 1"
                      icon="th-large"
                      @click="detailLevel = 1"/>

            <svg-icon v-if="detailLevel !== 2"
                      icon="bars"
                      @click="detailLevel = 2"/>

            <svg-icon v-if="detailLevel !== 3"
                      icon="list"
                      @click="detailLevel = 3"/>
        </panel-header>

        <div v-if="folders" class="panel__content" :class="{'-noPadding': detailLevel === 1}">
            <library-list v-model="folders" id="library-list" :detail-level="detailLevel"/>
        </div>
    </div>
</template>

<script>
    import panelHeader from './PanelHeader2';
    import LibraryList from './MediaLibraryList.vue';

    export default {
        name: 'PanelLibrary',
        components: { panelHeader, LibraryList },
        props: {
            detailLevel: {
                type: Number,
                default: 3
            }
        },
        data: () => ({
            selectedFiles: [],
            dragging: false,
            sorted: null,
            lastEl: {}
        }),
        computed: {
            folders: {
                get() {
                    return this.$store.getters.getMediaFolders;
                },
                set(value) {
                    this.$store.dispatch('updateFolders', value);
                }
            }
        },

        beforeMount() {
            this.handleListOrder();
            this.$root.$on('libraryFileSelected', this.handleFileSelect);
            this.$root.$on('libraryDrag', this.setDragData);
            this.$root.$on('libraryDragEnd', this.resetDragData);
        },
        methods: {
            setDragData(e, i) {
                if(!this.dragging && i && this.$store.getters.getDraggedElement !== i) {
                    this.dragging = true;
                    this.$store.dispatch('setDraggedElement', { type: i.type, value: i });
                }
            },
            resetDragData() {
                this.dragging = false;
                this.$store.dispatch('setDraggedElement', {});
            },

            handleListOrder() {
                this.sorted = 'default';
                this.$root.$emit('LibraryListOrder');
            },

            handleFolderPlus() {
                let newFolders = this.folders;
                newFolders.push({
                    name: 'New folder',
                    open: false,
                    type: 'folder',
                    elements: []
                });
                this.folders = newFolders;
            },

            handleFileSelect(e) {
                if(e.selected) {
                    this.$set(e, 'selected', false);
                    let index = this.selectedFiles.findIndex(file => file.id === e.id);
                    this.selectedFiles.splice(index, 1);
                } else {
                    this.$set(e, 'selected', true);
                    this.selectedFiles.push(e);
                }
            },

            handleTrash() {
                this.folders.forEach(i => {
                    if(i.elements && i.elements.length !== 0) {
                        this.deleteLoopTroughFolder(i);
                    }
                });
                this.selectedFiles = [];
            },

            deleteLoopTroughFolder(folder) {
                let toDelete = [];
                if(folder.selected) {
                    toDelete.push(folder);
                    folder.elements.forEach(element => {
                        toDelete.push(element);
                    });
                    folder.selected = false;
                } else {
                    folder.elements.forEach(element => {
                        if(element.selected && element.type !== 'folder') {
                            toDelete.push(element);
                            element.selected = false;
                        } else if(element.type === 'folder') {
                            this.deleteLoopTroughFolder(element);
                        }
                    });
                }

                if(toDelete.length > 0) {
                    toDelete.forEach(id => {
                        let index = folder.elements.findIndex(el => el.id === id.id);
                        folder.elements.splice(index, 1);
                    });
                }

            }
        }
    };
</script>
