<template>
    <div v-if="folder"
         class="text-md whitespace-no-wrap cursor-pointer"
         :class="{'bg-white-darkest': folder.selected}"
         @dragover="$event.preventDefault()"
         @drop.stop="handleFileDrop">
        <div :class="[
                 {'w-full h-8 text-white flex justify-start items-center pl-2 hover:bg-accent': detailLevel === 1 },
                 {'bg-accent': detailLevel === 1 && folder.selected },
                 {'bg-black': detailLevel === 1 && folder.open },
                 {'bg-gray': detailLevel === 1 && !folder.open }
             ]"
             @click="mixinClick(selectFolder, editName)" id="folder-wrapper">
            <span :class="detailLevel === 1 ? 'mr-2' : ''" @click.stop="openFolder()" id="folder">
                <svg-icon v-if="detailLevel !== 1" icon="caret-right"
                          class="mr-1 text-gray transition duration-200 transform hover:scale-105"
                          :rotate="folder.open ? '90' : null"/>
                <svg-icon class="transition-all duration-200 transform hover:scale-105"
                          :icon="folder.open ? 'folder-open' : 'folder'"/>
            </span>

            <span v-if="!edit">
                {{ folderName }}
            </span>

            <input v-else
                   id="folder-name-input"
                   ref="editFolderName"
                   v-model="folder.name"
                   class="px-2 h-4 bg-white-dark p-1 text-base w-56"
                   :class="{'ml-4': detailLevel === 1 }"
                   type="text"
                   @focusout="editFocusOut">
        </div>

        <template v-if="folder.open && folder.elements.length === 0">
            <span class="ml-3 text-sm opacity-50" id="folder-empty">
                Empty
            </span>
        </template>

        <!-- Recall list to display elements -->
        <library-list v-if="folder.open"
                      class="flex"
                      :class=" detailLevel === 1 ? 'flex-row flex-wrap m-0 pl-1 bg-black-lightest' : 'flex-col ml-4 min-h-2'"
                      :items="folder.elements"
                      :detail-level="detailLevel"/>
    </div>
</template>

<script>
    import DoubleClick from '../mixins/DoubleClick';
    import GetFileData from '../mixins/GetFileData';
    import Uuid from 'uuid/v4';

    export default {
        name: 'FolderRow',
        mixins: [ DoubleClick, GetFileData ],
        props: {
            folder: {},
            detailLevel: {
                type: Number,
                default: 2
            }
        },
        data: () => ({
            edit: false,
            delay: 250,
            clickCount: 0,
            nameMaxLength: 20
        }),
        computed: {
            folderName() {
                if(this.folder.name.length > this.nameMaxLength) {
                    return this.folder.name.substr(0, this.nameMaxLength) + '...';
                } else {
                    return this.folder.name;
                }
            }
        },
        methods: {
            selectFolder() {
                this.$emit('selectFolder');
            },
            editFocusOut() {
                this.edit = false;
                this.$root.$emit('editLibraryFocusOut');
            },
            openFolder() {
                if(!this.edit) {
                    this.folder.open = !this.folder.open;
                }
            },
            editName() {
                if(!this.selected) {
                    this.edit = !this.edit;
                    this.$root.$emit('editLibraryFocus');
                    setTimeout(() => {
                        this.$refs['editFolderName'].focus();
                    }, 50);
                }
            },
            handleFileDrop(e) {
                e.preventDefault();
                if(e.dataTransfer.items && this.folder.open) {
                    for(let i = 0; i < e.dataTransfer.items.length; i++) {
                        if(e.dataTransfer.items[i].kind === 'file') {
                            this.getFileData(e.dataTransfer.items[i].getAsFile()).then(data => {
                                let newItem = {
                                    id: Uuid(),
                                    name: data.filename.substring(0, data.filename.lastIndexOf('.')),
                                    type: data.type.substring(0, data.type.lastIndexOf('/')),
                                    ext: data.filename.substring(data.filename.lastIndexOf('.'), data.filename.length),
                                    url: data.result,
                                    width: data.width,
                                    height: data.height
                                };

                                this.folder.elements.push(newItem);
                            });
                        }
                    }
                }
            }
        }
    };
</script>
