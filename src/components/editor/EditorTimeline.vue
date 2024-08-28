<template>
    <div class="flex w-full h-full overflow-auto bg-white">
        <div class="flex flex-col w-full h-full">
            <section class="flex w-full h-8">
                <div class="flex items-center justify-evenly min-w-64 max-w-64 h-full bg-black-lighter text-white border-0 border-solid border-b border-gray-light">
                    <div class="timeline__control__button">
                        <svg-icon icon="fast-backward"></svg-icon>
                    </div>
                    <div class="timeline__control__button">
                        <svg-icon icon="square"></svg-icon>
                    </div>
                    <div class="timeline__control__button">
                        <svg-icon icon="play"></svg-icon>
                    </div>
                    <div class="timeline__control__button">
                        <svg-icon icon="fast-forward"></svg-icon>
                    </div>
                    <div class="flex justify-center flex-1 h-full border-0 border-solid border-r border-gray-light leading-loose">
                        00:00:00
                    </div>
                    <div class="timeline__control__button">
                        <svg-icon icon="camera"></svg-icon>
                    </div>
                </div>
                <div class="w-full bg-gray"></div>
            </section>
            <draggable ref="draggable"
                       class="flex flex-col w-full h-full overflow-auto"
                       v-bind="dragOptions"
                       tag="div"
                       @input="emitter"
                       v-model="items">
                <div v-for="(node, key) in nodes" class="h-8 w-full flex" :key="key" >
                    <div class="flex items-center min-w-64 max-w-64 h-full t border-0 border-solid border-b border-gray-light"
                         :class="node.id === selected ? 'bg-gray-lighter' : 'bg-gray-lightest'">
                        <section class="flex h-full w-full items-center justify-between"
                                 @click="$emit('selectNode', node)">
                            <svg-icon icon="grip-lines-vertical" class="handle hover:cursor-grab px-1 text-gray"/>

                            <svg-icon :icon="getNodeIcon(node.type)" size="sm" class="w-6 flex justify-center"/>

                            <small class="flex-1" @dblclick.stop="editNodeName(node)">
                                <span v-if="editNode !== node.id">{{ node.title ? node.title : node.type }} {{ key }}</span>

                                <input v-else type="text" autofocus v-model="node.title" @focusout="editNode = null">
                            </small>
                        </section>

                        <div class="text-sm text-black-lighter flex items-center w-20 justify-between">
                            <svg-icon :icon="node.locked ? 'lock' : 'lock-open'" class="hover:cursor-pointer w-4" @click="lockNode(node)"/>
                            <svg-icon :icon="node.hidden ? 'eye-slash' : 'eye'" class="hover:cursor-pointer w-4" @click="hideNode(node)"/>
                            <svg-icon icon="trash" class="pr-2 hover:cursor-pointer hover:text-red w-4" @click="deleteNode(node)"/>
                        </div>
                    </div>
                    <div class="w-full bg-white flex items-center">
                    </div>
                </div>
            </draggable>
        </div>
    </div>
</template>

<script>
    import draggable from 'vuedraggable';

    export default {

        name: 'EditorTimeline',
        components: {draggable},
        props: {
            nodes: {
                type: Array
            },
            selected: {
                type: String
            }
        },
        mounted(){
           console.log(this.$parent)
        },
        data: function () {
            return {
                items: this.nodes,
                editNode: null
            }
        },
        computed: {
            dragOptions() {
                return {
                    animation: 200,
                    ghostClass: 'opacity-50',
                    revertOnSpill: true,
                    handle: '.handle'
                };
            }
        },
        methods: {
            emitter(){
                this.$emit('itemSwap', this.items);
            },
            getNodeIcon(type){
                switch(type){
                    case 'image':
                        return 'image'
                    case 'video':
                        return 'film';
                    case 'shape':
                        return 'star';
                    default:
                        return '';
                }
            },

            hideNode(node){
                node.hidden ? node.hidden = !node.hidden : this.$set(node, 'hidden', true)
            },
            lockNode(node){
                node.locked ? node.locked = !node.locked : this.$set(node, 'locked', true)
            },
            deleteNode(node){
               this.$emit('deleteNode', node);
            },
            editNodeName(node){
                this.editNode = node.id;
            }
        }
    };
</script>

<style lang="scss">
    .timeline__control__button {
        @apply flex items-center justify-center min-w-8 h-full border-0 border-solid border-r border-gray-light;

        &:hover {
            @apply bg-gray-darker cursor-pointer;
        }
    }

    .handle {

    }
</style>
