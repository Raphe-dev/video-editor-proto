/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils';
import InputRadio from '@/components/inputs/InputRadio.vue';

describe('InputRadio.vue', () => {
    let wrapper, option1, option2;

    beforeEach(() => {
        wrapper = shallowMount(InputRadio, { propsData: { options: ['one', 'two'] } });
        option1 = wrapper.find('#radio-one');
        option2 = wrapper.find('#radio-two');

    });

    it('Change value after click on an option', () => {
        option1.trigger('click');
        expect(wrapper.vm.val).toBe(wrapper.vm.options[0]);
        option2.trigger('click');
        expect(wrapper.vm.val).toBe(wrapper.vm.options[1]);
    });

    it('Change value after click on label', () => {
        wrapper.find('span').trigger('click');
        expect(wrapper.vm.val).toBe(wrapper.vm.options[0]);
    });

    it('Remove value after click on selected', () => {
        option1.trigger('click');
        expect(wrapper.vm.val).toBe(wrapper.vm.options[0]);
        option1.trigger('click');
        expect(wrapper.vm.val).toBeFalsy();
    });

    it('Cannot remove value after click on selected if required', () => {
        wrapper.setProps({ required: true });
        option1.trigger('click');
        expect(wrapper.vm.val).toBe(wrapper.vm.options[0]);
        option1.trigger('click');
        expect(wrapper.vm.val).toBe(wrapper.vm.options[0]);
    });

    it('Cannot change value when disabled', () => {
        wrapper.setProps({ disabled: true });
        option1.trigger('click');
        expect(wrapper.vm.val).toBeFalsy();
        wrapper.find('span').trigger('click');
        expect(wrapper.vm.val).toBeFalsy();
    });

    it('Orients the radios vertically', () => {
        wrapper.setProps({ vertical: true });
        expect(wrapper.find('div').classes()).toContain('flex-col')
    });

    it('Sets the correct size', () => {
        wrapper.setProps({ size: 'lg' });
        expect(wrapper.find('div').classes()).toContain('text-lg')
    })
});