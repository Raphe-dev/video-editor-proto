/* eslint-disable no-undef */
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import LibraryList from '@/components/library/MediaLibraryList.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('MediaLibraryList.vue', () => {
    let state, store;
    let wrapper;
    beforeEach(() => {
        state = {
            mediaFolders: [
                { id: 1, name: 'folder', open: true, type: 'folder', elements: [ { id: 10, name: 'file', type: 'image' } ] },
                { id: 2, name: 'abc', open: false, type: 'image'}
            ],
            draggedElement: null
        };

        store = new Vuex.Store({
            state
        });

        wrapper = shallowMount(LibraryList, { store, localVue, propsData: { value: state.mediaFolders } });
    });

    it('Can select a folder a folder child is clicked', () => {
        jest.spyOn(wrapper.vm, 'handleSelect');

        wrapper.find('folder-row-stub').vm.$emit('selectFolder', state.mediaFolders[0]);

        expect(wrapper.vm.handleSelect).toHaveBeenCalledWith(state.mediaFolders[0]);
    });

    it('Can select a file a file child is clicked', () => {
        jest.spyOn(wrapper.vm, 'handleSelect');
        wrapper.find('file-row-stub').vm.$emit('selectFile', state.mediaFolders[1]);

        expect(wrapper.vm.handleSelect).toHaveBeenCalledWith(state.mediaFolders[1]);
    });

});
