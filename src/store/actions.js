export default {
    updateFolders: ({ commit }, payload) => {
        commit("updateFolders", payload);
    },

    updateApps: ({ commit }, payload) => {
        commit("updateApps", payload);
    },

    setDraggedElement: ({ commit }, payload) => {
        commit("setDraggedElement", payload);
    },

    setMousePosition: ({ commit }, payload) => {
        commit("setMousePosition", payload);
    },

    setSettings: ({ commit }, payload) => {
        commit("setSettings", payload);
    },

    setSideNavSize: ({ commit }) => {
        commit('setSidenavSize')
    }
}
