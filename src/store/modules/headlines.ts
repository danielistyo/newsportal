import { Module } from 'vuex';
import { Headline, HeadlineSource, HeadlineModule } from '@/typings';
import api from '@/api';

const module: Module<HeadlineModule, Record<string, never>> = {
  namespaced: true,
  state: {
    isFetching: false,
    data: [],
    sources: [],
    selectedSource: 'all',
    selected: null,
  },
  mutations: {
    set(state, headlines: Array<Headline>) {
      state.data = headlines;
    },
    add(state, headlines: Array<Headline>) {
      state.data.push(...headlines);
    },
    setSources(state, headlineSources: Array<HeadlineSource>) {
      state.sources = headlineSources;
    },
    setIsFetching(state, value) {
      state.isFetching = value;
    },
    setSelectedSource(state, value) {
      state.selectedSource = value;
    },
    setSelected(state, url) {
      const headline = state.data.find((hd) => hd.url === url);
      state.selected = headline || null;
    },
    updateTitle(state, { title, url }) {
      const headline = state.data.find((hd) => hd.url === url);
      if (headline) headline.title = title;
    },
  },
  actions: {
    async get({ commit }, params: { source: string; query: string }) {
      commit('setIsFetching', true);
      const res = await api.getHeadlines(params || {});
      if (res.status === 'ok') {
        commit('set', res.articles);
      }
      commit('setIsFetching', false);
      return res;
    },
    async getSources({ commit }) {
      const res = await api.getHeadlineSources();
      if (res.status === 'ok') {
        commit('setSources', res.sources);
      }
    },
  },
};

export default module;
