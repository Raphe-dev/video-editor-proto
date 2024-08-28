import Vue from 'vue';
import { withKnobs, select } from '@storybook/addon-knobs';
import EditorToolsApps from '../../src/components/editor/tools/EditorToolsApps';
import Store from '../../src/store'

export default {
    title: 'Editor Tools',
    decorators: [ withKnobs ]
};

export const Apps = () => ({
    components: { EditorToolsApps },
    props: {
        type: {
            default: select('type', [ 'quote', 'quizz', 'health', 'dental', 'images of the world'], 'quizz')
        }
    },

    template: `
        <div class="m-4 flex flex-col justify-center items-center">
            <editor-tools-apps :type="type"/>
        </div>
    `,
    store: Store
});


