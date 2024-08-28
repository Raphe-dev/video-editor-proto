import Vue from 'vue';
import { withKnobs, select } from '@storybook/addon-knobs';
import EditorToolsWeather from '../../src/components/editor/tools/EditorToolsWeather';
import Store from '../store'

export default {
    title: 'Editor Tools',
    decorators: [ withKnobs ]
};

export const Weather = () => ({
    components: { EditorToolsWeather },
    props: {
    },

    template: `
        <div class="m-4 flex flex-col justify-center items-center">
            <editor-tools-weather/>
        </div>
    `,
    store: Store
});


