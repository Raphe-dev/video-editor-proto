/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils';
import InputTime from '@/components/inputs/InputTime.vue';
/*
* This input inputs uses @change to catch user inputs on the fly
* */
describe('InputTime.vue', () => {
    let wrapper, ss, mm, hh;

    beforeEach(() => {
        wrapper = shallowMount(InputTime, {});
        ss = wrapper.find('#ss');
        mm = wrapper.find('#mm');
        hh = wrapper.find('#hh');
    });

    it('Change object values after inputs', () => {
        ss.setValue('30');
        ss.trigger('input');
        expect(wrapper.vm.val.ss).toBe('30');

        mm.setValue('30');
        mm.trigger('input');
        expect(wrapper.vm.val.mm).toBe('30');

        hh.setValue('30');
        hh.trigger('input');
        expect(wrapper.vm.val.hh).toBe('30');
    });

    it('Cannot change object values when disabled', () => {
        wrapper = shallowMount(InputTime, { propsData: { disabled: true } });
        ss = wrapper.find('#ss');
        mm = wrapper.find('#mm');
        hh = wrapper.find('#hh');

        ss.setValue('30');
        ss.trigger('input');
        expect(wrapper.vm.val.ss).toBe('00');

        mm.setValue('30');
        mm.trigger('input');
        expect(wrapper.vm.val.mm).toBe('00');

        hh.setValue('30');
        hh.trigger('input');
        expect(wrapper.vm.val.hh).toBe('00');
    });

    it('ss and mm cannot be higher than 60, hh can', () => {
        ss.setValue('90');
        ss.trigger('change');
        expect(wrapper.vm.val.ss).toBe('60');

        mm.setValue('90');
        mm.trigger('change');
        expect(wrapper.vm.val.mm).toBe('60');

        hh.setValue('90');
        hh.trigger('input');
        expect(wrapper.vm.val.hh).toBe('90');
    });

    it('Cannot have single digit input if so add 0 before', () => {
        ss.setValue('1');
        ss.trigger('change');
        expect(wrapper.vm.val.ss).toBe('01');

        mm.setValue('2');
        mm.trigger('change');
        expect(wrapper.vm.val.mm).toBe('02');

        hh.setValue('3');
        hh.trigger('change');
        expect(wrapper.vm.val.hh).toBe('03');
    });

    it('Is 00 after empty input', () => {
        ss.setValue(' ');
        ss.trigger('change');
        expect(wrapper.vm.val.ss).toBe('00');

        mm.setValue(' ');
        mm.trigger('change');
        expect(wrapper.vm.val.mm).toBe('00');

        hh.setValue(' ');
        hh.trigger('change');
        expect(wrapper.vm.val.hh).toBe('00');
    });

    it('Does not let enter characters', () => {
        const fn = jest.spyOn(wrapper.vm, 'handleKeyPress');
        fn({ preventDefault: jest.fn(), key: 'a' });
        expect(fn).toHaveReturnedWith(false);
    });

    it('return value with validation', () => {
        const fn = jest.spyOn(wrapper.vm, 'emitInput');
        wrapper.setProps({ validator: v => { return `${v.hh}-${v.mm}-${v.ss}`} });

        hh.setValue('01');
        mm.setValue('15');
        ss.setValue('00');
        fn();
        expect(wrapper.emitted().input[0]).toEqual(['01-15-00'])

    });
});
