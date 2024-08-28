import Vue from 'vue';

//i is the actual app vue instance
export default function(i) {
    Vue.prototype.$keys = {
        CTRL: false,
        DEL: false
    };

    document.addEventListener('keydown', (event) => {
        switch(event.which) {
            case 17 : {
                Vue.prototype.$keys.CTRL = true;
                break;
            }
            case 46: {
                Vue.prototype.$keys.DEL = true;
                i.$root.$emit('keyPressDel');
                break;
            }
        }

    });

    document.addEventListener('keyup', (event) => {
        switch(event.which) {
            case 17 : {
                Vue.prototype.$keys.CTRL = false;
                break;
            }
            case 46: {
                Vue.prototype.$keys.DEL = false;
                break;
            }
        }
    });
}
