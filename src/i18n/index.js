/**
 * use $t(str) to call a simple string
 *
 * use $t(str, [arg1, arg2]) to call a string containing {0} {1}
 *
 * use $tc(str, count) for pluralisation
 * ex:
 *    $tc('media') || $tc('media', $COUNT)
 **/

import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './FR'
import fr from './EN'

Vue.use(VueI18n);

const defaultLocale = 'en'

const languages = {
    en: en,
    fr: fr,
}
const messages = Object.assign(languages)

export default new VueI18n({
    locale: defaultLocale,
    fallbackLocale: 'fr',
    messages
})
