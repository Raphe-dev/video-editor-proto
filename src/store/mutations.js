export default {
    updateFolders: (state, payload) => {
        state.mediaFolders = payload;
    },
    updateApps: (state, payload) => {
        state.appLibrary = payload;
    },

    setDraggedElement: (state, payload) => {
        state.draggedElement = payload;
    },

    setSettings: (state, payload) => {
        Object.assign(state.settings, payload)
    },

    setSidenavSize: (state) => {
        state.bigSideNav ? state.bigSideNav = false : state.bigSideNav = true
    }
}
