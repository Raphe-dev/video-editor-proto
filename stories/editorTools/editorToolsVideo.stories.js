import Vue from 'vue';
import { withKnobs, object } from '@storybook/addon-knobs';
import EditorToolsVideo from '../../src/components/editor/tools/EditorToolsVideo';
import ZoneVideo from '../../src/classes/zones/ZoneVideo'
import Store from '../store'

export default {
    title: 'Editor Tools',
    decorators: [ withKnobs ]
};

export const Video = () => ({
    components: { EditorToolsVideo },
    props: {
        selected: {
            default: object('object', new ZoneVideo({ width:596, height:336, url:'https://ak8.picdn.net/shutterstock/videos/29749408/preview/stock-footage-sunset-at-the-beach-in-sardinia-italy.webm'}))
        }
    },

    template: `
        <div class="m-4 flex flex-col justify-center items-center">
            <editor-tools-video :selected="selected"/>
        </div>
    `,
    store: Store
});


