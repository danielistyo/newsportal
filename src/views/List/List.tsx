import debounce from 'lodash/debounce';
import dayjs from 'dayjs';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import {
  computed, defineComponent, ref, watch, watchEffect,
} from 'vue';
import { VCol, VRow, VTextField } from 'vuetify/lib/components';
import HeadlineNewsCard from '@/components/HeadlineNewsCard';
import './List.scss';
import { RootStates } from '@/typings';
import HeadlineNewsSkeleton from '@/components/HeadlineNewsCard/HeadlineNewsSkeleton';

export default defineComponent({
  name: 'ListPage',
  setup() {
    const router = useRouter();
    const store = useStore<RootStates>();
    const isLoading = computed(() => store.state.isFetchingHeadline);
    const headlines = computed(() => store.state.headlines);

    const handleInputSearch = debounce((e: Event) => {
      const query = (e.target as HTMLInputElement).value;
      store.dispatch('getHeadlines', query === '' ? {} : { query });
    }, 1500);

    return () => (
      <>
        <VTextField label="Search here..." onInput={handleInputSearch}></VTextField>
        <VRow dense class="news-list">
          {isLoading.value
            ? [1, 2, 3].map(() => (
                <VCol sm={4} class="news-list__col">
                  <HeadlineNewsSkeleton />
                </VCol>
            ))
            : headlines.value.map((headline) => (
                <VCol sm={4} class="news-list__col">
                  <HeadlineNewsCard
                    title={headline.title}
                    subtitle={headline.description}
                    date={dayjs(headline.publishedAt).format('MMM DD, YYYY')}
                    imgUrl={headline.urlToImage}
                    url={headline.url}
                    onReadClick={() => router.push({ name: 'Detail', params: { url: headline.url } })
                    }
                  />
                </VCol>
            ))}
        </VRow>
      </>
    );
  },
});
