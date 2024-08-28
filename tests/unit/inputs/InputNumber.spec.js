/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils';
import InputNumber from '@/components/inputs/InputNumber.vue';

describe('InputNumber.vue', () => {
    let wrapper, input, plus, minus;

    beforeEach(() => {
        wrapper = shallowMount(InputNumber, { propsData: { value: 0 } });
        input = wrapper.find('#input-number');
        plus = wrapper.find('#button-plus');
        minus = wrapper.find('#button-minus');
        jest.spyOn(wrapper.vm, 'increment');
    });

    it('Change value after input', () => {
        input.setValue('30');
        input.trigger('input');
        expect(wrapper.vm.val).toBe(30);
    });

    it('Cannot change value when disabled', () => {
        wrapper.setProps({ disabled: true });
        input.setValue('30');
        input.trigger('input');
        plus.vm.$emit('click');
        minus.vm.$emit('click');
        expect(wrapper.vm.val).toBe(0);
    });

    it('Increment value on up arrow click', () => {
        plus.vm.$emit('click');
        expect(wrapper.vm.increment).toHaveBeenCalledWith(true);
        expect(wrapper.vm.val).toBe(1);
        expect(input.element.value).toBe('1');
    });

    it('Decrement value on up arrow click', () => {
        minus.vm.$emit('click');
        expect(wrapper.vm.increment).toHaveBeenCalledWith(false);
        expect(wrapper.vm.val).toBe(-1);
        expect(input.element.value).toBe('-1');
    });

    it('Keep incrementing value on up arrow hold', () => {
        let action = new Promise((resolve) => {
            plus.vm.$emit('mousedown');
            setTimeout(() => {
                plus.vm.$emit('mouseup');
                resolve();
            }, 450);
        });

        return action.then(() => {
            expect(wrapper.vm.increment).toHaveBeenNthCalledWith(2, true);
            expect(wrapper.vm.val).toBe(2);
            expect(input.element.value).toBe('2');
        });
    });

    it('Keep decrementing value on down arrow hold', () => {

        let action = new Promise((resolve) => {
            minus.vm.$emit('mousedown');
            setTimeout(() => {
                minus.vm.$emit('mouseup');
                resolve();
            }, 450);
        });

        return action.then(() => {
            expect(wrapper.vm.increment).toHaveBeenNthCalledWith(2, false);
            expect(wrapper.vm.val).toBe(-2);
            expect(input.element.value).toBe('-2');
        });
    });

    it('Cannot go beyond max', () => {
        let max = 10;
        wrapper.setProps({ max });
        input.setValue('30');
        input.trigger('input');
        expect(wrapper.vm.val).toBe(max);
    });

    it('Cannot go under min', () => {
        let min = -10;
        wrapper.setProps({ min });
        input.setValue('-30');
        input.trigger('input');
        expect(wrapper.vm.val).toBe(min);
    });

    it('Apply validator function on input', () => {
        wrapper.setProps({
            validator: (v) => v > 100 ? 100 : parseInt(v)
        });
        input.setValue('200');
        input.trigger('input');
        expect(wrapper.vm.val).toBe(100);

        input.setValue('10');
        input.trigger('input');
        expect(wrapper.vm.val).toBe(10);
    });
});
