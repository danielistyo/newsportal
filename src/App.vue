<template>
  <v-app theme="CustomTheme">
    <v-app-bar color="rgb(167 176 221)" absolute dark>
      <v-app-bar-title>Headline News</v-app-bar-title>
    </v-app-bar>
    <v-main>
      <v-container class="container-app">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',

  data() {
    return {
      //
    };
  },
});
</script>

<style lang="scss" scoped>
.container-app {
  max-width: 900px;
}
</style>
