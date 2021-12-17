import dayjs from 'dayjs';
import { useStore } from 'vuex';
import { VCol, VRow } from 'vuetify/lib/components';
import { computed, defineComponent } from 'vue';
import HeadlineNewsCard from '@/components/HeadlineNewsCard';
import './List.scss';
import { RootStates } from '@/typings';

export default defineComponent({
  name: 'ListPage',
  setup() {
    const store = useStore<RootStates>();
    const isLoading = computed(() => store.state.isFetchingHeadline);
    const headlines = computed(() => store.state.headlines);
    return () => (
      <VRow dense class="news-list">
        {headlines.value.map((headline) => (
          <VCol sm={4} class="news-list__col">
            <HeadlineNewsCard
              title={headline.title}
              subtitle={headline.description}
              date={dayjs(headline.publishedAt).format('MMM DD, YYYY')}
              imgUrl={headline.urlToImage}
            />
          </VCol>
        ))}
      </VRow>
    );
  },
});
