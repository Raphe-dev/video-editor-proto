import Vue from 'vue';
import { withKnobs, select } from '@storybook/addon-knobs';
import EditorToolsYoutube from '../../src/components/editor/tools/EditorToolsYoutube';
import Store from '../store'

export default {
    title: 'Editor Tools',
    decorators: [ withKnobs ]
};

export const YouTube = () => ({
    components: { EditorToolsYoutube },
    props: {
    },

    template: `
        <div class="m-4 flex flex-col justify-center items-center">
            <editor-tools-youtube/>
        </div>
    `,
    store: Store
});


