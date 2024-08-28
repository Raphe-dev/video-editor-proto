import { withKnobs, object, boolean } from '@storybook/addon-knobs';
import PanelHeader from '../../src/components/library/PanelHeader.vue';

export default {
    title: 'Panel',
    decorators: [ withKnobs ]
};

export const panelHeader = () => ({
    components: { PanelHeader },
    props: {
        active: {
            default: boolean('active', false)
        }
    },
    template: '<panel-header :active="active"></panel-header>'
});


