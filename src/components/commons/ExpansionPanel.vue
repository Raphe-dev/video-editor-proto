<template>
    <div class="flex h-full transition-all" :class="`duration-${delay}`">
        <div class="flex flex-1" v-if="reverse"/>
        <div class="flex transition-all overflow-hidden" :class="[isOpen ? 'w-full' : 'w-0', `duration-${delay}`]" >
            <slot></slot>
        </div>
        <div v-if="!hideWrapper"
             class="flex px-1 items-center h-full border-0 border-r border-solid border-gray-lighter hover:cursor-pointer"
             @click.prevent="isOpen = !isOpen"
             :title="label">
            <span v-if="showLabel && label" class="px-1 text-xsm" >
                {{ label }}
            </span>
            <svg-icon v-if="showLabel && icon" :icon="icon" class="px-1 text-md" :size="iconSize"/>
            <svg-icon icon="chevron-right" :flip="isOpen ? 'horizontal' : null"></svg-icon>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ExpansionPanel',
        props: {
            open: {
                type: Boolean,
                default: true
            },
            label: {
                type: String,
                default: ''
            },
            icon: {
                type: String,
                default: ''
            },
            iconSize: {
                type: String,
                validator: (val) => [ 'xs', 'sm', 'lg', '2x', '3x', '4x', '5x', '7x', '10x' ].includes(val)
            },
            reverse: {
                type: Boolean,
                default: false
            },
            delay: {
                type: Number,
                default: 200
            },
            hideWrapper: {
                type: Boolean,
                default: false
            }
        },
        data: function() {
            return {
                isOpen: this.open,
                showLabel: false
            }
        },
        watch: {
            open(to){
                this.isOpen = to;
            },
            isOpen(to){
                if(!to){
                    const t = (this.reverse ? 0 : -50) + this.delay;
                    setTimeout(() => {
                        this.showLabel = !to;
                    },t)
                } else {
                    this.showLabel = !to;
                }

            }
        }
    };
</script>

