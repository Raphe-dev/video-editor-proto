import Vue from 'vue';
import { withKnobs, object, boolean } from '@storybook/addon-knobs';
import EditorToolsImage from '../../src/components/editor/tools/EditorToolsImage';
import ZoneImage from '../../src/classes/zones/ZoneImage'
import Store from '../store'

export default {
    title: 'Editor Tools',
    decorators: [ withKnobs ]
};

export const Image = () => ({
    components: { EditorToolsImage },
    props: {
        selected: {
            default: object('object', new ZoneImage({width: 960, height: 640, url: 'https://cdn.pixabay.com/photo/2020/01/14/17/55/dog-4765784_960_720.jpg'}))
        }
    },

    template: `
        <div class="m-4 flex flex-col justify-center items-center">
            <editor-tools-image class="w-3/4" :selected="selected"/>
        </div>
    `,
    store: Store
});


