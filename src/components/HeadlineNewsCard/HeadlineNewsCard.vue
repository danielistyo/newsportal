<template>
  <VCard maxWidth="400" class="news-card">
    <VIcon
      v-if="!hideEdit"
      color="primary"
      size="large"
      title="Edit"
      class="news-card__edit"
      @click="() => handleEdit(url)"
    >
      mdi-square-edit-outline
    </VIcon>
    <CustomImage :src="imgUrl" customClass="news-card__img" @click="onReadClick" />
    <VCardTitle class="news-card__title" @click="onReadClick" :title="title">
      {{ title }}
    </VCardTitle>
    <VCardSubtitle class="news-card__subtitle">{{ slicedSubtitle }}</VCardSubtitle>
    <div class="news-card__footer">
      <div class="news-card__date">{{ date }}</div>
      <div class="news-card__read" @click="onReadClick">
        Read More<VIcon size="x-small">mdi-chevron-double-right</VIcon>
      </div>
    </div>
  </VCard>
</template>

<script>
import { VCard, VCardTitle, VCardSubtitle, VIcon } from 'vuetify/components';
import { useStore } from 'vuex';
import { sliceText } from '@/helpers/text';
import CustomImage from '../CustomImage';

export default {
  name: 'HeadlineNewsCard',
  components: {
    VCard,
    VCardTitle,
    VCardSubtitle,
    VIcon,
    CustomImage,
  },
  props: {
    title: { type: String, required: true },
    subtitle: { type: String, required: false },
    imgUrl: { type: String, required: false },
    date: { type: String, required: true },
    url: { type: String, required: true },
    onReadClick: { type: Function, required: true },
    hideEdit: { type: Boolean, default: false },
  },
  setup(props) {
    const slicedSubtitle = sliceText(props.subtitle);

    const store = useStore();
    const handleEdit = (newsUrl) => {
      store.commit('headlines/setSelected', newsUrl);
    };
    return {
      handleEdit,
      slicedSubtitle,
    };
  },
};
</script>

<style lang="scss" src="./HeadlineNewsCard.scss" scoped></style>
