<template>
  <VCard class="headline-skeleton" maxWidth="400">
    <SkeletonLoader height="150px" width="100%" borderRadius="0" />
    <div class="headline-skeleton__title">
      <SkeletonLoader height="100%" width="100%" borderRadius="5" />
    </div>

    <div v-for="key in 4" :key="key" class="headline-skeleton__description">
      <SkeletonLoader height="100%" width="100%" borderRadius="2" />
    </div>

    <div class="headline-skeleton__footer">
      <SkeletonLoader height="100%" width="80px" borderRadius="2" />
      <SkeletonLoader height="100%" width="80px" borderRadius="2" />
    </div>
  </VCard>
</template>
<script>
import { VCard } from 'vuetify/lib/components';
import SkeletonLoader from '../SkeletonLoader';

export default {
  name: 'HeadlineNewsSkeleton',
  components: { SkeletonLoader, VCard },
};
</script>

<style lang="scss" scoped src="./HeadlineNewsSkeleton.scss"></style>
