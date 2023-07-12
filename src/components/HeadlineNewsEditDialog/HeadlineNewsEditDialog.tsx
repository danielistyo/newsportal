import {
  computed, defineComponent, PropType, ref, watchEffect,
} from 'vue';
import {
  VBtn, VDialog, VCard, VCardTitle,
} from 'vuetify/components';
import { useStore } from 'vuex';
import { Headline, RootStates } from '@/typings';
import './HeadlineNewsEditDialog.scss';

export default defineComponent({
  name: 'HeadlineNewsEditDialog',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    news: {
      type: Object as PropType<Headline>,
      default: undefined,
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
    const title = ref(props.news?.title);
    watchEffect(() => {
      if (props.news) title.value = props.news.title;
    });

    const isErrorLength = ref(false);
    watchEffect(() => {
      if (title.value && title.value.length > 200) isErrorLength.value = true;
    });

    const handleEdit = () => {
      if (!isErrorLength.value) {
        store.commit('headlines/updateTitle', { title: title.value, url: props.news?.url });
        store.commit('headlines/setSelected', null);
      }
    };

    return () => (
      <VDialog v-model={value.value} class="edit-dialog" width="auto">
        <VCard class="edit-dialog__card" width="400">
          <VCardTitle>Edit Title</VCardTitle>
          <textarea v-model={title.value} class="edit-dialog__input" />
          {isErrorLength.value && <p class="edit-dialog__error">Max 200 characters</p>}
          <div class="edit-dialog__footer">
            <VBtn
              color="error"
              onClick={() => {
                store.commit('headlines/setSelected', null);
              }}
              size="small"
            >
              Cancel
            </VBtn>
            <VBtn color="primary" onClick={handleEdit} size="small">
              Edit
            </VBtn>
          </div>
        </VCard>
      </VDialog>
    );
  },
});
