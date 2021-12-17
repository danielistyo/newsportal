<template>
  <v-app theme="CustomTheme">
    <v-app-bar color="rgb(167 176 221)" absolute dark>
      <v-app-bar-title><v-icon>mdi-file-document-outline</v-icon>Headline News</v-app-bar-title>
      <v-spacer></v-spacer>

      <template v-if="$route.name === 'List'">
        <v-btn
          class="mr-4 ml-5 button-filter"
          color="surface"
          plain
          @click="filterDialog = true"
          size="small"
        >
          <v-icon left icon="mdi-filter"></v-icon>
          <span>Filter</span>
        </v-btn>
        <filter-news v-model="filterDialog" />
      </template>
    </v-app-bar>
    <v-main>
      <v-container class="container-app">
        <router-view v-if="!isError" />
        <div v-else class="container-app__error">
          <v-icon>mdi-alert-circle</v-icon> There's something wrong. Please reload page or contact
          administrators.
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { HeadlinesResponse, RootStates } from './typings';
import FilterNews from '@/components/FilterNews';

export default defineComponent({
  name: 'App',
  components: { FilterNews },
  setup() {
    const store = useStore<RootStates>();
    const isError = ref(false);
    store.dispatch('getHeadlines').then((res: HeadlinesResponse) => {
      if (res.status === 'error') isError.value = true;
    });
    store.dispatch('getHeadlineSources');

    const filterDialog = ref(false);

    return { filterDialog, isError };
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

  .v-app-bar-title {
    padding: 6px 5px;
  }
}
</style>
