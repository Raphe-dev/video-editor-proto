import Vue from 'vue'
import VueTippy from "vue-tippy";

Vue.use(VueTippy, {
    directive: "tip", // => v-tip
    theme: 'custom',
    size: 'small',
    trigger: 'mouseenter',
    placement: 'bottom',
    animation: 'fade',
    distance: 8,
    flipDuration: 0,
    duration: [300, 150],
    delay: [750, 0],
    hideOnClick: true,
    arrow: true,
    ignoreAttributes: true,
    popperOptions: {
        modifiers: {
            preventOverflow: {
                enabled: false
            },
            hide: {
                enabled: false
            }
        }
    }
});
