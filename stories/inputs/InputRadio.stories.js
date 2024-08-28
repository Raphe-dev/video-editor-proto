import { withKnobs, text, select, boolean, object } from '@storybook/addon-knobs';
import InputRadio from '../../src/components/inputs/InputRadio';
import Vue from 'vue';

export default {
    title: 'Input',
    decorators: [ withKnobs ]
};

export const Radio = () => ({
    components: { InputRadio },
    props: {
        options: {
            default: object('options', ['one', 'two', 'three'])
        },
        labelPosition: {
            default: select('Label position', [ 'top', 'bottom', 'left', 'right' ], 'top')
        },
        vertical: {
            default: boolean('Vertical', false)
        },
        size: {
            default: select('size', [ 'xs', 'sm', 'base', 'md', 'lg' ], 'sm')
        },
        disabled: {
            default: boolean('disabled', false)
        },
        required: {
            default: boolean('required', false)
        }
    },

    template: `
        <div class="m-4 flex flex-col justify-center items-center">
            <input-radio :options="options"
                         :size="size"
                         :labelPosition="labelPosition"
                         :vertical="vertical"
                         :disabled="disabled"
                         :required="required"/>
        </div>
    `
});


