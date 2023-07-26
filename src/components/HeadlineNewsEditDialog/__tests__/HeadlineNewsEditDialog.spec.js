import { mount } from '@vue/test-utils';
import store from '@/store';
import { mockStoreData } from '../../../../tests/mocks/store';
import HeadlineNewsEditDialog from '../HeadlineNewsEditDialog.vue';

describe('HeadlineNewsEditDialog', () => {
  mockStoreData(store);
  const firstNews = store.state.headlines.data[0];
  const wrapper = mount(HeadlineNewsEditDialog, {
    global: { plugins: [store] },
    props: {
      modelValue: true,
      'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e }),
      news: firstNews,
    },
  });

  test('should render correctly', () => {
    expect(wrapper.element.querySelector('.edit-dialog__input').value).toBe(firstNews.title);
    expect(wrapper.element.querySelector('.edit-dialog__error')).toBeFalsy();
  });

  test('should show error when char is more than 200', async () => {
    wrapper.vm.title = [...Array(201).keys()].join('');
    await Promise.resolve;
    expect(wrapper.element.querySelector('.edit-dialog__error')).toBeTruthy();
  });

  test('should handle click event of edit button correctly', async () => {
    wrapper.vm.isErrorLength = false;
    await Promise.resolve;
    store.commit = jest.fn();
    wrapper.find('.edit-dialog__button-edit').trigger('click');
    expect(store.commit.mock.calls[0][0]).toBe('headlines/updateTitle');
    expect(store.commit.mock.calls[1][0]).toBe('headlines/setSelected');
  });

  test('should handle click event of edit button correctly', async () => {
    wrapper.vm.isErrorLength = false;
    await Promise.resolve;
    store.commit = jest.fn();
    wrapper.find('.edit-dialog__button-cancel').trigger('click');
    expect(store.commit.mock.calls[0][0]).toBe('headlines/setSelected');
  });
});
