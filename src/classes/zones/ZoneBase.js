import { v4 as Uuid } from 'uuid';

export default class ZoneBase {
    constructor(width, height, top, left, style) {
        this.id = Uuid();
        this.width = width;
        this.height = height;
        this.top = top;
        this.left = left;
        this.style = {
            rotate: 0,
            radius: 0,
            scale: 100,
            opacity: 100,
            zindex: 1,
            borderWidth: 0,
            borderSpacing: 0,
            borderColor: '#FFFFFF',
            shadow: 0,
            padding: 0
        };

        if(style) this.style = Object.assign(this.style, style)
    }

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
            'box-shadow': this.getShadow(this.style.shadow)
        };
    }

    getShadow(size) {
        switch(size) {
            case 0:
                return '';
            case 1:
                return '0 1px 3px 2px rgba(0, 0, 0, 0.25)';
            case 2:
                return '1px 1px 5px 3px rgba(0, 0, 0, 0.25)';
            case 3:
                return '2px 2px 8px 5px rgba(0, 0, 0, 0.25)';
            case 4:
                return '2px 2px 16px 10px rgba(0, 0, 0, 0.25)';
            case 5:
                return '3px 3px 24px 15px rgba(0, 0, 0, 0.25)';
        }
    }

    getMoveableOptions() {
        return {
            draggable: true,
            resizable: true,
            scalable: false,
            keepRatio: true,
            rotatable: true,
            warpable: false,
            pinchable: true,
        };
    }

}
