export default {
    getDraggedElement: function(state) {
        return state.draggedElement
    },

    getBrowser: (state) => {
        return state.browser
    },

    getPresetColors: (state) => {
        return state.presetColors
    },

    getMediaFolders: (state) => {
        return state.mediaFolders
    },

    getAppLibrary: (state) => {
        return state.appLibrary
    },

    getShowTooltips: (state) => {
        return state.settings.showTooltips
    },

    getSideNavSize: (state) => {
        return state.bigSideNav ? '5rem' : '3rem';
    }

}
