<template>
  <VDialog v-model="value" class="filter-news-dialog" width="auto">
    <VCard maxWidth="400" minWidth="300" class="filter-news-dialog__card">
      <VCardTitle>Filter News</VCardTitle>
      <VRadioGroup v-model="source" column class="filter-news-dialog__sources">
        <VRadio v-for="src in sources" :key="src.id" :label="src.name" color="red" :value="src.id"></VRadio>
      </VRadioGroup>
      <VBtn color="primary" :onClick="handleFilter" class="filter-news-dialog__button"> Filter </VBtn>
    </VCard>
  </VDialog>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { VBtn, VDialog, VCard, VCardTitle, VRadio, VRadioGroup } from 'vuetify/lib/components';
import { useStore } from 'vuex';
import eventBus from '@/eventBus';

export default defineComponent({
  name: 'FilterNews',
  emits: ['update:modelValue'],
  components: {
    VBtn,
    VDialog,
    VCard,
    VCardTitle,
    VRadio,
    VRadioGroup,
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const value = computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        emit('update:modelValue', val);
      },
    });

    const store = useStore();
    const sources = computed(() =>
      [
        // prepend an item of 'all' option
        {
          id: 'all',
          name: 'All',
          description: '',
          url: '',
          category: '',
          language: '',
          country: '',
        },
      ].concat(store.state.sources.data),
    );
    const source = computed({
      get() {
        return store.state.sources.selected;
      },
      set(val) {
        store.commit('sources/setSelected', val);
      },
    });

    // listener for filter button
    const handleFilter = () => {
      // fetch news based on selected source
      store.dispatch('headlines/get', source.value === 'all' ? {} : { source: source.value });
      emit('update:modelValue', false);
      // trigger 'filter-click' event in order to show source news label and remove search query
      eventBus.emit('filter-click', sources.value.find((s) => s.id === source.value).name);
    };
    eventBus.on('search-click', () => {
      store.commit('sources/setSelected', 'all');
    });

    return {
      value,
      sources,
      source,
      handleFilter,
    };
  },
});
</script>

<style lang="scss" scoped src="./FilterNewsDialog.scss"></style>