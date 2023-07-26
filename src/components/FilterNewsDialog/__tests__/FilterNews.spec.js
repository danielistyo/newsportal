import { mount } from '@vue/test-utils';
import store from '@/store';
import { mockStoreData, sources } from '../../../../tests/mocks/store';
import FilterNewsDialog from '../FilterNewsDialog.vue';

describe('FilterNewsDialog', () => {
  mockStoreData(store);

  const wrapper = mount(FilterNewsDialog, {
    global: { plugins: [store] },
    props: {
      modelValue: true,
      'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
    },
  });

  test('should render correctly', () => {
    expect(wrapper.element.querySelectorAll('.filter-news-dialog__source').length).toBe(sources.length + 1);
  });

  test('should trigger false when filter button clicked', () => {
    wrapper.setProps({ modelValue: true });

    expect(wrapper.props('modelValue')).toBe(true);
    wrapper.find('.filter-news-dialog__button').trigger('click');
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([false]);
  });
});
