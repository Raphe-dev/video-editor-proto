/* eslint-disable no-undef */
import VideoZone from '@/classes/zones/ZoneVideo.js';

describe('Video Zone', () => {
    let OKoptions = { width: 300, height: 300, top: 50, left: 50, url: 'http://test.net'};

    it('Throw error when creating with no options', () => {
        expect(() => {
            new VideoZone();
        }).toThrow('No data was passed to the constructor')
    });

    it('Throw error when creating with missing options', () => {
        let options = { width: 300, height: 300, top: 0, left: 0 }; //missing url
        expect(() => {
            new VideoZone(options);
        }).toThrow('Missing required parameter')
    });

    it('Creates a new instance with options data', () => {
        let options = { width: 300, height: 300, top: 50, left: 50, url: 'http://test.net', style: { rotate: 90 } };
        let vid = new VideoZone(options);
        expect(vid.width).toBe(options.width);
        expect(vid.height).toBe(options.height);
        expect(vid.top).toBe(options.top);
        expect(vid.left).toBe(options.left);
        expect(vid.url).toBe(options.url);
        expect(vid.style.rotate).toBe(options.style.rotate)
    });

    it('Creates a new instance with a random id', () => {
        let vid = new VideoZone(OKoptions);
        let vid2 = new VideoZone(OKoptions);
        expect(vid.id).toBeDefined();
        expect(vid2.id).toBeDefined();
        expect(vid.id === vid2.id).toBe(false)
    });

    it('Creates a new instance with correct type', () => {
        let vid = new VideoZone(OKoptions);
        expect(vid.type).toBe('video')
    });

    it('Creates a new instance with default style', () => {
        let vid = new VideoZone(OKoptions);
        let style = vid.getStyle();
        expect(Object.keys(style)).toEqual(["width", "height", "left", "top", "opacity", "border", "padding", "z-index", "border-radius", "transform", "box-shadow"])
    });
});
