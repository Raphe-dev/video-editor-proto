export default {
    data: () => ({
        imageWidth: null,
        imageHeight: null
    }),

    methods: {
        getFileData(file) {
            return new Promise((resolve) => {
                try {
                    let reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = ({ target }) => {
                        if(file.type.includes('image')) {
                            let _URL = window.URL || window.webkitURL;
                            let img = new Image();
                            img.onload = function() {
                                resolve({
                                    result: target.result,
                                    type: file.type,
                                    filename: file.name,
                                    file: target.result.substr(target.result.indexOf(',') + 1, target.result.length),
                                    size: file.size,
                                    width: img.width,
                                    height: img.height
                                });
                            };
                            img.src = _URL.createObjectURL(file);

                        } else if(file.type.includes('video')) {
                            let _URL = window.URL || window.webkitURL;
                            let vid = document.createElement('video');
                            vid.addEventListener('loadedmetadata', function() {
                                resolve({
                                    result: target.result,
                                    type: file.type,
                                    filename: file.name,
                                    file: target.result.substr(target.result.indexOf(',') + 1, target.result.length),
                                    size: file.size,
                                    width: vid.videoWidth,
                                    height: vid.videoHeight
                                });
                            });
                            vid.src = _URL.createObjectURL(file);
                        } else {
                            resolve({
                                result: target.result,
                                type: file.type,
                                filename: file.name,
                                file: target.result.substr(target.result.indexOf(',') + 1, target.result.length),
                                size: file.size,
                                width: null,
                                height: null
                            });
                        }
                    };
                } catch(error) {
                    resolve({ error: error });
                }
            });
        }
    }
};
