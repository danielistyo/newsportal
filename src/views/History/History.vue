<template>
  <HeadlineNewsEditDialog v-model="editDialogModel" :news="selectedHeadline || undefined" />
  <h4>History</h4>
  <VRow dense class="history-news">
    <VCol v-for="headline in headlines" :key="headline.id" :sm="4" class="history-news__col">
      <HeadlineNewsCard
        :title="headline.title"
        :subtitle="headline.description"
        :date="formatDate(headline.publishedAt)"
        :imgUrl="headline.urlToImage"
        :url="headline.url"
        :onReadClick="() => onReadClick(headline)"
        hideEdit
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
import HeadlineNewsEditDialog from '@/components/HeadlineNewsEditDialog';

export default {
  name: 'ListPage',
  components: {
    VCol,
    VRow,
    HeadlineNewsCard,
    HeadlineNewsEditDialog,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const headlines = computed(() => store.state.headlines.history);
    const selectedHeadline = computed(() => store.state.headlines.selected);
    const editDialogModel = computed(() => !!selectedHeadline.value);

    const formatDate = (date) => dayjs(date).format('MMM DD, YYYY');

    const onReadClick = (headline) => {
      router.push({ name: 'Detail', params: { url: headline.url } });
    };

    return {
      router,
      headlines,
      editDialogModel,
      selectedHeadline,
      formatDate,
      onReadClick,
    };
  },
};
</script>

<style lang="scss" src="./History.scss" scoped></style>
