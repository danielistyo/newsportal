import { mount } from '@vue/test-utils';
import FilterNewsDialog from '../FilterNewsDialog.vue';

test('FilterNewsDialog should ', () => {
  const wrapper = mount(FilterNewsDialog, {
    modelValue: true,
    'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
  });

  expect(wrapper.html()).toContain('www.google.com');
});
