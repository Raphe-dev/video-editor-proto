export default {
    updateFolders: ({ commit }, payload) => {
        commit("updateFolders", payload);
    },

    setDraggedElement: ({ commit }, payload) => {
        commit("setDraggedElement", payload);
    },

    setMousePosition: ({ commit }, payload) => {
        commit("setMousePosition", payload);
    }
}