/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils';
import InputSelect from '@/components/inputs/InputSelect.vue';
import Vue from 'vue'

describe('InputSelect.vue', () => {
    let wrapper, input;

    beforeEach(() => {
        wrapper = shallowMount(InputSelect, {
            propsData: {
                label: 'label',
                options: [
                    { value: 'placeholder', label: 'placeholder', default: true, disabled: true},
                    { value: 1, label: 'one'},
                    { value: 2, label: 'two'},
                    { value: 3, label: 'three', disabled: true},
                ]
            }
        });
        input = wrapper.find('#input-select');

    });

    it('Default option is pre-selected', () => {
        expect(wrapper.vm.val).toBe('placeholder');
    });

    it('Changes value on select option', () => {
        input.findAll('option').at(2).setSelected();
        expect(wrapper.vm.val).toBe(2);
    });

    it('Emits input data properly', async () => {
        input.findAll('option').at(2).setSelected();
        input.trigger('input');
        await Vue.nextTick();
        expect(wrapper.emitted().input[0]).toEqual([2])
    });

    it('Validation is applied properly on input', async () => {
        wrapper.setProps({ validator: (v) => { return v.toString() } });
        input.findAll('option').at(2).setSelected();
        input.trigger('input');
        await Vue.nextTick();
        expect(wrapper.emitted().input[0]).toEqual(['2'])
    });

    it('Passes disabled props to corresponding option', () => {
        expect(input.findAll('option').at(1).element['disabled']).toBe(false);
        expect(input.findAll('option').at(3).element['disabled']).toBe(true);
        expect(wrapper.vm.val).toBe('placeholder');
    });

    it('Has the setted size', () => {
        let width = '50px';
        wrapper.setProps({ width });
        expect(input.attributes().style).toContain(`width: ${width}`);
    });
});