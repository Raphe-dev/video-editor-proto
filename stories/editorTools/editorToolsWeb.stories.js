import Vue from 'vue';
import { withKnobs, select } from '@storybook/addon-knobs';
import EditorToolsWeb from '../../src/components/editor/tools/EditorToolsWeb';
import Store from '../store'

export default {
    title: 'Editor Tools',
    decorators: [ withKnobs ]
};

export const Web = () => ({
    components: { EditorToolsWeb },
    props: {
    },

    template: `
        <div class="m-4 flex flex-col justify-center items-center">
            <editor-tools-web/>
        </div>
    `,
    store: Store
});


