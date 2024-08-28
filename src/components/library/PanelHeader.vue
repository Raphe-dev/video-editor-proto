<template>
    <div class="flex flex-col justify-evenly text-white text-md w-100 min-h-18 bg-accent">
        <div class="mx-2 px-2 h-8 flex items-center" :class="{'text-black bg-white opacity-80': isActive}">
            <svg-icon icon="search" class="mr-2"
                      :class="isActive ? 'text-accent hover:text-accent' : 'hover:cursor-pointer transform hover:scale-105'"
                      @click="searchClicked()"/>
            <span v-if="!isActive">
                MEDIA
            </span>
            <span v-else>
                <input ref="searchInput"
                       v-model="search"
                       type="text"
                       style="margin-left:0.5rem; width:80%"
                       @focusout="searchFocus()">
            </span>
        </div>
        <div class="px-4 flex justify-between">
            <div>
                <svg-icon icon="cloud-download-alt"
                          class="panel__header--icon -disabled"/>

                <svg-icon icon="folder-plus"
                          class="panel__header--icon"
                          @click="$emit('folderPlus')"/>

                <svg-icon icon="copy"
                          class="panel__header--icon -disabled"/>

                <svg-icon icon="trash"
                          class="panel__header--icon"
                          :class="{'-disabled': selectedFiles === 0}"
                          @click="$emit('trash')"/>
                <span v-if="selectedFiles > 0" class="absolute pl-1 -mt-1 text-sm">
                    {{ selectedFiles }}
                </span>
            </div>

            <div>
                <slot/>
            </div>
        </div>
    </div>
</template>

<script>
    //TODO move in deprecated stuff
    export default {
        name: 'PannelHeader',
        props: {
            active: {
                type: Boolean,
                default: false
            },
            selectedFiles: {
                type: Number,
                default: 0
            }
        },
        data: () => ({
            isActive: false,
            search: ''
        }),
        mounted() {
            this.isActive = this.active;
        },
        methods: {
            searchClicked: function () {
                this.isActive = true;
                setTimeout(() => {
                    this.$refs['searchInput'].focus();
                }, 100);
            },
            searchFocus() {
                if (this.isActive && this.search.length === 0) {
                    this.isActive = false;
                }
            }
        }
    };
</script>
