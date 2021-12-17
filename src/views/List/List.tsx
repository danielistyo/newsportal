import { VCol, VRow } from 'vuetify/lib/components';
import { defineComponent } from 'vue';
import HeadlineNewsCard from '@/components/HeadlineNewsCard';
import './List.scss';

export default defineComponent({
  name: 'ListPage',
  render() {
    const sb = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
    standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
    a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
    remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
    Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions
    of Lorem Ipsum.`;
    return (
      <VRow dense class="news-list">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(() => (
          <VCol sm={4} md={3} class="news-list__col">
            <HeadlineNewsCard
              title="Coba bos"
              subtitle={sb}
              imgUrl="https://cdn.vuetifyjs.com/images/cards/cooking.png"
            />
          </VCol>
        ))}
      </VRow>
    );
  },
});
