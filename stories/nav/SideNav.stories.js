import { withKnobs, object, boolean } from '@storybook/addon-knobs';
import SideNav from '../../src/components/nav/SideNav.vue';
import Store from '../store';

export default {
    title: 'Nav bar',
    decorators: [ withKnobs ]
};

export const sideNav = () => ({
    components: { SideNav },
    props: {
        small: {
            default: boolean('small', false)
        },
        items: {
            default: object('items', [
                { name: 'apps', link: 'http://someurl', icon: 'font' },
                { name: 'my media', link: 'http://someurl', icon: 'address-card' },
                { name: 'animation', link: 'http://someurl', icon: 'share-square' },
                { name: 'library', link: 'http://someurl', icon: 'palette' },
                { name: 'broadcast', link: 'http://someurl', icon: 'broadcast-tower' }
            ])
        }
    },
    template: '<side-nav style="height: 100vh" :items="items"></side-nav>',
    store: Store
});
