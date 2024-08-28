/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils';
import InputToggle from '@/components/inputs/InputToggle.vue';

describe('InputToggle.vue', () => {
    let wrapper, option1, option2;

    beforeEach(() => {
        wrapper = shallowMount(InputToggle, {
            propsData: {
                value: {
                        one: { icon: 'font'},
                        two: { icon: 'trash', toggle: true}
                    }
                }
            });
        option1 = wrapper.find('#toggle-one');
        option2 = wrapper.find('#toggle-two');

    });

    it('Sets reactive toggle property to undefined options', () => {
        const count = Object.values(wrapper.vm.val).filter(obj => obj.toggle === undefined).length
        expect(count).toBe(0);
    });

    it('Change value when icon is clicked', () => {
        option1.trigger('click');
        expect(wrapper.vm.val.one.toggle).toBe(true);
        option1.trigger('click');
        expect(wrapper.vm.val.one.toggle).toBe(false);
    });

    it('Sets the right class when active', () => {
        expect(option2.element.children[0].classList.contains('text-accent')).toBe(true);
        option2.trigger('click');
        expect(option2.element.children[0].classList.contains('text-accent')).toBe(false);
    })

    it('Cannot change value if disabled', () => {
        wrapper.setProps({disabled: true});
        option1.trigger('click');
        expect(wrapper.vm.val.one.toggle).toBe(false);
    })

    it('Cannot remove value after selected if required and count <= 1', () => {
        wrapper.setProps({required: true});
        option2.trigger('click');
        expect(wrapper.vm.val.two.toggle).toBe(true);
        option1.trigger('click');
        expect(wrapper.vm.val.one.toggle).toBe(true);
        option2.trigger('click');
        expect(wrapper.vm.val.two.toggle).toBe(false);
        option1.trigger('click');
        expect(wrapper.vm.val.one.toggle).toBe(true);
    });

    it('Orients the icons vertically', () => {
        wrapper.setProps({ vertical: true });
        expect(wrapper.find('div').classes()).toContain('flex-col')
    });

    it('Sets the right size', () => {
        wrapper.setProps({ size: 'lg' });
        expect(option1.element.classList).toContain('text-lg');
        expect(option2.element.classList).toContain('text-lg');
    });

});
