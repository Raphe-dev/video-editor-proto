<template>
    <div class="h-20 flex bg-white text-black">
        <div class="min-w-48 px-4 flex items-center text-base border-0 border-r border-solid border-gray-lighter">
            <svg-icon
                :icon="['fab', 'youtube']"
                class="text-3xl mr-2" />
            <span class="capitalize">Youtube Tools</span>
        </div>
        <div
            class="flex w-full overflow-x-auto ">
            <div class="flex justify-between items-end h-full px-3 border-0 border-r border-solid border-gray-lighter">
                <input-text v-model="link"
                            :icon="['fab', 'youtube']"
                            width="18rem"
                            icon-position="top"
                            placeholder="ex: https://www.youtube.com/watch?v=hY7m5jjJ9mM"
                            class="mx-2 mb-5"/>

                <input-text v-model="name"
                            icon="pen"
                            width="8rem"
                            icon-position="top"
                            placeholder="ex: Cat video"
                            class="mx-2 mb-5"/>

                <input-select v-model="sound"
                              icon="volume-up"
                              icon-position="top"
                              :options="[
                                  { value: true, label: 'ON' },
                                  { value: false, label: 'OFF', default: true }
                              ]"
                              class="mx-2 mb-5"/>
            </div>
            <div class="flex justify-between items-end h-full px-3">
                <svg-icon class="self-center text-xl mx-2" icon="stopwatch" />
                <input-time icon="play" class="mx-2 mb-5" v-model="start"/>
                <input-time icon="square" class="mx-2 mb-5" v-model="stop"/>
            </div>
        </div>
    </div>
</template>

<script>
    //TODO functions, youtube video zone
    import InputText from '../../inputs/InputText';
    import InputSelect from '../../inputs/InputSelect';
    import InputTime from '../../inputs/InputTime';

    export default {
        name: 'EditorToolsYoutube',
        components: { InputText, InputSelect, InputTime },
        data: () => ({
            link: null,
            name: null,
            sound: false,
            start: {hh:'00',mm:'00',ss:'00'},
            stop: {hh:'00',mm:'00',ss:'00'}
        })
    };
</script>
