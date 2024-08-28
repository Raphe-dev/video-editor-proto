/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils';
import InputCheckbox from '@/components/inputs/InputCheckbox.vue';

describe('InputCheckbox.vue', () => {
    let wrapper, label, box;

    beforeEach(() => {
        wrapper = shallowMount(InputCheckbox, { propsData: { value: false, label: 'label' } });
        label = wrapper.find('#checkbox-label');
        box = wrapper.find('#checkbox');

    });

    it('Change value after click on box', () => {
        box.trigger('click');
        expect(wrapper.vm.val).toBe(true);
        box.trigger('click');
        expect(wrapper.vm.val).toBe(false);
    });

    it('Change value after click on label', () => {
        label.trigger('click');
        expect(wrapper.vm.val).toBe(true);
        label.trigger('click');
        expect(wrapper.vm.val).toBe(false);
    });

    it('Cannot change value when disabled', () => {
        wrapper.setProps({ disabled: true });
        box.trigger('click');
        label.trigger('click');
        expect(wrapper.vm.val).toBe(false);
    });

    it('Has the setted size', () => {
        let size = 'xs';
        wrapper.setProps({ size });
        expect(box.attributes().class).toContain(`text-${size}`)
    });
});
