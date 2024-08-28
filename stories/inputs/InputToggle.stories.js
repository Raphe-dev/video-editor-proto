import { withKnobs, object } from '@storybook/addon-knobs';
import InputToggle from '../../src/components/inputs/InputToggle';

export default {
    title: 'Input',
    decorators: [ withKnobs ]
};

export const Toggle = () => ({
    components: { InputToggle },
    props: {
        options: {
            default: object('options', {
                bold: { icon: 'bold'},
                italic: { icon: 'italic'},
                underline: { icon: 'underline'},
                superscript: { icon: 'superscript'}
            })
        }
    },

    template: `
        <div class="flex w-full min-h-20 justify-center">
            <div class="min-h-20 w-20 flex justify-between items-center ">
                <input-toggle v-model="options"></input-toggle>
            </div>
        </div>

    `,
});
