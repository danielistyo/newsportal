<template>
  <VDialog v-model="value" class="edit-dialog" width="auto">
    <VCard class="edit-dialog__card">
      <VCardTitle>Edit Title</VCardTitle>
      <textarea v-model="title" class="edit-dialog__input" />
      <p v-if="isErrorLength" class="edit-dialog__error">Max 200 characters</p>
      <div class="edit-dialog__footer">
        <VBtn color="error" @click="handleCancel" size="small"> Cancel </VBtn>
        <VBtn color="primary" @click="handleEdit" size="small"> Edit </VBtn>
      </div>
    </VCard>
  </VDialog>
</template>

<script>
import { computed, defineComponent, ref, watchEffect } from 'vue';
import { VBtn, VDialog, VCard, VCardTitle } from 'vuetify/components';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'HeadlineNewsEditDialog',
  emits: ['update:modelValue'],
  components: {
    VBtn,
    VDialog,
    VCard,
    VCardTitle,
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    news: {
      type: Object,
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

    const store = useStore();
    const title = ref(props.news?.title);
    // update title based on news' title prop
    watchEffect(() => {
      if (props.news) title.value = props.news.title;
    });

    const isErrorLength = ref(false);
    // check title length
    watchEffect(() => {
      if (title.value && title.value.length > 200) isErrorLength.value = true;
    });

    // reset error message whenever dialog is closed
    watchEffect(() => {
      if (!value.value) isErrorLength.value = false;
    });

    const handleEdit = () => {
      if (!isErrorLength.value) {
        store.commit('headlines/updateTitle', { title: title.value, url: props.news?.url });
        store.commit('headlines/setSelected', null);
      }
    };

    const handleCancel = () => {
      store.commit('headlines/setSelected', null);
    };

    return { value, handleEdit, isErrorLength, title, handleCancel };
  },
});
</script>

<style src="./HeadlineNewsEditDialog.scss" lang="scss" scoped></style>
