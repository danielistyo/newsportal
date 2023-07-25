<template>
  <div class="detail-page">
    <div v-if="!selectedNews">Loading...</div>
    <template v-else>
      <VBreadcrumbs>
        <VIcon size="small">mdi-home</VIcon>
        <VBreadcrumbsItem :to="{ path: '/' }">Home</VBreadcrumbsItem>
        <VBreadcrumbsDivider>/</VBreadcrumbsDivider>
        <VBreadcrumbsItem active>News</VBreadcrumbsItem>
      </VBreadcrumbs>
      <h3 class="detail-page__title">{{ selectedNews.title }}</h3>
      <div class="detail-page__subtitle">
        <div class="detail-page__author">{{ selectedNews.author }} - {{ selectedNews.source.name }}</div>
        <div class="detail-page__date">
          {{ publishedAt }}
        </div>
      </div>
      <img :src="selectedNews.urlToImage" alt="image" class="detail-page__image" />
      <h3 class="detail-page__description">{{ selectedNews.description }}</h3>
      <p class="detail-page__content">{{ selectedNews.content }}</p>
      <div class="detail-page__footer">
        <VBtn variant="outlined" color="primary" :rounded="0" tag="a" :href="selectedNews.url" target="_blank">
          GO TO WEBSITE
        </VBtn>
      </div>
    </template>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import { computed, defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import {
  VIcon, VBreadcrumbs, VBreadcrumbsItem, VBreadcrumbsDivider, VBtn,
} from 'vuetify/lib/components';
import './Detail.scss';

export default defineComponent({
  name: 'DetailPage',
  components: {
    VIcon,
    VBreadcrumbs,
    VBreadcrumbsItem,
    VBreadcrumbsDivider,
    VBtn,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const newsUrl = useRoute().params.url;
    const selectedNews = computed(() => store.state.headlines.data.find((news) => news.url === newsUrl));

    // redirect to list page when there is no any headlines yet
    if (!store.state.headlines.data.length) {
      router.replace({ name: 'List' });
    }

    const publishedAt = computed(() => dayjs(selectedNews.value.publishedAt).format('DD MMM YYYY'));
    return { selectedNews, publishedAt };
  },
});
</script>
