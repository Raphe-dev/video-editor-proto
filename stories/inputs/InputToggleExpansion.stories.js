import { withKnobs, object, number } from '@storybook/addon-knobs';
import InputToggle from '../../src/components/inputs/InputToggle';
import ExpansionPanel from '../../src/components/commons/ExpansionPanel';
import InputNumber from '../../src/components/inputs/InputNumber';

export default {
    title: 'Input',
    decorators: [ withKnobs ]
};

export const ToggleExpansion = () => ({
    components: { InputToggle, ExpansionPanel, InputNumber },
    props: {
        max: {
            default: number('max', 3)
        },
        options: {
            default: object('options', {
                ruler: { icon: 'ruler'},
                size: { icon: 'expand-arrows-alt'},
                position: { icon: 'crosshairs'}
            })
        },
    },

    template: `
        <div class="flex w-full min-h-20 justify-center">
            <div class="min-h-20 w-12 flex justify-between items-center ">
                <input-toggle v-model="options"
                              size="md"
                              :max="max">
                    <expansion-panel slot="ruler" :hideWrapper="true" :open="options.ruler.toggle">
                        <input-number class="px-1"/>
                    </expansion-panel>
                    
                    <expansion-panel slot="size" :hideWrapper="true" :open="options.size.toggle">
                        <input-number class="px-1"/>
                        <input-number class="px-1"/>
                    </expansion-panel>
                    
                    <expansion-panel slot="position" :hideWrapper="true" :open="options.position.toggle">
                        <input-number class="px-1"/>
                        <input-number class="px-1"/>
                    </expansion-panel>
                </input-toggle>
            </div>
        </div>

    `,
});


