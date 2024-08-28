/* eslint-disable no-undef */
import ImageZone from '@/classes/zones/ZoneImage.js';

describe('Image Zone', () => {
    let OKoptions = { width: 300, height: 300, top: 50, left: 50, url: 'http://test.net'};

    it('Throw error when creating with no options', () => {
        expect(() => {
            new ImageZone();
        }).toThrow('No data was passed to the constructor')
    });

    it('Throw error when creating with missing options', () => {
        let options = { width: 300, height: 300, top: 0, left: 0 }; //missing url
        expect(() => {
            new ImageZone(options);
        }).toThrow('Missing required parameter')
    });

    it('Creates a new instance with options data', () => {
        let options = { width: 100, height: 100, top: 10, left: 10, url: 'http://test.net', style: { rotate: 90 } };
        let img = new ImageZone(options);
        expect(img.width).toBe(options.width);
        expect(img.height).toBe(options.height);
        expect(img.top).toBe(options.top);
        expect(img.left).toBe(options.left);
        expect(img.url).toBe(options.url);
        expect(img.style.rotate).toBe(options.style.rotate)
    });

    it('Creates a new instance with a random id', () => {
        let img = new ImageZone(OKoptions);
        let img2 = new ImageZone(OKoptions);
        expect(img.id).toBeDefined();
        expect(img2.id).toBeDefined();
        expect(img.id === img2.id).toBe(false)
    });

    it('Creates a new instance with correct type', () => {
        let img = new ImageZone(OKoptions);
        expect(img.type).toBe('image')
    });

    it('Creates a new instance with default style', () => {
        let img = new ImageZone(OKoptions);
        let style = img.getStyle();
        expect(Object.keys(style)).toEqual(["width", "height", "left", "top", "opacity", "border", "padding", "z-index", "border-radius", "transform", "box-shadow"])
    });

    it('Applies the propper shadow', () => {
        let img = new ImageZone({ width: 100, height: 100, url: 'http://test.net', style: {shadow: 1 } });
        expect(img.getStyle()['box-shadow']).toBeTruthy()
    });
});
