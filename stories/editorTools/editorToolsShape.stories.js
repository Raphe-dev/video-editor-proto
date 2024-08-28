import Vue from 'vue';
import { withKnobs, object } from '@storybook/addon-knobs';
import EditorToolsShape from '../../src/components/editor/tools/EditorToolsShape';
import ZoneShape from '../../src/classes/zones/ZoneShape'
import Store from '../store'

export default {
    title: 'Editor Tools',
    decorators: [ withKnobs ]
};

export const Shape = () => ({
    components: { EditorToolsShape },
    props: {
        selected: {
            default: object('object', new ZoneShape({width: 300, height: 300, shape: 'square'}))
        }
    },

    template: `
        <div class="m-4 flex flex-col justify-center items-center">
            <editor-tools-shape :selected="selected"/>
        </div>
    `,
    store: Store
});


