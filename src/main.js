import './sass/index.scss';
import './modules/fontawesome';
import './modules/tippy'
import globalEvents from './modules/globalEvents';
import detectBrowser from './modules/detectBrowser';

import Vue from 'vue';
import i18n from './i18n'
import router from './router';
import store from './store';

import App from './App.vue';
import SvgIcon from './components/commons/SvgIcon';
import Popper from './components/commons/Popper';
import VueSplit from 'vue-split-panel'
import LibraryList from './components/library/MediaLibraryList';

Vue.use(VueSplit);

//recursive components (use themselves) need to be globally registered
Vue.component('library-list', LibraryList);
Vue.component('svg-icon', SvgIcon);
Vue.component('popper', Popper);

Vue.config.productionTip = process.env.NODE_ENV !== 'production';

const i = new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app');

detectBrowser(i);
globalEvents(i);
