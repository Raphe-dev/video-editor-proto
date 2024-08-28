import ZoneBase from './ZoneBase';

/**
 * OPTIONS:
 * ...ZoneBase, Shape
 */
export default class ZoneShape extends ZoneBase {
    constructor(options) {
        if(!options) throw new Error('No data was passed to the constructor');
        if( !options.width.toString() ||
            !options.height.toString() ||
            !options.shape) throw new Error('Missing required parameter');

        super(options.width, options.height, options.top || 0, options.left || 0, options.style);

        this.type = 'shape';
        this.shape = options.shape;

        this.style.backgroundColor = '#383838';
        this.getShapeStyle(this.shape);
    }

    getShapeStyle(shape) {
        switch(shape) {
            case 'square':
                this.style.radius = 0;
                break;
            case 'circle':
                this.style.radius = 100;
                break;
            case 'line':
                this.width = 0;
                this.height = 500;
                this.style.padding = 1;
                break;
        }
    }

//Override
    getStyle() {
        return {
            width: `${this.width}px`,
            height: `${this.height}px`,
            left: `${this.left}px`,
            top: `${this.top}px`,
            opacity: this.style.opacity / 100,
            border: (this.style.borderWidth > 0 ? `${this.style.borderWidth}px solid ${this.style.borderColor}` : 'none'),
            padding: `${this.style.padding}px`,
            'z-index': this.style.zindex,
            'border-radius': `${this.style.radius / 2}%`,
            transform: `rotate(${this.style.rotate}deg) scale(${this.style.scale / 100})`,
            'box-shadow': this.getShadow(this.style.shadow),
            'background-color': this.style.backgroundColor
        };
    }

//Override
    getMoveableOptions() {
        return {
            draggable: true,
            resizable: true,
            scalable: false,
            keepRatio: false,
            rotatable: true,
            warpable: false,
            pinchable: true,
            edge: true,
            className: 'moveable__default'
        };
    }

}
