<template>
    <svg-icon icon="circle-notch" spin :size="size" class="flex items-center justify-center"/>
</template>

<script>
    export default {
        name: "Loading",
        props: {
            size: {
                type: String,
                validator: (val) => [ 'xs', 'sm', 'lg', '2x', '3x', '4x', '5x', '7x', '10x' ].includes(val)
            }
        }
    }
</script>
