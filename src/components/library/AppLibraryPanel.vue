<template>
    <div class="panel">
        <panel-header :selected-files="selectedApps.length"
                      :label="$tc('application', 2)"
                      id="header"
                      @folderPlus="''"
                      @trash="''"
                      @listOrder="''">
            <svg-icon icon="trash"
                      :count="selectedApps.length"
                      @click="''"/>

            <svg-icon icon="filter"
                      @click="''"/>

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

        <div v-if="apps" class="panel__content">
            <draggable ref="draggable"
                       class="min-h-4 max-h-full"
                       v-bind="dragOptions"
                       tag="div"
                       :items="apps">
                <div v-for="item in apps"
                     :key="item.title"
                     class="h-auto w-full py-1/2 pl-1/2">
                    <div id="app-wrapper" class="flex items-center justify-between">
                        <div class="hover:cursor-pointer" @click.stop="openApp(item)">
                            <span id="folder">
                                <svg-icon v-if="detailLevel !== 1"
                                          class="mr-1 text-gray transition duration-200 transform hover:scale-105"
                                          :rotate="item.open ? '90' : null"
                                          icon="caret-right"/>
                                <svg-icon :icon="item.icon" class="transition-all text-black-lighter duration-200 transform hover:scale-105 text-md"/>
                            </span>
                            <span>
                                {{ item.title }}
                            </span>
                        </div>

                        <svg-icon icon="plus" size="sm" class="self-end hover:cursor-pointer"></svg-icon>
                    </div>

                    <draggable ref="draggable"
                               class="flex flex-col min-h-6 p-1 whitespace-nowrap w-full transition-all duration-200"
                               v-bind="dragOptions"
                               v-if="item.open"
                               tag="div"
                               :items="item.elements">
                        <template v-for="(app, key) in item.elements">
                            <app-library-item :el="app" @selectItem="selectApp" @edit="edit = true" @endEdit="edit = false" :key="key"/>
                        </template>
                    </draggable>
                </div>
            </draggable>
        </div>
    </div>
</template>

<script>
    import panelHeader from './PanelHeader2';
    import DoubleClick from '../mixins/DoubleClick';
    import appLibraryItem from "./AppLibraryItem";
    import draggable from 'vuedraggable';

    export default {
        name: 'PanelAppLibrary',
        components: {panelHeader, draggable, appLibraryItem},
        mixins: [DoubleClick],
        props: {
            detailLevel: {
                type: Number,
                default: 3
            }
        },
        data: () => ({
            selectedApps: [],
            edit: null,
            dragging: false,
            sorted: null,
            lastEl: {}
        }),
        computed: {
            dragOptions() {
                return {
                    animation: 200,
                    disabled: this.edit !== false,
                    ghostClass: 'opacity-50',
                    revertOnSpill: true
                };
            },
            apps: {
                get() {
                    return this.$store.getters.getAppLibrary;
                },
                set(value) {
                    this.$store.dispatch('updateApps', value);
                }
            },
        },

        beforeMount() {

        },
        methods: {
            openApp(item){
                item.open = !item.open
            },
            selectApp(app){
                if(!this.edit){
                    if(app.selected) {
                        this.$set(app, 'selected', false);
                        let index = this.selectedApps.findIndex(i => i.id === app.id);
                        this.selectedApps.splice(index, 1);
                    } else {
                        this.$set(app, 'selected', true);
                        this.selectedApps.push(app);
                    }
                }
            },

        }
    };
</script>
