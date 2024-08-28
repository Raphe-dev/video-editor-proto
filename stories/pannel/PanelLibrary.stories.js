import { withKnobs, object, number } from '@storybook/addon-knobs';
import Draggable from 'vuedraggable';
import PanelHeader from '../../src/components/library/PanelHeader.vue';
import PanelLibrary from '../../src/components/library/MediaLibraryPanel.vue';
import LibraryList from '../../src/components/library/MediaLibraryList';
import FileRow from '../../src/components/library/MediaLibraryFile';
import FolderRow from '../../src/components/library/MediaLibraryFolder';

import Store from '../store';
import Vuex from 'vuex';

export default {
    title: 'Library',
    decorators: [ withKnobs ]
};
console.log(object);
export const panelLibraryMedium = () => ({
    components: { PanelHeader, LibraryList, PanelLibrary, Draggable, FileRow, FolderRow },
    props: {
        detailLevel: {
            default: number('detailLevel', 2)
        },
        data: {
            default: object('data', Store.state.folders)
        }
    },
    template: '<panel-library class="min-h-screen w-72" :detailLevel="detailLevel"></panel-library>',
    store: Store
});

export const panelLibraryHigh = () => ({
    components: { PanelHeader, LibraryList, PanelLibrary, Draggable, FileRow, FolderRow },
    props: {
        detailLevel: {
            default: number('detailLevel', 3)
        },
        data: {
            default: object('data', Store.state.folders)
        }
    },
    template: '<panel-library class="min-h-screen w-72" :detailLevel="detailLevel"></panel-library>',
    store: Store
});

export const panelLibraryLow = () => ({
    components: { PanelHeader, LibraryList, PanelLibrary, Draggable, FileRow, FolderRow },
    props: {
        detailLevel: {
            default: number('detailLevel', 1)
        },
        data: {
            default: object('data', Store.state.folders)
        }
    },
    template: '<panel-library class="min-h-screen w-72" :detailLevel="detailLevel"></panel-library>',
    store: Store
});
