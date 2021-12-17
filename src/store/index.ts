import { createStore } from 'vuex';
import { Headline, HeadlineSource, RootStates } from '@/typings';
import api from '@/api';

export default createStore<RootStates>({
  state: {
    isFetchingHeadline: false,
    headlines: [],
    headlineSources: [],
    selectedSource: 'all',
    selectedHeadline: null,
  },
  mutations: {
    setHeadlines(state, headlines: Array<Headline>) {
      state.headlines = headlines;
    },
    addHeadlines(state, headlines: Array<Headline>) {
      state.headlines.push(...headlines);
    },
    setHeadlineSources(state, headlineSources: Array<HeadlineSource>) {
      state.headlineSources = headlineSources;
    },
    setIsFetchingHeadline(state, value) {
      state.isFetchingHeadline = value;
    },
    setSelectedSource(state, value) {
      state.selectedSource = value;
    },
    setSelectedHeadline(state, url) {
      const headline = state.headlines.find((hd) => hd.url === url);
      state.selectedHeadline = headline || null;
    },
    updateTitleHeadline(state, { title, url }) {
      const headline = state.headlines.find((hd) => hd.url === url);
      if (headline) headline.title = title;
    },
  },
  actions: {
    async getHeadlines({ commit }, params: { source: string; query: string }) {
      commit('setIsFetchingHeadline', true);
      const res = await api.getHeadlines(params || {});
      if (res.status === 'ok') {
        commit('setHeadlines', res.articles);
      }
      commit('setIsFetchingHeadline', false);
      return res;
    },
    async getHeadlineSources({ commit }) {
      const res = await api.getHeadlineSources();
      if (res.status === 'ok') {
        commit('setHeadlineSources', res.sources);
      }
    },
  },
  modules: {},
});
