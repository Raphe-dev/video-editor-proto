<template>
    <div class="h-20 flex bg-white text-black">
        <div class="min-w-44 pl-4 flex items-center text-base border-0 border-r border-solid border-gray-lighter">
            <svg-icon icon="cloud-sun" class="text-3xl mr-2"/>
            <span class="capitalize">
                {{ $t('editor.tools.weather') }}
            </span>
        </div>
        <div class="flex items-end w-full overflow-x-auto px-3">
            <div class="flex items-end h-full px-3 border-0 border-r border-solid border-gray-lighter">
                <input-select value="null"
                              icon="globe-americas"
                              width="5.25rem"
                              icon-position="top"
                              :options="[
                                  { value: null, label: `Country`, default: true, disabled: true }
                              ]"
                              class="mx-2 mb-5" />

                <input-select value="null"
                              icon="map-marker-alt"
                              width="5.25rem"
                              icon-position="top"
                              :options="[
                                  { value: null, label: `Province`, default: true, disabled: true }
                              ]"
                              class="mx-2 mb-5" />

                <input-select value="null"
                              icon="city"
                              width="5.25rem"
                              icon-position="top"
                              :options="[
                                  { value: null, label: `City`, default: true, disabled: true }
                              ]"
                              class="mx-2 mb-5" />

                <input-select v-model="lang"
                              :icon="[ 'far' , 'comment-alt']"
                              width="auto"
                              icon-position="top"
                              :options="[
                                  { value: 'fr', label: $t('french'), default: true },
                                  { value: 'en', label: $t('english')}
                              ]"
                              class="mx-2 mb-5" />

                <input-select v-model="tempunit"
                              icon="thermometer-three-quarters"
                              width="5.25rem"
                              icon-position="top"
                              :options="[
                                  { value: 'C', label: `Celcius`, default: true },
                                  { value: 'F', label: `Fahrenheit`}
                              ]"
                              class="mx-2 mb-5" />
            </div>

            <div class="flex items-end h-full px-3">
                <div class="flex justify-between mx-3 mb-6 text-lg w-32">
                    <svg-icon icon="position-top"
                              @click="setBannerPosition('top')"
                              class="hover:cursor-pointer" :class="{'text-accent': bannerPosition === 'top'}"/>
                    <svg-icon icon="position-top" flip="vertical"
                              @click="setBannerPosition('bottom')"
                              class="hover:cursor-pointer" :class="{'text-accent': bannerPosition === 'bottom'}"/>
                    <svg-icon icon="position-left"
                              @click="setBannerPosition('left')"
                              class="hover:cursor-pointer" :class="{'text-accent': bannerPosition === 'left'}"/>
                    <svg-icon icon="position-left" flip="horizontal"
                              @click="setBannerPosition('right')"
                              class="hover:cursor-pointer" :class="{'text-accent': bannerPosition === 'right'}"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    //TODO functions, weather api, design

    import InputSelect from '../../inputs/InputSelect';

    export default {

        name: 'EditorToolsWeather',
        components: { InputSelect },
        props: {
            selected: null,

        },
        data: () => ({
            lang: 'fr',
            tempunit: 'C',
            bannerPosition: 'top'
        }),
        methods: {
            setBannerPosition(pos){
                this.bannerPosition = pos;
            }
        }
    };
</script>
