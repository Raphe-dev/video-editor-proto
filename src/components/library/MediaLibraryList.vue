<template>
    <draggable ref="draggable"
               class="min-h-4 max-h-full"
               v-bind="dragOptions"
               tag="div"
               :list="items"
               :value="value"
               @input="emitter">
        <div v-for="item in realValue"
             :key="item.id"
             class="h-auto hover:cursor-pointer"
             :class="[
                 (detailLevel === 1 && item.type !== 'folder') ? 'w-2/4 p-0' : 'w-full',
                 detailLevel !== 1 ? 'py-1/2 pl-1/2' : ''
             ]"
             @mousedown="$root.$emit('libraryDragStart')"
             @drag="$root.$emit('libraryDrag', $event, item)"
             @dragend="$root.$emit('libraryDragEnd', $event, item)">
            <div v-if="item.type === 'folder'">
                <folder-row :folder="item"
                            :detail-level="detailLevel"
                            @editFocus="disabled = true"
                            @editFocusOut="disabled = false"
                            @selectFolder="handleSelect(item)"/>
            </div>
            <div v-else>
                <file-row v-if="item.name"
                          :file="item"
                          :detail-level="detailLevel"
                          @selectFile="handleSelect(item)"/>
            </div>
        </div>
    </draggable>
</template>

<script>
    import draggable from 'vuedraggable';
    import FileRow from './MediaLibraryFile';
    import FolderRow from './MediaLibraryFolder';

    export default {
        name: 'LibraryList',
        components: { draggable, FileRow, FolderRow },
        props: {
            items: null,
            value: null,
            detailLevel: {
                type: Number,
                default: 2
            }
        },
        data: () => ({
            selected: [],
            disabled: false
        }),

        computed: {
            dragOptions() {
                return {
                    animation: 200,
                    disabled: this.disabled,
                    ghostClass: 'opacity-50',
                    group: 'folders',
                    revertOnSpill: true
                };
            },
            realValue() {
                return this.value ? this.value : this.items;
            }
        },
        beforeMount() {
            this.$root.$on('editLibraryFocus', () => this.disabled = true);
            this.$root.$on('editLibraryFocusOut', () => this.disabled = false);
            this.$root.$on('LibraryListOrder', () => this.defaultOrderList());
        },
        mounted() {
            this.defaultOrderList();
        },

        methods: {
            defaultOrderList() {
                //Folder first and alphabetical order (lowercase to ignore Caps priority)
                this.realValue.sort((a, b) => {
                    if(a.type === 'folder' && b.type === 'folder') {
                        if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                        else if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                        else return 0;
                    } else if(a.type === 'folder' || b.type === 'folder') {
                        if(a.type === 'folder') return -1;
                        else if(b.type === 'folder') return 1;
                        else return 0;
                    } else {
                        if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                        else if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                        else return 0;
                    }
                });
            },

            emitter(value) {
                this.$emit('input', value);
            },

            handleSelect(file) {
                this.$root.$emit('libraryFileSelected', file);

            }
        }
    };
</script>
