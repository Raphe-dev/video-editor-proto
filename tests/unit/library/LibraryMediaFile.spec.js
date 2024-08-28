/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils';
import LibraryFile from '@/components/library/MediaLibraryFile.vue';
import Popper from '@/components/commons/Popper.vue';

describe('LibraryMediaFile.vue', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(LibraryFile, { propsData: { file: { id: 10, name: 'file', type: 'image' } }, components: { Popper } });
    });

    it('Select file on click row', async () => {
        jest.spyOn(wrapper.vm, 'mixinClick');
        jest.spyOn(wrapper.vm, 'singleClick');

        let fileWrapper = wrapper.find('#file-wrapper');

        fileWrapper.trigger('click');
        await new Promise((r) => setTimeout(r, 300));

        expect(wrapper.vm.singleClick).toHaveBeenCalled();
        expect(wrapper.emitted('selectFile')).toBeTruthy();
    });

    it('Show name input on file on doubleClick row', () => {
        jest.spyOn(wrapper.vm, 'mixinClick');
        jest.spyOn(wrapper.vm, 'doubleClick');

        expect(wrapper.find('#file-name-input').exists()).toBe(false);

        let fileWrapper = wrapper.find('#file-wrapper');

        fileWrapper.trigger('click');
        fileWrapper.trigger('click');

        expect(wrapper.vm.doubleClick).toHaveBeenCalled();
        expect(wrapper.find('#file-name-input').exists()).toBe(true);
    });

    it('Crops the name if its too long', () => {
        wrapper.setProps({
            file: { id: 10, name: 'un nom beaucoup trop long pour afficher', type: 'image' }
        });
        expect(wrapper.vm.fileName).toContain('...')
    });

    it('Disable popper on root library drag event', () => {
        wrapper.vm.$root.$emit('libraryDragStart');
        expect(wrapper.vm.disabled).toBe(true);
        wrapper.vm.$root.$emit('libraryDragEnd');
        expect(wrapper.vm.disabled).toBe(false);
    });

    it('Has the proper icon classes', () => {
        wrapper.setProps({
            file: { id: 10, name: 'file', type: 'video' }
        });
        expect(wrapper.vm.getIcon).toEqual('file-video');
        expect(wrapper.vm.getIconClass).toEqual('text-blue');

        wrapper.setProps({
            file: { id: 10, name: 'file', type: 'image' }
        });
        expect(wrapper.vm.getIcon).toEqual('file-image');
        expect(wrapper.vm.getIconClass).toEqual('text-green');
    });
});
