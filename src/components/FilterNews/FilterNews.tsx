import { computed, defineComponent, ref } from 'vue';
import {
  VBtn, VDialog, VCard, VCardTitle, VRadio, VRadioGroup,
} from 'vuetify/lib/components';
import { useStore } from 'vuex';
import { RootStates } from '@/typings';
import './FilterNews.scss';

export default defineComponent({
  name: 'FilterNews',
  emits: ['update:modelValue'],
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

    const store = useStore<RootStates>();
    const sources = computed(() => [
      {
        id: 'all',
        name: 'All',
        description: '',
        url: '',
        category: '',
        language: '',
        country: '',
      },
    ].concat(store.state.headlineSources));
    const source = computed({
      get() {
        return store.state.selectedSource;
      },
      set(val) {
        store.commit('setSelectedSource', val);
      },
    });
    const handleFilter = () => {
      store.dispatch('getHeadlines', source.value === 'all' ? {} : { source: source.value });
      emit('update:modelValue', false);
    };

    return () => (
      <VDialog v-model={value.value} class="filter-news">
        <VCard maxWidth={400} class="filter-news__card">
          <VCardTitle>Filter News</VCardTitle>
          <VRadioGroup v-model={source.value} column class="filter-news__sources">
            {sources.value.map((src) => (
              <VRadio label={src.name} color="red" value={src.id}></VRadio>
            ))}
          </VRadioGroup>
          <VBtn color="primary" onClick={handleFilter}>
            Filter
          </VBtn>
        </VCard>
      </VDialog>
    );
  },
});
