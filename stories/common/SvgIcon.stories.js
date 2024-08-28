import { withKnobs, number, boolean, text, select } from '@storybook/addon-knobs';
export default {
    title: 'Common',
    decorators: [ withKnobs ]
};

export const Svg = () => ({
    props: {
        icon: {
            default: text('Icon', 'trash')
        },
        size: {
            default: select('Size', [ 'xs', 'sm', 'lg', '2x', '3x', '4x', '5x', '7x', '10x' ])
        },
        color: {
            default: text('Color', 'black')
        },
        rotate: {
            default: select('Rotate', [null, '90', '180', '270' ], null)
        },
        flip: {
            default: select('Flip', [ null, 'horizontal', 'vertical', 'both' ], null)
        },
        spin: {
            default: boolean('Spin', false)
        },
        pulse: {
            default: boolean('Pulse', false)
        },
        inverse: {
            default: boolean('Color white', false)
        },
        count: {
            default: number('Count', 0)
        },
        badgeX: {
            default: text('BadgeX', '7px')
        },
        badgeY: {
            default: text('BadgeY', '-20px')
        }
    },
    computed: {
        textcolor(){
            return `text-${this.color}`
        }
    },
    template: `
        <div class="m-4 flex flex-col justify-center items-center">
            <svg-icon :icon="icon" 
                      :size="size" 
                      :class="textcolor"
                      :inverse="inverse"
                      :rotate="rotate" 
                      :count="count"
                      :badgeX="badgeX"
                      :badgeY="badgeY"
                      :flip="flip" 
                      :spin="spin" 
                      :pulse="pulse"/>
        </div>
    `
});
