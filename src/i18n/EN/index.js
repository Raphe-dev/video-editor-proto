import Nav from './nav'
import Editor from './editor'
import Commons from './commons'

export default {
    nav: Nav,
    ...Editor,
    ...Commons
}
