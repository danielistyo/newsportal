<template>
  <div class="filter-news">
    <VTextField
      v-model="searchbox"
      class="filter-news__input"
      label="Search here..."
      @input="handleInputSearch"
    ></VTextField>
    <VBtn class="mr-4 ml-5 filter-news__button-filter" plain @click="filterDialog = true" size="small">
      <VIcon left icon="mdi-filter" size="x-large"></VIcon>
    </VBtn>
    <FilterNewsDialog v-model="filterDialog" />
  </div>
  <VChip
    v-if="filterSource && filterSource.toLowerCase() !== 'all'"
    class="ma-2 filter-news__source-label"
    color="primary"
  >
    Source: {{ filterSource }}
  </VChip>
</template>

<script>
import FilterNewsDialog from '@/components/FilterNewsDialog';
import debounce from 'lodash/debounce';
import { VTextField, VIcon, VBtn, VChip } from 'vuetify/components';
import { useStore } from 'vuex';
import eventBus from '@/eventBus';
import { ref } from 'vue';

export default {
  name: 'FilterNews',
  components: { FilterNewsDialog, VTextField, VIcon, VBtn, VChip },
  setup() {
    const store = useStore();

    const searchbox = ref(null);
    // set default source from selected source
    const selectedSource = store.state.sources.data.find((s) => s.id === store.state.sources.selected);
    const filterSource = ref(selectedSource ? selectedSource.name : '');

    const fetchNews = async (query) => {
      const source = store.state.sources.selected === 'all' ? '' : store.state.sources.selected;
      const params = { source, query };
      store.dispatch('headlines/get', params);
    };

    // to listen filter button click
    eventBus.on('filter-click', (source) => {
      filterSource.value = source;
      fetchNews(searchbox.value);
    });

    const handleInputSearch = debounce(async (e) => {
      const query = e.target.value;
      fetchNews(query);
    }, 1000);

    const filterDialog = ref(false);

    return { handleInputSearch, filterDialog, searchbox, filterSource };
  },
};
</script>

<style lang="scss" scoped src="./FilterNews.scss"></style>
