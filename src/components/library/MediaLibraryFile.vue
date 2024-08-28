<template>
    <popper ref="popper" trigger="hover"
            :delay-on-mouse-over="750"
            boundaries-selector="body"
            :options="{ placement: 'right'}">
        <div v-show="!disabled" class="popper -full">
            <div class="w-64 flex flex-col">
                <template v-if="file.url">
                    <div v-if="detailLevel !== 1 && file.type === 'image'"
                         class="min-w-full h-56 bg-center bg-no-repeat bg-cover"
                         :style="{'background-image': `url(${file.url})`}"/>

                    <video v-if="detailLevel !== 1 && file.type === 'video'" class="w-full h-full" :src="file.url"/>
                </template>
                <loading v-else class="h-56 text-black" size="3x"/>

                <div class="flex flex-col justify-around bg-black text-white p-3 w-full ">
                    <span class="text-lg text-left mb-4">
                        {{ file.name }}
                    </span>
                    <div v-for="(value, key) in file" :key="key"
                         class="flex justify-between m-w-full pt-1">
                        <template v-if="key !== 'url'">
                            <span class="text-sm uppercase font-bold text-gray">
                                {{ key }} :
                            </span>

                            <div class="w-3/5 text-left break-words whitespace-pre-line">
                                {{ value }}
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="file" id="file-wrapper" slot="reference"
             class="flex min-h-6 whitespace-nowrap w-full"
             :class="{'bg-white-darker': file.selected, 'p-1': detailLevel === 3, 'w-full h-32 m-px items-center justify-center': detailLevel === 1}"
             @click="mixinClick(singleClick, doubleClick)">
            <!-- Low Details -->
            <template v-if="detailLevel === 1">
                <div v-if="file.type === 'image' && file.url"
                     class="min-w-full min-h-full bg-center bg-no-repeat bg-contain hover:cursor-pointer bg-black"
                     :class="{'opacity-70': file.selected}"
                     :style="{'background-image': `url(${file.url})`}"/>

                <video v-if="file.type === 'video' && file.url" class="h-full w-26 bg-black" :src="file.url"/>
                <loading v-if="!file.url" size="2x"/>
            </template>

            <!-- Medium Details -->
            <template v-else-if="detailLevel === 2">
                <svg-icon :icon="getIcon" :class="getIconClass" v-if="file.url"/>
                <loading v-else/>

                <span v-if="!edit" class="mt-1 ml-1 text-base hover:cursor-pointer">
                    {{ file.name }}{{ file.ext }}
                </span>

                <input v-else
                       ref="editFileName"
                       v-model="file.name"
                       class="px-2 h-6 text-base bg-white-dark"
                       type="text"
                       @focusout="editFocusOut"/>
            </template>

            <!-- High Details -->
            <template v-else-if="detailLevel === 3">
                <div v-if="file.type === 'image' && file.url"
                     class="min-h-10 h-10 min-w-10 w-10 bg-center bg-no-repeat bg-contain"
                     :style="{'background-image': `url(${file.url})`}"/>
                <loading v-if="!file.url"/>

                <div class="min-h-10 min-w-10" v-if="file.type === 'video'">
                    <video v-if="file.url" class="h-10 w-10" :src="file.url"/>
                    <loading v-else/>
                </div>

                <div class="flex flex-col justify-between text-sm p-1/2 ml-1 text-gray-darker overflow-hidden">
                    <p>
                        <span v-if="!edit" class="mt-1 ml-1 text-base hover:cursor-pointer" :class="getIconClass">
                            {{ fileName }}
                        </span>
                        <input v-else
                               ref="editFileName"
                               id="file-name-input"
                               v-model="file.name"
                               class="px-2 h-6 text-base bg-white-dark text-black"
                               type="text"
                               @focusout="editFocusOut">
                    </p>

                    <p>{{ file.ext }}, 28kb, <strong>19/08/2019</strong>, 1920x1080</p>
                </div>
            </template>
        </div>
    </popper>
</template>

<script>
    import DoubleClick from '../mixins/DoubleClick';
    import Loading from '@/components/commons/Loading'

    export default {
        name: 'FileRow',
        mixins: [ DoubleClick ],
        components: { Loading },
        props: {
            file: {},
            detailLevel: {
                type: Number,
                default: 3
            }
        },
        data: () => ({
            edit: false,
            nameMaxLength: 20,
            randomImage: '',
            disabled: false
        }),
        computed: {
            fileName() {
                if(this.file.name.length > this.nameMaxLength) {
                    return this.file.name.substr(0, this.nameMaxLength) + '...';
                } else {
                    return this.file.name;
                }
            },
            getIcon() {
                return `file-${this.file.type}`
            },
            getIconClass() {
                switch(this.file.type) {
                    case 'image' :
                        return 'text-green';
                    case 'video' :
                        return 'text-blue';
                }
            },
        },
        beforeMount() {
            this.$root.$on('libraryDragStart', () => {
                // hide popper
                this.disabled = true;
            });
            this.$root.$on('libraryDragEnd', () => {
                this.disabled = false;
            });
        },
        methods: {
            editFocusOut() {
                this.edit = false;
                this.$root.$emit('editLibraryFocusOut');
            },
            singleClick() {
                if(!this.edit){
                    this.$emit('selectFile');
                }
            },
            doubleClick() {
                if(this.detailLevel !== 1) {
                    this.$root.$emit('editLibraryFocus');
                    this.edit = true;
                    setTimeout(() => {
                        this.$refs['editFileName'].focus();
                    }, 100);
                }
            }
        }
    };
</script>
