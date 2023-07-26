import { mount } from '@vue/test-utils';
import store from '@/store';
import { mockStoreData } from '../../../../tests/mocks/store';
import HeadlineNewsCard from '../HeadlineNewsCard.vue';

describe('HeadlineNewsCard', () => {
  mockStoreData(store);
  const props = {
    title: 'news title',
    subtitle: 'news subtitle',
    imgUrl: 'http://www.google.com/',
    date: '10-10-2010',
    url: 'www.google.com',
    onReadClick: jest.fn(),
    hideEdit: false,
  };
  const wrapper = mount(HeadlineNewsCard, {
    global: { plugins: [store] },
    props,
  });

  test('should render correctly', () => {
    expect(wrapper.element.querySelector('.news-card__title').textContent).toBe(props.title);
    expect(wrapper.element.querySelector('.news-card__edit')).toBeTruthy();
    expect(wrapper.element.querySelector('.news-card__date').textContent).toBe(props.date);
    expect(wrapper.element.querySelector('.news-card__img').src).toBe(props.imgUrl);
  });

  test('should handle click event of edit button correctly', () => {
    store.commit = jest.fn();
    wrapper.find('.news-card__edit').trigger('click');
    expect(store.commit).toBeCalledWith('headlines/setSelected', props.url);
  });
});
