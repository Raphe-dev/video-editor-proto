<template>
    <div class="flex justify-between items-center w-full min-h-8 pl-4 pr-4 bg-black text-white">
        <div class="text-accent">
            <a>
                {{ $t('nav.top.brand') }}
            </a>
        </div>

        <div>
            <span>{{ $t('nav.top.welcome', ['username']) }}</span>
            <svg-icon icon="user-cog" class="ml-4 transform hover:cursor-pointer hover:text-white-lighter hover:scale-105" />
            <svg-icon icon="bell" class="ml-4 transform hover:cursor-pointer hover:text-white-lighter hover:scale-105" />
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TopNav'
    }
</script>

