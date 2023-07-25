<template>
  <VAppBar color="rgb(31 39 82)" class="app-header">
    <VAppBarTitle class="app-header__title" @click="$router.push('/')"
      ><VIcon>mdi-file-document-outline</VIcon>Headline News</VAppBarTitle
    >
    <VSpacer></VSpacer>
    <span class="app-header__history" @click="$router.push('/history')"><VIcon>mdi-history</VIcon> History</span>
  </VAppBar>
</template>

<script>
import { defineComponent } from 'vue';
import { VAppBar, VAppBarTitle, VSpacer, VIcon } from 'vuetify/components';

export default defineComponent({
  name: 'AppHeader',
  components: {
    VAppBar,
    VAppBarTitle,
    VSpacer,
    VIcon,
  },
});
</script>

<style lang="scss" scoped src="./AppHeader.scss" />
