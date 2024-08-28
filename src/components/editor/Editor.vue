<template>
    <Split :gutter-size="2" direction="vertical">
        <SplitArea :size="80">
            <div class="relative flex flex-col h-full"
                 @dragenter="dragStart(true, $event)"
                 @dragleave="dragStart(false)"
                 @dragover="$event.preventDefault()">
                <div id="editor__wrap" ref="editorWrap" class="editor__wrap"
                     @mousedown="startDragArea"
                     @mouseleave="endDragArea"
                     @mouseup="endDragArea"
                     @mousemove="dragArea"
                     @click="clickOutside">
                    <div id="editor" ref="editor"
                         class="transform origin-center-top scale-1 flex bg-gray-dark editor"
                         :class="(dropCounter !== 0 && Object.entries(draggedElement).length !== 0 && draggedElement.type !== 'folder') ? '-hovereditor' : ''"
                         :style="{'min-width': `${resolution.width}px`, 'min-height': `${resolution.height}px`}"
                         @dragover.stop="dragOverEditor"
                         @drop="dropOnEditor">
                        <video v-show="true" ref="video" class="w-full h-full" loop/>

                        <div v-for="(node, key) in nodes.slice().reverse()" :key="key">
                            <template v-if="node.type === 'image' && !node.hidden">
                                <img :key="node.id"
                                     class="absolute editor__zone"
                                     :class="{'target': selected === node}"
                                     :style="node.getStyle()"
                                     :src="node.url"
                                     :alt="node.name"
                                     @click.stop="selectNode(node)"/>
                            </template>

                            <template v-if="node.type === 'video' && !node.hidden">
                                <video :key="node.id"
                                       class="absolute editor__zone"
                                       :class="{'target': selected === node}"
                                       :style="node.getStyle()"
                                       :src="node.url"
                                       @click.stop="selectNode(node)"/>
                            </template>

                            <template v-if="node.type === 'shape' && !node.hidden">
                                <div :key="node.id"
                                     class="absolute editor__zone"
                                     :class="{'target': selected === node}"
                                     :style="node.getStyle()"
                                     @click.stop="selectNode(node)"/>
                            </template>
                        </div>
                        <div ref="spacer" class="absolute top-0 w-1 h-1" style="left: 2170px"/>
                    </div>
                </div>
            </div>
        </SplitArea>

        <SplitArea :size="20">
            <editor-timeline class="h-full" :nodes="nodes" :selected="selected ? selected.id : ''"
                             @itemSwap="swapNodes"
                             @selectNode="selectNode"
                             @deleteNode="deleteNode"/>
        </SplitArea>
    </Split>
</template>

<script>
    import EditorMixin from './mixins/Editor.mixin';
    import MoveableMixin from './mixins/Moveable.mixin';
    import ZoneImage from '@/classes/zones/ZoneImage';
    import ZoneVideo from '@/classes/zones/ZoneVideo';
    import ZoneShape from '@/classes/zones/ZoneShape';
    import EditorTimeline from './EditorTimeline.vue';
    import {mapGetters} from 'vuex';

    export default {

        name: 'Editor',
        mixins: [MoveableMixin, EditorMixin],
        components: {EditorTimeline},
        props: {
            zoom: {},
            resolution: {
                width: 0,
                height: 0
            }
        },
        data: () => ({
            nodes: [],
            selected: 0,
            moving: false
        }),
        mounted() {
            this.$root.$on('keyPressDel', this.deleteSelectedNode);
            this.$root.$on('editorSelectedEdit', this.resetMoveable);
            this.$root.$on('editorToolChanged', this.clickOutside);

            setTimeout(() => {
                this.$refs['video'].src = 'https://ak1.picdn.net/shutterstock/videos/1041630691/preview/stock-footage-abstract-pattern-of-circles-with-the-effect-of-displacement-white-clean-rings-animation-abstract.webm';
                this.scrollCenter();
                this.setZoom();
            }, 500);
        },
        computed: {
            ...mapGetters({
                draggedElement: 'getDraggedElement',
                browser: 'getBrowser'
            }),
            editorWrap() {
                return this.$refs['editorWrap'];
            },
            editor() {
                return this.$refs['editor'];
            }
        },

        watch: {
            zoom() {
                if (!this.$keys.CTRL) {
                    this.scrollCenter();
                }
                this.setZoom();
            },

            resolution: {
                deep: true,
                handler() {
                    this.setResolution();
                }
            },
            selected: {
                deep: true,
                handler(to, from) {
                    if (to) {
                        if(to.locked){
                            this.moveable.destroy();
                            this.moveable = null;
                            this.selected = null;
                            this.$root.$emit('editorSelectChanged', null);
                            return;
                        }
                        if (to !== from) {
                            this.$root.$emit('editorSelectChanged', to);
                            this.resetMoveable();
                        } else {
                            if (!this.moving) {
                                this.resetMoveable();
                            }
                        }
                    } else {
                        if (this.moveable) {
                            this.moveable.destroy();
                            this.moveable = null;
                            this.$root.$emit('editorSelectChanged', to);
                        }
                    }
                }
            }
        },

        methods: {
            dropElement(type, i) {
                let newItem;
                switch (type) {
                    case 'image':
                        newItem = new ZoneImage({
                            width: i.width,
                            height: i.height,
                            top: this.mousePosition.y,
                            left: this.mousePosition.x,
                            url: i.url
                        });
                        break;
                    case 'video':
                        newItem = new ZoneVideo({
                            width: i.width,
                            height: i.height,
                            top: this.mousePosition.y,
                            left: this.mousePosition.x,
                            url: i.url
                        });
                        break;
                    case 'shape':
                        newItem = new ZoneShape({
                            width: 300,
                            height: 300,
                            top: this.mousePosition.y,
                            left: this.mousePosition.x,
                            shape: i
                        });
                        break;
                }

                this.nodes.push(newItem);
                this.selected = newItem;
            },
            play() {
                this.$refs['video'].play();
            },
            pause() {
                this.$refs['video'].pause();
            },
            deleteSelectedNode() {
                if (this.selected) {
                    let index = this.nodes.findIndex((i) => i === this.selected);
                    this.selected = null;
                    this.$delete(this.nodes, index);
                }
            },
            deleteNode(node){
                let index = this.nodes.findIndex((i) => i === node);
                this.$delete(this.nodes, index);
                this.moveable.destroy();
                this.moveable = null;
            },
            swapNodes(items){
                this.nodes = items;
                this.resetMoveable();
            },
            selectNode(node){
                if(!node.locked){
                    this.selected = node;
                }
            }
        }
    };
</script>

<style lang="scss">

    .editor__wrap {
        height: 100%;
        overflow: auto;
        max-width: 100%;
        padding: 300px;
        background-color: lighten(#828282, 30%);

        &--drop {
            position: absolute;
            width: 100%;
            height: 100%;
            max-height: 40rem;
            background-color: blue;
            z-index: 1;
            opacity: 25%;
        }
    }

    .-hovereditor {
        &:after {
            content: "";
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            position: absolute;
            z-index: 100;
            background: blue;
            opacity: 50%;
            pointer-events: none;
        }
    }
</style>
