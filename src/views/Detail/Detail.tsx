import dayjs from 'dayjs';
import { computed, defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { VIcon, VBtn } from 'vuetify/lib/components';
import { RootStates } from '@/typings';
import './Detail.scss';

export default defineComponent({
  name: 'DetailPage',
  setup() {
    const router = useRouter();
    const store = useStore<RootStates>();
    const newsUrl = useRoute().params.url;
    const selectedNews = computed(() => store.state.headlines.find((news) => news.url === newsUrl));

    // redirect to list page when there is no any headlines yet
    if (!store.state.headlines.length) {
      router.replace({ name: 'List' });
    }
    if (!selectedNews.value) return () => <div>Loading...</div>;

    return () => (
      <div class="detail-page">
        <h3 class="detail-page__title">{selectedNews.value?.title}</h3>
        <div class="detail-page__subtitle">
          <div class="detail-page__date">
            <VIcon>mdi-calendar-blank</VIcon>
            {dayjs(selectedNews.value?.publishedAt).format('DD MMM YYYY')}
          </div>
          {selectedNews.value?.author && (
            <div class="detail-page__author">
              <VIcon>mdi-account</VIcon>
              {selectedNews.value?.author} - {selectedNews.value?.source.name}
            </div>
          )}
        </div>
        <img src={selectedNews.value?.urlToImage} alt="image" class="detail-page__image" />
        <h3 class="detail-page__description">{selectedNews.value?.description}</h3>
        <p class="detail-page__content">{selectedNews.value?.content}</p>
        <div class="detail-page__footer">
          <VBtn
            variant="outlined"
            color="primary"
            rounded={0}
            tag="a"
            href={selectedNews.value?.url}
            target="_blank"
          >
            GO TO WEBSITE
          </VBtn>
        </div>
      </div>
    );
  },
});
