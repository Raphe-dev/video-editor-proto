/* eslint-disable no-undef */
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import LibraryPanel from '@/components/library/MediaLibraryPanel.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('MediaLibraryPanel.vue', () => {
    let actions, mutations, getters, state, store;
    let wrapper;
    beforeEach(() => {
        state = {
            mediaFolders: [
                { id: 1, name: 'folder', open: false, type: 'folder', elements: [ { id: 10, name: 'file', type: 'image' } ] },
                { id: 2, name: 'abc', open: false, type: 'folder', elements: [] }
            ],
            draggedElement: null
        };
        getters = {
            getDraggedElement: jest.fn(() => state.draggedElement),
            getMediaFolders: jest.fn(() => state.mediaFolders)
        };
        actions = {
            setDraggedElement: jest.fn((state, payload) => {
               mutations.setDraggedElement(payload)
            }),
            updateFolders: jest.fn()
        };

        mutations = {
            setDraggedElement: jest.fn(payload => {
                state.draggedElement = payload
            })
        };

        store = new Vuex.Store({
            actions, getters, mutations, state
        });

        wrapper = shallowMount(LibraryPanel, { store, localVue });
    });

    it('Adds a new folder on folderPlus event', () => {
        jest.spyOn(wrapper.vm, 'handleFolderPlus');

        wrapper.find('#header').vm.$emit('folderPlus');

        expect(wrapper.vm.handleFolderPlus).toHaveBeenCalled();
        expect(actions.updateFolders).toHaveBeenCalled();
        expect(wrapper.vm.folders.length).toBe(3);
    });

    it('can get select event from library-list and delete selected items', () => {
        jest.spyOn(wrapper.vm, 'handleTrash');
        jest.spyOn(wrapper.vm, 'deleteLoopTroughFolder');

        wrapper.vm.$root.$emit('libraryFileSelected', wrapper.vm.folders[0].elements[0]);
        expect(wrapper.vm.selectedFiles).toContain(wrapper.vm.folders[0].elements[0]);

        wrapper.find('#header').vm.$emit('trash');

        expect(wrapper.vm.handleTrash).toHaveBeenCalled();
        expect(wrapper.vm.deleteLoopTroughFolder).toHaveBeenCalled();
        expect(wrapper.vm.selectedFiles.length).toBe(0);
    });

    it('delete all folder files on folder delete', () => {
        jest.spyOn(wrapper.vm, 'handleTrash');
        jest.spyOn(wrapper.vm, 'deleteLoopTroughFolder');

        wrapper.vm.$root.$emit('libraryFileSelected', wrapper.vm.folders[0]);
        expect(wrapper.vm.selectedFiles).toContain(wrapper.vm.folders[0]);
        expect(state.mediaFolders[0].elements.length).toBe(1);

        wrapper.find('#header').vm.$emit('trash');

        expect(wrapper.vm.handleTrash).toHaveBeenCalled();
        expect(wrapper.vm.deleteLoopTroughFolder).toHaveBeenCalled();
        expect(wrapper.vm.selectedFiles.length).toBe(0);
        expect(state.mediaFolders[0].elements.length).toBe(0)
    });

    it('can deselect a selected file', () => {
        wrapper.vm.$root.$emit('libraryFileSelected', wrapper.vm.folders[0].elements[0]);
        expect(wrapper.vm.selectedFiles).toContain(wrapper.vm.folders[0].elements[0]);
        wrapper.vm.$root.$emit('libraryFileSelected', wrapper.vm.folders[0].elements[0]);
        expect(wrapper.vm.selectedFiles).toEqual([]);
    });

    it('Sets drag data on libraryDrag event', () => {
        wrapper.vm.setDragData(null, wrapper.vm.folders[0].elements[0]);
        expect(wrapper.vm.dragging).toBe(true);
        expect(actions.setDraggedElement).toHaveBeenCalled();
        expect(state.draggedElement).toEqual({
            type: wrapper.vm.folders[0].elements[0].type,
            value: wrapper.vm.folders[0].elements[0]
        })
    });

    it('Remove drag data on libraryDragEnd event', () => {
        wrapper.vm.resetDragData();
        expect(wrapper.vm.dragging).toBe(false);
        expect(actions.setDraggedElement).toHaveBeenCalled();
        expect(state.draggedElement).toEqual({})
    });

});