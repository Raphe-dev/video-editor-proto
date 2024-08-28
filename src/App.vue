<template>
    <div id="app" class="flex flex-col h-screen w-screen font-sans font-medium text-black">
        <div class="flex flex-col w-full h-full">
            <top-nav />
            <div class="app_content">
                <side-nav />
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script>
    import SideNav from './components/nav/SideNav';
    import TopNav from './components/nav/TopNav';

    export default {
        components: { SideNav, TopNav }
    };
</script>
