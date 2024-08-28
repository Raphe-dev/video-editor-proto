export default (i) => {
    i.$store.state.browser = detectBroswer();

    function detectBroswer() {
        if((navigator.userAgent.indexOf('Opera') || navigator.userAgent.indexOf('OPR')) !== -1) {
            return 'opera';
        } else { // noinspection EqualityComparisonWithCoercionJS
            if(navigator.userAgent.indexOf('Chrome') != -1) {
                return 'chrome';
            } else if(navigator.userAgent.indexOf('Safari') !== -1) {
                return 'safari';
            } else if(navigator.userAgent.indexOf('Firefox') !== -1) {
                return 'firefox';
            } else if((navigator.userAgent.indexOf('MSIE') !== -1) || (!!document.documentMode === true)) //IF IE > 10
            {
                return 'IE';
            } else {
                return 'unkown';
            }
        }
    }
}
