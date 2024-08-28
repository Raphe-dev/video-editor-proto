import { withKnobs, text, number, select, object, boolean } from '@storybook/addon-knobs';
import InputSelect from '../../src/components/inputs/InputSelect';

export default {
    title: 'Input',
    decorators: [ withKnobs ]
};

export const Select = () => ({
    components: { InputSelect },
    props: {
        icon: {
            default: text('Icon', 'search')
        },
        iconPosition: {
            default: select('Icon position', [ 'in', 'left', 'right', 'top' ], 'in')
        },
        width: {
            default: text('Width', 'auto')
        },
        label: {
            default: text('Label', '')
        },
        disabled: {
            default: boolean('disabled', false)
        },
        value: {
            default: text('Value', 'placeholder')
        },
        options: {
            default: object('options', [
                { value: 'placeholder', label: `placeholder`, disabled: true, default: true },
                { label: 'Option 1', value: 1 },
                { label: 'Option 2', value: 2 },
                { label: 'Option 3', value: 3 },
                { label: 'Option 4', value: 4 }
            ])
        }
    },
    template: `
        <div class="m-4 flex justify-center items-center text-black-lightest">
            <input-select
                v-model="value"
                :width="width"
                :icon="icon"
                :iconPosition="iconPosition"
                :label="label"
                :options="options"
                :disabled="disabled"/>
        </div>
    `
});
