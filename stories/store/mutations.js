export default {
    updateFolders: (state, payload) => {
        state.mediaFolders = payload;
    },

    setDraggedElement: (state, payload) => {
        state.draggedElement = payload;
    }
}