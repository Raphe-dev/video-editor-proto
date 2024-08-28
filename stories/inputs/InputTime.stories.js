import { withKnobs, text, number, select, boolean } from '@storybook/addon-knobs';
import InputTime from '../../src/components/inputs/InputTime';

export default {
    title: 'Input',
    decorators: [ withKnobs ]
};

export const Time = () => ({
    components: { InputTime },
    props: {
        icon: {
            default: text('Icon', 'play')
        },
        iconPosition: {
            default: select('Icon position', [ 'top', 'left', 'right' ], 'left')
        },
        label: {
            default: text('Label', '')
        },
        disabled: {
            default: boolean('disabled', false)
        }
    },
    template: `
        <div class="m-4 flex justify-center items-center text-black-lightest">
            <input-time
                :icon="icon"
                :iconPosition="iconPosition"
                :label="label"
                :disabled="disabled"/>
        </div>
    `
});


