export default {
    data: () => ({
        delay: 200,
        clickCount: 0,
        clickTimer: 0
    }),
    methods: {
        mixinClick(single, double, payload = undefined) {
            this.clickCount++;
            if(this.clickCount === 1) {
                this.clickTimer = setTimeout(() => {
                    this.clickCount = 0;
                    this.clickTimer = 0;
                    return single(payload);
                }, this.delay);
            } else if(this.clickCount === 2) {
                clearTimeout(this.clickTimer);
                this.clickCount = 0;
                this.clickTimer = 0;
                return double(payload);
            }
        }
    }
};
