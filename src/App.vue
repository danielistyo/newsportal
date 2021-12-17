<template>
  <v-app theme="CustomTheme">
    <v-app-bar color="rgb(167 176 221)" absolute dark>
      <v-app-bar-title><v-icon>mdi-file-document-outline</v-icon>Headline News</v-app-bar-title>
      <v-spacer></v-spacer>

      <template v-if="$route.name === 'List'">
        <v-btn class="mr-4 ml-5" color="surface" plain @click="filterDialog = true">
          <v-icon left icon="mdi-filter"></v-icon>
          <span>Filter</span>
        </v-btn>
        <filter-news v-model="filterDialog" />
      </template>
    </v-app-bar>
    <v-main>
      <v-container class="container-app">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { RootStates } from './typings';
import FilterNews from '@/components/FilterNews';

export default defineComponent({
  name: 'App',
  components: { FilterNews },
  setup() {
    const store = useStore<RootStates>();
    store.dispatch('getHeadlines');
    store.dispatch('getHeadlineSources');

    const filterDialog = ref(false);

    return { filterDialog };
  },
});
</script>

<style lang="scss" scoped>
.container-app {
  max-width: 900px;
}
</style>
