/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils';
import InputText from '@/components/inputs/InputText.vue';

describe('InputText.vue', () => {
    let wrapper, input;

    beforeEach(() => {
        wrapper = shallowMount(InputText, { propsData: { value: '' } });
        input = wrapper.find('#input-text');
    });

    it('Change value after input', () => {
        input.setValue('foo');
        input.trigger('input');
        expect(wrapper.vm.val).toBe('foo');
    });

    it('Cannot change value when disabled', () => {
        wrapper.setProps({ disabled: true });
        input.setValue('foo');
        input.trigger('input');
        expect(wrapper.vm.val).toBe('');
    });

    it('Cannot be longer than max', () => {
        //input error
    });

    it('Cannot be shorter than min', () => {
        // input error
    });

    it('Has the setted width', () => {
        let inputWrapper = wrapper.find('#input-text-wrapper');
        let width = '20rem';
        wrapper.setProps({ width });
        expect(inputWrapper.attributes().style).toContain(`width: ${width}`);
    });

    it('Apply validator function on input', () => {
        wrapper.setProps({
            validator: (v) => v.toUpperCase()
        });
        input.setValue('foo');
        input.trigger('input');
        expect(wrapper.vm.val).toBe('FOO');
    });
});