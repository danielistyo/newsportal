<template>
  <VApp theme="CustomTheme">
    <AppHeader/>
    <VMain>
      <VContainer class="container-app">
        <router-view v-if="!isError" />
        <div v-else class="container-app__error">
          <VIcon>mdi-alert-circle</VIcon> There's something wrong. Please reload page or contact administrators.
        </div>
      </VContainer>
    </VMain>
  </VApp>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import {
  VApp, VIcon, VContainer, VMain,
} from 'vuetify/components';
import AppHeader from '@/components/AppHeader';

export default defineComponent({
  name: 'App',
  components: {
    VApp,
    AppHeader,
    VIcon,
    VContainer,
    VMain,
  },
  setup() {
    const store = useStore();
    const isError = ref(false);

    // fetch news from API
    store.dispatch('headlines/get').then((res) => {
      if (res.status === 'error') isError.value = true;
    });
    // fetch news source as well
    store.dispatch('sources/get');

    return { isError };
  },
});
</script>

<style lang="scss" scoped>
.container-app {
  max-width: 900px;

  &__error {
    text-align: center;
    font-size: 18px;
    margin-top: 20px;
  }
}

::v-deep() {
  .v-app-bar__content {
    max-width: 900px;
    justify-content: center;
    margin: auto;
  }
}
</style>
