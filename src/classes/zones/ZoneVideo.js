import ZoneBase from './ZoneBase';

/**
 * OPTIONS:
 * ...ZoneBase, Url
 */
export default class ZoneVideo extends ZoneBase {
    constructor(options) {
        if(!options) throw new Error('No data was passed to the constructor');
        if( !options.width.toString() ||
            !options.height.toString() ||
            !options.url) throw new Error('Missing required parameter');

        super(options.width, options.height, options.top || 0, options.left || 0, options.style);

        this.type = 'video';
        this.url = options.url;
    }
}
