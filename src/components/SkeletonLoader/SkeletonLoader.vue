<template>
  <div class="u-loading-gradient" :style="{ height, width, borderRadius: `${borderRadius}px` }" />
</template>

<script>
export default {
  name: 'SkeletonLoader',
  props: { height: String, width: String, borderRadius: String },
};
</script>
