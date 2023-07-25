<template>
  <FilterNews />
  <HeadlineNewsEditDialog v-model="editDialogModel" :news="selectedHeadline || undefined" />
  <VRow dense class="news-list">
    <template v-if="isLoading">
      <VCol v-for="key in 3" :key="key" :sm="4" class="news-list__col">
        <HeadlineNewsSkeleton />
      </VCol>
    </template>
    <VCol v-else v-for="headline in headlines" :key="headline.id" :sm="4" class="news-list__col">
      <HeadlineNewsCard
        :title="headline.title"
        :subtitle="headline.description"
        :date="formatDate(headline.publishedAt)"
        :imgUrl="headline.urlToImage"
        :url="headline.url"
        :onReadClick="() => onReadClick(headline)"
      />
    </VCol>
  </VRow>
</template>

<script>
import dayjs from 'dayjs';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import { VCol, VRow } from 'vuetify/lib/components';
import HeadlineNewsCard from '@/components/HeadlineNewsCard';
import HeadlineNewsSkeleton from '@/components/HeadlineNewsCard/HeadlineNewsSkeleton.vue';
import HeadlineNewsEditDialog from '@/components/HeadlineNewsEditDialog';
import FilterNews from '@/components/FilterNews';

export default {
  name: 'ListPage',
  components: {
    VCol,
    VRow,
    FilterNews,
    HeadlineNewsSkeleton,
    HeadlineNewsEditDialog,
    HeadlineNewsCard,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const isLoading = computed(() => store.state.headlines.isFetching);
    const headlines = computed(() => store.state.headlines.data);
    const selectedHeadline = computed(() => store.state.headlines.selected);
    const editDialogModel = computed(() => !!selectedHeadline.value);

    const formatDate = (date) => dayjs(date).format('MMM DD, YYYY');

    const onReadClick = (headline) => {
      router.push({ name: 'Detail', params: { url: headline.url } });
      store.commit('headlines/addHistoryNews', headline.url);
    };

    return {
      router,
      isLoading,
      headlines,
      editDialogModel,
      selectedHeadline,
      formatDate,
      onReadClick,
    };
  },
};
</script>

<style lang="scss" src="./List.scss" scoped></style>
