<template>
  <VImg
    :class="customClass"
    lazySrc="https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png"
  />
</template>
<script>
import { VImg } from 'vuetify/components';

export default {
  name: 'CustomImage',
  inheritAttrs: true,
  components: { VImg },
  props: { customClass: String },
};
</script>
