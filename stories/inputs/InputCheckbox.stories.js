import { withKnobs, text, select, boolean } from '@storybook/addon-knobs';
import InputCheckbox from '../../src/components/inputs/InputCheckbox';
import Vue from 'vue';

export default {
    title: 'Input',
    decorators: [ withKnobs ]
};

export const Checkbox = () => ({
    components: { InputCheckbox },
    props: {
        label: {
            default: text('Label', 'label')
        },
        labelPosition: {
            default: select('Label position', [ 'top', 'left', 'right' ], 'left')
        },
        size: {
            default: select('size', [ 'xs', 'sm', 'md', 'base', 'lg' ], 'sm')
        },
        disabled: {
            default: boolean('disabled', false)
        }
    },

    template: `
        <div class="m-4 flex flex-col justify-center items-center">
            <input-checkbox :label="label"
                            :labelPosition="labelPosition"
                            :size="size"
                            :disabled="disabled">                
            </input-checkbox>
        </div>
    `
});


