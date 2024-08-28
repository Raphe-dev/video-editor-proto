<template>
    <div class="flex flex-col w-full shadow-xs">
        <div class="flex w-full h-12 bg-accent text-white">
            <section class="flex-1 flex items-center">
                <div class="hover:cursor-pointer capitalize"
                     v-if="!search"
                     @click="searchClicked()">
                    <svg-icon icon="search" class="ml-2 mx-1 opacity-50"></svg-icon>
                    {{ label }}
                </div>
                <div v-else class="duration-200 flex items-center flex-1 h-full bg-white text-md text-black p-1 pl-4">
                    <input ref="searchInput"
                           v-model="searchQuery"
                           type="text"
                           :placeholder="`${$t('search')} ${label}`"
                           @focusout="searchFocus()"
                           class="h-full w-full"/>

                    <div class="border-0 border-l-2 h-6 border-gray-lighter border-solid flex items-center text-sm px-2 hover:cursor-pointer">
                        <span class="uppercase">
                            {{ $t('all') }}
                        </span>
                        <svg-icon icon="chevron-down" class="ml-1 text-accent"/>
                    </div>
                </div>
            </section>

            <section class="w-12 flex flex-wrap text-sm">
                <div class="w-6 h-6 border-0 border-l border-solid border-white-darker flex items-center justify-center">
                    <svg-icon icon="trash"/>
                </div>
                <div class="w-6 h-6 border-0 border-l border-solid border-white-darker flex items-center justify-center">
                    <svg-icon icon="copy"/>
                </div>
                <div class="w-6 h-6 border-0 border-t border-l border-solid border-white-darker flex items-center justify-center">
                    <svg-icon icon="filter"/>
                </div>
                <div class="w-6 h-6 border-0 border-t border-l border-solid border-white-darker flex items-center justify-center">
                    <svg-icon icon="ellipsis-v"/>
                </div>
            </section>
        </div>
        <div class="flex flex-col items-center justify-center w-full bg-white-darkest text-gray text-xsm relative transition-all duration-200" :class="openOptions ? 'h-6' : 'h-0'">
            <div class="flex justify-evenly items-center w-32" v-if="openOptions">
                <slot></slot>
            </div>
            <div>
                <svg-icon icon="caret-right"
                          :rotate="openOptions ? '270' : '90'"
                          class="absolute self-center text-black hover:cursor-pointer"
                          :style="openOptions ? 'bottom: -5px' : 'top: -5px'"
                          @click="openOptions = !openOptions">
                </svg-icon>
            </div>
        </div>
    </div>
</template>

<script>
    //TODO implement functions, search and filter. Make main header
    export default {
        name: 'PannelHeader2',
        props: {
            selectedFiles: {
                type: Number,
                default: 0
            },
            label: {
                type: String,
                default: 'Medias'
            },
        },
        data: () => ({
            search: false,
            searchQuery: '',
            openOptions: true
        }),
        methods: {
            searchClicked: function() {
                this.search = true;
                setTimeout(() => {
                    this.$refs['searchInput'].focus();
                }, 100);
            },
            searchFocus() {
                if(this.search && this.searchQuery.length === 0) {
                    this.search = false;
                }
            }
        }
    };
</script>
