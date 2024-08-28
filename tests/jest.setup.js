import Vue from 'vue';
import SvgIcon from  '@/components/commons/SvgIcon.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
Vue.component('fa-icon', FontAwesomeIcon);
Vue.component('svg-icon', SvgIcon);
Vue.prototype.$t = () => {};
Vue.prototype.$tc = () => {};
