<template>
    <div class="h-full overflow-hidden bg-black transition-all duration-200 shadow-sm z-5" :class="small ? 'min-w-12 w-12' : 'min-w-20 w-20'"
         @mouseenter="mouseEnter"
         @mouseleave="mouseLeave">
        <div v-for="item in items" :key="item.name"
             class="flex flex-col justify-center items-center
                    w-full text-white transition-all duration-200
                    border-0 border-t border-solid border-white-light last:border-b
                    hover:cursor-pointer hover:bg-black-lighter active:bg-black-light"
             :class=" small ? 'h-12' : 'h-20'"
             v-tip="{content: item.link, placement: 'right'}">
            <svg-icon v-if="item.icon" :icon="item.icon" :size="small ? 'lg' : '2x'"/>

            <span v-if="!small" class="mt-2 uppercase text-xs whitespace-no-wrap">
                {{ item.name }}
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'SideNav',
        data: () => ({
            timeout: null
        }),
        computed: {
            small(){
                return !this.$store.state.bigSideNav
            },
            items(){
                return [
                    { name: this.$t('nav.side.apps'), link: '', icon: 'font' },
                    { name: this.$t('nav.side.medias'), link: '', icon: 'address-card' },
                    { name: this.$t('nav.side.animations'), link: '', icon: 'share-square' },
                    { name: this.$t('nav.side.library'), link: '', icon: 'palette' },
                    { name: this.$t('nav.side.broadcast'), link: '', icon: 'broadcast-tower' }
                ];
            }
        },
        methods: {
            mouseEnter(){
                this.timeout = setTimeout(() => {
                    this.$store.dispatch('setSideNavSize')
                },500)
            },
            mouseLeave(){
                if(!this.$store.state.bigSideNav){
                    clearTimeout(this.timeout)
                } else {
                    this.$store.dispatch('setSideNavSize')
                }
            }

        }
    };
</script>
