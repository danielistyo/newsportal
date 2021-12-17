import { createStore } from 'vuex';
import { Headline, HeadlineSource, RootStates } from '@/typings';
import api from '@/api';

export default createStore<RootStates>({
  state: {
    isFetchingHeadline: false,
    headlines: [],
    headlineSources: [],
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
  },
  actions: {
    async getHeadlines({ commit }) {
      commit('setIsFetchingHeadline', true);
      const res = await api.getHeadlines();
      if (res.status === 'ok') {
        commit('setHeadlines', res.articles);
      }
      commit('setIsFetchingHeadline', false);
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
