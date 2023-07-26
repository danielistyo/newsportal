import { mount } from '@vue/test-utils';
import store from '@/store';
import eventBus from '@/eventBus';
import { nextTick } from 'vue';
import { mockStoreData, sources } from '../../../../tests/mocks/store';
import FilterNews from '../FilterNews.vue';

jest.useFakeTimers();

describe('FilterNews', () => {
  mockStoreData(store);

  const wrapper = mount(FilterNews, {
    global: { plugins: [store] },
  });

  test('should render correctly', () => {
    expect(wrapper.element.querySelector('.filter-news__button-filter')).toBeTruthy();
    expect(wrapper.element.querySelector('.filter-news-dialog')).toBeTruthy();
  });

  test('should fetch api when stop typing', async () => {
    store.dispatch = jest.fn();
    wrapper.find('.filter-news__input').trigger('input');
    jest.runAllTimers();
    expect(store.dispatch).toBeCalled();
  });

  test('should show source label', async () => {
    store.commit('sources/setSelected', sources[0].id);
    eventBus.emit('filter-click', sources[0].name);
    await nextTick;
    expect(wrapper.element.querySelector('.filter-news__source-label').textContent.trim()).toBe('Source: ABC News');
  });

  // test('should handle click event of edit button correctly', async () => {
  //   wrapper.vm.isErrorLength = false;
  //   await Promise.resolve;
  //   store.commit = jest.fn();
  //   wrapper.find('.edit-dialog__button-cancel').trigger('click');
  //   expect(store.commit.mock.calls[0][0]).toBe('headlines/setSelected');
  // });
});
