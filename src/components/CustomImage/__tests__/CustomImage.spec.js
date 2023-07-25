import { mount } from '@vue/test-utils';
import CustomImage from '../CustomImage.vue';

test('Custom Image should render correct image url', () => {
  const wrapper = mount(CustomImage, {
    props: {
      src: 'www.google.com',
    },
  });

  expect(wrapper.html()).toContain('www.google.com');
});
