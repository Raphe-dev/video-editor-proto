import { withKnobs, text, number, select, boolean } from '@storybook/addon-knobs';
import InputNumber from '../../src/components/inputs/InputNumber';

export default {
    title: 'Input',
    decorators: [ withKnobs ]
};

export const Number = () => ({
    components: { InputNumber },
    props: {
        value: {
            default: number('Value', 100)
        },
        min: {
            default: number('Min', -100)
        },
        max: {
            default: number('Max', 100)
        },
        icon: {
            default: text('Icon', 'undo')
        },
        iconPosition: {
            default: select('Icon position', [ 'top', 'left', 'right' ])
        },
        width: {
            default: text('Width', '3.75rem')
        },
        symbol: {
            default: text('Symbol', '%')
        },
        label: {
            default: text('Label', '')
        },
        validator: {
            default: select('Validator', [ '(value) => { return parseInt(value) }' ])
        },
        disabled: {
            default: boolean('disabled', false)
        }
    },
    template: `
        <div class="m-4 flex justify-center items-center text-black-lightest">
            <input-number
                v-model="value"
                :validator="(value) => { return parseInt(value)}"
                :min="-100"
                :max="100"
                :width="width"
                :icon="icon"
                :iconPosition="iconPosition"
                :symbol="symbol"
                :label="label"
                :disabled="disabled"/>
        </div>
    `
});


