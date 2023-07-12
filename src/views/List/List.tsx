/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable indent */
import debounce from 'lodash/debounce';
import dayjs from 'dayjs';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed, defineComponent, ref } from 'vue';
import { VCol, VRow, VTextField } from 'vuetify/lib/components';
import HeadlineNewsCard from '@/components/HeadlineNewsCard';
import './List.scss';
import { RootStates } from '@/typings';
import HeadlineNewsSkeleton from '@/components/HeadlineNewsCard/HeadlineNewsSkeleton';
import HeadlineNewsEditDialog from '@/components/HeadlineNewsEditDialog';
import eventBus from '@/eventBus';

export default defineComponent({
  name: 'ListPage',
  setup() {
    const router = useRouter();
    const store = useStore<RootStates>();
    const isLoading = computed(() => store.state.headlines.isFetching);
    const headlines = computed(() => store.state.headlines.data);
    const selectedHeadline = computed(() => store.state.headlines.selected);
    const editDialogModel = computed(() => !!selectedHeadline.value);

    const handleInputSearch = debounce(async (e: Event) => {
      const query = (e.target as HTMLInputElement).value;
      await store.dispatch('headlines/get', query === '' ? {} : { query });
      eventBus.emit('search-click');
    }, 1500);

    const searchbox = ref(null);
    eventBus.on('filter-click', () => {
      searchbox.value = null;
    });

    return () => (
      <>
        <VTextField
          v-model={searchbox.value}
          label="Search here..."
          onInput={handleInputSearch}
        ></VTextField>
        <HeadlineNewsEditDialog
          v-model={editDialogModel.value}
          news={selectedHeadline.value || undefined}
        />
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
                    onReadClick={() =>
                      router.push({ name: 'Detail', params: { url: headline.url } })
                    }
                  />
                </VCol>
              ))}
        </VRow>
      </>
    );
  },
});
