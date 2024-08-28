<template>
    <span>
        <fa-icon :icon="icon"
                 :size="size"
                 :rotation="rotate"
                 :spin="spin"
                 :pulse="pulse"
                 :inverse="inverse"
                 :flip="flip"
                 v-if="icon"
                 @click="$emit('click')"
                 @mousedown="$emit('mousedown')"
                 @mouseup="$emit('mouseup')" >
        </fa-icon>
        <div v-if="count"
             :style="`position: absolute; transform: translate(${badgeX}, ${badgeY}); border-radius: 15px; width: auto; height:0.8rem;`"
             class="bg-red shadow-xs text-white text-xs text-left font-bold px-1 flex items-center justify-start max-w-8 overflow-hidden">
            <div class="pt-px">
                {{ count }}
            </div>
        </div>
    </span>
</template>

<script>
    export default {
        name: 'SvgIcon',
        props: {
            icon: {
                type: [ String, Array ]
            },
            rotate: {
                type: String,
                validator: (val) => [ '90', '180', '270' ].includes(val)
            },
            size: {
                type: String,
                validator: (val) => [ 'xs', 'sm', 'lg', '2x', '3x', '4x', '5x', '7x', '10x' ].includes(val)
            },
            flip: {
                type: String,
                validator: (val) => [ 'horizontal', 'vertical', 'both' ].includes(val)
            },
            spin: {
                type: Boolean,
                default: false
            },
            pulse: {
                type: Boolean,
                default: false
            },
            inverse: {
                type: Boolean,
                default: false
            },
            count: {
                type: Number,
                default: null
            },
            badgeX: {
                type: String,
                default: '7px'
            },
            badgeY: {
                type: String,
                default: '-20px'
            }
        }
    };
</script>
