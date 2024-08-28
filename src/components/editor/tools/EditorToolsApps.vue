<template>
    <div class="h-20 flex bg-white text-black">
        <div class="min-w-56 px-4 flex items-center text-base border-0 border-r border-solid border-gray-lighter">
            <svg-icon :icon="getIcon" class="text-3xl mr-2" />
            <span class="capitalize">
                {{ type }} {{ $t('editor.tools.app') }}
            </span>
        </div>
        <div class="flex w-full overflow-x-auto ">
            <div class="flex justify-between items-end h-full px-3 border-0 border-r border-solid border-gray-lighter">
                <input-select v-model="selected"
                              :validator="(value) => { return parseInt(value) }"
                              :icon="getIcon"
                              width="8rem"
                              icon-position="top"
                              :options="getData"
                              class="mx-2 mb-5" />
            </div>
            <div class="flex justify-between items-end h-full px-3">
                <input-select v-model="playType"
                              :validator="(value) => { return parseInt(value) }"
                              icon="play-circle"
                              width="auto"
                              icon-position="top"
                              :options="[
                                  { value: 0, label: `One slide every loop`, default: true },
                                  { value: 1, label: `All slide every loop`}
                              ]"
                              class="mx-2 mb-5" />

                <input-select v-model="lang"
                              :icon="[ 'far' , 'comment-alt']"
                              width="auto"
                              icon-position="top"
                              :options="[
                                  { value: 'fr', label: `French`, default: true },
                                  { value: 'en', label: `English`}
                              ]"
                              class="mx-2 mb-5" />
            </div>
        </div>
    </div>
</template>

<script>
    //TODO implementation of apps

    import InputSelect from '../../inputs/InputSelect';

    export default {
        name: 'EditorToolsApps',
        components: { InputSelect },
        props: {
            type: {
                type: String,
                validator: (val) => [ 'quizz', 'health', 'dental', 'quote', 'images of the world' ].includes(val),
                default: 'dental'
            }
        },
        data: () => ({
            selected: 0,
            playType: 0,
            lang: 'fr'
        }),
        computed: {
            getIcon() {
                switch(this.type){
                    case 'quote':
                        return 'quote-right';
                    case 'quizz':
                        return 'question-circle';
                    case 'health':
                        return 'briefcase-medical';
                    case 'dental':
                        return 'tooth';
                    case'images of the world':
                        return 'globe-americas'
                }
            },
            getData() {
                switch(this.type){
                    case 'quote':
                        return [
                            { value: 0, label: `Quote 1`, default: true },
                            { value: 1, label: 'Quote 2' },
                            { value: 2, label: 'Quote 3' },
                            { value: 3, label: 'Quote 4' },
                            { value: 4, label: 'Quote 5' },
                            { value: 5, label: 'Quote 6' }
                        ];
                    case 'quizz':
                        return [
                            { value: 0, label: `Quizz 1`, default: true },
                            { value: 1, label: 'Quizz 2' },
                            { value: 2, label: 'Quizz 3' },
                            { value: 3, label: 'Quizz 4' },
                            { value: 4, label: 'Quizz 5' },
                            { value: 5, label: 'Quizz 6' }
                        ];
                    case 'health':
                        return [
                            { value: 0, label: `Health 1`, default: true },
                            { value: 1, label: 'Health 2' },
                            { value: 2, label: 'Health 3' },
                            { value: 3, label: 'Health 4' },
                            { value: 4, label: 'Health 5' },
                            { value: 5, label: 'Health 6' }
                        ];
                    case 'dental':
                        return [
                            { value: 0, label: `Dental 1`, default: true },
                            { value: 1, label: 'Dental 2' },
                            { value: 2, label: 'Dental 3' },
                            { value: 3, label: 'Dental 4' },
                            { value: 4, label: 'Dental 5' },
                            { value: 5, label: 'Dental 6' }
                        ];
                    case 'images of the world':
                        return [
                            { value: 0, label: 'Canadian Great North', default: true },
                            { value: 1, label: 'Paris France' },
                            { value: 2, label: 'Switzerland' },
                            { value: 3, label: 'World Mix 1' },
                            { value: 4, label: 'World Mix 2' },
                            { value: 5, label: 'World Mix 3' },
                            { value: 6, label: 'World Mix 4' }
                        ];
                }
            }
        },
    };
</script>
