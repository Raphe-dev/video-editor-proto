let randomVideos = [
    'https://ak8.picdn.net/shutterstock/videos/5995928/preview/stock-footage-beautiful-star-trails-time-lapse-with-tree-silhouettes-in-foreground.webm',
    'https://ak8.picdn.net/shutterstock/videos/29749408/preview/stock-footage-sunset-at-the-beach-in-sardinia-italy.webm',
    'https://ak4.picdn.net/shutterstock/videos/1015832494/preview/stock-footage-abstract-sphere-structure-floating-in-the-air-and-deforming-d-vj-loop-digital-art-generative.webm'
];

let randomVideo = () => {
    let key = Math.random() * randomVideos.length;
    key = parseInt(key);
    return randomVideos[key];
};

export default {
    draggedElement: {},
    bigSideNav: false,
    presetColors: ['#f00', '#00ff', '#00ff00', '#000', '#292e32', '#b5b5b5', '#d4d4d4', '#e2e2e2'],
    settings: {
        showAdvanced: false,
        showTooltips : true
    },
    mediaFolders: [
        {
            id: 101,
            name: 'folder1',
            open: true,
            type: 'folder',
            elements: [
                {
                    id: 10,
                    name: 'bar',
                    type: 'image',
                    ext: '.jpg',
                    url: 'https://cdn.pixabay.com/photo/2020/01/14/17/55/dog-4765784_960_720.jpg',
                    width: 960,
                    height: 640
                },
                {id: 11, name: 'baz', type: 'video', ext: '.mp4', url: randomVideo(), width: 596, height: 336},
                {
                    id: 1010, name: 'folderNested', type: 'folder', open: true, elements: [
                        {
                            id: 12,
                            name: 'cat',
                            type: 'image',
                            ext: '.jpg',
                            url: 'https://tonpetitlook.com/wp-content/uploads/2017/05/nouveau-chaton-nouveau-defi-430442.png',
                            width: 947,
                            height: 557
                        },
                        {
                            id: 15,
                            name: 'boogie',
                            type: 'image',
                            ext: '.jpg',
                            url: 'https://tonpetitlook.com/wp-content/uploads/2017/05/nouveau-chaton-nouveau-defi-430442.png',
                            width: 947,
                            height: 557
                        }
                    ]
                }
            ]
        },
        {
            id: 102,
            name: 'folder2',
            open: false,
            type: 'folder',
            elements: [
                {
                    id: 13,
                    name: 'bar',
                    type: 'image',
                    ext: '.jpg',
                    url: 'https://cdn.pixabay.com/photo/2020/01/14/17/55/dog-4765784_960_720.jpg',
                    width: 960,
                    height: 640
                },
                {id: 14, name: 'baz', type: 'video', ext: '.mp4', url: randomVideo(), width: 596, height: 336},
                {
                    id: 1020, name: 'anotherNested', type: 'folder', open: false, elements: [
                        {
                            id: 20,
                            name: 'picture2',
                            type: 'image',
                            ext: '.jpg',
                            url: 'https://cdn.pixabay.com/photo/2020/01/14/17/55/dog-4765784_960_720.jpg',
                            width: 960,
                            height: 640
                        },
                        {
                            id: 21,
                            name: 'boogie',
                            type: 'image',
                            ext: '.jpg',
                            url: 'https://tonpetitlook.com/wp-content/uploads/2017/05/nouveau-chaton-nouveau-defi-430442.png',
                            width: 947,
                            height: 557
                        }
                    ]
                }
            ]
        },
        {
            id: 103,
            name: 'folder3',
            open: false,
            type: 'folder',
            elements: [
                {
                    id: 30,
                    name: 'name',
                    type: 'image',
                    ext: '.jpg',
                    url: 'https://tonpetitlook.com/wp-content/uploads/2017/05/nouveau-chaton-nouveau-defi-430442.png',
                    width: 947,
                    height: 557
                },
                {
                    id: 31,
                    name: 'anothername',
                    type: 'video',
                    ext: '.mp4',
                    url: randomVideo(),
                    width: 596,
                    height: 336
                },
                {id: 32, name: 'potato', type: 'video', ext: '.mp4', url: randomVideo(), width: 596, height: 336},
                {id: 33, name: 'banana', type: 'video', ext: '.mp4', url: randomVideo(), width: 596, height: 336},
                {id: 34, name: 'tomatoe', type: 'video', ext: '.mp4', url: randomVideo(), width: 596, height: 336}
            ]
        }
    ],
    appLibrary: [
        {
            title: 'Quiz', icon: 'question-circle', open: false, type: 'folder', elements: [
                {id: 1, title: 'quiz 1', icon: 'star', description: '2:00, 15 questions, 1920 x 1080'}
            ]
        },
        {
            title: 'Youtube', icon: ['fab', 'youtube'], open: false, type: 'folder', elements: [
                {id: 2, title: 'My youtube channel', icon: 'video', description: '4:27, sounds OFF, 1920x1080'},
                {id: 3, title: 'My youtube channel 2', icon: 'video', description: '4:27, sounds OFF, 1920x1080'},
                {id: 4, title: 'My youtube channel 3', icon: 'video', description: '4:27, sounds OFF, 1920x1080'}
            ]
        }
    ]
};
