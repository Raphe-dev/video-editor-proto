/* eslint-disable no-undef */
import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import LibraryFolder from '@/components/library/MediaLibraryFolder.vue';
import LibraryList from '@/components/library/MediaLibraryList.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('MediaLibraryList.vue', () => {
    let state, store;
    let wrapper;
    beforeEach(() => {
        state = {
            mediaFolders: [
                { id: 1, name: 'folder', open: false, type: 'folder', elements: [ { id: 10, name: 'file', type: 'image' } ] },
                { id: 2, name: 'abc', open: false, type: 'image' }
            ],
            draggedElement: null
        };

        store = new Vuex.Store({
            state
        });

        wrapper = shallowMount(LibraryFolder, { store, localVue, propsData: { folder: state.mediaFolders[0] }, components: { LibraryList } });
    });

    it('Toggle open folder on click icon', () => {
        let folder = wrapper.find('#folder');

        folder.trigger('click');
        expect(state.mediaFolders[0].open).toBe(true);

        folder.trigger('click');
        expect(state.mediaFolders[0].open).toBe(false);
    });

    it('Crops the name if its too long', () => {
        wrapper.vm.folder.name = "un nom beaucoup trop long pour afficher";
        expect(wrapper.vm.folderName).toContain('...')
    });

    it('Select folder on click row', async () => {
        jest.spyOn(wrapper.vm, 'mixinClick');
        jest.spyOn(wrapper.vm, 'selectFolder');

        let folderWrapper = wrapper.find('#folder-wrapper');

        folderWrapper.trigger('click');
        await new Promise((r) => setTimeout(r, 300));

        expect(wrapper.vm.selectFolder).toHaveBeenCalled();
        expect(wrapper.emitted('selectFolder')).toBeTruthy();
    });

    it('Show name input on folder on doubleClick row', () => {
        jest.spyOn(wrapper.vm, 'mixinClick');
        jest.spyOn(wrapper.vm, 'editName');

        expect(wrapper.find('#folder-name-input').exists()).toBe(false);

        let folderWrapper = wrapper.find('#folder-wrapper');

        folderWrapper.trigger('click');
        folderWrapper.trigger('click');

        expect(wrapper.vm.editName).toHaveBeenCalled();
        expect(wrapper.find('#folder-name-input').exists()).toBe(true);

    });

    it('Hides name input on focusout', () => {
        let fn = jest.spyOn(wrapper.vm, 'editFocusOut');

        let folderWrapper = wrapper.find('#folder-wrapper');
        folderWrapper.trigger('click');
        folderWrapper.trigger('click');
        wrapper.find('#folder-name-input').trigger('focusout');

        expect(fn).toHaveBeenCalled();
    });

    it('Handle drop on folder row', async () => {
        jest.spyOn(wrapper.vm, 'handleFileDrop');
        wrapper.find('div').trigger('drop.stop', {preventDefault: jest.fn(), dataTransfer: jest.fn( () => {
                return {  items : [ new File(null, 'foo')  ]}
            })});

        expect(wrapper.vm.handleFileDrop).toHaveBeenCalled();
    });

    it('Shows empty only when empty', async () => {
        expect(wrapper.find('#folder-empty').exists()).toBe(false);
        wrapper.vm.folder.elements = [];
        wrapper.vm.folder.open = true;
        expect(wrapper.find('#folder-empty').exists()).toBe(true);
    });

});