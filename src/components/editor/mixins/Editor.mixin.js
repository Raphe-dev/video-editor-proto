export default {
    data: () => ({
        dropCounter: 0,
        mousePosition: {
            x: 0,
            y: 0
        },
        middleMouseDown: false,
        startX: 0,
        startY: 0,
        scrollLeft: null,
        scrollTop: null,
        rulerH: null,
        rulerV: null
    }),

    methods: {
        dragStart(i, e){
            if(i){
                e.preventDefault();
                this.dropCounter++;
            } else {
                this.dropCounter--;
            }
        },

        dragOverEditor(e){
            e.preventDefault();
            if(!this.moving){
                if(this.browser === 'chrome'){
                    this.mousePosition = {x: e.offsetX, y: e.offsetY};
                } else {
                    this.mousePosition = {x: e.layerX, y: e.layerY};
                }
            }
        },

        dropOnEditor(e){
            e.preventDefault();
            this.dropCounter = 0;
            if(this.draggedElement.value && this.draggedElement.type !== 'folder'){
                this.dropElement(this.draggedElement.type, this.draggedElement.value);
            }
        },

        scrollCenter() {
            this.$nextTick(() => {
                this.editorWrap.scrollTop = (this.editorWrap.scrollHeight / 2) - this.editorWrap.clientHeight / 2;
                this.editorWrap.scrollLeft = (this.editorWrap.scrollWidth / 2) - this.editorWrap.clientWidth / 2;
            })
        },

        startDragArea(e) {
            if(e.which === 2){
                this.middleMouseDown = true;
                this.startX = e.pageX - this.editorWrap.offsetLeft;
                this.startY = e.pageY - this.editorWrap.offsetTop;
                this.scrollLeft = this.editorWrap.scrollLeft;
                this.scrollTop = this.editorWrap.scrollTop;
                this.editorWrap.style.cursor = 'all-scroll';
            }
        },

        dragArea(e) {
            if(!this.middleMouseDown) return;

            const x = e.pageX - this.editorWrap.offsetLeft;
            const y = e.pageY - this.editorWrap.offsetTop;
            const walkx = (x - this.startX);
            const walky = (y - this.startY);
            this.editorWrap.scrollLeft = this.scrollLeft - walkx;
            this.editorWrap.scrollTop = this.scrollTop - walky;
        },

        endDragArea() {
            this.middleMouseDown = false;
            this.editorWrap.style.cursor = 'default';
        },

        setZoom(){
            //TODO find a better way to handle spacing and centering
            this.editor.style.transform = `scale(${this.zoom})`;
            this.$refs.spacer.style.left = `${this.editor.clientWidth + 280 / this.zoom}px`;
            if (this.zoom <= 0.1 ) {
                this.editorWrap.style['padding-left'] = `${this.editorWrap.clientWidth/2.5}px`;
            } else if (this.zoom <= 0.25 ) {
                this.editorWrap.style['padding-left'] = `${this.editorWrap.clientWidth/3}px`;
            } else if (this.zoom <= 0.5){
                this.editorWrap.style['padding-left'] = `${this.editorWrap.clientWidth/4}px`;
            } else {
                this.editorWrap.style['padding-left'] = `${300}px`;
            }
        },

        setResolution() {
            this.editor.style['min-width'] = `${this.resolution.width}px`;
            this.editor.style['min-height'] = `${this.resolution.height}px`;
            this.editor.style['max-height'] = `${this.resolution.height}px`;
        },

        clickOutside(){
            if(!this.moving) {
                this.selected = null;
            }
        }
    },
}
