import Vue from 'vue';
import { withKnobs, object } from '@storybook/addon-knobs';
import EditorToolsText from '../../src/components/editor/tools/EditorToolsText';
import ZoneBase from '../../src/classes/zones/ZoneBase'
import Store from '../store'

export default {
    title: 'Editor Tools',
    decorators: [ withKnobs ]
};

export const Text = () => ({
    components: { EditorToolsText },
    props: {

    },

    template: `
        <div class="m-4 flex flex-col justify-center items-center">
            <editor-tools-text/>
        </div>
    `,
    store: Store
});


