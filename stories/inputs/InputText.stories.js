import { withKnobs, text, number, select, boolean } from '@storybook/addon-knobs';
import InputText from '../../src/components/inputs/InputText';

export default {
    title: 'Input',
    decorators: [ withKnobs ]
};

export const Text = () => ({
    components: { InputText },
    props: {
        min: {
            default: number('Min char', 1)
        },
        max: {
            default: number('Max char', 1000)
        },
        icon: {
            default: text('Icon', 'globe')
        },
        iconPosition: {
            default: select('Icon position', [ 'top', 'left', 'right' ], 'left')
        },
        width: {
            default: text('Width', '6rem')
        },
        label: {
            default: text('Label', '')
        },
        labelPosition: {
            default: select('Label position', [ 'top', 'left', 'right' ], 'left')
        },
        placeholder: {
            default: text('Placeholder', 'placeholder')
        },
        disabled: {
            default: boolean('disabled', false)
        }
    },
    template: `
        <div class="m-4 flex justify-center items-center text-black-lightest">
            <input-text
                :min="min"
                :max="max"
                :width="width"
                :icon="icon"
                :iconPosition="iconPosition"
                :label="label"
                :labelPosition="labelPosition"
                :placeholder="placeholder"
                :disabled="disabled"/>
        </div>
    `
});


