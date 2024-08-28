/* eslint-disable no-undef */
import ShapeZone from '@/classes/zones/ZoneShape.js';

describe('Shape Zone', () => {
    let OKoptions = { width: 300, height: 300, top: 50, left: 50, shape: 'circle'};

    it('Throw error when creating with no options', () => {
        expect(() => {
            new ShapeZone();
        }).toThrow('No data was passed to the constructor')
    });

    it('Throw error when creating with missing options', () => {
        let options = { width: 300, height: 300, top: 0, left: 0 }; //missing shape
        expect(() => {
            new ShapeZone(options);
        }).toThrow('Missing required parameter')
    });

    it('Creates a new instance with options data', () => {
        let options = { width: 300, height: 300, top: 50, left: 50, shape: 'star', style: { rotate: 90 } }; //missing url
        let shape = new ShapeZone(options);
        expect(shape.width).toBe(options.width);
        expect(shape.height).toBe(options.height);
        expect(shape.top).toBe(options.top);
        expect(shape.left).toBe(options.left);
        expect(shape.shape).toBe(options.shape);
        expect(shape.style.rotate).toBe(options.style.rotate)
    });

    it('Creates a new instance with a random id', () => {
        let shape = new ShapeZone(OKoptions);
        let shape2 = new ShapeZone(OKoptions);
        expect(shape.id).toBeDefined();
        expect(shape2.id).toBeDefined();
        expect(shape.id === shape2.id).toBe(false)
    });

    it('Creates a new instance with correct type', () => {
        let vid = new ShapeZone(OKoptions);
        expect(vid.type).toBe('shape')
    });

    it('Creates a new instance with default style', () => {
        let vid = new ShapeZone(OKoptions);
        let style = vid.getStyle();
        expect(Object.keys(style)).toEqual(["width", "height", "left", "top", "opacity", "border", "padding", "z-index", "border-radius", "transform", "box-shadow", "background-color"])
    });

    it('Creates different styles for different shapes', () => {
        let line = new ShapeZone(Object.assign(OKoptions, { shape: 'line' }));
        let square = new ShapeZone(Object.assign(OKoptions, { shape: 'square' }));
        let circle = new ShapeZone(Object.assign(OKoptions, { shape: 'circle' }));

        expect(JSON.stringify(Object.values(square.getStyle())) === JSON.stringify(Object.values(circle.getStyle()))).toBe(false);
        expect(JSON.stringify(Object.values(square.getStyle()))  === JSON.stringify(Object.values(line.getStyle()))).toBe(false);
        expect(JSON.stringify(Object.values(circle.getStyle())) === JSON.stringify(Object.values(line.getStyle()))).toBe(false);
    });
});
