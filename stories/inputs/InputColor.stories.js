import { withKnobs, text, select, array, boolean } from '@storybook/addon-knobs';
import InputColor from '../../src/components/inputs/InputColor';
import Store from '../store';

export default {
    title: 'Input',
    decorators: [ withKnobs ]
};

export const Color = () => ({
    components: { InputColor },
    props: {
        color: {
            default: text('Color', '#292E32')
        },
        savedColors: {
            default: array('PresetColors', Store.getters.getPresetColors)
        },
        size: {
            default: select('Size', [ 'bg', 'md', 'sm' ], 'bg')
        },
        disabled: {
            default: boolean('Disabled', false)
        }
    },

    template: `
        <div class="m-4 flex justify-center items-center">
            <input-color v-model="color"
                        :size="size"
                        :disabled="disabled"/>
        </div>
    `,
    store: Store
});


