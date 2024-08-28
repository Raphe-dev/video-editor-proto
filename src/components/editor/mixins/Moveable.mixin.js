import Moveable from 'moveable';

export default {
    data: () => ({
        moveable: null
    }),

    methods: {
        initMoveable() {
            this.moveable = new Moveable(this.editor, {
                ...this.selected.getMoveableOptions(),
                target: document.querySelector('.target'),
                className: 'moveable__default',
                container: this.editor,
                throttleResize: 0,
                throttleScale: 0,
                snappable: true,
                snapThreshold: 10,
                verticalGuidelines: [this.editor.clientWidth / 2],
                horizontalGuidelines: [this.editor.clientHeight / 2],
                zoom: this.zoom,
                elementGuidelines: Object.values(document.querySelectorAll('.editor__zone:not(.target), .editor')).filter(el => el !== null)
            });

            //WHEN SHIFT PRESSED
            // this.moveable.throttleDragRotate = 45;

            //RESIZE
            this.moveable.on('resizeStart', () => this.setMoving(true))
                .on('resize', this.moveableResize)
                .on('resizeEnd', this.moveableResizeEnd);

            //ROTATE
            let rotateData = {baseRotate: 0, newRotate: 0};
            this.moveable.on('rotateStart', () => this.moveableRotateStart(rotateData))
                .on('rotate', ({rotate}) => this.moveableRotate(rotateData, rotate))
                .on('rotateEnd', () => this.setMoving(false));

            //DRAG
            let dragData = {origintop: 0, originleft: 0, tleft: 0, ttop: 0};
            this.moveable.on('dragStart', ({target}) => this.moveableDragStart(dragData, target))
                .on('drag', ({target, left, top}) => this.moveableDrag(dragData, target, left, top))
                .on('dragEnd', () => this.setMoving(false));
        },

        resetMoveable() {
            this.$nextTick(function () {
                if (this.moveable !== null) {
                    this.moveable.destroy();
                    this.initMoveable();
                } else {
                    this.initMoveable();
                }
            });
        },

        setMoving(bool) {
            if (bool) {
                this.moving = true;
            } else {
                setTimeout(() => {
                    this.moving = false;
                }, 100);
            }
        },

        moveableDragStart(dragData, target) {
            this.setMoving(true);
            dragData.origintop = parseInt(target.style.top);
            dragData.originleft = parseInt(target.style.left);
        },

        moveableDrag(dragData, target, left, top) {
            target.style.left = `${parseInt(left)}px`;
            target.style.top = `${parseInt(top)}px`;

            this.selected.left = parseInt(left);
            this.selected.top = top;
        },

        moveableResize({target, width, height, drag}) {
            target.style.width = `${width}px`;
            target.style.height = `${height}px`;
            target.style.translate = drag.beforeTranslate;
            target.style.transform = `translate(${drag.beforeTranslate[0]}px, ${drag.beforeTranslate[1]}px) rotate(${this.selected.style.rotate}) scale(${this.selected.style.scale / 100})`;
            this.selected.width = width;
            this.selected.height = height;
            this.selected.style.translate = drag.beforeTranslate;
        },

        moveableResizeEnd() {
            this.setMoving(false);
            this.selected.style.translate = '[0,0,0]';
        },

        moveableRotateStart(rotateData) {
            this.setMoving(true);
            rotateData.baseRotate = this.selected.style.rotate;
        },

        moveableRotate(rotateData, rotate) {
            rotateData.newRotate = parseInt(parseFloat(rotateData.baseRotate + rotate).toFixed(2));

            if (rotateData.newRotate >= 360 || rotateData.newRotate <= -360) {
                this.selected.style.rotate = 0;
            } else {
                this.selected.style.rotate = rotateData.newRotate;
            }
        }
    }

};
